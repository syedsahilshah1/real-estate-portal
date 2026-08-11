import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Search, MapPin, Building, ShieldCheck, Award, Users, ChevronRight, Calculator, FileDown } from 'lucide-react';

export default function Home() {
  const { projects } = useApp();
  const navigate = useNavigate();
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [projectType, setProjectType] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    let queryParams = [];
    if (searchTerm) queryParams.push(`search=${encodeURIComponent(searchTerm)}`);
    if (projectType) queryParams.push(`type=${encodeURIComponent(projectType)}`);
    if (location) queryParams.push(`location=${encodeURIComponent(location)}`);
    
    navigate(`/projects?${queryParams.join('&')}`);
  };

  const statItems = [
    { icon: <Building className="w-6 h-6 text-brand-gold" />, value: '6+', label: 'Masterplanned Communities' },
    { icon: <Users className="w-6 h-6 text-brand-gold" />, value: '25K+', label: 'Verified Investors' },
    { icon: <Award className="w-6 h-6 text-brand-gold" />, value: '15+', label: 'Years of Excellence' },
    { icon: <ShieldCheck className="w-6 h-6 text-brand-gold" />, value: '100%', label: 'Approved NOCs' }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative min-h-[90vh] lg:h-[95vh] pt-32 pb-24 lg:pt-36 lg:pb-28 flex items-center justify-center overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-dark/95 via-brand-navy/90 to-brand-navy-light/80"></div>
        </div>

        {/* Floating background decorative details */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-12">
          <span className="inline-flex items-center space-x-2 bg-brand-gold/10 border border-brand-gold/25 px-4 py-1.5 rounded-full text-brand-gold text-xs uppercase tracking-widest font-bold mb-6 animate-pulse">
            <span>✦ Leading Corporate Developer in Pakistan ✦</span>
          </span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight uppercase max-w-5xl mx-auto">
            Shaping Premium Lifestyles, <br />
            <span className="text-gold-gradient font-light">Securing Strong Futures</span>
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            Faisal Town Group builds communities featuring underground electrification, lush green reserves, high-grade security, and unmatched investment potential.
          </p>

          {/* Quick Search Form */}
          <form onSubmit={handleSearch} className="mt-12 bg-brand-navy-light/85 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/10 shadow-2xl max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="relative">
              <label className="block text-left text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 pl-1">Project Name</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g. Faisal Hills"
                  className="w-full bg-white/5 border border-white/10 focus:border-brand-gold rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-left text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 pl-1">Project Type</label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-brand-gold rounded-xl py-2 px-3 text-xs text-slate-300 focus:outline-none focus:text-white transition cursor-pointer"
              >
                <option value="" className="bg-brand-navy">All Categories</option>
                <option value="Residential" className="bg-brand-navy">Residential Communities</option>
                <option value="High-Rise" className="bg-brand-navy">High-Rise Landmarks</option>
              </select>
            </div>

            <div>
              <label className="block text-left text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 pl-1">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-brand-gold rounded-xl py-2 px-3 text-xs text-slate-300 focus:outline-none focus:text-white transition cursor-pointer"
              >
                <option value="" className="bg-brand-navy">All Locations</option>
                <option value="Islamabad" className="bg-brand-navy">Islamabad</option>
                <option value="Rawalpindi" className="bg-brand-navy">Rawalpindi</option>
                <option value="Taxila" className="bg-brand-navy">Taxila</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full gold-gradient hover:gold-gradient-hover text-brand-navy font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition flex items-center justify-center space-x-2 shadow-lg hover:scale-105 active:scale-95"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Projects</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Stats Counter Section */}
      <section className="relative z-20 mt-8 sm:mt-12 lg:mt-16 max-w-6xl mx-auto px-4">
        <div className="bg-brand-navy-light/95 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl grid grid-cols-2 md:grid-cols-4 p-6 sm:p-8 gap-6 sm:gap-8">
          {statItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center space-y-2 border-r last:border-0 border-white/10 hover:-translate-y-1.5 transition-all duration-350 cursor-default group">
              <div className="p-2 bg-white/5 rounded-lg mb-1 group-hover:bg-brand-gold/15 transition-colors duration-300">{item.icon}</div>
              <span className="text-3xl font-extrabold text-white tracking-tight group-hover:text-brand-gold transition-colors duration-300">{item.value}</span>
              <span className="text-xs text-slate-400 tracking-wide">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-brand-gold text-xs uppercase tracking-widest font-bold">Featured Ventures</span>
            <h2 className="text-3xl font-bold tracking-tight text-brand-navy-dark uppercase mt-1">Our Prestigious Societies</h2>
            <p className="text-sm text-slate-500 mt-2">Invest in fully approved projects with premium infrastructure development.</p>
          </div>
          <Link to="/projects" className="flex items-center text-brand-gold hover:text-brand-gold-dark text-sm font-bold uppercase tracking-wider mt-4 md:mt-0 transition group">
            <span>View All Communities</span>
            <ChevronRight className="w-4 h-4 ml-1 transition group-hover:translate-x-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between">
              <div>
                {/* Project Image */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 bg-brand-gold text-brand-navy font-extrabold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    {project.type}
                  </span>

                  <span className={`absolute top-4 right-4 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full text-white shadow-md ${
                    project.status === 'Completed' ? 'bg-emerald-600' : 'bg-brand-navy-slate'
                  }`}>
                    {project.status}
                  </span>

                  <div className="absolute bottom-4 left-4 flex items-center text-white text-xs">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold mr-1.5 shrink-0" />
                    <span className="font-medium line-clamp-1">{project.location.split(',')[0]}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-gold transition duration-300 leading-snug">{project.name}</h3>
                  <p className="text-slate-500 text-xs mt-3 leading-relaxed line-clamp-3">{project.description}</p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">Area: <strong>{project.total_area}</strong></span>
                <Link
                  to={`/projects/${project.slug}`}
                  className="bg-brand-navy hover:bg-brand-gold hover:text-brand-navy text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4.5 rounded-lg hover:scale-105 transition-all duration-300 shadow-md"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Corporate Section */}
      <section className="bg-slate-100 border-t border-b border-slate-200 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Visual Collage */}
          <div className="relative">
            <div className="h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80"
                alt="Development progress"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-60 h-44 bg-brand-navy rounded-2xl overflow-hidden border-4 border-white shadow-2xl hidden sm:block">
              <img
                src="https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=400&q=80"
                alt="Architect planning"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Corporate Info */}
          <div className="space-y-6">
            <span className="text-brand-gold text-xs uppercase tracking-widest font-bold">About the Group</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-dark uppercase tracking-tight">
              A Legacy of Quality, Speed, <span className="text-gold-gradient font-light">and Transparency</span>
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Faisal Town Group has set new benchmarks in real estate development in Pakistan. With state-of-the-art construction machinery, experienced civil engineers, and masterplanners, we develop communities that blend modern design with sustainable green environments.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our projects feature commercial arenas, healthcare complexes, international standard educational institutions, secure gated boundaries, and round-the-clock patrol security officers. We ensure clear title deeds and prompt NOC approvals.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200">
                <Calculator className="w-4 h-4 text-brand-gold" />
                <span className="text-xs font-semibold text-slate-700">Online Installment Tracking</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200">
                <FileDown className="w-4 h-4 text-brand-gold" />
                <span className="text-xs font-semibold text-slate-700">Download Challans & Maps</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Call To Action */}
      <section className="bg-brand-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B89047_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 space-y-6">
          <h2 className="text-3xl font-extrabold uppercase tracking-tight">Become a Faisal Town Group Member</h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Create an account in our online member portal to secure priority plot requests, track payments, download NOC maps, and manage your property portfolio.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link to="/login?tab=register" className="w-full sm:w-auto px-8 py-3.5 gold-gradient hover:gold-gradient-hover text-brand-navy font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg transition">
              Create Account
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-3.5 border border-white/20 hover:bg-white/5 font-bold text-xs uppercase tracking-wider rounded-lg transition">
              Log In to Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
