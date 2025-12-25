import { createClient } from '@supabase/supabase-js'

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client for browser usage
export const createSupabaseClient = () => {
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase environment variables')
    }
    return createClient(supabaseUrl, supabaseAnonKey)
}

// Admin client with service role key (for server-side operations)
export const createSupabaseAdminClient = () => {
    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error('Missing Supabase environment variables')
    }
    return createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
}

// Database types
export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    full_name: string
                    email: string
                    phone: string
                    country: string
                    user_type: 'investor' | 'property_owner' | 'agent' | 'developer'
                    newsletter_subscribed: boolean
                    wallet_address: string | null
                    created_at: string
                    updated_at: string
                    is_active: boolean
                }
                Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['users']['Insert']>
            }
            agents: {
                Row: {
                    id: number
                    user_id: string
                    license_number: string
                    experience: string
                    specialization: string
                    city: string
                    agency: string | null
                    phone: string
                    status: 'pending' | 'approved' | 'rejected'
                    commission_rate: number | null
                    total_sales: number | null
                    rating: number | null
                    created_at: string
                }
                Insert: Omit<Database['public']['Tables']['agents']['Row'], 'id' | 'created_at'>
                Update: Partial<Database['public']['Tables']['agents']['Insert']>
            }
            properties: {
                Row: {
                    id: number
                    title: string
                    description: string | null
                    location: string
                    price: number
                    token_price: number
                    total_tokens: number
                    available_tokens: number
                    property_type: string
                    owner_id: string
                    image_url: string | null
                    created_at: string
                    updated_at: string
                    is_active: boolean
                }
                Insert: Omit<Database['public']['Tables']['properties']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['properties']['Insert']>
            }
            manager_messages: {
                Row: {
                    id: number
                    user_id: string
                    manager_name: string
                    subject: string
                    message: string
                    priority: 'normal' | 'high' | 'urgent'
                    status: 'unread' | 'read' | 'replied'
                    sender_type: 'user' | 'agent'
                    receiver_type: 'user' | 'agent'
                    created_at: string
                    replied_at: string | null
                    reply_message: string | null
                }
                Insert: Omit<Database['public']['Tables']['manager_messages']['Row'], 'id' | 'created_at'>
                Update: Partial<Database['public']['Tables']['manager_messages']['Insert']>
            }
            user_tokens: {
                Row: {
                    id: number
                    user_id: string
                    token_balance: number
                    total_purchased: number
                    total_spent: number
                    last_purchase_at: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['user_tokens']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['user_tokens']['Insert']>
            }
            token_transactions: {
                Row: {
                    id: number
                    user_id: string
                    transaction_type: 'purchase' | 'spend' | 'refund'
                    token_amount: number
                    pkr_amount: number
                    payment_method: string
                    payment_reference: string | null
                    status: 'pending' | 'completed' | 'failed' | 'cancelled'
                    description: string | null
                    created_at: string
                    completed_at: string | null
                }
                Insert: Omit<Database['public']['Tables']['token_transactions']['Row'], 'id' | 'created_at'>
                Update: Partial<Database['public']['Tables']['token_transactions']['Insert']>
            }
            payment_methods: {
                Row: {
                    id: number
                    method_name: string
                    display_name: string
                    is_active: boolean
                    processing_fee_percent: number
                    min_amount: number
                    max_amount: number
                    created_at: string
                }
                Insert: Omit<Database['public']['Tables']['payment_methods']['Row'], 'id' | 'created_at'>
                Update: Partial<Database['public']['Tables']['payment_methods']['Insert']>
            }
        }
    }
}
