import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Info, DollarSign, Square, CheckCircle, HelpCircle } from 'lucide-react';

export default function MockMap({ projectId, onSelectPlot, selectedPlotId }) {
  const { plots } = useApp();
  const projectPlots = plots.filter(p => p.project_id === parseInt(projectId));
  const [hoveredPlot, setHoveredPlot] = useState(null);

  // Group plots into a simulated grid representing a physical block (Sectors A-C)
  const rows = [];
  const itemsPerRow = 4;
  for (let i = 0; i < projectPlots.length; i += itemsPerRow) {
    rows.push(projectPlots.slice(i, i + itemsPerRow));
  }

  const getStatusColor = (status, isSelected) => {
    if (isSelected) return 'bg-brand-gold border-white text-brand-navy shadow-lg scale-105';
    switch (status) {
      case 'available':
        return 'bg-emerald-500/15 hover:bg-emerald-500/30 border-emerald-500 text-emerald-400';
      case 'pending':
        return 'bg-amber-500/15 hover:bg-amber-500/30 border-amber-500 text-amber-400';
      case 'booked':
        return 'bg-rose-500/10 border-rose-900/30 text-rose-500 cursor-not-allowed opacity-60';
      default:
        return 'bg-slate-800 border-slate-700 text-slate-400';
    }
  };

  if (projectPlots.length === 0) {
    return (
      <div className="bg-brand-navy-light border border-white/10 rounded-2xl p-8 text-center text-slate-400">
        <Info className="w-8 h-8 text-brand-gold mx-auto mb-3" />
        <p className="text-sm">Interactive master plan is loading or no plots are registered for this project yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-brand-navy-dark border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-brand-gold/10 text-brand-gold text-[10px] uppercase font-bold tracking-widest px-3.5 py-1.5 rounded-bl-xl border-l border-b border-white/10">
        Interactive Sector Map
      </div>

      <div className="mb-6">
        <h4 className="text-white font-bold text-base">Select Your Plot Physically</h4>
        <p className="text-xs text-slate-400 mt-0.5">Click any active green plot to open the calculator and booking request form.</p>
      </div>

      {/* Grid Map layout */}
      <div className="bg-brand-navy/60 border border-white/5 rounded-xl p-4 sm:p-8 flex flex-col items-center justify-center min-h-[300px]">
        {/* Main Road overlay representation */}
        <div className="w-full bg-slate-900 border-t border-b border-dashed border-slate-700 py-2.5 text-center text-[10px] tracking-[0.3em] font-semibold text-slate-500 uppercase rounded-md mb-8">
          ✦ Main Boulevard (120 Feet Wide) ✦
        </div>

        {/* Rows of plots */}
        <div className="grid gap-4 w-full max-w-md">
          {rows.map((row, rIndex) => (
            <div key={rIndex} className="grid grid-cols-4 gap-3">
              {row.map(plot => {
                const isSelected = selectedPlotId === plot.id;
                return (
                  <button
                    key={plot.id}
                    disabled={plot.status === 'booked'}
                    onClick={() => onSelectPlot && onSelectPlot(plot)}
                    onMouseEnter={() => setHoveredPlot(plot)}
                    onMouseLeave={() => setHoveredPlot(null)}
                    className={`border rounded-xl p-3 flex flex-col items-center justify-center transition-all duration-300 text-center focus:outline-none hover:scale-105 hover:shadow-md active:scale-95 ${getStatusColor(plot.status, isSelected)}`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider">P-{plot.id}</span>
                    <span className="text-[9px] opacity-75 mt-0.5 font-medium">{plot.size}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Street representation */}
        <div className="w-full bg-slate-900 border-t border-b border-dashed border-slate-700 py-1.5 text-center text-[8px] tracking-[0.2em] text-slate-500 uppercase rounded-md mt-8">
          Street Road (40 Feet Wide)
        </div>
      </div>

      {/* Map Legend */}
      <div className="flex flex-wrap justify-between items-center mt-6 pt-6 border-t border-white/5 text-xs text-slate-400 gap-4">
        <div className="flex space-x-6">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Pending approval</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span>Booked</span>
          </div>
        </div>

        {/* Selected / Hover Info box */}
        <div className="h-6">
          {hoveredPlot ? (
            <span className="text-brand-gold text-xs font-semibold animate-pulse">
              Plot {hoveredPlot.id} - {hoveredPlot.size} ({hoveredPlot.type}): PKR {(hoveredPlot.price / 100000).toFixed(1)} Lakh
            </span>
          ) : selectedPlotId ? (
            <span className="text-white text-xs font-semibold">
              Selected Plot: P-{selectedPlotId}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
