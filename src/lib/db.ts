import { supabase } from './supabase';

export type UserProfile = {
    id: string;
    email: string;
    full_name: string | null;
    highest_education: string | null;
    field_of_study: string | null;
    current_status: string | null;
    experience_level: string | null;
    career_goal: string | null;
    created_at: string;
    skills: UserSkill[];
    recommendations: AIRecommendation[];
    plans: any[]; // Keeping for backward compatibility or future migration
};

export type UserSkill = {
    id?: number;
    skill_name: string;
    proficiency: 'Beginner' | 'Intermediate' | 'Advanced';
};

export type AIRecommendation = {
    id?: number;
    type: 'career' | 'course' | 'roadmap' | 'chat';
    payload: any;
    created_at?: string;
};

export type ActivityLog = {
    action: string;
    metadata?: any;
};

export const db = {
    user: {
        // Get full profile with relations
        getProfile: async (userId: string) => {
            try {
                // 1. Fetch Profile
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', userId)
                    .single();

                if (profileError || !profile) return null;

                // 2. Fetch Skills
                const { data: skills } = await supabase
                    .from('user_skills')
                    .select('*')
                    .eq('user_id', userId);

                // 3. Fetch Latest Recommendations (limit to 5 most recent)
                const { data: recommendations } = await supabase
                    .from('ai_recommendations')
                    .select('*')
                    .eq('user_id', userId)
                    .order('created_at', { ascending: false })
                    .limit(5);

                return {
                    ...profile,
                    skills: skills || [],
                    recommendations: recommendations || [],
                    plans: [] // Placeholder if we need legacy plans support
                } as UserProfile;

            } catch (error) {
                console.error("Error fetching profile:", error);
                return null;
            }
        },

        // Create or Update Profile
        updateProfile: async (userId: string, data: Partial<UserProfile>) => {
            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: userId,
                    full_name: data.full_name,
                    email: data.email,
                    highest_education: data.highest_education,
                    field_of_study: data.field_of_study,
                    current_status: data.current_status,
                    experience_level: data.experience_level,
                    career_goal: data.career_goal,
                    updated_at: new Date().toISOString()
                })
                .select()
                .single();

            if (error) throw new Error(`Profile update failed: ${error.message}`);
        }
    },

    skills: {
        // Save bulk skills (replace or add)
        save: async (userId: string, skills: UserSkill[]) => {
            // Check existing to avoid duplicates if needed, or just upsert logic
            // Ideally we'd delete old ones or use upsert. 
            // For MVP: Simple upsert loop or bulk insert
            const records = skills.map(s => ({
                user_id: userId,
                skill_name: s.skill_name,
                proficiency: s.proficiency || 'Beginner'
            }));

            const { error } = await supabase
                .from('user_skills')
                .upsert(records, { onConflict: 'user_id, skill_name' });

            if (error) console.error("Error saving skills:", error);
        }
    },

    recommendations: {
        // Save AI output
        save: async (userId: string, type: string, payload: any) => {
            const { error } = await supabase
                .from('ai_recommendations')
                .insert({
                    user_id: userId,
                    type,
                    payload
                });

            if (error) console.error("Error saving recommendation:", error);
        },

        // Get latest specific type
        getLatest: async (userId: string, type: string) => {
            const { data } = await supabase
                .from('ai_recommendations')
                .select('*')
                .eq('user_id', userId)
                .eq('type', type)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();
            return data;
        }
    },

    analytics: {
        // Log user actvity
        logActivity: async (userId: string, action: string, metadata: any = {}) => {
            // Fire and forget - don't await strictly if not needed
            supabase.from('activity_logs').insert({
                user_id: userId,
                action,
                metadata
            }).then(({ error }) => {
                if (error) console.warn("Analytics log failed:", error);
            });
        }
    }
};
