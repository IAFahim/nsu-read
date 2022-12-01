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
            profiles: {
                Row: {
                    id: string
                    updated_at: string | null
                    username: string | null
                    full_name: string | null
                    avatar_url: string | null
                    bio: string | null
                    location: string | null
                    organization_name: string | null
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
                    id: string
                    name: string
                    type: string
                    description: string | null
                    users: string[] | null
                }
            }
            groups: {
                Row: {
                    id: string
                    name: string
                    description: string | null
                }
            }
        }
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

