import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Zap, LogOut, Shield, Compass, PlusCircle, LayoutDashboard, User, Info, Mail } from 'lucide-react';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const loggedOutLinks = [
    { to: '/', label: 'Home', icon: Zap },
    { to: '/explore', label: 'Explore', icon: Compass },
    { to: '/about', label: 'About', icon: Info },
    { to: '/contact', label: 'Contact', icon: Mail },
    { to: '/login', label: 'Sign In', icon: User },
  ];

  const loggedInLinks = [
    { to: '/', label: 'Home', icon: Zap },
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
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-purple shadow-lg shadow-cyber-cyan/20 group-hover:scale-105 transition-transform duration-300">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              Volt<span className="text-gradient">Drive</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {!user ? (
              loggedOutLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
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
                      `flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
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
                
                {/* User Profile / Logout */}
                <div className="h-6 w-px bg-gray-800 mx-2" />
                <div className="flex items-center space-x-3 pl-2">
                  <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gray-900 border border-gray-800">
                    <User className="h-4 w-4 text-cyber-purple" />
                    <span className="text-sm font-medium text-gray-300">
                      {user.name.split(' ')[0]}
                    </span>
                    {user.role === 'admin' && (
                      <span title="Admin User">
                        <Shield className="h-3.5 w-3.5 text-cyber-cyan ml-1" />
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2.5 rounded-xl bg-gray-950 border border-gray-850 hover:bg-red-950/20 hover:border-red-900/30 text-gray-400 hover:text-red-400 transition-all duration-300 cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="flex md:hidden">
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
        <div className="md:hidden glass border-b border-gray-800/80 animate-fadeIn">
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
                <div className="px-4 py-2 flex items-center justify-between">
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
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
