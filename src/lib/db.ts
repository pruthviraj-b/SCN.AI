import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data.json');

type User = {
    id: string;
    email: string;
    password: string;
    name: string | null;
    createdAt: string;
    updatedAt: string;
    plans: CareerPlan[];
};

type CareerPlan = {
    id: string;
    title: string;
    data: string;
    userId: string;
    createdAt: string;
};

type CareerPath = {
    id: string;
    title: string;
    category: string;
    demand: string;
    avgSalary: string;
    description?: string;
};

type Skill = {
    id: string;
    name: string;
    category: string;
    level: string;
};

type LearningResource = {
    id: string;
    title: string;
    platform: string;
    category: string;
    url: string;
    status: string;
};

type StartupIdea = {
    id: string;
    title: string;
    category: string;
    difficulty: string;
    market: string;
    description?: string;
    businessPlan?: {
        executiveSummary: string;
        targetAudience: string[];
        revenueModel: string[];
        marketingStrategy: string[];
        financialProjections: { year: string; revenue: string; expenses: string; profit: string }[];
    };
    faqs?: { question: string; answer: string }[];
};

type Database = {
    users: User[];
    careerPaths: CareerPath[];
    skills: Skill[];
    learningResources: LearningResource[];
    startupIdeas: StartupIdea[];
};

// Initialize DB if not exists
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({
        users: [],
        careerPaths: [],
        skills: [],
        learningResources: [],
        startupIdeas: []
    }, null, 2));
}

export const db = {
    read: (): Database => {
        try {
            const data = fs.readFileSync(DB_PATH, 'utf-8');
            const parsed = JSON.parse(data);
            // Ensure all arrays exist
            return {
                users: parsed.users || [],
                careerPaths: parsed.careerPaths || [],
                skills: parsed.skills || [],
                learningResources: parsed.learningResources || [],
                startupIdeas: parsed.startupIdeas || []
            };
        } catch (error) {
            return {
                users: [],
                careerPaths: [],
                skills: [],
                learningResources: [],
                startupIdeas: []
            };
        }
    },
    write: (data: Database) => {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    },
    user: {
        findUnique: async ({ where }: { where: { email: string } }) => {
            const data = db.read();
            return data.users.find(u => u.email === where.email) || null;
        },
        create: async ({ data }: { data: any }) => {
            const dbData = db.read();
            const newUser: User = {
                id: Math.random().toString(36).substr(2, 9),
                email: data.email,
                password: data.password,
                name: data.name,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                plans: []
            };

            if (data.plans?.create) {
                newUser.plans.push({
                    id: Math.random().toString(36).substr(2, 9),
                    title: data.plans.create.title,
                    data: data.plans.create.data,
                    userId: newUser.id,
                    createdAt: new Date().toISOString()
                });
            }

            dbData.users.push(newUser);
            db.write(dbData);
            return newUser;
        },
        delete: async (id: string) => {
            const dbData = db.read();
            dbData.users = dbData.users.filter(u => u.id !== id);
            db.write(dbData);
        }
    },
    plan: {
        create: async ({ data }: { data: { title: string, data: string, userId: string } }) => {
            const dbData = db.read();
            const userIndex = dbData.users.findIndex(u => u.id === data.userId);

            if (userIndex === -1) {
                throw new Error("User not found");
            }

            const newPlan: CareerPlan = {
                id: Math.random().toString(36).substr(2, 9),
                title: data.title,
                data: data.data,
                userId: data.userId,
                createdAt: new Date().toISOString()
            };

            dbData.users[userIndex].plans.push(newPlan);
            db.write(dbData);
            return newPlan;
        }
    },
    careerPath: {
        getAll: () => {
            return db.read().careerPaths;
        },
        create: (data: Omit<CareerPath, 'id'>) => {
            const dbData = db.read();
            const newPath: CareerPath = {
                id: Math.random().toString(36).substr(2, 9),
                ...data
            };
            dbData.careerPaths.push(newPath);
            db.write(dbData);
            return newPath;
        },
        update: (id: string, data: Partial<CareerPath>) => {
            const dbData = db.read();
            const index = dbData.careerPaths.findIndex(p => p.id === id);
            if (index !== -1) {
                dbData.careerPaths[index] = { ...dbData.careerPaths[index], ...data };
                db.write(dbData);
                return dbData.careerPaths[index];
            }
            return null;
        },
        delete: (id: string) => {
            const dbData = db.read();
            dbData.careerPaths = dbData.careerPaths.filter(p => p.id !== id);
            db.write(dbData);
        }
    },
    skill: {
        getAll: () => {
            return db.read().skills;
        },
        create: (data: Omit<Skill, 'id'>) => {
            const dbData = db.read();
            const newSkill: Skill = {
                id: Math.random().toString(36).substr(2, 9),
                ...data
            };
            dbData.skills.push(newSkill);
            db.write(dbData);
            return newSkill;
        },
        update: (id: string, data: Partial<Skill>) => {
            const dbData = db.read();
            const index = dbData.skills.findIndex(s => s.id === id);
            if (index !== -1) {
                dbData.skills[index] = { ...dbData.skills[index], ...data };
                db.write(dbData);
                return dbData.skills[index];
            }
            return null;
        },
        delete: (id: string) => {
            const dbData = db.read();
            dbData.skills = dbData.skills.filter(s => s.id !== id);
            db.write(dbData);
        }
    },
    learningResource: {
        getAll: () => {
            return db.read().learningResources;
        },
        create: (data: Omit<LearningResource, 'id'>) => {
            const dbData = db.read();
            const newResource: LearningResource = {
                id: Math.random().toString(36).substr(2, 9),
                ...data
            };
            dbData.learningResources.push(newResource);
            db.write(dbData);
            return newResource;
        },
        update: (id: string, data: Partial<LearningResource>) => {
            const dbData = db.read();
            const index = dbData.learningResources.findIndex(r => r.id === id);
            if (index !== -1) {
                dbData.learningResources[index] = { ...dbData.learningResources[index], ...data };
                db.write(dbData);
                return dbData.learningResources[index];
            }
            return null;
        },
        delete: (id: string) => {
            const dbData = db.read();
            dbData.learningResources = dbData.learningResources.filter(r => r.id !== id);
            db.write(dbData);
        }
    },
    startupIdea: {
        getAll: () => {
            return db.read().startupIdeas;
        },
        create: (data: Omit<StartupIdea, 'id'>) => {
            const dbData = db.read();
            const newIdea: StartupIdea = {
                id: Math.random().toString(36).substr(2, 9),
                ...data
            };
            dbData.startupIdeas.push(newIdea);
            db.write(dbData);
            return newIdea;
        },
        update: (id: string, data: Partial<StartupIdea>) => {
            const dbData = db.read();
            const index = dbData.startupIdeas.findIndex(i => i.id === id);
            if (index !== -1) {
                dbData.startupIdeas[index] = { ...dbData.startupIdeas[index], ...data };
                db.write(dbData);
                return dbData.startupIdeas[index];
            }
            return null;
        },
        delete: (id: string) => {
            const dbData = db.read();
            dbData.startupIdeas = dbData.startupIdeas.filter(i => i.id !== id);
            db.write(dbData);
        }
    }
};

export type { User, CareerPlan, CareerPath, Skill, LearningResource, StartupIdea, Database };
