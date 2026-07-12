import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authClient } from '../lib/auth-client';
import { Zap, Mail, Lock, Shield, User, Loader2 } from 'lucide-react';

export default function Login() {
  const { refetch } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const redirectPath = searchParams.get('redirect') || '/';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');

      const { error } = await authClient.signIn.email({
        email,
        password
      });

      if (error) {
        setErrorMsg(error.message || 'Invalid email or password.');
      } else {
        // Refetch context state
        refetch();
        navigate(redirectPath);
      }
    } catch (err) {
      console.error('Sign-in error:', err);
      setErrorMsg('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const autofillDemo = (role: 'admin' | 'user') => {
    if (role === 'admin') {
      setEmail('admin@voltdrive.com');
      setPassword('Admin123!');
    } else {
      setEmail('user@voltdrive.com');
      setPassword('User123!');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative">
      <div className="radial-bg top-[20%] left-[30%]" />

      <div className="w-full max-w-md glass p-8 rounded-2xl border border-gray-800/40 relative z-10 space-y-6">
        {/* Brand/Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-cyber-cyan to-cyber-purple shadow-lg shadow-cyber-cyan/10 mb-2">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-xs text-gray-400">Sign in to list, review, and manage electric vehicles.</p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-3 bg-red-950/20 border border-red-900/30 text-red-400 text-xs rounded-xl text-center">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="e.g. admin@voltdrive.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
              />
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
              />
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo Autofills */}
        <div className="space-y-3 pt-4 border-t border-gray-900">
          <p className="text-center text-[10px] font-bold uppercase tracking-widest text-cyber-purple">
            Quick Demo Autofill
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => autofillDemo('admin')}
              className="flex items-center justify-center py-2.5 px-3 rounded-xl border border-cyber-cyan/20 bg-cyber-cyan/5 text-cyber-cyan text-xs font-bold hover:bg-cyber-cyan/15 hover:border-cyber-cyan/40 transition-all cursor-pointer"
            >
              <Shield className="h-4 w-4 mr-2" />
              Demo Admin
            </button>
            <button
              onClick={() => autofillDemo('user')}
              className="flex items-center justify-center py-2.5 px-3 rounded-xl border border-cyber-purple/20 bg-cyber-purple/5 text-cyber-purple text-xs font-bold hover:bg-cyber-purple/15 hover:border-cyber-purple/40 transition-all cursor-pointer"
            >
              <User className="h-4 w-4 mr-2" />
              Demo User
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-cyber-cyan font-semibold hover:underline">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}
