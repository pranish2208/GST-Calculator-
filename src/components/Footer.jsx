import React from 'react';
import { Calculator, Heart, ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Professional Disclaimer Box */}
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400 space-y-1">
          <div className="font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5 mb-1">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <span>Disclaimer</span>
          </div>
          <p>
            This calculator is provided for informational and estimation purposes only. GST rates and tax treatment may vary depending on the applicable law, notification, product/service classification and transaction details. Verify applicable GST requirements with official GST/CBIC resources or a qualified tax professional.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Calculator className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white">
              GST Calculator India
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-right">
            GST calculations are provided for informational purposes. Verify applicable rates and tax treatment from official GST/CBIC sources.
          </p>
        </div>

        <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 dark:text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} GST Calculator India. All rights reserved.</p>
          <div className="flex items-center space-x-1">
            <span>Built with precision for Indian Traders, Accountants & Consumers</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
