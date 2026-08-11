import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import MockMap from '../components/MockMap';
import { MapPin, Phone, Mail, Award, FileDown, Layers, Calculator, Check, ArrowRight, Star, Heart } from 'lucide-react';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { projects, plots, bookPlot, submitInquiry, currentUser, toggleWishlist, wishlist } = useApp();

  const project = projects.find(p => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState('');
  
  // Plot calculator and selection states
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');

  // Inquiry form states
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryError, setInquiryError] = useState('');

  useEffect(() => {
    if (project) {
      setSelectedImage(project.image);
      // Auto select first available plot of this project if exists
      const projectPlots = plots.filter(p => p.project_id === project.id && p.status === 'available');
      if (projectPlots.length > 0) {
        setSelectedPlot(projectPlots[0]);
      }
      // Populate inquiry placeholder
      setInquiryForm(prev => ({
        ...prev,
        message: `I am interested in acquiring details for plots in ${project.name}. Please contact me.`
      }));
    }
  }, [project, plots]);

  if (!project) {
    return (
      <div className="min-h-screen pt-28 flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold text-brand-navy">Project Not Found</h2>
        <p className="text-slate-500 text-xs mt-2">The project you are trying to view does not exist in our system.</p>
        <Link to="/projects" className="mt-4 gold-gradient text-brand-navy font-bold py-2 px-6 rounded-lg text-xs uppercase tracking-wider">
          Back to Projects
        </Link>
      </div>
    );
  }

  const projectPlots = plots.filter(p => p.project_id === project.id);

  // Inquiry submission handler
  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setInquiryError('');
    setInquirySuccess(false);

    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.phone) {
      setInquiryError('Please fill out all required fields');
      return;
    }

    const payload = {
      ...inquiryForm,
      project_id: project.id
    };

    const res = await submitInquiry(payload);
    if (res.success) {
      setInquirySuccess(true);
      setInquiryForm({
        name: '',
        email: '',
        phone: '',
        message: `I am interested in acquiring details for plots in ${project.name}. Please contact me.`
      });
    } else {
      setInquiryError(res.message || 'Submission failed');
    }
  };

  // Booking handler
  const handleBookNow = async () => {
    setBookingError('');
    setBookingSuccess(false);

    if (!currentUser) {
      // Save current slug to redirect back after login
      navigate(`/login?redirect=/projects/${project.slug}`);
      return;
    }

    if (!selectedPlot) {
      setBookingError('Please select a plot to proceed.');
      return;
    }

    const res = await bookPlot(selectedPlot.id);
    if (res.success) {
      setBookingSuccess(true);
      // Deselect or switch to next plot
      const updated = plots.find(p => p.id === selectedPlot.id);
      setSelectedPlot(updated);
    } else {
      setBookingError(res.message || 'Failed to place booking.');
    }
  };

  // Format currency helper
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(val).replace('PKR', 'Rs.');
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      {/* Banner */}
      <div className="relative h-[45vh] w-full overflow-hidden bg-brand-navy">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-brand-navy/30"></div>
        <div className="absolute bottom-10 left-0 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <span className="bg-brand-gold text-brand-navy font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
              {project.type}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase mt-2">{project.name}</h1>
            <div className="flex items-center text-slate-300 text-xs sm:text-sm mt-3">
              <MapPin className="w-4 h-4 text-brand-gold mr-1.5 shrink-0" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLUMNS: Details, Gallery, Map, Inquiries */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-brand-navy uppercase tracking-tight pb-3 border-b border-slate-100">Project Overview</h2>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{project.description}</p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Development Area</span>
                  <strong className="text-brand-navy text-sm font-bold block mt-1">{project.total_area}</strong>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">NOC Status</span>
                  <strong className="text-emerald-600 text-sm font-bold block mt-1">NOC Approved</strong>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Development pace</span>
                  <strong className="text-brand-navy text-sm font-bold block mt-1">{project.status}</strong>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-brand-navy uppercase tracking-tight">Image & Progress Gallery</h2>
              
              <div className="h-96 rounded-xl overflow-hidden border border-slate-200">
                <img src={selectedImage} alt={project.name} className="w-full h-full object-cover transition-all duration-300" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {project.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`h-24 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === img ? 'border-brand-gold scale-95 shadow-md' : 'border-slate-200 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Master Plan Map */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy uppercase tracking-tight pl-2">Interactive Sector Layout</h2>
              <MockMap 
                projectId={project.id} 
                onSelectPlot={(p) => setSelectedPlot(p)} 
                selectedPlotId={selectedPlot?.id} 
              />
            </div>

            {/* Inquiry Form */}
            <div className="bg-brand-navy-light/95 border border-white/10 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-gold/15 text-brand-gold text-[9px] uppercase font-bold tracking-widest px-3.5 py-1.5 rounded-bl-xl border-l border-b border-white/10">
                Direct Inquiry
              </div>

              <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">Speak to a Property Advisor</h3>
              <p className="text-slate-300 text-xs mb-6">Leave your credentials and we will get back to you with custom file payment terms.</p>

              {inquirySuccess ? (
                <div className="bg-emerald-600/20 border border-emerald-500/40 rounded-xl p-5 text-center text-emerald-400 animate-fade-in flex flex-col items-center">
                  <Check className="w-8 h-8 mb-2 text-brand-gold" />
                  <strong className="text-sm font-bold block mb-1">Inquiry Submitted Successfully!</strong>
                  <span className="text-xs">An investment officer will contact you shortly via email or phone.</span>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  {inquiryError && <p className="text-red-400 text-xs">{inquiryError}</p>}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-slate-300 font-bold uppercase tracking-wider mb-1">Name</label>
                      <input
                        type="text"
                        required
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 focus:border-brand-gold rounded-xl py-2 px-4 text-xs text-white placeholder-slate-500 focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-300 font-bold uppercase tracking-wider mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        placeholder="+92 300 1234567"
                        className="w-full bg-white/5 border border-white/10 focus:border-brand-gold rounded-xl py-2 px-4 text-xs text-white placeholder-slate-500 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-300 font-bold uppercase tracking-wider mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 focus:border-brand-gold rounded-xl py-2 px-4 text-xs text-white placeholder-slate-500 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-300 font-bold uppercase tracking-wider mb-1">Message</label>
                    <textarea
                      rows="3"
                      required
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 focus:border-brand-gold rounded-xl py-2 px-4 text-xs text-white placeholder-slate-500 focus:outline-none transition resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full gold-gradient hover:gold-gradient-hover text-brand-navy font-bold text-xs uppercase tracking-widest py-3 rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
                  >
                    <span>Submit Inquiry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* RIGHT 1 COLUMN: Brochure, Pricing, Calculator, Installments */}
          <div className="space-y-8">
            
            {/* Brochure Card */}
            <div className="bg-brand-navy border border-white/10 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden flex justify-between items-center group">
              <div className="space-y-1">
                <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest">NOC Certified</span>
                <h3 className="text-base font-bold">Project Brochure</h3>
                <p className="text-[11px] text-slate-400">Download complete master plan map and booking rates.</p>
              </div>
              <a
                href={project.brochure}
                download
                onClick={(e) => {
                  e.preventDefault();
                  alert('Brochure download simulated: Master Plan PDF.');
                }}
                className="p-3 bg-white/5 group-hover:bg-brand-gold group-hover:text-brand-navy rounded-xl border border-white/10 transition"
              >
                <FileDown className="w-5 h-5" />
              </a>
            </div>

            {/* Plot Inventory Listing */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-brand-navy uppercase tracking-tight pb-2 border-b border-slate-100">Plot Categories</h3>
              
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto pr-1">
                {projectPlots.map(plot => (
                  <button
                    key={plot.id}
                    disabled={plot.status === 'booked'}
                    onClick={() => setSelectedPlot(plot)}
                    className={`w-full py-3 flex justify-between items-center text-left transition focus:outline-none ${
                      selectedPlot?.id === plot.id ? 'bg-slate-50 px-2 rounded-lg' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-bold text-brand-navy">Plot P-{plot.id}</span>
                        <span className={`text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded font-semibold ${
                          plot.type === 'Commercial' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                        }`}>
                          {plot.type}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 mt-0.5 block">{plot.size} - Status: 
                        <strong className={`ml-1 capitalize ${
                          plot.status === 'available' ? 'text-emerald-600' : (plot.status === 'pending' ? 'text-amber-500' : 'text-rose-500')
                        }`}> {plot.status}</strong>
                      </span>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-xs font-bold text-brand-navy">{formatCurrency(plot.price)}</span>
                      <span className="text-[10px] text-slate-400 block">Downpayment: {formatCurrency(plot.down_payment)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Calculator & Booking Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-6 relative overflow-hidden">
              <div className="flex items-center space-x-2 text-brand-navy-dark font-bold text-sm uppercase tracking-wider pb-2 border-b border-slate-100">
                <Calculator className="w-4 h-4 text-brand-gold" />
                <span>Price & Installment Calculator</span>
              </div>

              {selectedPlot ? (
                <div className="space-y-4">
                  {/* Heart Wishlist toggle */}
                  <div className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/60">
                    <span className="text-xs text-slate-500 font-medium">Plot P-{selectedPlot.id} ({selectedPlot.size})</span>
                    <button
                      onClick={() => toggleWishlist(selectedPlot.id)}
                      className="text-rose-500 hover:scale-110 transition focus:outline-none"
                    >
                      <Heart className={`w-4 h-4 ${wishlist.includes(selectedPlot.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Rate</span>
                      <span className="text-sm font-bold text-brand-navy block mt-0.5">{formatCurrency(selectedPlot.price)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Down Payment</span>
                      <span className="text-sm font-bold text-brand-gold block mt-0.5">{formatCurrency(selectedPlot.down_payment)}</span>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Installment Months</span>
                      <span className="text-xs font-bold text-slate-800 block mt-0.5">{selectedPlot.installment_months} Months</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Monthly Installment</span>
                      <span className="text-xs font-bold text-slate-800 block mt-0.5">{formatCurrency(selectedPlot.monthly_installment)}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3.5 text-slate-600 text-[11px] leading-relaxed">
                    <strong>Payment Note:</strong> Membership allocation certificate is dispatched within 15 working days after Down Payment approval. Remaining installments can be paid monthly/quarterly.
                  </div>

                  {bookingSuccess ? (
                    <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-4 text-emerald-600 text-center animate-fade-in">
                      <Check className="w-6 h-6 mx-auto mb-1 text-emerald-600" />
                      <strong className="text-xs font-bold block">Booking Request Sent!</strong>
                      <span className="text-[10px] text-slate-500">View status in the Member Portal. Your Booking ID has been registered.</span>
                    </div>
                  ) : selectedPlot.status !== 'available' ? (
                    <div className="bg-rose-50 border border-rose-100 text-rose-500 text-center text-xs py-3 rounded-xl font-bold">
                      Plot is currently {selectedPlot.status}
                    </div>
                  ) : (
                    <div>
                      {bookingError && <p className="text-red-500 text-[11px] mb-2">{bookingError}</p>}
                      <button
                        onClick={handleBookNow}
                        className="w-full py-3 gold-gradient hover:gold-gradient-hover text-brand-navy font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
                      >
                        <span>Book Selected Plot</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs">
                  Click on a plot card in the listing or select a layout block in the map to activate the pricing calculator.
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
