'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';

export default function SignupPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [userType, setUserType] = useState<'investor' | 'agent'>('investor');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    password: '',
    confirmPassword: '',
    // Agent-specific fields
    licenseNumber: '',
    experience: '',
    specialization: '',
    agency: '',
    // Agreements
    terms: false,
    agreeAgent: false,
    newsletter: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOAuthSignup, setIsOAuthSignup] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      console.log('Session updated with user:', session.user);
      console.log('Is existing user:', (session as any).isExistingUser);

      // If this is an existing user who logged in with OAuth, redirect to dashboard
      if ((session as any).isExistingUser === true) {
        console.log('Existing OAuth user - redirecting to dashboard');
        router.push('/dashboard');
        return;
      }

      // New OAuth user - auto-fill form with Google data
      setIsOAuthSignup(true);
      setFormData((prev) => ({
        ...prev,
        fullName: session.user?.name || '',
        email: session.user?.email || '',
        country: 'Pakistan', // Default to Pakistan
        // Auto-accept terms for Google signup
        terms: true,
      }));
      setLoading(false); // Stop loading once form is filled
    }
  }, [session?.user?.email, (session as any)?.isExistingUser, router]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signIn('google', {
        redirect: false,
        callbackUrl: '/signup'
      });

      if (result?.error) {
        setError(`Google sign-in failed: ${result.error}`);
        setLoading(false);
        return;
      }

      if (result?.ok) {
        // Google signin successful, form will be filled by useEffect via session
        console.log('Google signin successful, waiting for session to update...');
        // Loading will be set to false in useEffect
      }
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError('Failed to sign in with Google. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate all required fields
    if (!formData.fullName) {
      setError('Full name is required');
      return;
    }
    if (!formData.email) {
      setError('Email is required');
      return;
    }
    if (!formData.phone) {
      setError('Phone number is required');
      return;
    }
    if (!formData.password) {
      setError('Password is required');
      return;
    }

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (userType === 'investor' && !formData.country) {
      setError('Country is required');
      return;
    }

    if (userType === 'investor' && !formData.terms) {
      setError('You must accept the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      // Use Next.js API route for signup
      const payload: any = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        userType: userType,
      };

      // Add type-specific fields
      if (userType === 'agent') {
        payload.city = formData.city;
        payload.licenseNumber = formData.licenseNumber;
        payload.experience = formData.experience;
        payload.specialization = formData.specialization;
        payload.agency = formData.agency;
        payload.agreeAgent = formData.agreeAgent;
      } else {
        payload.country = formData.country;
        payload.terms = formData.terms;
        payload.newsletter = formData.newsletter;
      }

      // Add OAuth info if this is an OAuth signup
      if (isOAuthSignup && session) {
        payload.oauthProvider = (session as any).oauthProvider || 'google';
        payload.oauthId = (session as any).oauthId;
        payload.profilePictureUrl = session.user?.image;
        payload.emailVerified = true;
      }

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Signup response:', data);

      if (data.success) {
        // Account created successfully - redirect to login page
        router.push('/login');
      } else {
        setError(data.message || 'Signup failed');
        if (data.debug) {
          console.error('Debug info:', data.debug);
        }
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(`Connection error: ${err.message}. Please try again.`);
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
        <div className="max-w-2xl mx-auto">
          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-teal-500/20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Create Account</h2>

            {/* Blockchain Badge */}
            <div className="flex items-center justify-center gap-2 mb-6 px-4 py-2 bg-teal-50 rounded-lg border border-teal-200 w-fit mx-auto">
              <span>⛓️</span>
              <span className="text-teal-600 text-sm font-medium">Blockchain-Secured Registration</span>
            </div>

            {/* User Type Selection */}
            <div className="mb-6">
              <p className="text-gray-600 text-center mb-3">I want to register as:</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setUserType('investor')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${userType === 'investor'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  👤 User
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('agent')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${userType === 'agent'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  🏢 Agent
                </button>
              </div>
            </div>

            {/* OAuth Section - Only show for Investors */}
            {userType === 'investor' && (
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
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
                  <span>Sign up with Google</span>
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Common Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-gray-700 mb-2 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                    Email Address *
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
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                    placeholder="+92 300 1234567"
                  />
                </div>

                <div>
                  <label htmlFor={userType === 'agent' ? 'city' : 'country'} className="block text-gray-700 mb-2 font-medium">
                    {userType === 'agent' ? 'City' : 'Country'} *
                  </label>
                  <input
                    type="text"
                    id={userType === 'agent' ? 'city' : 'country'}
                    value={userType === 'agent' ? formData.city : formData.country}
                    onChange={(e) => setFormData({
                      ...formData,
                      [userType === 'agent' ? 'city' : 'country']: e.target.value
                    })}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                    placeholder={userType === 'agent' ? 'Islamabad' : 'Pakistan'}
                  />
                </div>
              </div>

              {/* Agent-specific Fields */}
              {userType === 'agent' && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="licenseNumber" className="block text-gray-700 mb-2 font-medium">
                        License Number *
                      </label>
                      <input
                        type="text"
                        id="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                        required={userType === 'agent'}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                        placeholder="ABC-12345"
                      />
                    </div>

                    <div>
                      <label htmlFor="experience" className="block text-gray-700 mb-2 font-medium">
                        Experience *
                      </label>
                      <select
                        id="experience"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        required={userType === 'agent'}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                      >
                        <option value="">Select experience</option>
                        <option value="0-2 years">0-2 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5-10 years">5-10 years</option>
                        <option value="10+ years">10+ years</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="specialization" className="block text-gray-700 mb-2 font-medium">
                        Specialization *
                      </label>
                      <input
                        type="text"
                        id="specialization"
                        value={formData.specialization}
                        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                        required={userType === 'agent'}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                        placeholder="Residential, Commercial, etc."
                      />
                    </div>

                    <div>
                      <label htmlFor="agency" className="block text-gray-700 mb-2 font-medium">
                        Agency (Optional)
                      </label>
                      <input
                        type="text"
                        id="agency"
                        value={formData.agency}
                        onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                        placeholder="Your Agency Name"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Password Fields - Always required */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">
                    Password *
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
                  <p className="text-gray-500 text-xs mt-1">Minimum 8 characters</p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-gray-700 mb-2 font-medium">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Google Signup Info */}
              {isOAuthSignup && session?.user && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-sm flex items-center gap-2">
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
                    Signing up with Google as <strong>{session.user.email}</strong>
                  </p>
                  <p className="text-green-600 text-xs mt-1">✓ Name and email auto-filled. Please complete the remaining fields.</p>
                </div>
              )}

              {/* Agreements */}              {/* Agreements */}
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id={userType === 'agent' ? 'agreeAgent' : 'terms'}
                    checked={userType === 'agent' ? formData.agreeAgent : formData.terms}
                    onChange={(e) => setFormData({
                      ...formData,
                      [userType === 'agent' ? 'agreeAgent' : 'terms']: e.target.checked
                    })}
                    required
                    className="w-4 h-4 mt-1 rounded border-gray-300 bg-white text-teal-600 focus:ring-teal-500"
                  />
                  <label htmlFor={userType === 'agent' ? 'agreeAgent' : 'terms'} className="text-gray-700 text-sm">
                    {userType === 'agent'
                      ? 'I agree to the agent guidelines and code of conduct'
                      : 'I accept the terms and conditions'}
                  </label>
                </div>

                {userType === 'investor' && (
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="newsletter"
                      checked={formData.newsletter}
                      onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                      className="w-4 h-4 mt-1 rounded border-gray-300 bg-white text-teal-600 focus:ring-teal-500"
                    />
                    <label htmlFor="newsletter" className="text-gray-700 text-sm">
                      Subscribe to newsletter for investment opportunities
                    </label>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Links */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-teal-600 hover:text-teal-700 font-medium">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
