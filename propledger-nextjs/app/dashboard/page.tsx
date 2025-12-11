'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import TokenTransactions from '@/components/TokenTransactions';

interface User {
  id: number;
  name: string;
  email: string;
  type: string;
}

interface Message {
  id: number;
  manager_name: string;
  subject: string;
  message: string;
  priority: string;
  status: string;
  created_at: string;
  reply_message?: string;
  replied_at?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replyLoading, setReplyLoading] = useState(false);
  const [replyError, setReplyError] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user]);

  const fetchMessages = async () => {
    if (!user) return;

    setMessagesLoading(true);
    try {
      const response = await fetch(`http://localhost/PROPLEDGER/managers/get_messages.php?user_id=${user.id}`, {
        credentials: 'include',
      });
      const data = await response.json();

      if (data.success && data.messages) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleReply = async (msg: Message) => {
    if (!replyText.trim()) return;

    try {
      setReplyLoading(true);
      setReplyError('');

      const payload = {
        manager: msg.manager_name,
        subject: msg.subject.startsWith('Re:') ? msg.subject : `Re: ${msg.subject}`,
        message: replyText,
        priority: 'normal',
      };

      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setReplyingTo(null);
        setReplyText('');
        setReplyError('');
        await fetchMessages();
      } else {
        setReplyError(data.message || 'Failed to send reply');
      }
    } catch (error) {
      console.error('Reply send error:', error);
      setReplyError('Connection error. Failed to send reply.');
    } finally {
      setReplyLoading(false);
    }
  };

  const handleDelete = async (messageId: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch('http://localhost/PROPLEDGER/managers/delete_message.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ message_id: messageId }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchMessages();
      } else {
        alert(data.message || 'Failed to delete message');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Connection error. Please make sure XAMPP is running.');
    }
  };

  const checkAuth = async () => {
    try {
      // First check localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser({
          id: userData.id,
          name: userData.full_name || userData.name,
          email: userData.email,
          type: userData.user_type || userData.type
        });
        setLoading(false);
        return;
      }

      // If no localStorage, check PHP backend session
      const response = await fetch('http://localhost/PROPLEDGER/auth/check_session.php', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success && data.user) {
        // Store in localStorage for future use
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser({
          id: data.user.id,
          name: data.user.full_name || data.user.name,
          email: data.user.email,
          type: data.user.user_type || data.user.type
        });
      } else {
        console.log('No active session');
        router.push('/login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg-dark">
      <Navbar user={user} />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 mb-8 shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-md">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-white/90 drop-shadow-sm">
            Manage your investments and track your portfolio performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 border border-blue-500/20 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Total Investment</div>
            <div className="text-3xl font-bold text-white">₨ 0</div>
            <div className="text-green-400 text-sm mt-2">+0% this month</div>
          </div>
          <div className="bg-gray-800 border border-green-500/20 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">PROP Tokens</div>
            <div className="text-3xl font-bold text-white">0</div>
            <div className="text-gray-400 text-sm mt-2">1 PROP = ₨1,000</div>
          </div>
          <div className="bg-gray-800 border border-purple-500/20 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Properties Owned</div>
            <div className="text-3xl font-bold text-white">0</div>
            <div className="text-gray-400 text-sm mt-2">Active investments</div>
          </div>
          <div className="bg-gray-800 border border-yellow-500/20 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Total ROI</div>
            <div className="text-3xl font-bold text-white">0%</div>
            <div className="text-gray-400 text-sm mt-2">Lifetime returns</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`grid ${user?.type === 'agent' ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6 mb-8`}>
          {/* Only show Buy Tokens for non-agent users */}
          {user?.type !== 'agent' && (
            <Link href="/buy-tokens" className="bg-gray-800 border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/50 transition-colors cursor-pointer block">
              <div className="text-4xl mb-4">🪙</div>
              <h3 className="text-xl font-bold text-white mb-2">Buy Tokens</h3>
              <p className="text-gray-400 text-sm">Purchase PROP tokens to start investing</p>
            </Link>
          )}
          <Link href="/properties" className="bg-gray-800 border border-green-500/20 rounded-xl p-6 hover:border-green-500/50 transition-colors cursor-pointer block">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-xl font-bold text-white mb-2">Browse Properties</h3>
            <p className="text-gray-400 text-sm">Explore available investment opportunities</p>
          </Link>
          <Link href="/investments" className="bg-gray-800 border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-colors cursor-pointer block">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-2">Portfolio</h3>
            <p className="text-gray-400 text-sm">View your investment portfolio</p>
          </Link>
        </div>

        {/* Messages Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Messages from Portfolio Managers</h2>
            <button
              onClick={fetchMessages}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Refresh
            </button>
          </div>

          {messagesLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
              <p className="text-gray-400 mt-4">Loading messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-gray-400">No messages yet</p>
              <p className="text-gray-500 text-sm mt-2">Contact a portfolio manager to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`bg-gray-700 border ${msg.status === 'unread' ? 'border-teal-500' : 'border-gray-600'} rounded-lg p-4`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-bold">{msg.subject}</h3>
                      {msg.status === 'unread' && (
                        <span className="px-2 py-1 bg-teal-500 text-white text-xs rounded-full">New</span>
                      )}
                      {msg.status === 'replied' && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">Replied</span>
                      )}
                      {msg.priority === 'high' && (
                        <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">High Priority</span>
                      )}
                      {msg.priority === 'urgent' && (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">Urgent</span>
                      )}
                    </div>
                    <span className="text-gray-400 text-sm">{new Date(msg.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">To: {msg.manager_name}</p>
                  <p className="text-gray-300 mb-3">{msg.message}</p>

                  {msg.reply_message && (
                    <div className="mt-4 pl-4 border-l-4 border-teal-500 bg-gray-800 p-3 rounded">
                      <p className="text-teal-400 text-sm font-bold mb-1">Reply from {msg.manager_name}:</p>
                      <p className="text-gray-300">{msg.reply_message}</p>
                      {msg.replied_at && (
                        <p className="text-gray-500 text-xs mt-2">Replied on {new Date(msg.replied_at).toLocaleString()}</p>
                      )}
                    </div>
                  )}

                  {replyingTo === msg.id ? (
                    <div className="mt-4 space-y-3">
                      {replyError && (
                        <div className="text-red-400 text-sm">{replyError}</div>
                      )}
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply to this manager..."
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReply(msg)}
                          disabled={replyLoading || !replyText.trim()}
                          className="px-6 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                        >
                          {replyLoading ? 'Sending...' : 'Send Reply'}
                        </button>
                        <button
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyText('');
                            setReplyError('');
                          }}
                          className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-medium transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => {
                          setReplyingTo(msg.id);
                          setReplyText('');
                          setReplyError('');
                        }}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Reply
                      </button>
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Token Transactions */}
        <div className="mb-8">
          <TokenTransactions />
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-400">No recent activity</p>
            <p className="text-gray-500 text-sm mt-2">Start investing to see your activity here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
