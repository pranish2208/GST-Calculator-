import React from 'react';
import { HelpCircle, Calculator, Table, CheckCircle2, AlertTriangle } from 'lucide-react';

const COMMON_GST_RATES_DATA = [
  {
    rate: '0%',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    category: 'Exempt / Essential Goods',
    items: 'Fresh food, milk, eggs, unbranded grain, salt, newspaper, judicial papers, handlooms.',
  },
  {
    rate: '5%',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    category: 'Mass Consumption Items',
    items: 'Packaged food items, tea, coffee, edible oil, sugar, spices, footwear under specified limits, domestic air travel.',
  },
  {
    rate: '12%',
    badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    category: 'Standard Goods & Processed Items',
    items: 'Processed food, butter, cheese, ghee, computers, apparel above specified limits, business class air travel.',
  },
  {
    rate: '18%',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    category: 'Standard Rate (Services & Goods)',
    items: 'Hair oil, toothpaste, soap, capital goods, IT services, financial services, telecom services, restaurants.',
  },
  {
    rate: '28%',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    category: 'Luxury & Specified Goods',
    items: 'Automobiles, motorcycles, ACs, refrigerators, aerated drinks, pan masala, specified tobacco products.',
  },
];

export default function EducationalSection() {
  return (
    <section className="mt-16 space-y-16">
      
      {/* What is GST Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              What is Goods and Services Tax (GST)?
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Understanding India's indirect taxation framework
            </p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            Introduced on <strong>July 1, 2017</strong>, GST (Goods and Services Tax) is a comprehensive, multi-stage, destination-based indirect tax levied on value addition in India. GST replaced multiple indirect taxes such as Excise Duty, Service Tax, VAT, and CST.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                <span>CGST (Central GST)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Central Goods and Services Tax charged by the Central Government on eligible intra-state supplies.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                <span>SGST (State GST)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                State Goods and Services Tax charged by the State Government on eligible intra-state supplies.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-purple-500" />
                <span>IGST (Integrated GST)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Integrated Goods and Services Tax generally applies to inter-state supplies and certain other specified transactions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How to Calculate GST Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              How to Calculate GST?
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Simple formulas for GST Exclusive and GST Inclusive calculations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Formula 1: Exclusive */}
          <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white">
              1. GST Exclusive (Add GST to Price)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Use when you have the base cost and want to calculate tax & total bill amount.
            </p>
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl font-mono text-xs sm:text-sm text-indigo-900 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800">
              GST Amount = Original Amount × GST Rate ÷ 100<br/>
              Final Amount = Original Amount + GST Amount
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Example:</span>
              <p>For ₹1,000 at 18% GST:</p>
              <p>GST = ₹180</p>
              <p>Final = ₹1,180</p>
            </div>
          </div>

          {/* Formula 2: Inclusive */}
          <div className="p-6 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 space-y-3">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-600 text-white">
              2. GST Inclusive (Remove GST from Price)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Use when the total bill amount already includes GST and you want to extract tax.
            </p>
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl font-mono text-xs sm:text-sm text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-800">
              Original Amount = (Inclusive Amount × 100) ÷ (100 + GST Rate)<br/>
              GST Amount = Inclusive Amount - Original Amount
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Example:</span>
              <p>For ₹1,180 including 18% GST:</p>
              <p>Base = ₹1,000</p>
              <p>GST = ₹180</p>
            </div>
          </div>
        </div>
      </div>

      {/* Common GST Rates Table Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
            <Table className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Common GST Rates in India
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              GST rates vary by the specific goods or services and applicable classification.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <th className="py-3.5 px-4 font-bold text-slate-900 dark:text-white w-24">GST Rate</th>
                <th className="py-3.5 px-4 font-bold text-slate-900 dark:text-white w-56">Category Example</th>
                <th className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Common Goods & Services Included</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {COMMON_GST_RATES_DATA.map((slab, i) => (
                <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 align-top">
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold border ${slab.badgeColor}`}>
                      {slab.rate}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-800 dark:text-slate-200 align-top">
                    {slab.category}
                  </td>
                  <td className="py-4 px-4 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed align-top">
                    {slab.items}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mandatory Rate Table Disclaimer */}
        <div className="mt-4 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start space-x-2.5 text-xs text-amber-800 dark:text-amber-300">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <span>
            <strong>Note:</strong> GST rates may change and may vary by product/service classification. Verify the applicable rate from official GST/CBIC sources before filing or invoicing.
          </span>
        </div>

      </div>

    </section>
  );
}
