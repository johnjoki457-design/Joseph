import React, { useState } from 'react';
import { X, Calculator, DollarSign, TrendingUp, Fish, Scale, RefreshCw } from 'lucide-react';

interface FarmCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Preset {
  name: string;
  waterM3: number;
  fingerlings: number;
  targetWeightKg: number;
  survivalPct: number;
  fcr: number;
  seedCost: number;
  feedCostPerKg: number;
  sellingPricePerKg: number;
}

const PRESETS: Preset[] = [
  {
    name: 'Circular Cement Tank (15 m³ / 15,000L)',
    waterM3: 15,
    fingerlings: 600, // 40 fish/m³
    targetWeightKg: 0.8,
    survivalPct: 85,
    fcr: 1.4,
    seedCost: 0.25,
    feedCostPerKg: 1.2,
    sellingPricePerKg: 7.0,
  },
  {
    name: 'Biofloc Intensive Tank (30 m³)',
    waterM3: 30,
    fingerlings: 1500, // 50 fish/m³
    targetWeightKg: 0.75,
    survivalPct: 80,
    fcr: 1.35,
    seedCost: 0.25,
    feedCostPerKg: 1.2,
    sellingPricePerKg: 7.0,
  },
  {
    name: 'Small Earthen Pond (0.25 Acre)',
    waterM3: 1000,
    fingerlings: 5000,
    targetWeightKg: 0.9,
    survivalPct: 75,
    fcr: 1.5,
    seedCost: 0.2,
    feedCostPerKg: 1.1,
    sellingPricePerKg: 6.5,
  },
];

