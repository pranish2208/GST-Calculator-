import React from 'react';
import { Percent } from 'lucide-react';

const PRESET_RATES = [0, 5, 12, 18, 28];

export default function GSTRateSelector({ gstRate, setGstRate, customRate, setCustomRate, isCustom, setIsCustom }) {
  
  const handlePresetSelect = (rate) => {
    setIsCustom(false);
    setGstRate(rate);
    setCustomRate('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setCustomRate(val);
      setIsCustom(true);
      const parsed = parseFloat(val);
      setGstRate(isNaN(parsed) ? 0 : Math.min(100, parsed));
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
          GST Rate (%) <span className="text-rose-500">*</span>
        </label>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
          Selected: {gstRate}%
        </span>
      </div>

      {/* Preset Buttons Grid */}
      <div className="grid grid-cols-5 gap-2">
        {PRESET_RATES.map((rate) => {
          const isSelected = !isCustom && gstRate === rate;
          return (
            <button
              key={rate}
              type="button"
              onClick={() => handlePresetSelect(rate)}
              className={`py-2.5 px-2 rounded-xl text-sm font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 border ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25 scale-[1.02]'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              {rate}%
            </button>
          );
        })}
      </div>

      {/* Custom Rate Input Toggle */}
      <div className="mt-2">
        <div className="relative">
          <input
            type="text"
            inputMode="decimal"
            value={customRate}
            onChange={handleCustomChange}
            placeholder="Or enter custom rate % (e.g. 7.5)"
            className={`w-full pr-10 pl-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-xl text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
              isCustom
                ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/20 dark:bg-indigo-950/20'
                : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-500'
            }`}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <Percent className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
