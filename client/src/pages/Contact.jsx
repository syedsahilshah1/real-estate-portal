import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import RevealOnScroll from '../components/RevealOnScroll';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';

export default function Contact() {
  const { submitInquiry } = useApp();
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (!form.name || !form.email || !form.phone || !form.message) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    const res = await submitInquiry({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
      project_id: null
    });

    setLoading(false);
    if (res.success) {
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } else {
      setError(res.message || 'Submission failed');
    }
  };

  const offices = [
    {
      city: 'Head Office (Islamabad)',
      address: 'Faisal Tower, Main G.T. Road, Sector A, Faisal Town, Islamabad, Pakistan',
      phone: '+92 (51) 111-555-666',
      email: 'info@faisaltowngroup.com',
      timing: 'Mon - Sat: 9:00 AM to 5:00 PM'
    },
    {
      city: 'Rawalpindi Office',
      address: 'Office 12, First Floor, Thalian Interchange Plaza, Rawalpindi',
      phone: '+92 (51) 222-333-444',
      email: 'rwp@faisaltowngroup.com',
      timing: 'Mon - Sat: 9:00 AM to 5:00 PM'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      {/* Banner */}
      <div className="bg-brand-navy text-white py-20 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-dark via-brand-navy/95 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll animation="down" delay={100}>
            <span className="text-brand-gold text-xs uppercase tracking-widest font-bold">24/7 Corporate Relations</span>
          </RevealOnScroll>
          <RevealOnScroll animation="up" delay={200}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase mt-2 tracking-tight">Contact & Locations</h1>
          </RevealOnScroll>
          <RevealOnScroll animation="up" delay={300}>
            <p className="text-slate-300 text-sm max-w-lg mt-3 leading-relaxed">
              Reach out to our customer service desk or visit our main office towers for site-visit arrangements.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      {/* Image 4 Style Editorial Banner with Faint Watermark */}
      <div className="relative max-w-5xl mx-auto px-4 py-8 text-center flex items-center justify-center mb-12">
        <div className="absolute text-[6rem] sm:text-[9rem] lg:text-[10rem] font-serif font-bold uppercase tracking-widest text-slate-200/40 select-none pointer-events-none z-0">
          LOCATION
        </div>
        <p className="relative z-10 text-lg sm:text-2xl font-serif text-slate-800 leading-relaxed max-w-3xl">
          Connect directly with FaisalTown Group investment officers for site tours and NOC verification
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Office Cards */}
          <div className="lg:col-span-1 space-y-6">
            <RevealOnScroll animation="left" delay={100}>
              <h2 className="text-xl font-bold text-brand-navy-dark uppercase tracking-tight mb-4">Our Corporate Offices</h2>
            </RevealOnScroll>
            
            {offices.map((office, idx) => (
              <RevealOnScroll key={idx} animation="left" delay={150 + idx * 120}>
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 space-y-4">
                  <span className="text-xs text-brand-gold font-extrabold uppercase tracking-wider block">{office.city}</span>
                  
                  <div className="space-y-3.5 text-xs text-slate-600">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-4 h-4 text-brand-navy-slate mt-0.5 shrink-0" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-3.5 h-3.5 text-brand-navy-slate shrink-0" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-3.5 h-3.5 text-brand-navy-slate shrink-0" />
                      <span>{office.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-3.5 h-3.5 text-brand-navy-slate shrink-0" />
                      <span>{office.timing}</span>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <RevealOnScroll animation="up" delay={200}>
              <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-md">
                <h2 className="text-xl font-extrabold text-brand-navy uppercase tracking-tight pb-3 border-b border-slate-100">Send us a Direct Message</h2>
                <p className="text-slate-500 text-xs mt-2 mb-6">Need general information or NOC papers? Leave a message below, and we will reply within 24 hours.</p>

                {success ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-emerald-700 text-center animate-fade-in flex flex-col items-center">
                    <Check className="w-10 h-10 text-emerald-600 mb-2" />
                    <strong className="text-sm font-bold block mb-1">Message Sent Successfully!</strong>
                    <span className="text-xs">Your inquiry reference code has been recorded. Check your email for reply progress.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Your Full Name</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Enter name"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white rounded-xl py-3 px-4 text-xs text-brand-navy placeholder-slate-400 focus:outline-none transition"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="e.g. +92 300 1234567"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white rounded-xl py-3 px-4 text-xs text-brand-navy placeholder-slate-400 focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="e.g. email@example.com"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white rounded-xl py-3 px-4 text-xs text-brand-navy placeholder-slate-400 focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Your Message / Query</label>
                      <textarea
                        rows="4"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Enter details..."
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-gold focus:bg-white rounded-xl py-3 px-4 text-xs text-brand-navy placeholder-slate-400 focus:outline-none transition resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-shine w-full py-3.5 gold-gradient hover:gold-gradient-hover text-brand-navy font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg transition flex items-center justify-center space-x-2 hover:scale-102"
                    >
                      {loading ? (
                        <span className="animate-pulse">Submitting...</span>
                      ) : (
                        <>
                          <span>Submit Query</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Embedded Iframe Map Section */}
        <RevealOnScroll animation="zoom" delay={300}>
          <div className="mt-12 bg-white border border-slate-200 rounded-3xl p-4 shadow-md overflow-hidden h-96">
            <div className="w-full h-full bg-slate-100 rounded-2xl relative flex items-center justify-center border border-slate-200 overflow-hidden">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px]"></div>
              <div className="z-10 text-center space-y-2">
                <MapPin className="w-10 h-10 text-brand-gold mx-auto animate-bounce" />
                <strong className="text-brand-navy text-sm font-bold block uppercase tracking-wider">Faisal Tower</strong>
                <span className="text-xs text-slate-500 block max-w-xs mx-auto">Main G.T Road, Sector A-1, Faisal Town, Islamabad</span>
              </div>
              
              <div className="absolute top-1/2 left-0 w-full h-[60px] bg-slate-200/50 border-t border-b border-white -rotate-6"></div>
              <div className="absolute top-0 left-1/3 w-[60px] h-full bg-slate-200/50 border-l border-r border-white -rotate-12"></div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
