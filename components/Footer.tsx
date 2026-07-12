import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Phone, MapPin, Send, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="glass border-t border-gray-900 bg-cyber-bg/95 relative z-10 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand block */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-purple shadow-lg shadow-cyber-cyan/10">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Volt<span className="text-gradient">Drive</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience the next generation of premium electric mobility. Discover range benchmarks, speed analytics, and track-ready specs.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all duration-300">
                <Github className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all duration-300">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all duration-300">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-cyber-cyan transition-colors duration-300">Home Landing</Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-cyber-cyan transition-colors duration-300">EV Marketplace</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-cyber-cyan transition-colors duration-300">Account Access</Link>
              </li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Company Info</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/about" className="hover:text-cyber-cyan transition-colors duration-300">About Our Mission</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyber-cyan transition-colors duration-300">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Contacts & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase">Stay Updated</h3>
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-4 pr-12 py-2.5 rounded-xl bg-gray-950/60 border border-gray-800 text-cyber-text text-sm focus:outline-none focus:border-cyber-cyan"
              />
              <button
                type="submit"
                className="absolute right-1.5 p-1.5 rounded-lg bg-cyber-purple hover:bg-cyber-cyan text-white hover:text-cyber-bg transition-colors duration-300 cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-cyber-cyan text-xs font-semibold animate-pulse">
                ✓ Successfully subscribed! Check your inbox.
              </p>
            )}
            
            <div className="space-y-2.5 text-xs text-gray-400 pt-2 border-t border-gray-850">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-cyber-purple shrink-0" />
                <span>100 Tesla Road, Austin, TX 78725</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-cyber-purple shrink-0" />
                <span>+1 (512) 555-0199</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Base */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>© 2026 VoltDrive Inc. Built for performance.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-cyber-cyan">Privacy Policy</a>
            <a href="#" className="hover:text-cyber-cyan">Terms of Service</a>
            <a href="#" className="hover:text-cyber-cyan">Status Board</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
