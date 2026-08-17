import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

import RevealOnScroll from '../components/RevealOnScroll';
import {
  Search,
  MapPin,
  Building,
  ShieldCheck,
  Award,
  Users,
  ChevronRight,
  Calculator,
  FileDown,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  Calendar,
  Layers,
  Star,
  Compass,
  Zap,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';

export default function Home() {
  const { projects, plots, submitInquiry } = useApp();
  const navigate = useNavigate();

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProjectSlug, setSelectedProjectSlug] = useState('');
  const [projectType, setProjectType] = useState('');
  const [location, setLocation] = useState('');
  const [plotSize, setPlotSize] = useState('');

  // Category filter state for Featured Projects
  const [activeCategory, setActiveCategory] = useState('All');

  // Background Cross-Fade Image Slideshow
  const [heroBgIndex, setHeroBgIndex] = useState(0);
  const heroImages = [
    '/tower-cover.png',
    '/hero-cover.png',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Installment Calculator State
  const [calcProject, setCalcProject] = useState('2');
  const [calcPlotSize, setCalcPlotSize] = useState('5.5 Marla');

  // Lead inquiry form state
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadLoading, setLeadLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedProjectSlug) {
      navigate(`/projects/${selectedProjectSlug}`);
      return;
    }
    let queryParams = [];
    if (searchTerm) queryParams.push(`search=${encodeURIComponent(searchTerm)}`);
    if (projectType) queryParams.push(`type=${encodeURIComponent(projectType)}`);
    if (location) queryParams.push(`location=${encodeURIComponent(location)}`);
    if (plotSize) queryParams.push(`size=${encodeURIComponent(plotSize)}`);

    navigate(`/projects?${queryParams.join('&')}`);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setLeadLoading(true);
    const res = await submitInquiry({
      name: leadForm.name,
      email: leadForm.email,
      phone: leadForm.phone,
      message: leadForm.message || 'Interested in plot booking and installment plan details.',
      project_id: parseInt(calcProject) || 2
    });
    setLeadLoading(false);
    if (res.success) {
      setLeadSuccess(true);
      setLeadForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setLeadSuccess(false), 5000);
    }
  };

  const statItems = [
    { icon: <Building className="w-6 h-6 text-brand-gold" />, value: '6+', label: 'Masterplanned Communities' },
    { icon: <Users className="w-6 h-6 text-brand-gold" />, value: '35K+', label: 'Verified Investors' },
    { icon: <Award className="w-6 h-6 text-brand-gold" />, value: '18+', label: 'Years of Corporate Trust' },
    { icon: <ShieldCheck className="w-6 h-6 text-brand-gold" />, value: '100%', label: 'RDA / RDA / NOC Approved' }
  ];

  // Moving Marquee project list
  const marqueeProjects = [
    'FAISAL TOWN PHASE I',
    'FAISAL TOWN PHASE II',
    'FAISAL HILLS TAXILA',
    'FAISAL JEWEL TOWER',
    'FAISAL MARGALLA CITY',
    'FAISAL RESIDENCIA',
    'MULTI GARDENS B-17'
  ];

  // Category filtering
  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Residential') return p.type === 'Residential';
    if (activeCategory === 'High-Rise') return p.type === 'High-Rise';
    if (activeCategory === 'Active') return p.status === 'Active Development';
    return true;
  });

  // Calculate installment values for calculator widget
  const selectedPlot = plots.find(
    (p) => String(p.project_id) === String(calcProject) && p.size.includes(calcPlotSize.split(' ')[0])
  ) || plots.find((p) => String(p.project_id) === String(calcProject)) || plots[0];

  const calcTotalPrice = selectedPlot ? selectedPlot.price : 2900000;
  const calcDownPayment = selectedPlot ? selectedPlot.down_payment : 580000;
  const calcMonthly = selectedPlot ? selectedPlot.monthly_installment : 40000;
  const calcMonths = selectedPlot ? selectedPlot.installment_months : 48;

  return (
    <div className="relative overflow-hidden bg-slate-50 text-slate-800">
      {/* HERO SECTION WITH HD BACKGROUND CROSS-FADE SLIDESHOW */}
      <section className="relative min-h-[88vh] lg:min-h-[92vh] pt-32 pb-16 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden">
        
        {/* Smooth Cross-Fade Background Images */}
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out transform scale-105 ${
              idx === heroBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('${img}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/60"></div>
          </div>
        ))}

        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl animate-pulse-glow"></div>

        {/* Hero Content with Image 6 Style Editorial Design */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-4 flex flex-col items-center justify-center">
          
          <RevealOnScroll animation="down" delay={100}>
            <span className="text-brand-gold text-xs uppercase tracking-[0.4em] font-extrabold mb-3 block drop-shadow-md">
              E S T . 2 0 1 3
            </span>
          </RevealOnScroll>

          <RevealOnScroll animation="up" delay={200}>
            <h1 className="text-3xl sm:text-6xl lg:text-8xl font-serif font-bold uppercase tracking-wider sm:tracking-widest text-white leading-none max-w-5xl mx-auto drop-shadow-2xl px-2">
              TRANSFORMING <br />
              <span className="text-slate-100 font-light">LIVES</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll animation="up" delay={300}>
            <div className="flex flex-col items-center space-y-4 mb-6">
              <Link
                to="/projects"
                className="inline-flex items-center space-x-2 text-white font-serif text-sm sm:text-base border-b-2 border-white/80 hover:border-brand-gold hover:text-brand-gold pb-1 tracking-wider uppercase transition-all duration-300 group"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>

              {/* Clickable Quick Project Name Shortcut Pills */}
              <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto pt-2">
                {projects.map((proj) => (
                  <Link
                    key={proj.id}
                    to={`/projects/${proj.slug}`}
                    className="px-3.5 py-1 bg-white/10 hover:bg-[#B89047] hover:text-slate-950 text-slate-200 border border-white/20 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md transition-all duration-300 shadow-md hover:scale-105"
                  >
                    {proj.name}
                  </Link>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Quick Glassmorphic Search Form */}
          <RevealOnScroll animation="zoom" delay={400}>
            <form
              onSubmit={handleSearch}
              className="mt-2 bg-brand-navy-light/85 backdrop-blur-xl p-4 sm:p-6 rounded-3xl border border-white/15 shadow-2xl max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 hover-glow-gold"
            >
              {/* Project Name Selector */}
              <div className="text-left">
                <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 pl-1">
                  Select Project Name
                </label>
                <select
                  value={selectedProjectSlug}
                  onChange={(e) => {
                    setSelectedProjectSlug(e.target.value);
                    if (e.target.value) {
                      navigate(`/projects/${e.target.value}`);
                    }
                  }}
                  className="w-full bg-white/10 border border-white/15 focus:border-brand-gold rounded-xl py-2.5 px-3 text-xs text-slate-200 focus:outline-none focus:text-white transition cursor-pointer font-semibold"
                >
                  <option value="" className="bg-brand-navy">Choose Project Name...</option>
                  {projects.map((proj) => (
                    <option key={proj.id} value={proj.slug} className="bg-brand-navy">
                      {proj.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-left">
                <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 pl-1">
                  Category
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full bg-white/10 border border-white/15 focus:border-brand-gold rounded-xl py-2.5 px-3 text-xs text-slate-200 focus:outline-none focus:text-white transition cursor-pointer"
                >
                  <option value="" className="bg-brand-navy">All Categories</option>
                  <option value="Residential" className="bg-brand-navy">Residential Societies</option>
                  <option value="High-Rise" className="bg-brand-navy">High-Rise Towers</option>
                </select>
              </div>

              <div className="text-left">
                <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 pl-1">
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-white/10 border border-white/15 focus:border-brand-gold rounded-xl py-2.5 px-3 text-xs text-slate-200 focus:outline-none focus:text-white transition cursor-pointer"
                >
                  <option value="" className="bg-brand-navy">All Locations</option>
                  <option value="Islamabad" className="bg-brand-navy">Islamabad</option>
                  <option value="Rawalpindi" className="bg-brand-navy">Rawalpindi</option>
                  <option value="Taxila" className="bg-brand-navy">Taxila</option>
                </select>
              </div>

              <div className="text-left">
                <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 pl-1">
                  Plot Size / Marla
                </label>
                <select
                  value={plotSize}
                  onChange={(e) => setPlotSize(e.target.value)}
                  className="w-full bg-white/10 border border-white/15 focus:border-brand-gold rounded-xl py-2.5 px-3 text-xs text-slate-200 focus:outline-none focus:text-white transition cursor-pointer"
                >
                  <option value="" className="bg-brand-navy">All Plot Sizes</option>
                  <option value="5 Marla" className="bg-brand-navy">5 Marla</option>
                  <option value="8 Marla" className="bg-brand-navy">8 Marla</option>
                  <option value="10 Marla" className="bg-brand-navy">10 Marla</option>
                  <option value="1 Kanal" className="bg-brand-navy">1 Kanal</option>
                  <option value="Commercial" className="bg-brand-navy">Commercial Units</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="btn-shine w-full gold-gradient hover:gold-gradient-hover text-brand-navy font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:scale-105 active:scale-95"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Ventures</span>
                </button>
              </div>
            </form>
          </RevealOnScroll>
        </div>
      </section>

      {/* INFINITE MOVING TEXT MARQUEE TICKER */}
      <div className="bg-brand-navy text-slate-200 py-4 border-t border-b border-brand-gold/30 overflow-hidden shadow-inner relative z-10">
        <div className="animate-marquee whitespace-nowrap flex items-center space-x-12">
          {[...marqueeProjects, ...marqueeProjects, ...marqueeProjects].map((item, index) => (
            <span key={index} className="flex items-center space-x-4 text-xs sm:text-sm font-bold tracking-widest uppercase">
              <span className="text-white hover:text-brand-gold transition duration-300 cursor-pointer">{item}</span>
              <Sparkles className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* STATS HIGHLIGHTS BANNER - CLEAN SPACING (NO OVERLAP) */}
      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 relative z-10">
        <RevealOnScroll animation="zoom" delay={150}>
          <div className="bg-brand-navy-light rounded-3xl border border-white/10 shadow-2xl grid grid-cols-2 md:grid-cols-4 p-6 sm:p-8 gap-6">
            {statItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center text-center space-y-2 border-r last:border-0 border-white/10 hover:-translate-y-2 transition-all duration-300 cursor-default group"
              >
                <div className="p-3 bg-white/5 rounded-2xl mb-1 group-hover:bg-brand-gold/20 group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </div>
                <span className="text-3xl font-extrabold text-white tracking-tight group-hover:text-brand-gold transition-colors duration-300">
                  {item.value}
                </span>
                <span className="text-xs text-slate-300 tracking-wide font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* IMAGE 3 & 4 STYLE ELEGANT TYPOGRAPHY BANNER SECTION */}
      <section className="py-16 bg-white border-t border-b border-slate-100 relative overflow-hidden">
        {/* Image 3 Style Centered Subtitle Header */}
        <div className="max-w-4xl mx-auto text-center px-4 mb-8">
          <div className="flex items-center justify-center space-x-6">
            <span className="h-[1px] w-16 bg-slate-300"></span>
            <span className="text-slate-600 font-serif tracking-[0.25em] text-sm uppercase">
              Building Tomorrow Together
            </span>
            <span className="h-[1px] w-16 bg-slate-300"></span>
          </div>
        </div>

        {/* Image 4 Style Editorial Statement with Watermark */}
        <div className="relative max-w-5xl mx-auto px-4 py-8 text-center flex items-center justify-center">
          {/* Background Faint Watermark Text */}
          <div className="absolute text-[6rem] sm:text-[9rem] lg:text-[11rem] font-serif font-bold uppercase tracking-widest text-slate-200/40 select-none pointer-events-none z-0">
            EXCELLENCE
          </div>

          {/* Foreground Editorial Quote */}
          <p className="relative z-10 text-xl sm:text-2xl lg:text-3xl font-serif text-slate-800 leading-relaxed font-normal max-w-4xl">
            FaisalTown Group is a trailblazer in Pakistan's real estate industry, setting benchmarks for innovation, quality, and excellence
          </p>
        </div>
      </section>

      {/* CHAIRMAN & LEADERSHIP VISION SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-5 relative min-h-[360px] lg:min-h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=80"
              alt="Chaudhry Abdul Majeed Chairman"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="bg-brand-gold text-brand-navy text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                Leadership Vision
              </span>
              <h4 className="text-xl font-bold mt-2">Chaudhry Abdul Majeed</h4>
              <p className="text-xs text-slate-300">Chairman & Managing Director, Faisal Town Group</p>
            </div>
          </div>

          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center space-y-6">
            <RevealOnScroll animation="right" delay={100}>
              <span className="text-brand-gold text-xs uppercase tracking-widest font-bold">
                Message From Chairman
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-dark uppercase tracking-tight leading-snug">
                Building Trust Through <span className="text-gold-gradient font-light">Uncompromising Quality</span>
              </h2>
              <blockquote className="border-l-4 border-brand-gold pl-4 text-slate-600 italic text-sm sm:text-base leading-relaxed">
                "Our single focus since day one has been to deliver fully legally approved masterplanned communities with high-velocity construction timelines, ensuring every investor's hard-earned capital turns into a high-yielding, secure legacy."
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-brand-gold transition duration-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-brand-navy">100% Approved NOCs</h5>
                    <p className="text-[11px] text-slate-500">All societies possess verified sanction approvals from local development authorities.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-brand-gold transition duration-300">
                  <Zap className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-brand-navy">Rapid Development Pace</h5>
                    <p className="text-[11px] text-slate-500">Heavy machinery deployed 24/7 for road carpeting, electrification, and sewerage lines.</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS WITH NEW PLOT CARD DESIGN (MATCHING IMAGE 2 EXACTLY) */}
      <section className="bg-slate-100/70 border-t border-b border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll animation="up" delay={100}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
              <div>
                <span className="text-brand-gold text-xs uppercase tracking-widest font-bold">Featured Portfolio</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy-dark uppercase mt-1">
                  Our Flagship Societies & Towers
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-2">
                  Explore master planned plots and high-rise luxury units available for booking.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 mt-4 md:mt-0 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
                {['All', 'Residential', 'High-Rise', 'Active'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl uppercase tracking-wider transition-all duration-300 ${
                      activeCategory === cat
                        ? 'bg-brand-navy text-white shadow-md'
                        : 'text-slate-600 hover:text-brand-navy hover:bg-slate-100'
                    }`}
                  >
                    {cat === 'All' ? 'All Ventures' : cat}
                  </button>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Projects Grid with NEW Card Design (Image 2 Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <RevealOnScroll key={project.id} animation="up" delay={idx * 150}>
                <div className="bg-white rounded-[2.2rem] overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between h-full group">
                  <div>
                    {/* Project Image Container with Image 2 Badges */}
                    <div className="relative h-64 overflow-hidden rounded-t-[2.2rem]">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                      {/* Top-Left Gold Category Badge (Image 2 Style) */}
                      <span className="absolute top-4 left-4 bg-[#B89047] text-slate-950 font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                        {project.type}
                      </span>

                      {/* Top-Right Status Pill (Image 2 Style) */}
                      <span
                        className={`absolute top-4 right-4 text-[10px] uppercase tracking-widest font-extrabold px-4 py-1.5 rounded-full text-white shadow-lg ${
                          project.status === 'Completed' ? 'bg-[#059669]' : 'bg-[#334155]'
                        }`}
                      >
                        {project.status}
                      </span>

                      {/* Bottom Image Overlay Details (Location & Area) */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                        <div className="flex items-center text-white/95 font-semibold drop-shadow-md">
                          <MapPin className="w-3.5 h-3.5 text-[#B89047] mr-1.5 shrink-0" />
                          <span className="line-clamp-1">{project.location.split(',')[0]}</span>
                        </div>
                        <span className="bg-slate-900/80 backdrop-blur-md text-white font-bold text-[11px] px-3 py-1 rounded-xl border border-white/10 shadow-sm">
                          {project.total_area}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-[#B89047] transition duration-300 leading-snug">
                        {project.name}
                      </h3>
                      <p className="text-slate-500 text-xs mt-3 leading-relaxed line-clamp-3 font-normal">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer (Image 2 Style) */}
                  <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">
                      Plans from <strong className="text-[#B89047] font-bold">20% Down</strong>
                    </span>
                    <Link
                      to={`/projects/${project.slug}`}
                      className="bg-[#0B132B] hover:bg-[#B89047] text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-6 rounded-full flex items-center space-x-1.5 transition-all duration-300 shadow-md group-hover:scale-105"
                    >
                      <span>EXPLORE</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE INSTALLMENT ESTIMATOR WIDGET */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll animation="zoom" delay={100}>
          <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="bg-brand-gold/20 text-brand-gold border border-brand-gold/40 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                Interactive Calculator
              </span>
              <h2 className="text-3xl font-extrabold uppercase tracking-tight leading-tight">
                Plan Your Property <span className="text-gold-gradient font-light">Investment</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Select your preferred society and plot size to instantly estimate your down payment and monthly installment schedules.
              </p>
              <div className="pt-2 flex items-center space-x-2 text-xs text-brand-gold font-bold">
                <Calculator className="w-4 h-4" />
                <span>No Hidden Charges • 100% Transparent Schedule</span>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-slate-300 font-bold uppercase tracking-wider mb-2">
                    Select Society
                  </label>
                  <select
                    value={calcProject}
                    onChange={(e) => setCalcProject(e.target.value)}
                    className="w-full bg-brand-navy border border-white/20 text-white text-xs rounded-xl p-3 focus:border-brand-gold focus:outline-none cursor-pointer"
                  >
                    <option value="1">Faisal Town (Phase I)</option>
                    <option value="2">Faisal Town (Phase II)</option>
                    <option value="3">Faisal Hills Taxila</option>
                    <option value="4">Faisal Jewel Tower</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-300 font-bold uppercase tracking-wider mb-2">
                    Select Category / Size
                  </label>
                  <select
                    value={calcPlotSize}
                    onChange={(e) => setCalcPlotSize(e.target.value)}
                    className="w-full bg-brand-navy border border-white/20 text-white text-xs rounded-xl p-3 focus:border-brand-gold focus:outline-none cursor-pointer"
                  >
                    <option value="5.5 Marla">5 / 5.5 Marla Residential</option>
                    <option value="8 Marla">8 / 10 Marla Residential</option>
                    <option value="1 Kanal">1 Kanal Luxury Residential</option>
                    <option value="Commercial">Commercial / Apartment Unit</option>
                  </select>
                </div>
              </div>

              {/* Calculated Outputs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-center">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Total Price</span>
                  <span className="text-sm sm:text-base font-extrabold text-brand-gold mt-1 block">
                    PKR {(calcTotalPrice / 100000).toFixed(2)} Lac
                  </span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Down Payment</span>
                  <span className="text-sm sm:text-base font-extrabold text-emerald-400 mt-1 block">
                    PKR {(calcDownPayment / 100000).toFixed(2)} Lac
                  </span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Monthly Installment</span>
                  <span className="text-sm sm:text-base font-extrabold text-white mt-1 block">
                    PKR {calcMonthly.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Duration</span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-300 mt-1 block">
                    {calcMonths} Months
                  </span>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* WHY INVEST WITH FAISAL TOWN GROUP */}
      <section className="bg-slate-100 py-20 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll animation="up" delay={100}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-brand-gold text-xs uppercase tracking-widest font-bold">Unmatched Standards</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-dark uppercase tracking-tight mt-1">
                Why Investors Choose Faisal Town Group
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Delivering world-class residential and commercial hubs engineered for high appreciation.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Compass className="w-8 h-8 text-brand-gold" />,
                title: 'Prime Motorway Interchange Access',
                desc: 'Strategic locations connected directly via M-1, M-2 Motorways, N-5 GT Road, and CPEC routes.'
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-brand-gold" />,
                title: '100% Legal Title & NOC Clearances',
                desc: 'Complete peace of mind with verified land ownership and sanction approvals from RDA, CDA & Local Tahsils.'
              },
              {
                icon: <Zap className="w-8 h-8 text-brand-gold" />,
                title: 'Underground Electrification & Utilities',
                desc: 'Clean aesthetic skylines featuring underground power grids, fiber internet, gas networks & water filtration.'
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-brand-gold" />,
                title: 'High Capital Return on Investment (ROI)',
                desc: 'Historical record of 35%+ annualized plot value appreciation across Faisal Town and Faisal Hills.'
              },
              {
                icon: <Building className="w-8 h-8 text-brand-gold" />,
                title: 'Commercial Arenas & Food Streets',
                desc: 'Dedicated high-rise plazas, retail centers, multiplexes, and international dining franchises.'
              },
              {
                icon: <Award className="w-8 h-8 text-brand-gold" />,
                title: '24/7 Gated Smart Security System',
                desc: 'CCTV surveillance, automated RFID entry gates, mobile response squads, and perimeter fencing.'
              }
            ].map((feature, i) => (
              <RevealOnScroll key={i} animation="up" delay={i * 120}>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group hover-glow-gold">
                  <div className="p-3 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-navy transition duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-gold transition duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 text-xs mt-3 leading-relaxed">{feature.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK INQUIRY & CALLBACK LEAD FORM */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll animation="up" delay={100}>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-5 bg-brand-navy p-8 sm:p-12 text-white flex flex-col justify-between">
              <div className="space-y-4">
                <span className="bg-brand-gold/20 text-brand-gold border border-brand-gold/40 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                  Quick Inquiry
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
                  Request a Dedicated Sales Callback
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Have questions regarding plot availability, map layout, or installment payment procedures? Submit your details for immediate assistance.
                </p>
              </div>

              <div className="space-y-4 mt-8 pt-8 border-t border-white/10 text-xs">
                <div className="flex items-center space-x-3">
                  <PhoneCall className="w-4 h-4 text-brand-gold" />
                  <span>UAN: +92 51 111 000 786</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-brand-gold" />
                  <span>Corporate Office: F-10 Markaz, Islamabad</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 p-8 sm:p-12 bg-white">
              {leadSuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-base">Inquiry Submitted Successfully!</h4>
                  <p className="text-xs text-emerald-700">
                    Our authorized sales consultant will contact you shortly with complete plot details.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        placeholder="e.g. Muhammad Ali"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:border-brand-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        placeholder="+92 300 0000000"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:border-brand-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:border-brand-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message / Plot Interest</label>
                    <textarea
                      rows={3}
                      value={leadForm.message}
                      onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                      placeholder="Specify project, block, or size requirement..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:border-brand-gold focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={leadLoading}
                    className="btn-shine w-full bg-brand-navy hover:bg-brand-gold hover:text-brand-navy text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition duration-300 shadow-lg hover:scale-102"
                  >
                    {leadLoading ? 'Submitting...' : 'Submit Booking Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}
