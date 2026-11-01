import React, { useState, useMemo, useEffect } from 'react';
import {
  Wallet,
  Calendar,
  TrendingDown,
  TrendingUp,
  Home,
  CreditCard,
  Bike,
  UserCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Download,
  ChevronDown,
  ChevronUp,
  Search,
  RefreshCw,
  IndianRupee,
  ShieldAlert,
  Percent,
  ArrowUpRight,
  Users,
  Layers,
  Sparkles,
  Edit3,
  Trash2,
  Sun,
  Moon,
  Smartphone
} from 'lucide-react';

const INITIAL_FAMILY_INCOME = [
  { id: 'inc-1', name: 'Sher Singh', role: 'Papa (Father)', monthlyIncome: 56250, color: '#6366f1' },
  { id: 'inc-2', name: 'Samit Singh', role: 'Self (Me)', monthlyIncome: 24762, color: '#10b981' },
  { id: 'inc-3', name: 'Samarth Singh', role: 'Bhaiya (Brother)', monthlyIncome: 18500, color: '#f59e0b' }
];

const INITIAL_LOANS = [
  {
    id: 'loan-1',
    lender: 'HDFC Bank',
    product: 'Home Loan (₹15.67L Disbursed)',
    category: 'Home Loan',
    borrower: 'Sher Singh',
    accountNo: 'HDFC-HL-1600000',
    roi: 7.60,
    originalPrincipal: 1567798.00,
    tenureMonths: 156,
    firstEmiDate: '2026-01-05',
    dueDay: 5,
    baseEmi: 15634.00,
    isCreditCardGst: false,
    notes: 'Sanctioned ₹16L; Disbursed ₹15,67,798. 9 EMIs paid till Sep 2026 (₹49,297 principal recovered).'
  },
  {
    id: 'loan-2',
    lender: 'HDFC Bank',
    product: 'Home Loan Insurance Funding',
    category: 'Home Loan',
    borrower: 'Sher Singh',
    accountNo: 'HDFC-IPF-26250',
    roi: 7.70,
    originalPrincipal: 26250.00,
    tenureMonths: 156,
    firstEmiDate: '2026-01-05',
    dueDay: 5,
    baseEmi: 264.00,
    isCreditCardGst: false,
    notes: 'Insurance Premium Funding linked to Home Loan. 9 EMIs paid till Sep 2026 (₹827 principal recovered).'
  },
  {
    id: 'loan-3',
    lender: 'Credit Saison India',
    product: 'Personal Loan (Kisetsu Saison)',
    category: 'Personal Loan',
    borrower: 'Rekha Devi',
    accountNo: 'cbcfe19a-b85d-49da',
    roi: 16.74,
    originalPrincipal: 499093.00,
    tenureMonths: 36,
    firstEmiDate: '2025-10-03',
    dueDay: 3,
    baseEmi: 17730.00,
    isCreditCardGst: false,
    notes: '13/36 EMIs paid till Oct 2026. Exact SOA Principal Paid: ₹1,53,686.76 | Balance: ₹3,45,406.24.'
  },
  {
    id: 'loan-4',
    lender: 'Poonawalla Fincorp',
    product: 'Personal Loan (STP Prime)',
    category: 'Personal Loan',
    borrower: 'Sher Singh',
    accountNo: 'PLUPUN0STP000019887154',
    roi: 16.25,
    originalPrincipal: 307799.00,
    tenureMonths: 36,
    firstEmiDate: '2026-06-05',
    dueDay: 5,
    baseEmi: 10859.00,
    isCreditCardGst: false,
    notes: 'Disbursed 03-May-2026. 5 EMIs paid till Oct 2026. 6th EMI on 05-Nov-2026 (Opening Principal ₹2,73,718).'
  },
  {
    id: 'loan-5',
    lender: 'AU Small Finance Bank',
    product: 'Personal Loan - Top Up',
    category: 'Personal Loan',
    borrower: 'Rekha Devi',
    accountNo: '9001170759591522',
    roi: 16.00,
    originalPrincipal: 195000.00,
    tenureMonths: 48,
    firstEmiDate: '2026-07-05',
    dueDay: 5,
    baseEmi: 5526.00,
    isCreditCardGst: false,
    notes: 'Sanctioned 22-May-2026. 1st EMI 05-Jul-2026. Auto-debit from AU Savings A/c XX365.'
  },
  {
    id: 'loan-6',
    lender: 'Bajaj Finance Ltd',
    product: 'Two Wheeler Loan (Honda Shine 125)',
    category: 'Vehicle Loan',
    borrower: 'Samit Singh',
    accountNo: 'P401PTW115980868',
    roi: 18.78,
    originalPrincipal: 97763.00,
    tenureMonths: 60,
    firstEmiDate: '2026-10-02',
    dueDay: 2,
    baseEmi: 2524.00,
    isCreditCardGst: false,
    notes: 'Loan ₹96,669 + ₹1,094 BPI = ₹97,763. 1st EMI paid 02-Oct-26; 2nd EMI advance paid 01-Nov-26.'
  },
  {
    id: 'loan-7',
    lender: 'ICICI Bank Credit Card',
    product: 'Personal Loan on CC (PLCC)',
    category: 'Credit Card Loan',
    borrower: 'Samit / Sher Singh',
    accountNo: 'ICICI-PLCC-24M',
    roi: 11.00,
    originalPrincipal: 135000.00,
    tenureMonths: 24,
    firstEmiDate: '2026-06-15',
    dueDay: 15,
    baseEmi: 6292.06,
    isCreditCardGst: true,
    notes: '5/24 EMIs billed till 15-Oct-2026. 18% IGST applies on monthly interest component.'
  },
  {
    id: 'loan-8',
    lender: 'IndusInd Bank CC',
    product: 'Outstanding to EMI (Retail Plan)',
    category: 'Credit Card Loan',
    borrower: 'Sher Singh',
    accountNo: '4908XXXXXXXX7572',
    roi: 18.00,
    originalPrincipal: 141781.64,
    tenureMonths: 36,
    firstEmiDate: '2026-08-18',
    dueDay: 7,
    baseEmi: 5125.74,
    isCreditCardGst: true,
    notes: '3/36 EMIs billed till 18-Oct-2026 (Due 07-Nov-26). Unbilled Principal: ₹1,32,648.94 + 18% GST on Interest.'
  },
  {
    id: 'loan-9',
    lender: 'Flipkart Axis Bank CC',
    product: 'Credit Card Cash/Loan EMI',
    category: 'Credit Card EMI',
    borrower: 'Sher Singh',
    accountNo: '78289129 (XX5249)',
    roi: 12.00,
    originalPrincipal: 40917.00,
    tenureMonths: 48,
    firstEmiDate: '2026-10-25',
    dueDay: 14,
    baseEmi: 853.00,
    isCreditCardGst: true,
    notes: '1/48 EMI billed on 25-Oct-2026 (₹448 Prin + ₹405 Int + ₹72.90 GST). Remaining Balance: ₹40,469.'
  },
  {
    id: 'loan-10',
    lender: 'BPCL SBI Card Octane',
    product: 'Merchant Flexipay EMI (12M)',
    category: 'Credit Card EMI',
    borrower: 'Sher Singh',
    accountNo: 'XXXX-XX58',
    roi: 16.00,
    originalPrincipal: 34758.50,
    tenureMonths: 12,
    firstEmiDate: '2026-09-22',
    dueDay: 11,
    baseEmi: 3166.68,
    isCreditCardGst: true,
    notes: '02/12 EMI billed on 22-Oct-2026 (₹2,712.71 Prin + ₹453.97 Int + ₹81.71 GST). Due 11-Nov-2026.'
  },
  {
    id: 'loan-11',
    lender: 'ICICI Bank Credit Card',
    product: 'Flipkart Internet EMI (XX2001)',
    category: 'Credit Card EMI',
    borrower: 'Samit / Sher Singh',
    accountNo: '99727797 (XX2001)',
    roi: 18.00,
    originalPrincipal: 13413.00,
    tenureMonths: 24,
    firstEmiDate: '2026-10-18',
    dueDay: 18,
    baseEmi: 669.63,
    isCreditCardGst: true,
    notes: '1/24 EMI billed on 18-Oct-2026 (₹468.44 Prin + ₹201.20 Int + ₹36.22 IGST). Balance: ₹12,944.56.'
  }
];

