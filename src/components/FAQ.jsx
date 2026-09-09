import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'What is GST (Goods and Services Tax)?',
    a: 'GST is a unified destination-based indirect tax system implemented across India on July 1, 2017. It replaced multiple Central and State indirect taxes (like Excise Duty, Service Tax, VAT, CST) into a single tax framework to eliminate tax cascading.',
  },
  {
    q: 'What is CGST (Central Goods and Services Tax)?',
    a: 'CGST is the Central Goods and Services Tax charged by the Central Government of India on eligible intra-state supplies (transactions within the same state or Union Territory). On intra-state sales, total GST is divided equally into 50% CGST and 50% SGST.',
  },
  {
    q: 'What is SGST (State Goods and Services Tax)?',
    a: 'SGST is the State Goods and Services Tax charged by the individual State Government (or Union Territory with legislature) on eligible intra-state supplies.',
  },
  {
    q: 'What is IGST (Integrated Goods and Services Tax)?',
    a: 'IGST is the Integrated Goods and Services Tax collected by the Central Government on inter-state supplies (sales between two different states or UTs) and imports/exports.',
  },
  {
    q: 'How do I calculate GST for a given amount?',
    a: 'To calculate GST Exclusive (adding tax): Multiply the base original amount by the GST percentage and divide by 100. For example: ₹10,000 at 18% GST = ₹10,000 × 18 ÷ 100 = ₹1,800 total GST. Final amount is ₹11,800.',
  },
  {
    q: 'How do I remove GST from an inclusive amount?',
    a: 'To calculate GST Inclusive (removing tax): Multiply total inclusive amount by 100 and divide by (100 + GST Rate). For example: For ₹11,800 including 18% GST: Base = ₹11,800 × 100 ÷ 118 = ₹10,000. GST = ₹11,800 − ₹10,000 = ₹1,800.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-16 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
          <HelpCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Quick answers to common questions about GST calculations in India
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-indigo-300 dark:border-indigo-800 bg-indigo-50/30 dark:bg-indigo-950/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full py-4 px-5 text-left flex justify-between items-center font-bold text-slate-900 dark:text-white text-base focus:outline-none"
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <div className={`p-1 rounded-full transition-transform duration-200 ${isOpen ? 'rotate-180 bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' : 'text-slate-400'}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 border-t border-indigo-100/60 dark:border-indigo-900/40 leading-relaxed whitespace-pre-line">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
