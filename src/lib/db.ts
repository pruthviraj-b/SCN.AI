import { supabase } from './supabase';

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
    description: string;
    difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
    required_skills: string[];
    tools: string[];
    growth_score: number; // 0-100
    avgSalary: string;
    learning_duration_months: number;
    demand: 'High' | 'Medium' | 'Low';
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
    type: 'Course' | 'Video' | 'Article' | 'Project' | 'Certification';
    description: string;
    skill_tags: string[];
    difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
    estimated_time: string;
    provider: string;
    url: string;
    rating: number;
    // career_mapping: string[]; // Supabase stores arrays as strings/json but text[] is fine
    status: 'Active' | 'Archived';
};

type StartupIdea = {
    id: string;
    title: string;
    problem_statement: string;
    solution_summary: string;
    target_users: string;
    industry: string;
    difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced';
    required_skills: string[];
    market_size_estimate: string;
    revenue_model: string[];
    validation_score: number;
    risk_level: 'Low' | 'Medium' | 'High';
    execution_steps: string[];
    status: 'Idea' | 'Validated' | 'Building';
};

export const db = {
    user: {
        findUnique: async ({ where }: { where: { email: string } }) => {
            const { data, error } = await supabase
                .from('users')
                .select('*, plans:career_plans(*)')
                .eq('email', where.email)
                .single();

            if (error || !data) return null;

            // Map response to User type
            return {
                id: data.id,
                email: data.email,
                password: data.password,
                name: data.name,
                createdAt: data.created_at,
                updatedAt: data.updated_at,
                plans: data.plans.map((p: any) => ({
                    id: p.id,
                    title: p.title,
                    data: typeof p.data === 'string' ? p.data : JSON.stringify(p.data),
                    userId: p.user_id,
                    createdAt: p.created_at
                }))
            } as User;
        },
        create: async ({ data }: { data: any }) => {
            const { data: newUser, error } = await supabase
                .from('users')
                .insert({
                    email: data.email,
                    password: data.password,
                    name: data.name
                })
                .select()
                .single();

            if (error) throw new Error(error.message);

            // Create initial plan if provided
            if (data.plans?.create) {
                await supabase.from('career_plans').insert({
                    user_id: newUser.id,
                    title: data.plans.create.title || 'Initial Plan',
                    data: typeof data.plans.create.data === 'string' ? JSON.parse(data.plans.create.data) : data.plans.create.data
                });
            }

            return {
                ...newUser,
                plans: []
            } as User;
        },
        delete: async (id: string) => {
            await supabase.from('users').delete().eq('id', id);
        },
        update: async (email: string, data: Partial<User>) => {
            const { data: updatedUser, error } = await supabase
                .from('users')
                .update({
                    name: data.name,
                    updated_at: new Date().toISOString()
                })
                .eq('email', email)
                .select()
                .single();

            if (error) return null;
            return updatedUser;
        },
        getAll: async () => {
            const { data, error } = await supabase
                .from('users')
                .select('*, plans:career_plans(*)');

            if (error) return [];

            return data.map((u: any) => ({
                id: u.id,
                email: u.email,
                name: u.name,
                createdAt: u.created_at,
                updatedAt: u.updated_at,
                plans: u.plans || []
            }));
        }
    },
    plan: {
        create: async ({ data }: { data: { title: string, data: string | object, userId: string } }) => {
            const { data: newPlan, error } = await supabase
                .from('career_plans')
                .insert({
                    title: data.title,
                    data: typeof data.data === 'string' ? JSON.parse(data.data) : data.data,
                    user_id: data.userId
                })
                .select()
                .single();

            if (error) throw new Error(error.message);
            return newPlan;
        }
    },
    careerPath: {
        getAll: async () => {
            const { data } = await supabase.from('career_paths').select('*');
            return data || [];
        },
        create: async (data: Omit<CareerPath, 'id'>) => {
            await supabase.from('career_paths').insert(data);
        },
        update: async (id: string, data: Partial<CareerPath>) => {
            const { data: updated, error } = await supabase
                .from('career_paths')
                .update(data)
                .eq('id', id)
                .select()
                .single();
            if (error) return null;
            return updated;
        },
        delete: async (id: string) => {
            await supabase.from('career_paths').delete().eq('id', id);
        }
    },
    skill: {
        getAll: async () => { const { data } = await supabase.from('skills').select('*'); return data || []; },
        create: async (data: any) => { await supabase.from('skills').insert(data); },
        update: async (id: string, data: any) => {
            const { data: updated, error } = await supabase.from('skills').update(data).eq('id', id).select().single();
            if (error) return null;
            return updated;
        },
        delete: async (id: string) => { await supabase.from('skills').delete().eq('id', id); }
    },
    learningResource: {
        getAll: async () => { const { data } = await supabase.from('learning_resources').select('*'); return data || []; },
        create: async (data: any) => { await supabase.from('learning_resources').insert(data); },
        update: async (id: string, data: any) => {
            const { data: updated, error } = await supabase.from('learning_resources').update(data).eq('id', id).select().single();
            if (error) return null;
            return updated;
        },
        delete: async (id: string) => { await supabase.from('learning_resources').delete().eq('id', id); }
    },
    startupIdea: {
        getAll: async () => { const { data } = await supabase.from('startup_ideas').select('*'); return data || []; },
        create: async (data: any) => { await supabase.from('startup_ideas').insert(data); },
        update: async (id: string, data: any) => {
            const { data: updated, error } = await supabase.from('startup_ideas').update(data).eq('id', id).select().single();
            if (error) return null;
            return updated;
        },
        delete: async (id: string) => { await supabase.from('startup_ideas').delete().eq('id', id); }
    },
    otp: {
        create: async (email: string, otp: string) => {
            await supabase.from('otps').delete().eq('email', email);
            await supabase.from('otps').insert({
                email,
                otp,
                expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString()
            });
        },
        verify: async (email: string, otp: string) => {
            const { data } = await supabase.from('otps').select('*').eq('email', email).eq('otp', otp).single();
            if (!data) return false;
            if (new Date(data.expires_at) < new Date()) return false;
            return true;
        },
        delete: async (email: string) => {
            await supabase.from('otps').delete().eq('email', email);
        }
    }
};

export type { User, CareerPlan, CareerPath, Skill, LearningResource, StartupIdea };
