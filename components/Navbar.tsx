import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Zap, LogOut, Shield, Compass, PlusCircle, LayoutDashboard, User, Info, Mail, Home } from 'lucide-react';
import { authClient } from '../lib/auth-client';

export default function Navbar() {
  const { user, signOut, refetch } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await signOut();
    navigate('/');
  };

  const handleSwitchAccount = async (role: 'admin' | 'user') => {
    setIsDropdownOpen(false);
    try {
      const email = role === 'admin' ? 'admin@voltdrive.com' : 'user@voltdrive.com';
      const password = role === 'admin' ? 'Admin123!' : 'User123!';
      const { error } = await authClient.signIn.email({
        email,
        password
      });
      if (error) {
        console.error('Failed to switch accounts:', error);
      } else {
        refetch();
        navigate('/');
      }
    } catch (err) {
      console.error('Error switching accounts:', err);
    }
  };

  const loggedOutLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/explore', label: 'Explore', icon: Compass },
    { to: '/about', label: 'About', icon: Info },
    { to: '/contact', label: 'Contact', icon: Mail },
    { to: '/login', label: 'Sign In', icon: User },
  ];

  const loggedInLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/explore', label: 'Explore', icon: Compass },
    { to: '/items/add', label: 'Add EV', icon: PlusCircle },
    { to: '/items/manage', label: 'Manage', icon: LayoutDashboard },
    { to: '/about', label: 'About', icon: Info },
    { to: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 glass border-b border-gray-800/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
            <div className="p-2 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-purple shadow-lg shadow-cyber-cyan/20 group-hover:scale-105 transition-transform duration-300">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              Volt<span className="text-gradient">Drive</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {!user ? (
              loggedOutLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center px-2.5 xl:px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyber-cyan/15 to-cyber-purple/15 border border-cyber-cyan/30 text-cyber-cyan'
                        : 'text-gray-400 hover:text-white border border-transparent'
                    }`
                  }
                >
                  <link.icon className="h-4 w-4 mr-2" />
                  {link.label}
                </NavLink>
              ))
            ) : (
              <>
                {loggedInLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center px-2.5 xl:px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-cyber-cyan/15 to-cyber-purple/15 border border-cyber-cyan/30 text-cyber-cyan'
                          : 'text-gray-400 hover:text-white border border-transparent'
                      }`
                    }
                  >
                    <link.icon className="h-4 w-4 mr-2" />
                    {link.label}
                  </NavLink>
                ))}
                
                {/* User Profile / Dropdown Switcher */}
                <div className="h-6 w-px bg-gray-800 mx-2" />
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-1.5 px-2 py-1 xl:px-3 xl:py-1.5 rounded-xl bg-gray-900 border border-gray-800 hover:bg-gray-800/80 hover:border-gray-700 transition-all duration-300 cursor-pointer focus:outline-none"
                  >
                    <User className="h-4 w-4 text-cyber-purple" />
                    <span className="text-sm font-medium text-gray-300">
                      {user.name.split(' ')[0]}
                    </span>
                    {user.role === 'admin' ? (
                      <span title="Admin User">
                        <Shield className="h-3.5 w-3.5 text-cyber-cyan ml-1" />
                      </span>
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-cyber-purple ml-1" />
                    )}
                  </button>

                  {isDropdownOpen && (
                    <>
                      {/* Click-outside backdrop */}
                      <div
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      {/* Dropdown Menu */}
                      <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-gray-800/60 bg-gray-950/95 p-4 shadow-xl z-50 animate-fadeIn backdrop-blur-md">
                        {/* User Details */}
                        <div className="flex items-center space-x-3 pb-3 border-b border-gray-900">
                          <div className="p-2 rounded-xl bg-gradient-to-br from-cyber-cyan/10 to-cyber-purple/10 border border-cyber-purple/20">
                            <User className="h-5 w-5 text-cyber-purple" />
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="text-sm font-semibold text-white truncate">{user.name}</h4>
                            <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                            <span className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              user.role === 'admin' 
                                ? 'bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan' 
                                : 'bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple'
                            }`}>
                              {user.role}
                            </span>
                          </div>
                        </div>

                        {/* Switch Accounts section */}
                        <div className="pt-3 pb-2 space-y-1.5">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-1 mb-1">
                            Switch Account
                          </p>
                          {user.role !== 'admin' ? (
                            <button
                              onClick={() => handleSwitchAccount('admin')}
                              className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl hover:bg-cyber-cyan/5 border border-transparent hover:border-cyber-cyan/20 text-left transition-all duration-200 cursor-pointer group"
                            >
                              <div>
                                <h5 className="text-xs font-bold text-gray-200 group-hover:text-cyber-cyan">System Admin</h5>
                                <p className="text-[10px] text-gray-500">admin@voltdrive.com</p>
                              </div>
                              <Shield className="h-3.5 w-3.5 text-gray-600 group-hover:text-cyber-cyan" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSwitchAccount('user')}
                              className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl hover:bg-cyber-purple/5 border border-transparent hover:border-cyber-purple/20 text-left transition-all duration-200 cursor-pointer group"
                            >
                              <div>
                                <h5 className="text-xs font-bold text-gray-200 group-hover:text-cyber-purple">Demo User</h5>
                                <p className="text-[10px] text-gray-500">user@voltdrive.com</p>
                              </div>
                              <User className="h-3.5 w-3.5 text-gray-600 group-hover:text-cyber-purple" />
                            </button>
                          )}
                        </div>

                        {/* Sign Out */}
                        <div className="pt-2 border-t border-gray-900">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-2.5 py-2 rounded-xl text-red-400 hover:bg-red-950/20 border border-transparent hover:border-red-900/30 text-xs font-semibold transition-all duration-200 cursor-pointer"
                          >
                            <LogOut className="h-3.5 w-3.5 mr-2" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Links */}
      {isOpen && (
        <div className="lg:hidden glass border-b border-gray-800/80 animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {!user ? (
              loggedOutLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyber-cyan/15 to-cyber-purple/15 text-cyber-cyan'
                        : 'text-gray-400 hover:text-white'
                    }`
                  }
                >
                  <link.icon className="h-5 w-5 mr-3" />
                  {link.label}
                </NavLink>
              ))
            ) : (
              <>
                {loggedInLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-cyber-cyan/15 to-cyber-purple/15 text-cyber-cyan'
                          : 'text-gray-400 hover:text-white'
                      }`
                    }
                  >
                    <link.icon className="h-5 w-5 mr-3" />
                    {link.label}
                  </NavLink>
                ))}
                
                <div className="h-px bg-gray-800 my-3 mx-4" />
                
                {/* User Info (Mobile) */}
                <div className="px-4 py-2 flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-cyber-purple" />
                      <div>
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center px-3 py-2 rounded-xl text-sm font-semibold border border-red-900/30 bg-red-950/20 text-red-400 cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                  
                  {/* Account Switcher on Mobile */}
                  <div className="pt-2 border-t border-gray-900/40">
                    {user.role !== 'admin' ? (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          handleSwitchAccount('admin');
                        }}
                        className="w-full flex items-center justify-center py-2 px-3 rounded-xl border border-cyber-cyan/20 bg-cyber-cyan/5 text-cyber-cyan text-xs font-bold hover:bg-cyber-cyan/15 hover:border-cyber-cyan/40 transition-all cursor-pointer"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Switch to Demo Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          handleSwitchAccount('user');
                        }}
                        className="w-full flex items-center justify-center py-2 px-3 rounded-xl border border-cyber-purple/20 bg-cyber-purple/5 text-cyber-purple text-xs font-bold hover:bg-cyber-purple/15 hover:border-cyber-purple/40 transition-all cursor-pointer"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Switch to Demo User
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
