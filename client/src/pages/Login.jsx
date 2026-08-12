import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import RevealOnScroll from '../components/RevealOnScroll';
import { Shield, Key, Mail, User, Check, ArrowRight, Lock } from 'lucide-react';

export default function Login() {
  const { login, register, currentUser } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectUrl = searchParams.get('redirect') || '/dashboard';
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Sync tab with search params
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // If already logged in, redirect away
  useEffect(() => {
    if (currentUser) {
      navigate(redirectUrl);
    }
  }, [currentUser, navigate, redirectUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    if (activeTab === 'login') {
      const res = await login(email, password);
      setLoading(false);
      if (res.success) {
        navigate(redirectUrl);
      } else {
        setError(res.message);
      }
    } else {
      if (!name) {
        setError('Please enter your name');
        setLoading(false);
        return;
      }
      const res = await register(name, email, password);
      setLoading(false);
      if (res.success) {
        setSuccessMsg('Registration successful! Accessing member portal...');
        setTimeout(() => {
          navigate(redirectUrl);
        }, 1500);
      } else {
        setError(res.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      
      {/* LEFT COLUMN: Gilded Branding panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-navy relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark via-brand-navy to-transparent"></div>
        
        {/* Floating shapes */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-brand-gold/10 rounded-full blur-2xl"></div>
        
        {/* Faint Watermark Text */}
        <div className="absolute text-[9rem] font-serif font-bold uppercase tracking-widest text-white/5 select-none pointer-events-none z-0">
          PORTAL
        </div>

        <div className="relative z-10 max-w-lg space-y-6 text-white text-center">
          <RevealOnScroll animation="down" delay={100}>
            <span className="gold-gradient p-3.5 rounded-2xl text-white font-bold text-lg tracking-wider inline-flex shadow-lg mb-2">FT</span>
            <h2 className="text-3xl font-extrabold uppercase tracking-tight">FAISAL TOWN GROUP</h2>
          </RevealOnScroll>
          <RevealOnScroll animation="up" delay={200}>
            <p className="text-slate-300 text-sm leading-relaxed">
              Welcome to the official Member Portal. Track your plot installment payments, verify allotment status, request development site visits, and explore real-time inventory listings.
            </p>
          </RevealOnScroll>
          <RevealOnScroll animation="up" delay={300}>
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 text-xs">
              <div>
                <strong className="block text-brand-gold font-bold text-base mb-1">Instant</strong>
                <span className="text-slate-400">Plot Inquiries</span>
              </div>
              <div>
                <strong className="block text-brand-gold font-bold text-base mb-1">Online</strong>
                <span className="text-slate-400">Payment Logs</span>
              </div>
              <div>
                <strong className="block text-brand-gold font-bold text-base mb-1">NOC</strong>
                <span className="text-slate-400">Clear Records</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* RIGHT COLUMN: Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-20 pt-28">
        <RevealOnScroll animation="zoom" delay={100}>
          <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 shadow-xl space-y-6">
            
            {/* Tabs */}
            <div className="flex border-b border-slate-100 pb-1">
              <button
                onClick={() => { setActiveTab('login'); setError(''); }}
                className={`w-1/2 pb-3 text-xs font-extrabold uppercase tracking-wider text-center transition ${
                  activeTab === 'login' 
                    ? 'border-b-2 border-brand-gold text-brand-navy-dark' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setActiveTab('register'); setError(''); }}
                className={`w-1/2 pb-3 text-xs font-extrabold uppercase tracking-wider text-center transition ${
                  activeTab === 'register' 
                    ? 'border-b-2 border-brand-gold text-brand-navy-dark' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Register
              </button>
            </div>

            <h3 className="text-base font-extrabold text-brand-navy uppercase tracking-tight text-center">
              {activeTab === 'login' ? 'Access your Property Portfolio' : 'Create Member Account'}
            </h3>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl p-3.5 text-xs font-semibold">
                {error}
              </div>
            )}

            {successMsg && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl p-3.5 text-xs font-semibold">
                {successMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {activeTab === 'register' && (
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Your Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white rounded-xl py-3 pl-10 pr-4 text-xs text-brand-navy placeholder-slate-400 focus:outline-none transition"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white rounded-xl py-3 pl-10 pr-4 text-xs text-brand-navy placeholder-slate-400 focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white rounded-xl py-3 pl-10 pr-4 text-xs text-brand-navy placeholder-slate-400 focus:outline-none transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-shine w-full py-3.5 gold-gradient hover:gold-gradient-hover text-brand-navy font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg transition flex items-center justify-center space-x-2 hover:scale-102"
              >
                {loading ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>
                    <span>{activeTab === 'login' ? 'Log In' : 'Register Portal'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Default Credentials Hints Callout */}
            {activeTab === 'login' && (
              <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-2xl p-4 text-slate-700 text-xs space-y-2 mt-4">
                <strong className="block text-brand-navy text-[11px] font-extrabold uppercase tracking-wider">Demo Access Credentials:</strong>
                <div className="flex justify-between items-center bg-white/70 border border-slate-200/50 p-2.5 rounded-xl">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Admin Officer</span>
                    <code className="text-slate-800 text-[10px] font-bold">admin@faisaltown.com</code>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-slate-400 block uppercase">Password</span>
                    <code className="text-slate-800 text-[10px] font-bold">admin123</code>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-white/70 border border-slate-200/50 p-2.5 rounded-xl">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Standard User</span>
                    <code className="text-slate-800 text-[10px] font-bold">user@example.com</code>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-slate-400 block uppercase">Password</span>
                    <code className="text-slate-800 text-[10px] font-bold">user123</code>
                  </div>
                </div>
              </div>
            )}

          </div>
        </RevealOnScroll>
      </div>

    </div>
  );
}
