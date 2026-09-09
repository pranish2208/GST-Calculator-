import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GSTCalculator from './components/GSTCalculator';
import EducationalSection from './components/EducationalSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  // Theme state with localstorage persistence
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('gst_theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('gst_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('gst_theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      
      {/* Header Bar */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        
        {/* Hero Banner Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-sm">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Simple & Accurate GST Calculator for India</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            GST Calculator India
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium">
            Calculate GST, CGST, SGST and IGST instantly with precision Indian Rupee formatting.
          </p>
        </section>

        {/* Core Calculator Application */}
        <section id="calculator">
          <GSTCalculator />
        </section>

        {/* Educational Content & GST Slabs */}
        <EducationalSection />

        {/* FAQ Section */}
        <FAQ />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
