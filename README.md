# GST Calculator India 🇮🇳

A professional, modern, high-precision **GST Calculator** website built for Indian consumers, accountants, small business owners, and tax professionals.

Built with **React**, **Vite**, **Tailwind CSS**, and **Lucide React Icons**, featuring real-time calculation, dark/light mode, Indian currency formatting (`₹1,25,000.00`), intra/inter-state tax breakdown, copy-to-clipboard functionality, quick presets, and educational resources.

---

## 🌟 Key Features

1. **GST Exclusive Calculator (Add GST)**
   - Enter base amount before tax & rate.
   - Calculates GST amount and total payable amount.

2. **GST Inclusive Calculator (Remove GST)**
   - Enter final invoice amount.
   - Extracts the base amount before tax and exact GST amount.

3. **Tax Rate Selector & Custom Rate**
   - Preset pills for official Indian GST Slabs: `0%`, `5%`, `12%`, `18%`, `28%`.
   - Custom percentage input for special rates (e.g. 7.5%, 3%, 0.25%).

4. **Intra-State vs Inter-State Breakdown**
   - **Intra-State (Within same State)**: Automatically splits GST into 50% **CGST** (Central GST) and 50% **SGST** (State GST).
   - **Inter-State (Between different States/UTs)**: Shows 100% **IGST** (Integrated GST).

5. **Indian Rupee Formatting (`en-IN`)**
   - Displays all figures using Indian numbering format (e.g., `₹1,25,000.00`).

6. **Copy Result to Clipboard**
   - One-click copy generates formatted plain text summary ready to paste into WhatsApp, Email, or Invoices.

7. **Quick Preset Examples**
   - Clickable presets (`₹1,000 @ 18%`, `₹5,000 @ 12%`, `₹10,000 @ 5%`) for instant auto-filling.

8. **Educational & Educational Content**
   - "What is GST?" explanation with CGST, SGST, IGST breakdown cards.
   - "How to Calculate GST?" formula cards with step-by-step examples.
   - Official GST Slabs Table (0%, 5%, 12%, 18%, 28%) with goods & services lists.
   - Accordion-style Frequently Asked Questions (FAQ).

9. **Dark & Light Mode Support**
   - Full dark mode support with system preference auto-detection and persistent state in `localStorage`.

---

## 📐 Calculation Logic & Formulas

### 1. GST Exclusive Formula (Adding GST)
$$\text{GST Amount} = \frac{\text{Original Amount} \times \text{GST Rate}}{100}$$
$$\text{Final Amount} = \text{Original Amount} + \text{GST Amount}$$

### 2. GST Inclusive Formula (Extracting GST)
$$\text{Original Amount} = \frac{\text{Inclusive Amount} \times 100}{100 + \text{GST Rate}}$$
$$\text{GST Amount} = \text{Inclusive Amount} - \text{Original Amount}$$

### 3. Tax Breakdown Rules
- **Intra-State**: 
  $$\text{CGST Rate} = \frac{\text{GST Rate}}{2}, \quad \text{CGST Amount} = \frac{\text{GST Amount}}{2}$$
  $$\text{SGST Rate} = \frac{\text{GST Rate}}{2}, \quad \text{SGST Amount} = \text{GST Amount} - \text{CGST Amount}$$
- **Inter-State**:
  $$\text{IGST Rate} = \text{GST Rate}, \quad \text{IGST Amount} = \text{GST Amount}$$

### 4. Floating Point Precision Safety
To prevent floating point binary anomalies (e.g., `1000 * 0.18 = 180.00000000000003`), all calculated figures use safe epsilon rounding:
```javascript
export const round2 = (val) => Math.round((val + Number.EPSILON) * 100) / 100;
```

---

## 🛠️ Project Structure

```text
gst/
├── index.html                 # Main HTML with SEO meta tags & Google Fonts
├── vite.config.js             # Vite configuration with React & Tailwind CSS
├── package.json               # Dependencies & build scripts
├── README.md                  # Project documentation
└── src/
    ├── main.jsx               # React entry point
    ├── App.jsx                # Layout & Dark Mode state provider
    ├── index.css              # Tailwind CSS imports & theme utilities
    ├── components/
    │   ├── Header.jsx         # Branding & Theme Toggle button
    │   ├── GSTCalculator.jsx  # Main container managing app state & logic
    │   ├── AmountInput.jsx    # Input field with ₹ adornment & validation
    │   ├── GSTRateSelector.jsx# 0%, 5%, 12%, 18%, 28% & custom rate input
    │   ├── TransactionTypeSelector.jsx # Intra-State vs Inter-State toggle
    │   ├── ResultCard.jsx     # Visual summary card, graph bar & Copy button
    │   ├── QuickExamples.jsx  # Clickable preset calculation cards
    │   ├── EducationalSection.jsx # "What is GST", Formulas & Rate Slabs
    │   ├── FAQ.jsx            # Accordion FAQ component
    │   └── Footer.jsx         # Footer with CBIC disclaimer & links
    └── utils/
        └── gstCalculator.js   # Pure math functions, validation & en-IN formatter
```

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn

### Installation
1. Clone or navigate to the repository directory:
   ```bash
   cd gst
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start local development server:
   ```bash
   npm run dev
   ```
4. Open [http://127.0.0.1:5173](http://127.0.0.1:5173) in your browser.

---

## 📦 How to Build for Production

To create an optimized production build:
```bash
npm run build
```
The output files will be generated in the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

---

## 🌐 Deployment Guidelines

You can deploy the generated `dist/` static files to any static hosting provider:

- **Vercel**: Import project and set framework preset to `Vite`.
- **Netlify**: Set build command to `npm run build` and publish directory to `dist`.
- **GitHub Pages**: Build project and push `dist/` directory to `gh-pages` branch.

---

## 📄 License

This project is open-source and free for personal and commercial use under the MIT License.
