import React from 'react';
import { X, BookOpen, Droplets, Thermometer, ShieldAlert, HeartPulse, Check, Sparkles, AlertTriangle } from 'lucide-react';

interface SpeciesGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpeciesGuideModal: React.FC<SpeciesGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Murrel Fish Care & Aquaculture Guide</h2>
              <p className="text-xs text-slate-500">Biological Parameters & Best Farming Practices</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Guide Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 text-slate-700 text-sm">
          
          {/* Quick Water Specs */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-emerald-600" />
              Optimal Water Parameters
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl">
                <span className="text-xs text-slate-500 block">Water Temp</span>
                <span className="text-base font-bold text-emerald-950">26°C – 32°C</span>
                <span className="text-[11px] text-emerald-700 block mt-0.5">Below 20°C slows growth</span>
              </div>
              <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl">
                <span className="text-xs text-slate-500 block">pH Range</span>
                <span className="text-base font-bold text-emerald-950">6.8 – 8.2</span>
                <span className="text-[11px] text-emerald-700 block mt-0.5">Neutral to slightly alkaline</span>
              </div>
              <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl">
                <span className="text-xs text-slate-500 block">Dissolved Oxygen</span>
                <span className="text-base font-bold text-emerald-950">&gt; 3.0 mg/L</span>
                <span className="text-[11px] text-emerald-700 block mt-0.5">Has air-breathing organ</span>
              </div>
              <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl">
                <span className="text-xs text-slate-500 block">Total Ammonia (TAN)</span>
                <span className="text-base font-bold text-emerald-950">&lt; 0.05 mg/L</span>
                <span className="text-[11px] text-emerald-700 block mt-0.5">Weekly bottom siphoning</span>
              </div>
            </div>
          </div>

          {/* Golden Rules for Farming */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              Crucial Farm Management Rules
            </h3>
            <div className="space-y-2.5">
              <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-950 text-xs uppercase tracking-wide">
                    1. Grading Every 10–14 Days Is Non-Negotiable
                  </h4>
                  <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                    Murrels are aggressive ambush predators. If fingerling sizes deviate by more than 20%, larger fish will swallow smaller siblings head-first. Regular size-grading with sorting trays prevents 30–50% mortality.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                    2. Anti-Jump Nets on All Tanks and Ponds
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Murrels possess serpentine bodies and can slither across damp ground and jump up to 3 feet out of the water, especially during nocturnal rains. Install 1.5m perimeter nylon fencing around ponds or top covers on cement tanks.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                    3. Feed Training onto Formulated Pellets
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Start fry with Moina/Artemia nauplii. At 2 inches (5 cm), wean them using minced trash fish blended with micro-pellets. Feed at consistent hours and designated feeding stations twice daily to create strong surface reflex feeding.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Health & Medicinal Value */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
            <div className="flex items-center gap-2 mb-2 font-bold text-sm">
              <HeartPulse className="w-5 h-5 text-emerald-200" />
              Why Murrel Commands Top Retail Prices (Medicinal Value)
            </div>
            <p className="text-xs text-emerald-50 leading-relaxed">
              Murrel flesh is uniquely loaded with <strong>albumin</strong> (a crucial serum protein), glycine, and arachidonic acid. It is traditionally prescribed across Southeast Asia and India for post-surgical patient recovery, maternal healing after childbirth, and chronic wound restoration. Live Murrel can survive in wet gunny bags for hours, giving farmers unprecedented leverage in live-fish retail markets.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