function computeLoanLiveMetrics(loan, targetDateStr) {
  const targetDate = new Date(targetDateStr + 'T12:00:00');
  const firstDate = new Date(loan.firstEmiDate + 'T12:00:00');

  let elapsedEmis = 0;
  if (targetDate >= firstDate) {
    const yearDiff = targetDate.getFullYear() - firstDate.getFullYear();
    const monthDiff = targetDate.getMonth() - firstDate.getMonth();
    const dayBonus = targetDate.getDate() >= firstDate.getDate() ? 1 : 0;
    elapsedEmis = Math.max(0, yearDiff * 12 + monthDiff + dayBonus);
  }
  const paidEmis = Math.min(loan.tenureMonths, elapsedEmis);
  const remainingEmis = Math.max(0, loan.tenureMonths - paidEmis);

  const monthlyRate = loan.roi / 100 / 12;
  const n = loan.tenureMonths;
  const P = loan.originalPrincipal;

  const stdEmi =
    monthlyRate > 0
      ? (P * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
      : P / n;
  const effectiveEmi = loan.baseEmi || stdEmi;

  let balance = P;
  let principalPaid = 0;
  let interestPaid = 0;
  let gstPaid = 0;
  let currentMonthInterest = 0;
  let currentMonthPrincipal = 0;
  let currentMonthGst = 0;

  let totalInterestOverLife = 0;
  let totalGstOverLife = 0;
  const schedule = [];

  for (let i = 1; i <= n; i++) {
    const emiDate = new Date(firstDate);
    emiDate.setMonth(firstDate.getMonth() + (i - 1));

    const interestForMonth = balance * monthlyRate;
    let principalForMonth = effectiveEmi - interestForMonth;

    if (i === n || principalForMonth > balance) {
      principalForMonth = balance;
    }
    if (principalForMonth < 0) principalForMonth = 0;

    const gstForMonth = loan.isCreditCardGst ? interestForMonth * 0.18 : 0;
    balance = Math.max(0, balance - principalForMonth);

    totalInterestOverLife += interestForMonth;
    totalGstOverLife += gstForMonth;

    const isPaid = i <= paidEmis;
    if (isPaid) {
      principalPaid += principalForMonth;
      interestPaid += interestForMonth;
      gstPaid += gstForMonth;
    }

    if (i === paidEmis + 1 || (paidEmis === n && i === n)) {
      currentMonthInterest = interestForMonth;
      currentMonthPrincipal = principalForMonth;
      currentMonthGst = gstForMonth;
    }

    schedule.push({
      installmentNo: i,
      dateStr: emiDate.toISOString().split('T')[0],
      emi: principalForMonth + interestForMonth,
      principal: principalForMonth,
      interest: interestForMonth,
      gst: gstForMonth,
      totalOutflow: principalForMonth + interestForMonth + gstForMonth,
      closingBalance: balance,
      status: isPaid ? 'PAID' : i === paidEmis + 1 ? 'NEXT DUE' : 'UPCOMING'
    });
  }

  const remainingPrincipal = Math.max(0, P - principalPaid);
  const remainingInterest = Math.max(0, totalInterestOverLife - interestPaid);
  const remainingGst = Math.max(0, totalGstOverLife - gstPaid);

  const isCompleted = remainingEmis === 0;
  const activeMonthlyBaseEmi = isCompleted ? 0 : effectiveEmi;
  const activeMonthlyGst = isCompleted ? 0 : currentMonthGst;
  const activeMonthlyTotalOutflow = activeMonthlyBaseEmi + activeMonthlyGst;

  const lastEmiDateObj = new Date(firstDate);
  lastEmiDateObj.setMonth(firstDate.getMonth() + (n - 1));

  return {
    ...loan,
    paidEmis,
    remainingEmis,
    principalPaid,
    remainingPrincipal,
    interestPaid,
    remainingInterest,
    totalInterestOverLife,
    gstPaid,
    remainingGst,
    currentMonthInterest,
    currentMonthPrincipal,
    activeMonthlyBaseEmi,
    activeMonthlyGst,
    activeMonthlyTotalOutflow,
    completionPct: P > 0 ? Math.min(100, (principalPaid / P) * 100) : 100,
    tenurePct: n > 0 ? Math.min(100, (paidEmis / n) * 100) : 100,
    isCompleted,
    lastEmiDate: lastEmiDateObj.toISOString().split('T')[0],
    schedule
  };
}

const formatINR = (val, decimals = 0) => {
  if (val === undefined || val === null || isNaN(val)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(val);
};

const formatDateShort = (dateStr) => {
  if (!dateStr) return '-';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export default function App() {
  const systemToday = useMemo(() => new Date().toISOString().split('T')[0], []);

  const [liveDate, setLiveDate] = useState(systemToday);
  const [autoSyncToday, setAutoSyncToday] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const [loans, setLoans] = useState(() => {
    try {
      const saved = localStorage.getItem('samit_family_loans_v2');
      return saved ? JSON.parse(saved) : INITIAL_LOANS;
    } catch {
      return INITIAL_LOANS;
    }
  });

  const [familyIncome, setFamilyIncome] = useState(() => {
    try {
      const saved = localStorage.getItem('samit_family_income_v2');
      return saved ? JSON.parse(saved) : INITIAL_FAMILY_INCOME;
    } catch {
      return INITIAL_FAMILY_INCOME;
    }
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBorrower, setSelectedBorrower] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLoanId, setExpandedLoanId] = useState(null);
  const [showAddLoanModal, setShowAddLoanModal] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('samit_family_loans_v2', JSON.stringify(loans));
    } catch {}
  }, [loans]);

  useEffect(() => {
    try {
      localStorage.setItem('samit_family_income_v2', JSON.stringify(familyIncome));
    } catch {}
  }, [familyIncome]);

  useEffect(() => {
    if (!autoSyncToday) return;
    const interval = setInterval(() => {
      const nowStr = new Date().toISOString().split('T')[0];
      if (nowStr !== liveDate) setLiveDate(nowStr);
    }, 60000);
    return () => clearInterval(interval);
  }, [autoSyncToday, liveDate]);

  const computedLoans = useMemo(() => {
    return loans.map((loan) => computeLoanLiveMetrics(loan, liveDate));
  }, [loans, liveDate]);

  const filteredLoans = useMemo(() => {
    return computedLoans.filter((l) => {
      const matchesCat = selectedCategory === 'All' || l.category === selectedCategory;
      const matchesBorrower = selectedBorrower === 'All' || l.borrower.includes(selectedBorrower);
      const matchesSearch =
        l.lender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.accountNo.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesBorrower && matchesSearch;
    });
  }, [computedLoans, selectedCategory, selectedBorrower, searchQuery]);

  const portfolio = useMemo(() => {
    const totalIncome = familyIncome.reduce((acc, m) => acc + Number(m.monthlyIncome || 0), 0);
    const totalOriginalPrincipal = computedLoans.reduce((acc, l) => acc + l.originalPrincipal, 0);
    const totalPrincipalPaid = computedLoans.reduce((acc, l) => acc + l.principalPaid, 0);
    const totalRemainingPrincipal = computedLoans.reduce((acc, l) => acc + l.remainingPrincipal, 0);
    const totalInterestPaid = computedLoans.reduce((acc, l) => acc + l.interestPaid, 0);
    const totalRemainingInterest = computedLoans.reduce((acc, l) => acc + l.remainingInterest, 0);
    const totalMonthlyBaseEmi = computedLoans.reduce((acc, l) => acc + l.activeMonthlyBaseEmi, 0);
    const totalMonthlyGst = computedLoans.reduce((acc, l) => acc + l.activeMonthlyGst, 0);
    const totalMonthlyOutflow = computedLoans.reduce((acc, l) => acc + l.activeMonthlyTotalOutflow, 0);
    const activeLoansCount = computedLoans.filter((l) => !l.isCompleted).length;
    const completedLoansCount = computedLoans.filter((l) => l.isCompleted).length;

    const netDisposableIncome = totalIncome - totalMonthlyOutflow;
    const foirPct = totalIncome > 0 ? (totalMonthlyOutflow / totalIncome) * 100 : 0;
    const overallPrincipalProgress =
      totalOriginalPrincipal > 0 ? (totalPrincipalPaid / totalOriginalPrincipal) * 100 : 0;

    return {
      totalIncome,
      totalOriginalPrincipal,
      totalPrincipalPaid,
      totalRemainingPrincipal,
      totalInterestPaid,
      totalRemainingInterest,
      totalMonthlyBaseEmi,
      totalMonthlyGst,
      totalMonthlyOutflow,
      activeLoansCount,
      completedLoansCount,
      netDisposableIncome,
      foirPct,
      overallPrincipalProgress
    };
  }, [computedLoans, familyIncome]);

  const jumpMonths = (monthsToAdd) => {
    setAutoSyncToday(false);
    const d = new Date(liveDate + 'T12:00:00');
    d.setMonth(d.getMonth() + monthsToAdd);
    setLiveDate(d.toISOString().split('T')[0]);
  };

  const resetToLiveToday = () => {
    setAutoSyncToday(true);
    setLiveDate(new Date().toISOString().split('T')[0]);
  };

  const [newLoan, setNewLoan] = useState({
    lender: '',
    product: '',
    category: 'Personal Loan',
    borrower: 'Sher Singh',
    accountNo: '',
    roi: 15,
    originalPrincipal: 50000,
    tenureMonths: 12,
    firstEmiDate: systemToday,
    dueDay: 5,
    baseEmi: 4513,
    isCreditCardGst: false,
    notes: ''
  });

  const handleAddLoan = (e) => {
    e.preventDefault();
    const created = {
      ...newLoan,
      id: 'loan-' + Date.now(),
      roi: Number(newLoan.roi),
      originalPrincipal: Number(newLoan.originalPrincipal),
      tenureMonths: Number(newLoan.tenureMonths),
      dueDay: Number(newLoan.dueDay),
      baseEmi: Number(newLoan.baseEmi)
    };
    setLoans((prev) => [...prev, created]);
    setShowAddLoanModal(false);
  };

  const handleDeleteLoan = (id) => {
    setLoans((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className={`min-h-screen pb-24 transition-colors duration-200 ${
      darkMode ? 'bg-[#07090E] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Sticky Mobile Top App Bar */}
      <header className={`sticky top-0 z-30 backdrop-blur-xl border-b px-3.5 py-2.5 ${
        darkMode ? 'bg-[#0B0F17]/90 border-slate-800/80' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
              <IndianRupee className="w-5 h-5 text-white" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm sm:text-base font-bold tracking-tight truncate">
                  Family Loan Tracker
                </h1>
                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                  autoSyncToday
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${autoSyncToday ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  {autoSyncToday ? 'LIVE' : 'SIM'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                Date: <span className="font-semibold text-indigo-400">{formatDateShort(liveDate)}</span> • {portfolio.activeLoansCount} Active
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setShowAddLoanModal(true)}
              className="p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95 transition"
              title="Add Loan"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl border transition ${
                darkMode ? 'bg-slate-800/80 border-slate-700 text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Horizontal Time-Machine Bar */}
        <div className="max-w-5xl mx-auto mt-2 pt-2 border-t border-slate-800/50 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={resetToLiveToday}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold shrink-0 transition ${
              autoSyncToday
                ? 'bg-emerald-600 text-white shadow-sm'
                : darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
            }`}
          >
            Live Today
          </button>
          {[
            { label: '+1M', m: 1 },
            { label: '+3M', m: 3 },
            { label: '+6M', m: 6 },
            { label: '+1Yr', m: 12 },
            { label: '+2Yr', m: 24 }
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={() => jumpMonths(btn.m)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium shrink-0 transition active:scale-95 ${
                darkMode
                  ? 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/70'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
          <input
            type="date"
            value={liveDate}
            onChange={(e) => {
              if (e.target.value) {
                setAutoSyncToday(false);
                setLiveDate(e.target.value);
              }
            }}
            className={`ml-auto px-2 py-0.5 rounded-lg text-[11px] font-medium border outline-none shrink-0 ${
              darkMode ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
            }`}
          />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-3.5 pt-3.5 space-y-4">
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <div className={`rounded-2xl p-4 border relative overflow-hidden ${
              darkMode
                ? 'bg-gradient-to-br from-slate-900 via-[#0F1626] to-indigo-950/60 border-indigo-500/30'
                : 'bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-indigo-300'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-indigo-300">
                  Total Principal Bacha Hai (Live)
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {portfolio.overallPrincipalProgress.toFixed(1)}% Cleared
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {formatINR(portfolio.totalRemainingPrincipal)}
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Out of <span className="font-semibold text-white">{formatINR(portfolio.totalOriginalPrincipal)}</span> Total Loan Amount
              </p>

              <div className="mt-3">
                <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-indigo-400 transition-all duration-500"
                    style={{ width: `${Math.min(100, portfolio.overallPrincipalProgress)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-300 mt-1.5">
                  <span>Principal Paid: <strong className="text-emerald-300">{formatINR(portfolio.totalPrincipalPaid)}</strong></span>
                  <span>Rem. Interest: <strong className="text-amber-300">{formatINR(portfolio.totalRemainingInterest)}</strong></span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className={`p-3.5 rounded-2xl border ${darkMode ? 'bg-[#0F1420] border-slate-800/90' : 'bg-white border-slate-200 shadow-sm'}`}>
                <span className="text-[11px] font-medium text-slate-400">Monthly EMI + GST</span>
                <div className="text-lg font-bold text-rose-400 mt-1">{formatINR(portfolio.totalMonthlyOutflow)}</div>
                <p className="text-[10px] text-slate-400 mt-1">Base: {formatINR(portfolio.totalMonthlyBaseEmi)} + GST {formatINR(portfolio.totalMonthlyGst)}</p>
              </div>
              <div className={`p-3.5 rounded-2xl border ${darkMode ? 'bg-[#0F1420] border-slate-800/90' : 'bg-white border-slate-200 shadow-sm'}`}>
                <span className="text-[11px] font-medium text-slate-400">Family Monthly Income</span>
                <div className="text-lg font-bold text-emerald-400 mt-1">{formatINR(portfolio.totalIncome)}</div>
                <p className="text-[10px] text-slate-400 mt-1">Bachat: {formatINR(portfolio.netDisposableIncome)}/mo</p>
              </div>
              <div className={`p-3.5 rounded-2xl border ${darkMode ? 'bg-[#0F1420] border-slate-800/90' : 'bg-white border-slate-200 shadow-sm'}`}>
                <span className="text-[11px] font-medium text-slate-400">Interest Paid Till Date</span>
                <div className="text-lg font-bold text-amber-400 mt-1">{formatINR(portfolio.totalInterestPaid)}</div>
                <p className="text-[10px] text-slate-400 mt-1">Bacha Interest: {formatINR(portfolio.totalRemainingInterest)}</p>
              </div>
              <div className={`p-3.5 rounded-2xl border ${darkMode ? 'bg-[#0F1420] border-slate-800/90' : 'bg-white border-slate-200 shadow-sm'}`}>
                <span className="text-[11px] font-medium text-slate-400">EMI Burden (FOIR)</span>
                <div className="text-lg font-bold text-indigo-400 mt-1">{portfolio.foirPct.toFixed(1)}%</div>
                <p className="text-[10px] text-slate-400 mt-1">{portfolio.activeLoansCount} Active Loans</p>
              </div>
            </div>
          </div>
        )}

        {(activeTab === 'dashboard' || activeTab === 'loans') && (
          <div className="space-y-3">
            {filteredLoans.map((loan) => {
              const isExpanded = expandedLoanId === loan.id;
              return (
                <div
                  key={loan.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    darkMode ? 'bg-[#0F1420] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="p-3.5 sm:p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400">
                            {loan.lender}
                          </span>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400">
                            {loan.roi}% ROI
                          </span>
                          <span className="text-[11px] text-slate-400">• {loan.borrower}</span>
                        </div>
                        <h3 className="text-sm font-bold mt-1">{loan.product}</h3>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-[10px] text-slate-400 uppercase">Monthly Outflow</div>
                        <div className="text-base font-extrabold text-rose-400">
                          {formatINR(loan.activeMonthlyTotalOutflow)}
                        </div>
                      </div>
                    </div>

                    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 p-2.5 rounded-xl border ${
                      darkMode ? 'bg-slate-900/70 border-slate-800/80' : 'bg-slate-50 border-slate-200/70'
                    }`}>
                      <div>
                        <div className="text-[10px] text-slate-400">Principal Bacha Hai</div>
                        <div className="text-xs sm:text-sm font-bold text-rose-400 mt-0.5">{formatINR(loan.remainingPrincipal)}</div>
                        <div className="text-[10px] text-slate-500">Total: {formatINR(loan.originalPrincipal)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400">Principal Pay Kiya</div>
                        <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">{formatINR(loan.principalPaid)}</div>
                        <div className="text-[10px] text-slate-500">{loan.completionPct.toFixed(1)}% Done</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400">Interest (Paid / Left)</div>
                        <div className="text-xs sm:text-sm font-bold text-amber-400 mt-0.5">
                          {formatINR(loan.interestPaid)} / {formatINR(loan.remainingInterest)}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400">Tenure Bacha Hai</div>
                        <div className="text-xs sm:text-sm font-bold text-indigo-400 mt-0.5">
                          {loan.remainingEmis}M Left <span className="text-[10px] font-normal text-slate-400">({loan.paidEmis}/{loan.tenureMonths})</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">Due: {loan.dueDay}th every month</span>
                      <button
                        onClick={() => setExpandedLoanId(isExpanded ? null : loan.id)}
                        className="text-xs font-semibold text-indigo-400 flex items-center gap-1"
                      >
                        {isExpanded ? 'Hide Schedule' : 'Full Schedule'}
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-800 px-3.5 py-3 bg-slate-950/50 max-h-64 overflow-y-auto">
                      <table className="w-full text-left border-collapse text-[11px]">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400">
                            <th className="py-1.5">#</th>
                            <th className="py-1.5">Date</th>
                            <th className="py-1.5 text-right">Prin.</th>
                            <th className="py-1.5 text-right">Int.</th>
                            <th className="py-1.5 text-right">Balance</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/40">
                          {loan.schedule.map((row) => (
                            <tr key={row.installmentNo} className={row.status === 'NEXT DUE' ? 'bg-indigo-500/15 font-semibold' : ''}>
                              <td className="py-1.5">{row.installmentNo}</td>
                              <td className="py-1.5">{formatDateShort(row.dateStr)}</td>
                              <td className="py-1.5 text-right text-emerald-400">{formatINR(row.principal)}</td>
                              <td className="py-1.5 text-right text-amber-400">{formatINR(row.interest)}</td>
                              <td className="py-1.5 text-right">{formatINR(row.closingBalance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Bottom Sticky Navigation Bar */}
      <nav className={`fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-xl px-2 py-1.5 ${
        darkMode ? 'bg-[#0B0F17]/95 border-slate-800' : 'bg-white/95 border-slate-200 shadow-lg'
      }`}>
        <div className="max-w-md mx-auto grid grid-cols-2 gap-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Layers },
            { id: 'loans', label: `All Loans (${computedLoans.length})`, icon: CreditCard }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition ${
                  isActive ? 'text-indigo-400 bg-indigo-500/10 font-bold' : 'text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] mt-0.5">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}