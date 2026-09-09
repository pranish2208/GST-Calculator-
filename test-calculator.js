import { calculateGST, formatIndianCurrency } from './src/utils/gstCalculator.js';

console.log("=== RUNNING AUTOMATED GST CALCULATOR LOGIC TESTS ===");

let passed = true;

const assertEqual = (label, actual, expected) => {
  if (actual === expected) {
    console.log(`  ✓ ${label}: ${actual}`);
  } else {
    console.error(`  ❌ ${label} FAILED: Got "${actual}", expected "${expected}"`);
    passed = false;
  }
};

// TEST 1: EXCLUSIVE ₹9,00,000 @ 28% Intra-State
console.log("\nTEST 1: Mode=EXCLUSIVE, Amount=₹9,00,000, GST=28%, Intra-State");
const t1 = calculateGST({ mode: 'exclusive', amount: 900000, gstRate: 28, transactionType: 'intra' });
assertEqual('Base Amount', formatIndianCurrency(t1.originalAmount), '₹9,00,000.00');
assertEqual('CGST Rate', t1.cgstRate, 14);
assertEqual('CGST Amount', formatIndianCurrency(t1.cgstAmount), '₹1,26,000.00');
assertEqual('SGST Rate', t1.sgstRate, 14);
assertEqual('SGST Amount', formatIndianCurrency(t1.sgstAmount), '₹1,26,000.00');
assertEqual('Total GST', formatIndianCurrency(t1.gstAmount), '₹2,52,000.00');
assertEqual('Final Amount', formatIndianCurrency(t1.finalAmount), '₹11,52,000.00');
assertEqual('Base Share %', t1.baseSharePercent, 78.13);
assertEqual('Tax Share %', t1.taxSharePercent, 21.88);

// TEST 2: INCLUSIVE ₹9,00,000 @ 28% Intra-State
console.log("\nTEST 2: Mode=INCLUSIVE, Amount=₹9,00,000, GST=28%, Intra-State");
const t2 = calculateGST({ mode: 'inclusive', amount: 900000, gstRate: 28, transactionType: 'intra' });
assertEqual('Base Amount', formatIndianCurrency(t2.originalAmount), '₹7,03,125.00');
assertEqual('CGST Rate', t2.cgstRate, 14);
assertEqual('CGST Amount', formatIndianCurrency(t2.cgstAmount), '₹98,437.50');
assertEqual('SGST Rate', t2.sgstRate, 14);
assertEqual('SGST Amount', formatIndianCurrency(t2.sgstAmount), '₹98,437.50');
assertEqual('Total GST', formatIndianCurrency(t2.gstAmount), '₹1,96,875.00');
assertEqual('Final Amount', formatIndianCurrency(t2.finalAmount), '₹9,00,000.00');
assertEqual('Base Share %', t2.baseSharePercent, 78.13);
assertEqual('Tax Share %', t2.taxSharePercent, 21.88);

// TEST 3: INCLUSIVE ₹100 @ 18% Intra-State (User Exact Rounding Example)
console.log("\nTEST 3: Mode=INCLUSIVE, Amount=₹100, GST=18%, Intra-State");
const t3 = calculateGST({ mode: 'inclusive', amount: 100, gstRate: 18, transactionType: 'intra' });
assertEqual('Base Amount', formatIndianCurrency(t3.originalAmount), '₹84.75');
assertEqual('Total GST', formatIndianCurrency(t3.gstAmount), '₹15.25');
assertEqual('CGST Amount', formatIndianCurrency(t3.cgstAmount), '₹7.63');
assertEqual('SGST Amount', formatIndianCurrency(t3.sgstAmount), '₹7.62');
assertEqual('Final Amount', formatIndianCurrency(t3.finalAmount), '₹100.00');
assertEqual('Sum Guarantee', (t3.cgstAmount + t3.sgstAmount).toFixed(2), t3.gstAmount.toFixed(2));

