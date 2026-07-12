import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authClient } from '../lib/auth-client';
import { Zap, Mail, Lock, User, Loader2, Award } from 'lucide-react';

export default function Register() {
  const { refetch } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMsg('All fields are required.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');

      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
        // Send custom role field
        role
      } as any);

      if (error) {
        setErrorMsg(error.message || 'Registration failed.');
      } else {
        refetch();
        navigate('/');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setErrorMsg('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative">
      <div className="radial-bg top-[25%] right-[20%]" />

      <div className="w-full max-w-md glass p-8 rounded-2xl border border-gray-800/40 relative z-10 space-y-6">
        {/* Brand/Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-cyber-cyan to-cyber-purple shadow-lg shadow-cyber-cyan/10 mb-2">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Create Account</h2>
          <p className="text-xs text-gray-400">Join the VoltDrive network to browse, add, and review EVs.</p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-3 bg-red-950/20 border border-red-900/30 text-red-400 text-xs rounded-xl text-center">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field pl-10"
              />
              <User className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="e.g. john@example.com"
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
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
              />
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Account Role</label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-field pl-10 appearance-none cursor-pointer"
              >
                <option value="user">Standard User</option>
                <option value="admin">System Administrator</option>
              </select>
              <Award className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
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
                Registering...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-cyber-cyan font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