export const FarmCalculator: React.FC<FarmCalculatorProps> = ({ isOpen, onClose }) => {
  const [currency, setCurrency] = useState<'$' | '₹'>('$');
  const [currencyMultiplier, setCurrencyMultiplier] = useState(1);

  // States
  const [fingerlings, setFingerlings] = useState(1000);
  const [targetWeightKg, setTargetWeightKg] = useState(0.85); // 850 grams
  const [survivalPct, setSurvivalPct] = useState(82); // 82%
  const [fcr, setFcr] = useState(1.4); // 1.4 kg feed per 1 kg fish
  const [seedCost, setSeedCost] = useState(0.25); // per fingerling
  const [feedCostPerKg, setFeedCostPerKg] = useState(1.2);
  const [sellingPricePerKg, setSellingPricePerKg] = useState(7.5);

  if (!isOpen) return null;

  // Calculations
  const survivingFish = Math.round(fingerlings * (survivalPct / 100));
  const totalBiomassHarvestKg = survivingFish * targetWeightKg;
  const totalFeedKg = totalBiomassHarvestKg * fcr;
  const totalSeedExpense = fingerlings * seedCost;
  const totalFeedExpense = totalFeedKg * feedCostPerKg;
  const otherExpenses = (totalSeedExpense + totalFeedExpense) * 0.15; // 15% aeration, labor, water
  const totalCost = totalSeedExpense + totalFeedExpense + otherExpenses;
  const grossRevenue = totalBiomassHarvestKg * sellingPricePerKg;
  const netProfit = grossRevenue - totalCost;
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  const handleCurrencySwitch = (newCurr: '$' | '₹') => {
    if (newCurr === currency) return;
    if (newCurr === '₹') {
      // multiply roughly by 85
      setSeedCost((prev) => Math.round(prev * 85));
      setFeedCostPerKg((prev) => Math.round(prev * 85));
      setSellingPricePerKg((prev) => Math.round(prev * 85));
      setCurrency('₹');
    } else {
      setSeedCost((prev) => +(prev / 85).toFixed(2));
      setFeedCostPerKg((prev) => +(prev / 85).toFixed(2));
      setSellingPricePerKg((prev) => +(prev / 85).toFixed(2));
      setCurrency('$');
    }
  };

  const applyPreset = (preset: Preset) => {
    setFingerlings(preset.fingerlings);
    setTargetWeightKg(preset.targetWeightKg);
    setSurvivalPct(preset.survivalPct);
    setFcr(preset.fcr);
    if (currency === '$') {
      setSeedCost(preset.seedCost);
      setFeedCostPerKg(preset.feedCostPerKg);
      setSellingPricePerKg(preset.sellingPricePerKg);
    } else {
      setSeedCost(Math.round(preset.seedCost * 85));
      setFeedCostPerKg(Math.round(preset.feedCostPerKg * 85));
      setSellingPricePerKg(Math.round(preset.sellingPricePerKg * 85));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Murrel Aquaculture Economics</h2>
              <p className="text-xs text-slate-500">Stocking, Feed Conversion & Profit Estimator</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Currency selector */}
            <div className="flex items-center bg-white rounded-lg p-0.5 border border-slate-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => handleCurrencySwitch('$')}
                className={`px-2 py-1 rounded-md transition-all ${currency === '$' ? 'bg-emerald-600 text-white' : 'text-slate-600'}`}
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => handleCurrencySwitch('₹')}
                className={`px-2 py-1 rounded-md transition-all ${currency === '₹' ? 'bg-emerald-600 text-white' : 'text-slate-600'}`}
              >
                INR (₹)
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Presets */}
        <div className="px-6 pt-4 pb-2 bg-slate-50/50 border-b border-slate-100">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Quick System Presets:
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(p)}
                className="text-xs px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 font-medium text-slate-700 shadow-2xs transition-all cursor-pointer"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs & Outputs */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Fingerlings count */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Fingerlings Stocked (Pieces)
              </label>
              <input
                type="number"
                min="50"
                step="50"
                value={fingerlings}
                onChange={(e) => setFingerlings(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
              />
            </div>

            {/* Target Harvest Weight */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Target Weight per Fish (kg)
              </label>
              <input
                type="number"
                min="0.3"
                max="3.0"
                step="0.05"
                value={targetWeightKg}
                onChange={(e) => setTargetWeightKg(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
              />
              <span className="text-[11px] text-slate-400">Typical Murrel harvest is 0.70 - 1.0 kg (6-8 months)</span>
            </div>

            {/* Survival Rate */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Survival Rate (%)
              </label>
              <input
                type="number"
                min="30"
                max="100"
                value={survivalPct}
                onChange={(e) => setSurvivalPct(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
              />
            </div>

            {/* FCR */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Feed Conversion Ratio (FCR)
              </label>
              <input
                type="number"
                min="1.0"
                max="2.5"
                step="0.05"
                value={fcr}
                onChange={(e) => setFcr(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
              />
              <span className="text-[11px] text-slate-400">Commercial floating feed: 1.3 - 1.5</span>
            </div>

            {/* Seed Cost */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Seed Cost per Fingerling ({currency})
              </label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={seedCost}
                onChange={(e) => setSeedCost(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
              />
            </div>

            {/* Feed Cost */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Feed Cost per kg ({currency})
              </label>
              <input
                type="number"
                min="0.1"
                step="0.05"
                value={feedCostPerKg}
                onChange={(e) => setFeedCostPerKg(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 text-slate-900"
              />
            </div>

            {/* Market Selling Price */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Expected Selling Price per kg Live Murrel ({currency})
              </label>
              <input
                type="number"
                min="0.5"
                step="0.1"
                value={sellingPricePerKg}
                onChange={(e) => setSellingPricePerKg(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 text-slate-900 font-semibold"
              />
            </div>
          </div>

          {/* KPI Cards */}
          <div className="pt-2 border-t border-slate-100">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[11px] text-slate-500 block">Surviving Fish</span>
                <span className="text-base font-bold text-slate-800">
                  {survivingFish.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">heads</span>
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                <span className="text-[11px] text-emerald-800 block">Total Biomass Yield</span>
                <span className="text-base font-bold text-emerald-900">
                  {Math.round(totalBiomassHarvestKg).toLocaleString()} kg
                </span>
                <span className="text-[10px] text-emerald-700 block mt-0.5">at {targetWeightKg}kg/fish</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[11px] text-slate-500 block">Feed Required</span>
                <span className="text-base font-bold text-slate-800">
                  {Math.round(totalFeedKg).toLocaleString()} kg
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">FCR: {fcr}</span>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100">
                <span className="text-[11px] text-amber-800 block">Total Investment</span>
                <span className="text-base font-bold text-amber-900">
                  {currency}{Math.round(totalCost).toLocaleString()}
                </span>
                <span className="text-[10px] text-amber-700 block mt-0.5">Seed + Feed + Power</span>
              </div>

            </div>

            {/* Bottom Final Result Banner */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-700/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-emerald-100 uppercase tracking-wider font-semibold">
                    Gross Harvest Revenue
                  </div>
                  <div className="text-xl font-bold">
                    {currency}{Math.round(grossRevenue).toLocaleString()}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs text-emerald-100 uppercase tracking-wider font-semibold">
                    Estimated Net Profit (ROI {Math.round(roi)}%)
                  </div>
                  <div className={`text-2xl font-black ${netProfit >= 0 ? 'text-white' : 'text-rose-200'}`}>
                    {currency}{Math.round(netProfit).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
