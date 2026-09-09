import React from 'react';
import { MapPin, ArrowRightLeft } from 'lucide-react';

export default function TransactionTypeSelector({ transactionType, setTransactionType }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
        Transaction Type
      </label>

      <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800">
        {/* Intra-State Option */}
        <button
          type="button"
          onClick={() => setTransactionType('intra')}
          className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${
            transactionType === 'intra'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/80 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <MapPin className="w-4 h-4 text-indigo-500" />
          <span>Intra-State</span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-wider font-semibold opacity-75">(CGST+SGST)</span>
        </button>

        {/* Inter-State Option */}
        <button
          type="button"
          onClick={() => setTransactionType('inter')}
          className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${
            transactionType === 'inter'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/80 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4 text-purple-500" />
          <span>Inter-State</span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-wider font-semibold opacity-75">(IGST)</span>
        </button>
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 italic">
        {transactionType === 'intra'
          ? 'Within same state/UT → Tax split equally into CGST & SGST.'
          : 'Between different states/UTs → Full tax charged as IGST.'}
      </p>
    </div>
  );
}
