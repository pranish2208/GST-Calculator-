import React from 'react';
import { Zap, ArrowUpRight } from 'lucide-react';
import { formatIndianCurrency } from '../utils/gstCalculator';

const EXAMPLES = [
  {
    amount: '1000',
    rate: 18,
    mode: 'exclusive',
    label: '₹1,000 at 18% GST',
    description: 'Services, IT & standard items',
  },
  {
    amount: '5000',
    rate: 12,
    mode: 'exclusive',
    label: '₹5,000 at 12% GST',
    description: 'Apparel & processed goods',
  },
  {
    amount: '10000',
    rate: 5,
    mode: 'exclusive',
    label: '₹10,000 at 5% GST',
    description: 'Household essentials & transport',
  },
];

export default function QuickExamples({ onLoadExample }) {
  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center space-x-2">
        <div className="p-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <Zap className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          Try Quick Examples
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {EXAMPLES.map((ex, idx) => (
          <button
            key={idx}
            onClick={() => onLoadExample(ex)}
            className="group text-left p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {ex.label}
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {ex.description}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
              <span className="text-slate-400">Rate: {ex.rate}%</span>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">Auto-fill →</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
