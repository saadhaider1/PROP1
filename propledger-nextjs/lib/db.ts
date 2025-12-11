import mysql from 'mysql2/promise';

// MySQL connection pool configuration
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'propledger_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
});

export interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  user_type: 'investor' | 'property_owner' | 'agent' | 'developer';
  password_hash: string;
  newsletter_subscribed: boolean;
  wallet_address?: string;
  oauth_provider?: string;
  oauth_id?: string;
  profile_picture_url?: string;
  email_verified?: boolean;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
}

export interface Agent {
  id: number;
  user_id: number;
  license_number: string;
  experience: string;
  specialization: string;
  city: string;
  agency?: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  commission_rate?: number;
  total_sales?: number;
  rating?: number;
  created_at: Date;
  full_name?: string;
  email?: string;
}

export interface Message {
  id: number;
  user_id: number;
  manager_name: string;
  subject: string;
  message: string;
  priority: 'normal' | 'high' | 'urgent';
  status: 'unread' | 'read' | 'replied';
  sender_type: 'user' | 'agent';
  receiver_type: 'user' | 'agent';
  created_at: Date;
  replied_at?: Date;
  reply_message?: string;
}

export interface UserTokens {
  id: number;
  user_id: number;
  token_balance: number;
  total_purchased: number;
  total_spent: number;
  last_purchase_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface TokenTransaction {
  id: number;
  user_id: number;
  transaction_type: 'purchase' | 'spend' | 'refund';
  token_amount: number;
  pkr_amount: number;
  payment_method: string;
  payment_reference?: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  description?: string;
  created_at: Date;
  completed_at?: Date;
}

export interface PaymentMethod {
  id: number;
  method_name: string;
  display_name: string;
  is_active: boolean;
  processing_fee_percent: number;
  min_amount: number;
  max_amount: number;
  created_at: Date;
}

export interface UserSession {
  id: number;
  user_id: number;
  session_token: string;
  expires_at: Date;
  created_at: Date;
}

// Database query helpers
export const db = {
  // User queries
  async getUserByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.execute<any[]>(
      'SELECT * FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    return rows[0] || null;
  },

  async getUserById(id: number): Promise<User | null> {
    const [rows] = await pool.execute<any[]>(
      'SELECT * FROM users WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0] || null;
  },

  async createUser(data: {
    full_name: string;
    email: string;
    phone: string;
    country: string;
    user_type: string;
    password_hash: string;
    newsletter_subscribed: boolean;
    oauth_provider?: string;
    oauth_id?: string;
    profile_picture_url?: string;
    email_verified?: boolean;
  }): Promise<number> {
    const [result] = await pool.execute<any>(
      `INSERT INTO users (full_name, email, phone, country, user_type, password_hash, newsletter_subscribed, 
       oauth_provider, oauth_id, profile_picture_url, email_verified) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.full_name,
        data.email,
        data.phone,
        data.country,
        data.user_type,
        data.password_hash,
        data.newsletter_subscribed,
        data.oauth_provider || null,
        data.oauth_id || null,
        data.profile_picture_url || null,
        data.email_verified || false
      ]
    );
    return result.insertId;
  },

  // Session queries
  async createSession(userId: number, sessionToken: string, expiresAt: Date): Promise<void> {
    await pool.execute(
      'INSERT INTO user_sessions (user_id, session_token, expires_at) VALUES (?, ?, ?)',
      [userId, sessionToken, expiresAt]
    );
  },

  async getSessionByToken(token: string): Promise<(UserSession & { user: User }) | null> {
    const [rows] = await pool.execute<any[]>(
      `SELECT 
        s.id, s.user_id, s.session_token, s.expires_at, s.created_at,
        u.id as user_id, u.full_name, u.email, u.user_type, u.is_active
      FROM user_sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.session_token = ? 
        AND s.expires_at > NOW() 
        AND u.is_active = 1
      LIMIT 1`,
      [token]
    );

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      id: row.id,
      user_id: row.user_id,
      session_token: row.session_token,
      expires_at: row.expires_at,
      created_at: row.created_at,
      user: {
        id: row.user_id,
        full_name: row.full_name,
        email: row.email,
        user_type: row.user_type,
        is_active: row.is_active,
      } as User,
    };
  },

  async deleteSession(token: string): Promise<void> {
    await pool.execute('DELETE FROM user_sessions WHERE session_token = ?', [token]);
  },

  async deleteExpiredSessions(userId: number): Promise<void> {
    await pool.execute('DELETE FROM user_sessions WHERE user_id = ? AND expires_at < NOW()', [userId]);
  },

  async updateSessionExpiry(token: string, expiresAt: Date): Promise<void> {
    await pool.execute(
      'UPDATE user_sessions SET expires_at = ? WHERE session_token = ?',
      [expiresAt, token]
    );
  },

  // Agent queries
  async createAgent(data: {
    user_id: number;
    license_number: string;
    experience: string;
    specialization: string;
    city: string;
    agency?: string;
    phone: string;
  }): Promise<void> {
    await pool.execute(
      'INSERT INTO agents (user_id, license_number, experience, specialization, city, agency, phone, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [data.user_id, data.license_number, data.experience, data.specialization, data.city, data.agency || null, data.phone, 'approved']
    );
  },

  async getAgents(): Promise<Agent[]> {
    const [rows] = await pool.execute<any[]>(
      `SELECT 
        a.*,
        u.full_name,
        u.email
      FROM agents a
      JOIN users u ON a.user_id = u.id
      WHERE a.status IN ('approved', 'pending')
      ORDER BY a.status DESC, a.created_at DESC`
    );
    return rows;
  },

  async getAgentByUserId(userId: number): Promise<Agent | null> {
    const [rows] = await pool.execute<any[]>(
      'SELECT * FROM agents WHERE user_id = ? LIMIT 1',
      [userId]
    );
    return rows[0] || null;
  },

  // Message queries
  async createMessage(data: {
    user_id: number;
    manager_name: string;
    subject: string;
    message: string;
    priority: string;
    sender_type: string;
    receiver_type: string;
  }): Promise<number> {
    const [result] = await pool.execute<any>(
      'INSERT INTO manager_messages (user_id, manager_name, subject, message, priority, sender_type, receiver_type) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [data.user_id, data.manager_name, data.subject, data.message, data.priority, data.sender_type, data.receiver_type]
    );
    return result.insertId;
  },

  async getUserMessages(userId: number): Promise<Message[]> {
    const [rows] = await pool.execute<any[]>(
      'SELECT * FROM manager_messages WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  },

  async getAgentMessages(agentName: string): Promise<Message[]> {
    const [rows] = await pool.execute<any[]>(
      `SELECT m.*, u.full_name as user_name, u.email as user_email
      FROM manager_messages m
      JOIN users u ON m.user_id = u.id
      WHERE m.manager_name = ?
      ORDER BY m.created_at DESC`,
      [agentName]
    );
    return rows;
  },

  async updateMessageStatus(messageId: number, status: string): Promise<void> {
    await pool.execute(
      'UPDATE manager_messages SET status = ? WHERE id = ?',
      [status, messageId]
    );
  },

  async replyToMessage(messageId: number, replyMessage: string): Promise<void> {
    await pool.execute(
      'UPDATE manager_messages SET status = ?, reply_message = ?, replied_at = NOW() WHERE id = ?',
      ['replied', replyMessage, messageId]
    );
  },

  // Token queries
  async getUserTokens(userId: number): Promise<UserTokens | null> {
    const [rows] = await pool.execute<any[]>(
      'SELECT * FROM user_tokens WHERE user_id = ? LIMIT 1',
      [userId]
    );
    return rows[0] || null;
  },

  async createOrUpdateUserTokens(userId: number): Promise<UserTokens> {
    const [result] = await pool.execute<any>(
      `INSERT INTO user_tokens (user_id, token_balance, total_purchased, total_spent)
      VALUES (?, 0, 0, 0)
      ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP`,
      [userId]
    );

    // Fetch the record
    const [rows] = await pool.execute<any[]>(
      'SELECT * FROM user_tokens WHERE user_id = ? LIMIT 1',
      [userId]
    );
    return rows[0];
  },

  async createTokenTransaction(data: {
    user_id: number;
    transaction_type: string;
    token_amount: number;
    pkr_amount: number;
    payment_method: string;
    payment_reference?: string;
    description?: string;
  }): Promise<number> {
    const [result] = await pool.execute<any>(
      `INSERT INTO token_transactions (
        user_id, transaction_type, token_amount, pkr_amount, 
        payment_method, payment_reference, description, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.user_id,
        data.transaction_type,
        data.token_amount,
        data.pkr_amount,
        data.payment_method,
        data.payment_reference || '',
        data.description || '',
        'pending'
      ]
    );
    return result.insertId;
  },

  async updateTransactionStatus(transactionId: number, status: string, paymentReference?: string): Promise<void> {
    if (paymentReference) {
      await pool.execute(
        `UPDATE token_transactions 
        SET status = ?, 
            completed_at = CASE WHEN ? = 'completed' THEN NOW() ELSE completed_at END,
            payment_reference = ?
        WHERE id = ?`,
        [status, status, paymentReference, transactionId]
      );
    } else {
      await pool.execute(
        `UPDATE token_transactions 
        SET status = ?, 
            completed_at = CASE WHEN ? = 'completed' THEN NOW() ELSE completed_at END
        WHERE id = ?`,
        [status, status, transactionId]
      );
    }
  },

  async getUserTransactions(userId: number, limit: number = 20): Promise<TokenTransaction[]> {
    const [rows] = await pool.execute<any[]>(
      'SELECT * FROM token_transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT ?',
      [userId, limit]
    );
    return rows;
  },

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const [rows] = await pool.execute<any[]>(
      'SELECT * FROM payment_methods WHERE is_active = 1 ORDER BY method_name'
    );
    return rows;
  },

  async getTransactionById(transactionId: number): Promise<TokenTransaction | null> {
    const [rows] = await pool.execute<any[]>(
      'SELECT * FROM token_transactions WHERE id = ? LIMIT 1',
      [transactionId]
    );
    return rows[0] || null;
  },
};
