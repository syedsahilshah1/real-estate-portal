import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import RevealOnScroll from '../components/RevealOnScroll';
import { Search, MapPin, Building2, SlidersHorizontal, ArrowUpDown, ArrowUpRight } from 'lucide-react';

export default function Projects() {
  const { projects } = useApp();
  const routerLocation = useLocation();
  const navigate = useNavigate();

  // Search/Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  // Read query params on load
  useEffect(() => {
    const params = new URLSearchParams(routerLocation.search);
    const search = params.get('search');
    const type = params.get('type');
    const loc = params.get('location');
    const size = params.get('size');

    if (search) setSearchTerm(search);
    if (type) setSelectedType(type);
    if (loc) setSelectedLocation(loc);
    if (size) setSelectedSize(size);
  }, [routerLocation.search]);

  // Extract unique locations for the filter list
  const uniqueLocations = ['All', ...new Set(projects.map(p => {
    const parts = p.location.split(',');
    return parts[parts.length - 2]?.trim() || parts[parts.length - 1]?.trim() || p.location;
  }))];

  // Plot Size Filter Options
  const sizeOptions = ['All', '5 Marla', '8 Marla', '10 Marla', '1 Kanal', 'Commercial'];

  // Filtering Logic
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'All' || project.type === selectedType;
    
    const matchesLocation = selectedLocation === 'All' || project.location.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesSize = selectedSize === 'All' || 
                        project.description.toLowerCase().includes(selectedSize.toLowerCase()) ||
                        project.total_area.toLowerCase().includes(selectedSize.toLowerCase().split(' ')[0]);

    return matchesSearch && matchesType && matchesLocation && matchesSize;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'status') return a.status.localeCompare(b.status);
    return 0;
  });

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

  // Calculate staggered top margin offset based on column index (0, 1, 2)
  const getStaggeredOffset = (index) => {
    const col = index % 3;
    if (col === 1) return 'md:mt-16';
    if (col === 2) return 'md:mt-8';
    return 'md:mt-0';
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-24">
      {/* Banner / Header with Background Cross-Fade Slideshow & Image 6 Editorial Design */}
      <div className="bg-brand-navy text-white py-24 sm:py-32 mb-12 relative overflow-hidden flex items-center justify-center text-center">
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out transform scale-105 ${
              idx === heroBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('${img}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/60"></div>
          </div>
        ))}
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center justify-center">
          <RevealOnScroll animation="down" delay={100}>
            <span className="text-brand-gold text-xs uppercase tracking-[0.4em] font-extrabold mb-3 block drop-shadow-md">
              E S T . 2 0 1 3
            </span>
          </RevealOnScroll>

          <RevealOnScroll animation="up" delay={200}>
            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-serif font-bold uppercase tracking-wider sm:tracking-widest text-white leading-none max-w-5xl mx-auto drop-shadow-2xl px-2">
              TRANSFORMING <br />
              <span className="text-slate-100 font-light">LIVES</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll animation="up" delay={300}>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mt-4 leading-relaxed font-light">
              Explore our architectural masterplanned communities, luxury residential sectors, and state-of-the-art commercial high-rises.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      {/* Editorial Title Banner with Faint Background Watermark */}
      <div className="relative max-w-5xl mx-auto px-4 py-8 text-center flex items-center justify-center mb-12">
        <div className="absolute text-[6rem] sm:text-[9rem] lg:text-[10rem] font-serif font-bold uppercase tracking-widest text-slate-200/40 select-none pointer-events-none z-0">
          VENTURES
        </div>
        <p className="relative z-10 text-lg sm:text-2xl font-serif text-slate-800 leading-relaxed max-w-3xl">
          FaisalTown Group is a trailblazer in Pakistan's real estate industry, setting benchmarks for innovation, quality, and excellence
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters Panel */}
        <RevealOnScroll animation="zoom" delay={100}>
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-md mb-14 space-y-6">
            <div className="flex items-center space-x-2 text-brand-navy-dark font-extrabold text-xs uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
              <span>Filter Ventures</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Project Name Direct Select */}
              <div>
                <select
                  onChange={(e) => {
                    if (e.target.value && e.target.value !== 'All') {
                      navigate(`/projects/${e.target.value}`);
                    }
                  }}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white rounded-xl py-3 px-3 text-xs text-brand-navy font-bold focus:outline-none transition cursor-pointer"
                >
                  <option value="All">Select Project by Name...</option>
                  {projects.map((proj) => (
                    <option key={proj.id} value={proj.slug}>
                      {proj.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Select */}
              <div>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white rounded-xl py-3 px-3 text-xs text-slate-700 focus:outline-none transition cursor-pointer"
                >
                  <option value="All">All Locations</option>
                  {uniqueLocations.filter(loc => loc !== 'All').map((loc, idx) => (
                    <option key={idx} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Plot Size / Marla Select */}
              <div>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white rounded-xl py-3 px-3 text-xs text-slate-700 focus:outline-none transition cursor-pointer"
                >
                  <option value="All">All Plot Sizes</option>
                  <option value="5 Marla">5 Marla Plots</option>
                  <option value="8 Marla">8 Marla Plots</option>
                  <option value="10 Marla">10 Marla Plots</option>
                  <option value="1 Kanal">1 Kanal Plots</option>
                  <option value="Commercial">Commercial Units</option>
                </select>
              </div>

              {/* Search Text Input */}
              <div>
                <div className="relative">
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search developments..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white rounded-xl py-3 pl-10 pr-4 text-xs text-brand-navy placeholder-slate-400 focus:outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Project Name Direct Shortcut Pills */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex overflow-x-auto gap-2 items-center pb-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-1 shrink-0">Ventures:</span>
                {projects.map((proj) => (
                  <Link
                    key={proj.id}
                    to={`/projects/${proj.slug}`}
                    className="py-1 px-3 bg-slate-100 hover:bg-[#B89047] text-slate-800 hover:text-slate-950 text-xs font-extrabold uppercase rounded-lg border border-slate-200/80 transition-all duration-300 shrink-0 hover:scale-105 shadow-sm"
                  >
                    {proj.name} ➔
                  </Link>
                ))}
              </div>

              {/* Category & Marla Size Tabs */}
              <div className="flex border-t border-slate-100 pt-2 overflow-x-auto gap-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider self-center mr-2">Type:</span>
                {['All', 'Residential', 'High-Rise'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`py-1.5 px-4 text-xs font-bold tracking-wide rounded-xl uppercase transition-all duration-300 ${
                      selectedType === type
                        ? 'bg-brand-navy text-white shadow-md'
                        : 'text-slate-500 hover:text-brand-navy hover:bg-slate-100'
                    }`}
                  >
                    {type === 'All' ? 'All Portfolio' : type === 'Residential' ? 'Residential Communities' : 'High-Rise & Commercial'}
                  </button>
                ))}
              </div>

              {/* Plot Size Marla Quick Filter Pills */}
              <div className="flex overflow-x-auto gap-2 items-center pt-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-2 shrink-0">Marla / Size:</span>
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-1 px-3.5 text-xs font-bold tracking-wide rounded-lg uppercase transition-all duration-300 shrink-0 ${
                      selectedSize === size
                        ? 'bg-[#B89047] text-slate-950 shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {size === 'All' ? 'All Sizes' : size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Results Counter */}
        <div className="text-xs text-slate-500 mb-8 font-serif italic">
          Showing <strong className="text-slate-900 font-sans not-italic font-bold">{filteredProjects.length}</strong> architectural developments
        </div>

        {/* High-Fashion Staggered Architectural Catalog Grid (Matching Image Exactly) */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-14 items-start">
            {filteredProjects.map((project, idx) => (
              <RevealOnScroll key={project.id} animation="up" delay={(idx % 3) * 150}>
                <div className={`group flex flex-col justify-between transition-all duration-500 ${getStaggeredOffset(idx)}`}>
                  <div>
                    {/* Square High-Resolution Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-slate-100 shadow-sm mb-5 border border-slate-200/60 group-hover:shadow-md transition-all duration-500">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-slate-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Top-Left Category Badge */}
                      <span className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md text-white font-bold text-[9px] uppercase tracking-widest px-3 py-1 shadow-sm">
                        {project.type}
                      </span>
                    </div>

                    {/* Short Horizontal Dark Red / Accent Line */}
                    <div className="w-12 h-[3px] bg-[#8B0000] mb-4 group-hover:w-20 transition-all duration-300"></div>

                    {/* Serif Luxury Title Heading */}
                    <h3 className="font-serif text-2xl font-bold text-slate-900 group-hover:text-[#8B0000] transition-colors duration-300 leading-snug tracking-tight">
                      {project.name}
                    </h3>

                    {/* Editorial Paragraph Description */}
                    <p className="font-serif text-slate-600 text-xs sm:text-sm leading-relaxed font-light mt-3 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Footer Action Details */}
                  <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-serif italic">
                      📍 {project.location.split(',')[0]}
                    </span>
                    <Link
                      to={`/projects/${project.slug}`}
                      className="text-xs font-serif font-bold text-slate-900 group-hover:text-[#8B0000] uppercase tracking-wider flex items-center space-x-1.5 transition-colors duration-300"
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        ) : (
          <RevealOnScroll animation="zoom" delay={100}>
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400">
              <Building2 className="w-12 h-12 text-brand-gold mx-auto mb-3" />
              <h3 className="text-base font-bold text-brand-navy mb-1">No Projects Found</h3>
              <p className="text-xs">No developments match your current search queries or filters. Try adjusting your parameters.</p>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </div>
  );
}
