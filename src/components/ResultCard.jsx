import React, { useState } from 'react';
import { Copy, Check, Sparkles, PieChart, Info, Calculator } from 'lucide-react';
import { formatIndianCurrency, formatResultForClipboard } from '../utils/gstCalculator';

export default function ResultCard({ result }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!result) return;
    const textToCopy = formatResultForClipboard(result);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // If no valid result exists (e.g., input is empty or after reset)
  if (!result) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-7 shadow-2xl border border-indigo-900/50 flex flex-col justify-center items-center text-center min-h-[420px]">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-indigo-300 mb-4">
          <Calculator className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Ready to Calculate</h3>
        <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
          Enter an amount above and select a GST rate to view the detailed tax breakdown instantly.
        </p>
      </div>
    );
  }

  // Dynamic percentage composition of FINAL AMOUNT
  const baseShare = result.baseSharePercent;
  const taxShare = result.taxSharePercent;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-7 shadow-2xl border border-indigo-900/50 flex flex-col justify-between">
      
      {/* Decorative ambient background glows */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Card Header & Copy Button */}
        <div className="flex justify-between items-center pb-5 border-b border-slate-800/80">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold tracking-tight text-white">
              Calculation Breakdown
            </h3>
          </div>

          <button
            onClick={handleCopy}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              copied
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30 scale-105'
                : 'bg-indigo-600/40 hover:bg-indigo-600/70 text-indigo-200 border border-indigo-500/30'
            }`}
            title="Copy formatted result to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Result</span>
              </>
            )}
          </button>
        </div>

        {/* Highlighted Final Amount Big Stat */}
        <div className="my-6 p-4 rounded-xl bg-indigo-900/30 border border-indigo-800/40 backdrop-blur-sm text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
              FINAL AMOUNT (INCL. GST)
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
              {formatIndianCurrency(result.finalAmount)}
            </div>
          </div>
          <div className="mt-2 sm:mt-0 inline-flex self-start sm:self-auto items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            GST Mode: {result.mode === 'inclusive' ? 'Inclusive' : 'Exclusive'}
          </div>
        </div>

        {/* Detailed Breakdown Rows */}
        <div className="space-y-3.5 text-sm">
          {/* Base Amount */}
          <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
            <span className="text-slate-300 font-medium">Original Amount (Excl. GST)</span>
            <span className="font-bold text-white text-base">
              {formatIndianCurrency(result.originalAmount)}
            </span>
          </div>

          {/* GST Tax Breakdown */}
          {result.isIntraState ? (
            <>
              <div className="flex justify-between items-center py-1.5 text-slate-300">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>CGST ({result.cgstRate}%)</span>
                </span>
                <span className="font-semibold text-emerald-300">
                  {formatIndianCurrency(result.cgstAmount)}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 text-slate-300">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  <span>SGST ({result.sgstRate}%)</span>
                </span>
                <span className="font-semibold text-teal-300">
                  {formatIndianCurrency(result.sgstAmount)}
                </span>
              </div>
            </>
          ) : (
            <div className="flex justify-between items-center py-1.5 text-slate-300">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>IGST ({result.igstRate}%)</span>
              </span>
              <span className="font-semibold text-purple-300">
                {formatIndianCurrency(result.igstAmount)}
              </span>
            </div>
          )}

          {/* Total GST Amount */}
          <div className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-slate-800/60 border border-slate-700/50">
            <span className="font-semibold text-indigo-200">
              Total GST ({result.gstRate}%)
            </span>
            <span className="font-bold text-indigo-300 text-base">
              + {formatIndianCurrency(result.gstAmount)}
            </span>
          </div>
        </div>

        {/* Dynamic Visual Share Bar */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-400">
            <span className="flex items-center space-x-1">
              <PieChart className="w-3.5 h-3.5 text-indigo-400" />
              <span>Base ({baseShare}%)</span>
            </span>
            <span>Tax ({taxShare}%)</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex p-0.5 border border-slate-700/50">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-l-full transition-all duration-500"
              style={{ width: `${baseShare}%` }}
              title={`Base Share of Final Invoice: ${baseShare}%`}
            />
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-r-full transition-all duration-500"
              style={{ width: `${taxShare}%` }}
              title={`Tax Share of Final Invoice: ${taxShare}%`}
            />
          </div>
        </div>
      </div>

      {/* Note Footnote */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center space-x-1.5">
        <Info className="w-3.5 h-3.5 flex-shrink-0 text-indigo-400" />
        <span>GST calculations are for estimation purposes based on standard Indian rules.</span>
      </div>

    </div>
  );
}
