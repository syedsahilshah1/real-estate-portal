import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Menu, X, User, LogOut, ChevronDown, Shield, Home, Briefcase, Phone, Folder } from 'lucide-react';

export default function Navbar() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowDropdown(false);
  }, [location]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-350 px-4 sm:px-6 lg:px-8 ${
      isScrolled ? 'pt-4' : 'pt-6'
    }`}>
      <nav className={`max-w-7xl mx-auto z-50 transition-all duration-350 border ${
        isScrolled 
          ? 'bg-brand-navy/70 backdrop-blur-lg shadow-2xl rounded-full border-brand-gold/25 py-2 px-8 max-w-5xl' 
          : 'bg-brand-navy/85 backdrop-blur-md shadow-lg rounded-2xl border-white/10 py-4 px-8'
      }`}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="gold-gradient p-2.5 rounded-lg text-white font-bold tracking-wider flex items-center justify-center shadow-md">
              FT
            </span>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-brand-gold-light transition">
                FAISAL <span className="text-brand-gold font-normal">TOWN</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-[0.2em] uppercase -mt-1">
                Group Ventures
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium tracking-wide transition-all duration-300 relative pb-1.5 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-brand-gold after:transition-all after:duration-300 ${
                isActive('/') 
                  ? 'text-brand-gold font-bold after:w-full' 
                  : 'text-slate-300 hover:text-white after:w-0 hover:after:w-full'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/projects" 
              className={`text-sm font-medium tracking-wide transition-all duration-300 relative pb-1.5 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-brand-gold after:transition-all after:duration-300 ${
                isActive('/projects') 
                  ? 'text-brand-gold font-bold after:w-full' 
                  : 'text-slate-300 hover:text-white after:w-0 hover:after:w-full'
              }`}
            >
              Projects
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium tracking-wide transition-all duration-300 relative pb-1.5 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-brand-gold after:transition-all after:duration-300 ${
                isActive('/contact') 
                  ? 'text-brand-gold font-bold after:w-full' 
                  : 'text-slate-300 hover:text-white after:w-0 hover:after:w-full'
              }`}
            >
              Contact Us
            </Link>

            {currentUser ? (
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-slate-200 hover:text-white focus:outline-none focus:ring-0 bg-white/5 hover:bg-white/10 py-1.5 px-3.5 rounded-full border border-white/10 transition-all duration-350 hover:scale-[1.03] hover:shadow-lg hover:shadow-brand-gold/5"
                >
                  <User className="w-4 h-4 text-brand-gold" />
                  <span className="text-sm font-medium">{currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2.5 w-52 bg-brand-navy-light border border-white/10 rounded-xl shadow-xl py-1.5 z-50 animate-fade-in">
                    {currentUser.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-brand-gold hover:translate-x-1.5 transition-all duration-200"
                      >
                        <Shield className="w-4 h-4 mr-2 text-brand-gold" />
                        Admin Panel
                      </Link>
                    )}
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-brand-gold hover:translate-x-1.5 transition-all duration-200"
                    >
                      <Folder className="w-4 h-4 mr-2 text-brand-gold" />
                      Member Portal
                    </Link>
                    <hr className="border-white/10 my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:translate-x-1.5 transition-all duration-200 text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-sm font-medium text-slate-300 hover:text-white hover:scale-105 transition-all duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/login?tab=register" 
                  className="gold-gradient hover:gold-gradient-hover text-brand-navy font-bold text-xs uppercase tracking-wider py-2 px-5 rounded-lg shadow-md hover:scale-105 hover:shadow-brand-gold/20 transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-navy border-b border-white/10 px-4 pt-2 pb-6 space-y-3 shadow-2xl animate-fade-in">
          <Link 
            to="/" 
            className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
              isActive('/') ? 'bg-white/5 text-brand-gold' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/projects" 
            className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
              isActive('/projects') ? 'bg-white/5 text-brand-gold' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            Projects
          </Link>
          <Link 
            to="/contact" 
            className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
              isActive('/contact') ? 'bg-white/5 text-brand-gold' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            Contact Us
          </Link>

          <hr className="border-white/10 my-2" />

          {currentUser ? (
            <div className="space-y-1">
              <div className="px-3 py-2 text-sm text-slate-400">
                Logged in as: <strong className="text-white">{currentUser.name}</strong>
              </div>
              {currentUser.role === 'admin' && (
                <Link
                  to="/admin"
                  className="flex items-center px-3 py-2 text-base font-medium text-slate-300 hover:bg-white/5 hover:text-brand-gold"
                >
                  <Shield className="w-4 h-4 mr-2.5 text-brand-gold" />
                  Admin Panel
                </Link>
              )}
              <Link
                to="/dashboard"
                className="flex items-center px-3 py-2 text-base font-medium text-slate-300 hover:bg-white/5 hover:text-brand-gold"
              >
                <Folder className="w-4 h-4 mr-2.5 text-brand-gold" />
                Member Portal
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2.5 text-base font-medium text-red-400 hover:bg-red-500/10 rounded-lg text-left"
              >
                <LogOut className="w-4 h-4 mr-2.5" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 px-3 pt-2">
              <Link 
                to="/login" 
                className="text-center py-2.5 border border-white/20 rounded-lg text-slate-300 hover:text-white font-medium text-sm transition"
              >
                Login
              </Link>
              <Link 
                to="/login?tab=register" 
                className="text-center py-2.5 gold-gradient hover:gold-gradient-hover text-brand-navy font-bold rounded-lg text-sm shadow-md transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
      </nav>
    </div>
  );
}
