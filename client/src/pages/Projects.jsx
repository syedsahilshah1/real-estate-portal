import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Search, MapPin, Building2, SlidersHorizontal, Grid, ArrowUpDown } from 'lucide-react';

export default function Projects() {
  const { projects } = useApp();
  const routerLocation = useLocation();

  // Search/Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [sortBy, setSortBy] = useState('name'); // name, status, area

  // Read query params on load
  useEffect(() => {
    const params = new URLSearchParams(routerLocation.search);
    const search = params.get('search');
    const type = params.get('type');
    const loc = params.get('location');

    if (search) setSearchTerm(search);
    if (type) setSelectedType(type);
    if (loc) setSelectedLocation(loc);
  }, [routerLocation.search]);

  // Extract unique locations for the filter list
  const uniqueLocations = ['All', ...new Set(projects.map(p => {
    // Take the main city name (e.g. Islamabad, Rawalpindi)
    const parts = p.location.split(',');
    return parts[parts.length - 2]?.trim() || parts[parts.length - 1]?.trim() || p.location;
  }))];

  // Filtering Logic
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'All' || project.type === selectedType;
    
    const matchesLocation = selectedLocation === 'All' || project.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesType && matchesLocation;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'status') return a.status.localeCompare(b.status);
    return 0; // Default
  });

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      {/* Banner / Header */}
      <div className="bg-brand-navy text-white py-16 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-dark via-brand-navy/95 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-brand-gold text-xs uppercase tracking-widest font-bold">Invest with Confidence</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase mt-2">Projects & Communities</h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3 leading-relaxed">
            Browse our list of premium masterplanned communities and mixed-use luxury high-rises.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-10 space-y-6">
          <div className="flex items-center space-x-2 text-brand-navy-dark font-bold text-sm uppercase tracking-wider">
            <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
            <span>Search Filters</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search societies or high-rises..."
                className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white rounded-xl py-2.5 pl-10 pr-4 text-sm text-brand-navy placeholder-slate-400 focus:outline-none transition"
              />
            </div>

            {/* Location Select */}
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white rounded-xl py-2.5 px-3 text-sm text-slate-700 focus:outline-none transition cursor-pointer"
              >
                <option value="All">All Locations</option>
                {uniqueLocations.filter(loc => loc !== 'All').map((loc, idx) => (
                  <option key={idx} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Sort Select */}
            <div>
              <div className="relative">
                <ArrowUpDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white rounded-xl py-2.5 pl-3 pr-10 text-sm text-slate-700 focus:outline-none transition cursor-pointer appearance-none"
                >
                  <option value="name">Sort by Name</option>
                  <option value="status">Sort by Status</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex border-b border-slate-100 pb-2 overflow-x-auto gap-2">
            {['All', 'Residential', 'High-Rise'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`py-2 px-5 text-sm font-semibold tracking-wide rounded-lg whitespace-nowrap transition-all duration-200 ${
                  selectedType === type
                    ? 'bg-brand-navy text-brand-gold'
                    : 'text-slate-500 hover:text-brand-navy hover:bg-slate-100'
                }`}
              >
                {type === 'All' ? 'All Developments' : type === 'Residential' ? 'Residential Communities' : 'High-Rise / Commercial'}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-sm text-slate-500 mb-6 font-medium">
          Showing <strong className="text-brand-navy">{filteredProjects.length}</strong> premium societies
        </div>

        {/* Grid Catalog */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 group flex flex-col justify-between">
                <div>
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <span className="absolute top-4 left-4 bg-brand-gold text-brand-navy font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      {project.type}
                    </span>
                    <span className={`absolute top-4 right-4 text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full text-white shadow-md ${
                      project.status === 'Completed' ? 'bg-emerald-600' : 'bg-brand-navy-slate'
                    }`}>
                      {project.status}
                    </span>
                    <div className="absolute bottom-4 left-4 flex items-center text-white text-xs">
                      <MapPin className="w-3.5 h-3.5 text-brand-gold mr-1" />
                      <span className="font-semibold line-clamp-1">{project.location}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-gold transition duration-300 leading-snug">{project.name}</h3>
                    <p className="text-slate-500 text-xs mt-3 leading-relaxed line-clamp-3">{project.description}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 pt-4 border-t border-slate-100 flex items-center justify-between">
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
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
            <Building2 className="w-12 h-12 text-brand-gold mx-auto mb-3" />
            <h3 className="text-base font-bold text-brand-navy mb-1">No Projects Found</h3>
            <p className="text-xs">No developments match your current search queries or filters. Try adjusting your parameters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
