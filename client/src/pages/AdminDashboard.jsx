import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import RevealOnScroll from '../components/RevealOnScroll';
import { ShieldAlert, BarChart3, Building2, LayoutGrid, CheckSquare, Mail, Plus, Trash2, Edit, AlertCircle, Sparkles } from 'lucide-react';

export default function AdminDashboard() {
  const { 
    currentUser, 
    projects, 
    plots, 
    bookings, 
    inquiries, 
    addProject, 
    updateProject, 
    deleteProject, 
    addPlot, 
    deletePlot, 
    updateBookingStatus, 
    markInquiryStatus 
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // overview, projects, plots, bookings, inquiries

  // CRUD Form States
  const [projectForm, setProjectForm] = useState({ name: '', description: '', location: '', total_area: '', type: 'Residential', status: 'Active Development', image: '' });
  const [editingProjectId, setEditingProjectId] = useState(null);
  
  const [plotForm, setPlotForm] = useState({ project_id: '', size: '', type: 'Residential', price: '', installment_months: '36', down_payment: '', monthly_installment: '' });

  const [formMsg, setFormMsg] = useState('');
  const [formErr, setFormErr] = useState('');

  // If not admin, redirect or show error
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen pt-28 flex flex-col items-center justify-center text-center px-4">
        <ShieldAlert className="w-16 h-16 text-rose-500 mb-4 animate-bounce" />
        <h2 className="text-xl font-bold text-brand-navy uppercase">Access Restricted</h2>
        <p className="text-slate-500 text-xs mt-2 max-w-sm">
          This panel is reserved for authorized administrative officers. Please login as admin first.
        </p>
        <Link to="/login" className="mt-4 gold-gradient text-brand-navy font-bold py-2 px-6 rounded-lg text-xs uppercase tracking-wider">
          Login Portal
        </Link>
      </div>
    );
  }

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(val).replace('PKR', 'Rs.');
  };

  // Helper maps
  const projectMap = projects.reduce((acc, p) => ({ ...acc, [p.id]: p }), {});
  const plotMap = plots.reduce((acc, pl) => ({ ...acc, [pl.id]: pl }), {});

  // Analytics Metrics
  const totalSalesValue = bookings
    .filter(b => b.status === 'approved')
    .reduce((acc, b) => acc + (plotMap[b.plot_id]?.price || 0), 0);
  
  const totalPendingBookings = bookings.filter(b => b.status === 'pending').length;
  const totalActiveInquiries = inquiries.filter(i => i.status === 'new').length;

  // Handles Project Submission
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setFormMsg('');
    setFormErr('');

    if (!projectForm.name || !projectForm.description || !projectForm.location || !projectForm.total_area) {
      setFormErr('All fields are required.');
      return;
    }

    if (editingProjectId) {
      const res = await updateProject(editingProjectId, projectForm);
      if (res.success) {
        setFormMsg('Project updated successfully.');
        setEditingProjectId(null);
        setProjectForm({ name: '', description: '', location: '', total_area: '', type: 'Residential', status: 'Active Development', image: '' });
      } else {
        setFormErr(res.message);
      }
    } else {
      const finalProj = {
        ...projectForm,
        image: projectForm.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
      };
      const res = await addProject(finalProj);
      if (res.success) {
        setFormMsg('New Project added successfully.');
        setProjectForm({ name: '', description: '', location: '', total_area: '', type: 'Residential', status: 'Active Development', image: '' });
      } else {
        setFormErr(res.message);
      }
    }
  };

  const handleEditProject = (proj) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      name: proj.name,
      description: proj.description,
      location: proj.location,
      total_area: proj.total_area,
      type: proj.type,
      status: proj.status,
      image: proj.image
    });
    setActiveTab('projects');
  };

  // Handles Plot Submission
  const handlePlotSubmit = async (e) => {
    e.preventDefault();
    setFormMsg('');
    setFormErr('');

    if (!plotForm.project_id || !plotForm.size || !plotForm.price || !plotForm.down_payment || !plotForm.monthly_installment) {
      setFormErr('Please fill in all plot specs.');
      return;
    }

    const res = await addPlot(plotForm);
    if (res.success) {
      setFormMsg('New Plot inventory added.');
      setPlotForm({ project_id: '', size: '', type: 'Residential', price: '', installment_months: '36', down_payment: '', monthly_installment: '' });
    } else {
      setFormErr(res.message);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 flex flex-col md:flex-row">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-brand-navy text-slate-300 shrink-0 border-r border-white/5 flex flex-col justify-between py-6">
        <div className="px-6 space-y-8">
          {/* Admin Tag */}
          <div className="flex items-center space-x-2 border-b border-white/10 pb-4">
            <span className="gold-gradient p-1.5 rounded-lg text-white font-bold text-xs">A</span>
            <div>
              <span className="text-sm font-bold text-white block leading-none">Admin Panel</span>
              <span className="text-[10px] text-slate-400 block mt-1">Management Desk</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-2 text-sm font-medium">
            <button
              onClick={() => { setActiveTab('overview'); setFormMsg(''); setFormErr(''); }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition ${
                activeTab === 'overview' ? 'bg-white/5 text-brand-gold font-bold' : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Overview Analytics</span>
            </button>

            <button
              onClick={() => { setActiveTab('projects'); setFormMsg(''); setFormErr(''); }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition ${
                activeTab === 'projects' ? 'bg-white/5 text-brand-gold font-bold' : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Manage Projects</span>
            </button>

            <button
              onClick={() => { setActiveTab('plots'); setFormMsg(''); setFormErr(''); }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition ${
                activeTab === 'plots' ? 'bg-white/5 text-brand-gold font-bold' : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Plots Inventory</span>
            </button>

            <button
              onClick={() => { setActiveTab('bookings'); setFormMsg(''); setFormErr(''); }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition ${
                activeTab === 'bookings' ? 'bg-white/5 text-brand-gold font-bold' : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span className="flex justify-between items-center w-full">
                <span>Bookings Log</span>
                {totalPendingBookings > 0 && (
                  <span className="bg-brand-gold text-brand-navy text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {totalPendingBookings}
                  </span>
                )}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('inquiries'); setFormMsg(''); setFormErr(''); }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition ${
                activeTab === 'inquiries' ? 'bg-white/5 text-brand-gold font-bold' : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span className="flex justify-between items-center w-full">
                <span>Inquiries Box</span>
                {totalActiveInquiries > 0 && (
                  <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">
                    {totalActiveInquiries}
                  </span>
                )}
              </span>
            </button>
          </nav>
        </div>

        {/* Corporate Signoff */}
        <div className="px-6 text-[10px] text-slate-500 mt-8 pt-4 border-t border-white/5">
          Faisal Town Group Admin System
        </div>
      </aside>

      {/* MAIN CONTAINER CONTENT */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl">
        
        {/* Info alerts */}
        {formMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl p-4 text-xs font-semibold mb-6 flex items-center space-x-1">
            <CheckSquare className="w-4 h-4" />
            <span>{formMsg}</span>
          </div>
        )}
        {formErr && (
          <div className="bg-rose-50 border border-rose-200 text-rose-500 rounded-xl p-4 text-xs font-semibold mb-6 flex items-center space-x-1">
            <AlertCircle className="w-4 h-4" />
            <span>{formErr}</span>
          </div>
        )}

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-brand-navy-dark uppercase tracking-tight">Overview Dashboard</h2>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Approved Sales Valuation</span>
                <strong className="text-xl font-bold text-brand-navy block mt-1">{formatCurrency(totalSalesValue)}</strong>
              </div>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Societies</span>
                <strong className="text-xl font-bold text-brand-navy block mt-1">{projects.length} Registered</strong>
              </div>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Pending Bookings</span>
                <strong className="text-xl font-bold text-amber-500 block mt-1">{totalPendingBookings} Requests</strong>
              </div>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Plots Catalog Size</span>
                <strong className="text-xl font-bold text-brand-navy block mt-1">{plots.length} Lots</strong>
              </div>
            </div>

            {/* Split panels: Latest inquiries & bookings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Inquiries */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider border-b border-slate-100 pb-2">Recent User Inquiries</h3>
                <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                  {inquiries.slice(0, 4).map((inq) => (
                    <div key={inq.id} className="py-3.5 space-y-1 text-xs">
                      <div className="flex justify-between items-center">
                        <strong className="text-brand-navy-dark">{inq.name} ({inq.phone})</strong>
                        <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          inq.status === 'new' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {inq.status}
                        </span>
                      </div>
                      <span className="text-slate-400 block">Society Interested: {projectMap[inq.project_id]?.name || 'General Desk'}</span>
                      <p className="text-slate-600 bg-slate-50 p-2 rounded-lg mt-1 border border-slate-100">{inq.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bookings */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider border-b border-slate-100 pb-2">Recent Booking Actions</h3>
                <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                  {bookings.slice(0, 4).map((b) => {
                    const plot = plotMap[b.plot_id];
                    const proj = projectMap[plot?.project_id];
                    return (
                      <div key={b.id} className="py-3.5 flex justify-between items-center text-xs">
                        <div>
                          <strong className="text-brand-navy-dark">Plot P-{plot?.id} ({plot?.size})</strong>
                          <span className="text-slate-400 block mt-0.5">{proj?.name} | {b.booking_date}</span>
                        </div>
                        <div className="text-right">
                          <span className={`text-[10px] uppercase tracking-wider font-semibold border px-2 py-0.5 rounded-full ${
                            b.status === 'approved' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-amber-50 border-amber-100 text-amber-600'
                          }`}>
                            {b.status}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-1 font-bold">{plot ? formatCurrency(plot.price) : 'N/A'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS CRUD */}
        {activeTab === 'projects' && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-xl font-bold text-brand-navy-dark uppercase tracking-tight">
              {editingProjectId ? 'Edit Project Master' : 'Add New Real Estate Society'}
            </h2>

            {/* Form */}
            <form onSubmit={handleProjectSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Project Name</label>
                  <input
                    type="text"
                    required
                    value={projectForm.name}
                    onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                    placeholder="e.g. Faisal Hills (Sector G)"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl py-2 px-3 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Location Address</label>
                  <input
                    type="text"
                    required
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    placeholder="GT Road, Islamabad"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl py-2 px-3 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Total Society Land (Area)</label>
                  <input
                    type="text"
                    required
                    value={projectForm.total_area}
                    onChange={(e) => setProjectForm({ ...projectForm, total_area: e.target.value })}
                    placeholder="e.g. 15,000 Kanal"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl py-2 px-3 focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Project Category</label>
                  <select
                    value={projectForm.type}
                    onChange={(e) => setProjectForm({ ...projectForm, type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl py-2 px-3 focus:outline-none transition cursor-pointer"
                  >
                    <option value="Residential">Residential Community</option>
                    <option value="High-Rise">High-Rise / Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Development Status</label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl py-2 px-3 focus:outline-none transition cursor-pointer"
                  >
                    <option value="Active Development">Active Development</option>
                    <option value="Completed">Completed</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Main Banner Image URL</label>
                  <input
                    type="text"
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    placeholder="Leave blank for auto-unsplash placeholder"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl py-2 px-3 focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-500 uppercase mb-1">Overview Description</label>
                <textarea
                  rows="3"
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Detail the location advantages and development specs..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl py-2 px-3 focus:outline-none transition resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                {editingProjectId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProjectId(null);
                      setProjectForm({ name: '', description: '', location: '', total_area: '', type: 'Residential', status: 'Active Development', image: '' });
                    }}
                    className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg uppercase tracking-wider"
                  >
                    Cancel Edit
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-2 gold-gradient hover:gold-gradient-hover text-brand-navy font-bold rounded-lg uppercase tracking-wider shadow-md"
                >
                  {editingProjectId ? 'Update Project' : 'Publish Project'}
                </button>
              </div>
            </form>

            {/* List existing projects */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    <th className="p-4">Project</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Area</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {projects.map(proj => (
                    <tr key={proj.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-brand-navy-dark">{proj.name}</td>
                      <td className="p-4 text-slate-500">{proj.location}</td>
                      <td className="p-4 font-medium">{proj.total_area}</td>
                      <td className="p-4"><span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">{proj.type}</span></td>
                      <td className="p-4"><span className="text-brand-navy font-semibold">{proj.status}</span></td>
                      <td className="p-4">
                        <div className="flex justify-center space-x-3">
                          <button
                            onClick={() => handleEditProject(proj)}
                            className="p-1 text-slate-400 hover:text-brand-gold transition"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProject(proj.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PLOTS CRUD */}
        {activeTab === 'plots' && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-xl font-bold text-brand-navy-dark uppercase tracking-tight">Add Plot Inventory</h2>

            {/* Plot Creation Form */}
            <form onSubmit={handlePlotSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Assign to Society</label>
                  <select
                    value={plotForm.project_id}
                    onChange={(e) => setPlotForm({ ...plotForm, project_id: e.target.value })}
                    required
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl py-2 px-3 focus:outline-none transition cursor-pointer"
                  >
                    <option value="">Select Project</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Plot Size</label>
                  <input
                    type="text"
                    required
                    value={plotForm.size}
                    onChange={(e) => setPlotForm({ ...plotForm, size: e.target.value })}
                    placeholder="e.g. 5 Marla / 1 Kanal"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl py-2 px-3 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Category Type</label>
                  <select
                    value={plotForm.type}
                    onChange={(e) => setPlotForm({ ...plotForm, type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl py-2 px-3 focus:outline-none transition cursor-pointer"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Total Cost Price (PKR)</label>
                  <input
                    type="number"
                    required
                    value={plotForm.price}
                    onChange={(e) => setPlotForm({ ...plotForm, price: e.target.value })}
                    placeholder="e.g. 3500000"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl py-2 px-3 focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Required Down Payment (PKR)</label>
                  <input
                    type="number"
                    required
                    value={plotForm.down_payment}
                    onChange={(e) => setPlotForm({ ...plotForm, down_payment: e.target.value })}
                    placeholder="e.g. 700000"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl py-2 px-3 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Monthly Installment (PKR)</label>
                  <input
                    type="number"
                    required
                    value={plotForm.monthly_installment}
                    onChange={(e) => setPlotForm({ ...plotForm, monthly_installment: e.target.value })}
                    placeholder="e.g. 45000"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl py-2 px-3 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-500 uppercase mb-1">Plan Period Months</label>
                  <input
                    type="number"
                    required
                    value={plotForm.installment_months}
                    onChange={(e) => setPlotForm({ ...plotForm, installment_months: e.target.value })}
                    placeholder="36"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold rounded-xl py-2 px-3 focus:outline-none transition"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 gold-gradient hover:gold-gradient-hover text-brand-navy font-bold rounded-xl uppercase tracking-wider transition shadow-md flex items-center justify-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Plot</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Plots inventory list */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    <th className="p-4">Plot Ref</th>
                    <th className="p-4">Assigned Society</th>
                    <th className="p-4">Size</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Downpayment</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {plots.map(plot => (
                    <tr key={plot.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-brand-navy-slate">P-{plot.id}</td>
                      <td className="p-4 font-medium text-brand-navy">{projectMap[plot.project_id]?.name || 'Unknown'}</td>
                      <td className="p-4 font-semibold">{plot.size}</td>
                      <td className="p-4"><span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">{plot.type}</span></td>
                      <td className="p-4 font-bold text-brand-navy-dark">{formatCurrency(plot.price)}</td>
                      <td className="p-4 text-brand-gold font-semibold">{formatCurrency(plot.down_payment)}</td>
                      <td className="p-4">
                        <span className={`text-[10px] uppercase font-bold ${
                          plot.status === 'available' ? 'text-emerald-600' : (plot.status === 'pending' ? 'text-amber-500' : 'text-rose-500')
                        }`}>
                          {plot.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => deletePlot(plot.id)}
                          className="text-slate-400 hover:text-rose-600 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: BOOKINGS APPROVALS */}
        {activeTab === 'bookings' && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-xl font-bold text-brand-navy-dark uppercase tracking-tight">Manage Customer Bookings</h2>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    <th className="p-4">Booking ID</th>
                    <th className="p-4">User ID</th>
                    <th className="p-4">Society / Plot</th>
                    <th className="p-4">Booking Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Down Payment Status</th>
                    <th className="p-4 text-center">Modify State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map(bk => {
                    const plot = plotMap[bk.plot_id];
                    const proj = projectMap[plot?.project_id];
                    return (
                      <tr key={bk.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-bold text-brand-navy-slate">BK-{bk.id}</td>
                        <td className="p-4 text-slate-500">Member: {bk.user_id}</td>
                        <td className="p-4">
                          <strong className="text-brand-navy-dark block">{proj?.name || 'Loading'}</strong>
                          <span className="text-[10px] text-slate-400 block">P-{plot?.id} ({plot?.size}) | {formatCurrency(plot?.price || 0)}</span>
                        </td>
                        <td className="p-4 text-slate-500">{bk.booking_date}</td>
                        <td className="p-4">
                          <span className={`text-[10px] uppercase tracking-wider font-bold border px-2 py-0.5 rounded-full ${
                            bk.status === 'approved' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : (bk.status === 'cancelled' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-amber-50 border-amber-100 text-amber-600')
                          }`}>
                            {bk.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-[10px] uppercase font-bold text-slate-700">{bk.payment_status}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => updateBookingStatus(bk.id, 'approved', 'paid')}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold uppercase transition"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateBookingStatus(bk.id, 'cancelled', 'unpaid')}
                              className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-[10px] font-bold uppercase transition"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: INQUIRIES BOX */}
        {activeTab === 'inquiries' && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-xl font-bold text-brand-navy-dark uppercase tracking-tight">Customer Inquiries Inbox</h2>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    <th className="p-4">Sender</th>
                    <th className="p-4">Contact Info</th>
                    <th className="p-4">Society Segment</th>
                    <th className="p-4">Message</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Modify</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inquiries.map(inq => (
                    <tr key={inq.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-brand-navy-dark">{inq.name}</td>
                      <td className="p-4 text-slate-500">
                        <span className="block">{inq.email}</span>
                        <span className="block mt-0.5">{inq.phone}</span>
                      </td>
                      <td className="p-4 font-semibold text-brand-navy">
                        {projectMap[inq.project_id]?.name || 'General Desk'}
                      </td>
                      <td className="p-4 text-slate-600 max-w-xs">{inq.message}</td>
                      <td className="p-4">
                        <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          inq.status === 'new' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {inq.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => markInquiryStatus(inq.id, 'replied')}
                            className="px-2.5 py-1 bg-brand-navy hover:bg-brand-gold hover:text-brand-navy text-white rounded text-[10px] font-bold uppercase transition"
                          >
                            Mark Replied
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
