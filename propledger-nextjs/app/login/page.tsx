'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  const router = useRouter();
  const [loginType, setLoginType] = useState<'user' | 'agent'>('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGoogleLogin = async () => {
    setError('');
    setSuccess(false);
    setLoading(true);
    try {
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (err) {
      console.error('Google login error:', err);
      setError('Failed to connect with Google. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Use Next.js API route for authentication
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          loginType: loginType,
          remember: formData.remember,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store user data in localStorage for Next.js app
        localStorage.setItem('user', JSON.stringify(data.user));

        // Show success message
        setSuccess(true);

        // Smooth transition before redirect
        setTimeout(() => {
          // Redirect based on backend response
          if (data.redirect) {
            router.push(data.redirect);
          } else {
            // Fallback
            if (loginType === 'agent') {
              router.push('/agent-dashboard');
            } else {
              router.push('/dashboard');
            }
          }
        }, 1000);
      } else {
        setError(data.message || 'Invalid email or password. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Gloomy Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <div className="text-[20rem] font-black text-gray-100 tracking-wider transform -rotate-12 whitespace-nowrap">
          PROPLEDGER
        </div>
      </div>

      <Navbar />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-teal-500/20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Welcome Back</h2>

            {/* Blockchain Badge */}
            <div className="flex items-center justify-center gap-2 mb-6 px-4 py-2 bg-teal-50 rounded-lg border border-teal-200 w-fit mx-auto">
              <span>🔐</span>
              <span className="text-teal-600 text-sm font-medium">Secure Blockchain Login</span>
            </div>

            {/* Login Type Selection */}
            <div className="mb-6">
              <p className="text-gray-600 text-center mb-3">Select login type:</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setLoginType('user')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${loginType === 'user'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  👤 User Login
                </button>
                <button
                  type="button"
                  onClick={() => setLoginType('agent')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${loginType === 'agent'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  🏢 Agent Login
                </button>
              </div>
            </div>

            {/* OAuth Login - User Only */}
            {loginType === 'user' && (
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or connect with</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading || success}
                  className="mt-4 w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Connect with Google</span>
                </button>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center gap-3 animate-fadeIn">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-green-600 font-medium">Login Successful!</p>
                  <p className="text-green-600/80 text-sm">Redirecting to your dashboard...</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 bg-white text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="remember" className="text-gray-700 text-sm">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {loading ? 'Logging in...' : success ? 'Success!' : 'Login with Email'}
              </button>
            </form>

            {/* Links */}
            <div className="mt-6 text-center space-y-2">
              <p className="text-gray-600 text-sm">
                <Link href="/forgot-password" className="text-teal-600 hover:text-teal-700">
                  Forgot Password?
                </Link>
              </p>
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <Link href="/signup" className="text-teal-600 hover:text-teal-700 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