// TEST 4: INCLUSIVE ₹100 @ 5% Intra-State (User Exact Rounding Example)
console.log("\nTEST 4: Mode=INCLUSIVE, Amount=₹100, GST=5%, Intra-State");
const t4 = calculateGST({ mode: 'inclusive', amount: 100, gstRate: 5, transactionType: 'intra' });
assertEqual('Base Amount', formatIndianCurrency(t4.originalAmount), '₹95.24');
assertEqual('Total GST', formatIndianCurrency(t4.gstAmount), '₹4.76');
assertEqual('CGST Amount', formatIndianCurrency(t4.cgstAmount), '₹2.38');
assertEqual('SGST Amount', formatIndianCurrency(t4.sgstAmount), '₹2.38');
assertEqual('Final Amount', formatIndianCurrency(t4.finalAmount), '₹100.00');
assertEqual('Sum Guarantee', (t4.cgstAmount + t4.sgstAmount).toFixed(2), t4.gstAmount.toFixed(2));

// TEST 5: EXCLUSIVE ₹10,000 @ 18% Inter-State
console.log("\nTEST 5: Mode=EXCLUSIVE, Amount=₹10,000, GST=18%, Inter-State");
const t5 = calculateGST({ mode: 'exclusive', amount: 10000, gstRate: 18, transactionType: 'inter' });
assertEqual('Base Amount', formatIndianCurrency(t5.originalAmount), '₹10,000.00');
assertEqual('IGST Amount', formatIndianCurrency(t5.igstAmount), '₹1,800.00');
assertEqual('Total GST', formatIndianCurrency(t5.gstAmount), '₹1,800.00');
assertEqual('Final Amount', formatIndianCurrency(t5.finalAmount), '₹11,800.00');

// TEST 6: INCLUSIVE ₹11,800 @ 18% Inter-State
console.log("\nTEST 6: Mode=INCLUSIVE, Amount=₹11,800, GST=18%, Inter-State");
const t6 = calculateGST({ mode: 'inclusive', amount: 11800, gstRate: 18, transactionType: 'inter' });
assertEqual('Base Amount', formatIndianCurrency(t6.originalAmount), '₹10,000.00');
assertEqual('IGST Amount', formatIndianCurrency(t6.igstAmount), '₹1,800.00');
assertEqual('Total GST', formatIndianCurrency(t6.gstAmount), '₹1,800.00');
assertEqual('Final Amount', formatIndianCurrency(t6.finalAmount), '₹11,800.00');

// TEST 7: EXCLUSIVE ₹1,000 @ 0% GST
console.log("\nTEST 7: Mode=EXCLUSIVE, Amount=₹1,000, GST=0%");
const t7 = calculateGST({ mode: 'exclusive', amount: 1000, gstRate: 0, transactionType: 'intra' });
assertEqual('Base Amount', formatIndianCurrency(t7.originalAmount), '₹1,000.00');
assertEqual('Total GST', formatIndianCurrency(t7.gstAmount), '₹0.00');
assertEqual('Final Amount', formatIndianCurrency(t7.finalAmount), '₹1,000.00');
assertEqual('Base Share %', t7.baseSharePercent, 100);
assertEqual('Tax Share %', t7.taxSharePercent, 0);

// TEST 8: EXCLUSIVE ₹10,000 @ 7.5% Custom Rate Intra-State
console.log("\nTEST 8: Mode=EXCLUSIVE, Amount=₹10,000, GST=7.5%, Intra-State");
const t8 = calculateGST({ mode: 'exclusive', amount: 10000, gstRate: 7.5, transactionType: 'intra' });
assertEqual('Total GST', formatIndianCurrency(t8.gstAmount), '₹750.00');
assertEqual('CGST Amount', formatIndianCurrency(t8.cgstAmount), '₹375.00');
assertEqual('SGST Amount', formatIndianCurrency(t8.sgstAmount), '₹375.00');
assertEqual('Final Amount', formatIndianCurrency(t8.finalAmount), '₹10,750.00');

if (passed) {
  console.log("\n🎉 ALL MATHEMATICAL GST TEST CASES PASSED PERFECTLY!");
} else {
  console.error("\n❌ SOME TESTS FAILED!");
  process.exit(1);
}
