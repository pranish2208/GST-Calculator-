import React from 'react';
import { IndianRupee, XCircle, AlertCircle } from 'lucide-react';

export default function AmountInput({ amount, setAmount, error, label = "Amount Before GST", helpText = "Enter the taxable amount before GST.", placeholder = "e.g. 10000" }) {
  const handleChange = (e) => {
    const val = e.target.value;
    // Allow numbers, single decimal point, and empty string
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setAmount(val);
    }
  };

  const handleClear = () => {
    setAmount('');
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label htmlFor="amount-input" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
          {label} <span className="text-rose-500">*</span>
        </label>
        {amount && (
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex items-center space-x-1 transition-colors"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="relative rounded-xl shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
          <IndianRupee className="w-5 h-5" />
        </div>
        
        <input
          id="amount-input"
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border rounded-xl font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 text-lg ${
            error
              ? 'border-rose-400 dark:border-rose-600 focus:ring-rose-500/20 focus:border-rose-500'
              : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-500 hover:border-slate-300 dark:hover:border-slate-600'
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? "amount-error" : undefined}
        />
      </div>

      {error ? (
        <p id="amount-error" className="text-xs text-rose-500 dark:text-rose-400 flex items-center space-x-1 font-medium pt-0.5">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </p>
      ) : (
        <p className="text-xs text-slate-400 dark:text-slate-500">
          {helpText}
        </p>
      )}
    </div>
  );
}
