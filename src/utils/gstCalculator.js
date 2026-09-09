/**
 * Indian Standard GST Calculation Utilities
 * Precision-tested for Exclusive and Inclusive GST modes, Intra-State (CGST+SGST) & Inter-State (IGST) transactions.
 */

/**
 * Safely rounds a number to 2 decimal places using EPSILON to avoid float representation bugs.
 * @param {number} val 
 * @returns {number}
 */
export const round2 = (val) => {
  if (isNaN(val) || !isFinite(val)) return 0;
  return Math.round((val + Number.EPSILON) * 100) / 100;
};

/**
 * Formats a number using the official Indian Numbering System (en-IN)
 * e.g., ₹1,000.00, ₹10,000.00, ₹1,00,000.00, ₹9,00,000.00, ₹11,52,000.00
 * 
 * @param {number|string} amount 
 * @param {boolean} includeSymbol - whether to prepend ₹
 * @returns {string}
 */
export const formatIndianCurrency = (amount, includeSymbol = true) => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount) || !isFinite(numericAmount)) {
    return includeSymbol ? '₹0.00' : '0.00';
  }

  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);

  return includeSymbol ? `₹${formatted}` : formatted;
};

/**
 * Parses user text input safely into a positive number
 * @param {string} input 
 * @returns {{ val: number, isValid: boolean, error: string|null }}
 */
export const validateAndParseAmount = (input) => {
  if (input === '' || input === null || input === undefined) {
    return { val: 0, isValid: false, error: 'Please enter an amount.' };
  }

  // Remove commas or spaces if user pasted formatted text
  const cleanInput = String(input).replace(/,/g, '').trim();

  if (cleanInput === '') {
    return { val: 0, isValid: false, error: 'Please enter an amount.' };
  }

  const val = parseFloat(cleanInput);

  if (isNaN(val)) {
    return { val: 0, isValid: false, error: 'Please enter a valid numeric amount.' };
  }

  if (val < 0) {
    return { val: 0, isValid: false, error: 'Amount cannot be negative.' };
  }

  if (val > 100000000000) { // 100 Billion max safeguard
    return { val: 0, isValid: false, error: 'Amount exceeds maximum limit.' };
  }

  return { val, isValid: true, error: null };
};

/**
 * Calculates GST based on mode, rate, and transaction type
 * 
 * For GST Inclusive calculations:
 * Exact Base = Amount / (1 + Rate/100)
 * Exact GST = Amount - Exact Base
 * Displayed Base = round(Exact Base, 2)
 * Displayed Total GST = round(Exact GST, 2)
 * 
 * For Intra-State CGST/SGST split:
 * roundedCGST = round(roundedTotalGST / 2, 2)
 * roundedSGST = round(roundedTotalGST - roundedCGST, 2)
 * Guarantees: CGST + SGST === Total GST exactly.
 * 
 * @param {Object} options
 * @param {'exclusive' | 'inclusive'} options.mode - Calculation mode
 * @param {number} options.amount - User input amount
 * @param {number} options.gstRate - GST percentage (e.g., 18, 28, 7.5)
 * @param {'intra' | 'inter'} options.transactionType - 'intra' for intra-state (CGST+SGST) or 'inter' for inter-state (IGST)
 * 
 * @returns {Object} Calculated values
 */
export const calculateGST = ({ mode = 'exclusive', amount = 0, gstRate = 18, transactionType = 'intra' }) => {
  const numericAmount = Math.max(0, amount);
  const numericRate = Math.max(0, gstRate);

  let originalAmount = 0;
  let gstAmount = 0;
  let finalAmount = 0;

  if (mode === 'inclusive') {
    // Amount entered includes GST (Final Amount)
    finalAmount = round2(numericAmount);
    if (numericRate === 0) {
      originalAmount = finalAmount;
      gstAmount = 0;
    } else {
      const exactBase = (numericAmount * 100) / (100 + numericRate);
      const exactGst = numericAmount - exactBase;
      originalAmount = round2(exactBase);
      gstAmount = round2(exactGst);
    }
  } else {
    // Amount entered is Exclusive of GST (Original Taxable Amount)
    originalAmount = round2(numericAmount);
    const exactGst = (originalAmount * numericRate) / 100;
    gstAmount = round2(exactGst);
    finalAmount = round2(originalAmount + gstAmount);
  }

  // Intra-State split into CGST + SGST from DISPLAYED/ROUNDED total GST:
  // roundedTotalGST = gstAmount
  // roundedCGST = round(roundedTotalGST / 2, 2)
  // roundedSGST = round(roundedTotalGST - roundedCGST, 2)
  const isIntraState = transactionType === 'intra';
  const halfRate = round2(numericRate / 2);
  
  const cgstAmount = isIntraState ? round2(gstAmount / 2) : 0;
  const sgstAmount = isIntraState ? round2(gstAmount - cgstAmount) : 0; // Guarantees cgst + sgst === gstAmount exactly
  const igstAmount = isIntraState ? 0 : gstAmount;

  // Dynamic percentage composition of FINAL AMOUNT
  const baseSharePercent = finalAmount > 0 
    ? round2((originalAmount / finalAmount) * 100) 
    : 100;
  const taxSharePercent = finalAmount > 0 
    ? round2((gstAmount / finalAmount) * 100) 
    : 0;

  return {
    mode,
    originalAmount,
    gstRate: numericRate,
    gstAmount,
    finalAmount,
    transactionType,
    isIntraState,
    cgstRate: isIntraState ? halfRate : 0,
    cgstAmount,
    sgstRate: isIntraState ? halfRate : 0,
    sgstAmount,
    igstRate: isIntraState ? 0 : numericRate,
    igstAmount,
    baseSharePercent,
    taxSharePercent,
  };
};

/**
 * Generates formatted plain text for copy to clipboard
 */
export const formatResultForClipboard = (result) => {
  if (!result) return '';
  
  const modeText = result.mode === 'inclusive' ? 'Inclusive' : 'Exclusive';
  const transactionText = result.isIntraState ? 'Intra-State' : 'Inter-State';
  
  const lines = [
    `Amount: ${formatIndianCurrency(result.mode === 'inclusive' ? result.finalAmount : result.originalAmount)}`,
    `GST Mode: ${modeText}`,
    `GST Rate: ${result.gstRate}%`,
    `Transaction: ${transactionText}`,
    `Original Amount: ${formatIndianCurrency(result.originalAmount)}`,
  ];

  if (result.isIntraState) {
    lines.push(`CGST (${result.cgstRate}%): ${formatIndianCurrency(result.cgstAmount)}`);
    lines.push(`SGST (${result.sgstRate}%): ${formatIndianCurrency(result.sgstAmount)}`);
  } else {
    lines.push(`IGST (${result.igstRate}%): ${formatIndianCurrency(result.igstAmount)}`);
  }

  lines.push(`Total GST: ${formatIndianCurrency(result.gstAmount)}`);
  lines.push(`Final Amount: ${formatIndianCurrency(result.finalAmount)}`);

  return lines.join('\n');
};
