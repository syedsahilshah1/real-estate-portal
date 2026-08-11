import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Wallet, FolderHeart, User, FileDown, CheckCircle, Clock, XCircle, Settings, Check, CreditCard } from 'lucide-react';

export default function Dashboard() {
  const { currentUser, bookings, plots, projects, wishlist, toggleWishlist, submitInquiry } = useApp();

  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || ''
  });
  const [profileSuccess, setProfileSuccess] = useState(false);

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login?redirect=/dashboard" />;
  }

  // Filter bookings for current logged in user
  const userBookings = bookings.filter(b => b.user_id === currentUser.id);

  // Filter wishlist plots
  const wishlistPlots = plots.filter(p => wishlist.includes(p.id));

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(val).replace('PKR', 'Rs.');
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  // Simulate payment slip print
  const handlePrintSlip = (booking) => {
    const plot = plots.find(p => p.id === booking.plot_id);
    const proj = projectMap[plot?.project_id];
    alert(`Generating payment challan slip:\n\nSociety: ${proj?.name}\nPlot Ref: P-${plot?.id} (${plot?.size})\nTotal Price: ${formatCurrency(plot?.price)}\nPaid to date: ${formatCurrency(booking.installment_plan.amount_paid)}\nInstallments: ${booking.installment_plan.paid_installments}/${booking.installment_plan.total_installments}\n\nChallan printed successfully!`);
  };

  // Helper map to avoid nested lookups
  const projectMap = projects.reduce((acc, p) => ({ ...acc, [p.id]: p }), {});
  const plotMap = plots.reduce((acc, pl) => ({ ...acc, [pl.id]: pl }), {});

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Portal Header */}
        <div className="bg-brand-navy rounded-2xl p-6 sm:p-8 text-white border border-white/10 shadow-lg mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-brand-gold/15 text-brand-gold text-[9px] uppercase font-bold tracking-widest px-3.5 py-1.5 rounded-bl-xl border-l border-b border-white/10">
            Online Member Portal
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="space-y-1">
              <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest block">Dashboard Overview</span>
              <h1 className="text-2xl font-extrabold uppercase">Welcome back, {currentUser.name}</h1>
              <p className="text-xs text-slate-400">Account Role: <span className="text-white capitalize">{currentUser.role}</span></p>
            </div>
            
            <div className="flex space-x-3">
              <Link to="/projects" className="gold-gradient hover:gold-gradient-hover text-brand-navy font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-lg shadow-md transition">
                Book Another Plot
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-brand-gold/10 rounded-xl text-brand-gold"><Wallet className="w-6 h-6" /></div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Bookings</span>
              <strong className="text-xl font-bold text-brand-navy block mt-0.5">{userBookings.length} Plots</strong>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle className="w-6 h-6" /></div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Approved plots</span>
              <strong className="text-xl font-bold text-brand-navy block mt-0.5">
                {userBookings.filter(b => b.status === 'approved').length} Active
              </strong>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-rose-50 text-rose-500 rounded-xl"><FolderHeart className="w-6 h-6" /></div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Favorites List</span>
              <strong className="text-xl font-bold text-brand-navy block mt-0.5">{wishlistPlots.length} Saved</strong>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Bookings list, Right Wishlist & Profile settings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Columns: Bookings tracker */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-brand-navy uppercase tracking-tight pb-3 border-b border-slate-100">
                Registered Bookings & Allotments
              </h2>

              {userBookings.length > 0 ? (
                <div className="space-y-6">
                  {userBookings.map((booking) => {
                    const plot = plotMap[booking.plot_id];
                    const proj = projectMap[plot?.project_id];
                    
                    // Calculate installment percentage
                    const paid = booking.installment_plan.paid_installments;
                    const total = booking.installment_plan.total_installments;
                    const percentage = Math.round((paid / total) * 100) || 0;

                    return (
                      <div key={booking.id} className="border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition space-y-4">
                        
                        {/* Header card */}
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-sm font-bold text-brand-navy-dark">{proj?.name || 'Project Name'}</h3>
                              <span className={`border text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${getStatusStyle(booking.status)}`}>
                                {booking.status}
                              </span>
                            </div>
                            <span className="text-xs text-slate-400 mt-1 block">
                              Plot P-{plot?.id} ({plot?.size}) | Booking Date: {booking.booking_date}
                            </span>
                          </div>

                          <div className="flex items-center space-x-1">
                            {getStatusIcon(booking.status)}
                          </div>
                        </div>

                        {/* Financial Details */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 rounded-lg p-3 border border-slate-150 text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Plot Price</span>
                            <span className="font-semibold text-slate-700 block mt-0.5">{plot ? formatCurrency(plot.price) : 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Downpayment</span>
                            <span className="font-semibold text-slate-700 block mt-0.5">{plot ? formatCurrency(plot.down_payment) : 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Paid</span>
                            <span className="font-semibold text-brand-gold block mt-0.5">{formatCurrency(booking.installment_plan.amount_paid)}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Payment Status</span>
                            <span className="font-semibold text-slate-700 block mt-0.5 uppercase tracking-wider text-[10px]">{booking.payment_status}</span>
                          </div>
                        </div>

                        {/* Installment Progress */}
                        {booking.status === 'approved' && (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                              <span>Installments Completed: {paid} / {total} Months</span>
                              <span className="text-brand-gold font-bold">{percentage}%</span>
                            </div>
                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                              <div className="gold-gradient h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-end pt-2 border-t border-slate-100/60">
                          <button
                            onClick={() => handlePrintSlip(booking)}
                            className="flex items-center space-x-1.5 text-brand-navy hover:text-brand-gold text-xs font-bold uppercase tracking-wider transition"
                          >
                            <FileDown className="w-3.5 h-3.5" />
                            <span>Download Allotment Challan</span>
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs">
                  <CreditCard className="w-8 h-8 mx-auto text-brand-gold mb-2" />
                  <p>You have not placed any plot bookings yet.</p>
                  <Link to="/projects" className="text-brand-gold font-bold underline mt-2 block">
                    Browse Plots Directory
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Columns: Profile settings & Favorites list */}
          <div className="space-y-6">
            
            {/* Saved Wishlist */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-brand-navy uppercase tracking-tight pb-2 border-b border-slate-100">
                Saved Plots Wishlist
              </h3>

              {wishlistPlots.length > 0 ? (
                <div className="divide-y divide-slate-100 pr-1">
                  {wishlistPlots.map(plot => {
                    const proj = projectMap[plot.project_id];
                    return (
                      <div key={plot.id} className="py-3 flex justify-between items-center text-xs">
                        <div>
                          <Link to={`/projects/${proj?.slug}`} className="font-bold text-brand-navy-dark hover:text-brand-gold transition">
                            Plot P-{plot.id} ({plot.size})
                          </Link>
                          <span className="text-[11px] text-slate-400 block mt-0.5">{proj?.name}</span>
                        </div>

                        <div className="flex items-center space-x-2.5">
                          <span className="font-bold text-brand-navy">{formatCurrency(plot.price)}</span>
                          <button
                            onClick={() => toggleWishlist(plot.id)}
                            className="text-red-400 hover:text-red-600 transition"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs">
                  No saved plots. Click the heart icon in project detail views to save plots.
                </div>
              )}
            </div>

            {/* Profile Settings */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-brand-navy uppercase tracking-tight pb-2 border-b border-slate-100">
                Personal Credentials
              </h3>

              {profileSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 p-2.5 rounded-xl text-center text-xs flex items-center justify-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Profile updated (simulated)</span>
                </div>
              )}

              <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white rounded-xl py-2 px-3 text-brand-navy focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white rounded-xl py-2 px-3 text-brand-navy focus:outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-brand-navy hover:bg-brand-gold hover:text-brand-navy text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center space-x-1.5"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Save Profile</span>
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
