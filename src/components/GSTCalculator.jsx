import React, { useState, useMemo } from 'react';
import AmountInput from './AmountInput';
import GSTRateSelector from './GSTRateSelector';
import TransactionTypeSelector from './TransactionTypeSelector';
import ResultCard from './ResultCard';
import QuickExamples from './QuickExamples';
import { calculateGST, validateAndParseAmount } from '../utils/gstCalculator';
import { RotateCcw, Calculator, PlusCircle, MinusCircle } from 'lucide-react';

export default function GSTCalculator() {
  // Main calculator state
  const [mode, setMode] = useState('exclusive'); // 'exclusive' | 'inclusive'
  const [amount, setAmount] = useState('10000');
  const [gstRate, setGstRate] = useState(18);
  const [customRate, setCustomRate] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [transactionType, setTransactionType] = useState('intra'); // 'intra' | 'inter'

  // Input validation
  const validation = useMemo(() => {
    return validateAndParseAmount(amount);
  }, [amount]);

  // Real-time calculation output (recalculates immediately whenever mode, amount, gstRate, or transactionType changes)
  const calculationResult = useMemo(() => {
    if (!validation.isValid) return null;
    return calculateGST({
      mode,
      amount: validation.val,
      gstRate,
      transactionType,
    });
  }, [mode, validation, gstRate, transactionType]);

  // Reset calculator to clean baseline state
  const handleReset = () => {
    setMode('exclusive');
    setAmount('');
    setGstRate(18);
    setCustomRate('');
    setIsCustom(false);
    setTransactionType('intra');
  };

  // Auto load quick example
  const handleLoadExample = (example) => {
    setAmount(example.amount);
    setGstRate(example.rate);
    setIsCustom(false);
    setCustomRate('');
    if (example.mode) setMode(example.mode);
  };

  return (
    <div className="w-full space-y-8">
      {/* Main Card Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors duration-300">
        
        {/* Header & Mode Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
              <span>GST Calculator</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Calculate GST quickly and accurately for GST-inclusive & exclusive prices.
            </p>
          </div>

          {/* Calculator Mode Toggle Tabs */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setMode('exclusive')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                mode === 'exclusive'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>GST Exclusive</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('inclusive')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                mode === 'inclusive'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MinusCircle className="w-4 h-4" />
              <span>GST Inclusive</span>
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          
          {/* Left Column: Calculator Inputs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Amount Input with dynamic mode-based labels */}
            <AmountInput
              amount={amount}
              setAmount={setAmount}
              error={validation.error}
              label={mode === 'exclusive' ? "Amount Before GST" : "Amount Including GST"}
              helpText={mode === 'exclusive' ? "Enter the taxable amount before GST." : "Enter the final amount that already includes GST."}
              placeholder={mode === 'exclusive' ? "e.g. 900000" : "e.g. 1152000"}
            />

            {/* GST Rate Selector */}
            <GSTRateSelector
              gstRate={gstRate}
              setGstRate={setGstRate}
              customRate={customRate}
              setCustomRate={setCustomRate}
              isCustom={isCustom}
              setIsCustom={setIsCustom}
            />

            {/* Transaction Type Selector */}
            <TransactionTypeSelector
              transactionType={transactionType}
              setTransactionType={setTransactionType}
            />

            {/* Action Buttons */}
            <div className="pt-2 flex items-center space-x-3">
              <button
                type="button"
                onClick={() => {
                  if (!amount) setAmount('10000');
                }}
                className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-base shadow-lg shadow-indigo-500/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-[0.99] flex items-center justify-center space-x-2"
              >
                <Calculator className="w-5 h-5" />
                <span>Calculate GST</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="py-3.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 flex items-center space-x-1.5"
                title="Reset values"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>

          </div>

          {/* Right Column: Visual Result Summary Card */}
          <div className="lg:col-span-5">
            <ResultCard result={calculationResult} />
          </div>

        </div>

        {/* Quick Examples Section */}
        <QuickExamples onLoadExample={handleLoadExample} />

      </div>
    </div>
  );
}
