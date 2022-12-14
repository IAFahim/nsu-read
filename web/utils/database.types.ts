export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    updated_at: string | null
                    username: string | null
                    full_name: string | null
                    avatar_url: string | null
                    bio: string | null
                    location: string | null
                }
                Insert: {
                    id: string
                    updated_at?: string | null
                    username?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    website?: string | null
                }
                Update: {
                    id?: string
                    updated_at?: string | null
                    username?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    website?: string | null
                }
            }
            organizations: {
                Row: {
                    name: string
                    owner_id: string
                    created_at: string
                    updated_at: string | null
                    avatar_url: string | null
                    bio: string | null
                    location: string | null
                    website: string | null
                }
                Insert: {
                    name: string
                    owner_id: string
                    updated_at?: string | null
                    avatar_url?: string | null
                    bio?: string | null
                    location?: string | null
                    website?: string | null
                }
                Update: {
                    name?: string
                    owner_id?: string
                    updated_at?: string | null
                    avatar_url?: string | null
                    bio?: string | null
                    location?: string | null
                    website?: string | null
                }
            }
            projects: {
                Row: {
                    created_by: string
                    name: string
                    type: string
                    description: string | null
                }
            }
            groups: {
                Row: {
                    created_by: string
                    name: string
                    created_at: string
                    description: string | null
                }
            },
            group_members: {
                Row: {
                    created_by: string
                    group_name: string
                    member_name: string
                    role: string
                }
            }
            pdf_position:{
                Row: {
                    tick: number
                    created_by: string
                    project_name: string
                    reader: string
                    x: number
                    y: number
                }
            }
            questions: {
                Row: {
                    id: number
                    created_by: string
                    project_name: string
                    group_name: string
                    question: string
                    answer: string
                    type: string
                    created_at: string
                    updated_at: string | null
                }
            }
        }
        storage:{}
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}

