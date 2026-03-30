import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'
import { 
  Search, 
  Plus, 
  Trash2, 
  Pencil, 
  X, 
  ChevronDown,
  ChevronUp,
  Home,
  Package,
  ShoppingCart,
  Users,
  CreditCard,
  FileText,
  TrendingUp,
  Settings,
  LogOut,
  Box,
  BarChart3,
  PieChart as PieChartIcon,
  Download,
  Calendar,
  Filter,
  ChevronLeft,
  ChevronRight,
  Menu,
  RefreshCcw,
  Printer
} from 'lucide-react'
import { useAuth } from './AuthContext'

interface ReportSale {
  id: string
  invoiceNumber: string
  date: string
  customer: string
  total: number
  paid: number
  remaining: number
}

interface ReportPurchase {
  id: string
  invoiceNumber: string
  date: string
  supplier: string
  total: number
  paid: number
  remaining: number
}

interface TopCustomer {
  rank: number
  name: string
  phone: string
  purchases: number
  totalSpent: number
  avgOrder: number
}

interface TopProduct {
  rank: number
  name: string
  quantity: number
  revenue: number
  avgPrice: number
}

interface CustomerReport {
  rank: number
  name: string
  phone: string
  email: string
  totalSales: number
  totalPaid: number
  balance: number
  percentage: number
}

function Reports() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()
  const [expandedSidebar, setExpandedSidebar] = useState(true)
  const [dateFilter, setDateFilter] = useState('last7days')
  const [searchQuery, setSearchQuery] = useState('')
  const [openDropdown, setOpenDropdown] = useState<string | null>('التقارير')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => prev === label ? null : label)
  }

  // Get current report type from URL
  const getCurrentReport = () => {
    const path = location.pathname
    if (path.includes('/reports/purchases')) return 'purchases'
    if (path.includes('/reports/top-customers')) return 'top-customers'
    if (path.includes('/reports/top-products')) return 'top-products'
    if (path.includes('/reports/profits')) return 'profits'
    if (path.includes('/reports/customers')) return 'customers'
    return 'sales'
  }

  const currentReport = getCurrentReport()

  const menuItems = [
    { icon: Home, label: 'الصفحة الرئيسية', active: false, path: '/dashboard' },
    { icon: Package, label: 'الاصناف', active: false, path: '/categories' },
    { icon: Users, label: 'العملاء', active: false, path: '/customers' },
    { 
      icon: ShoppingCart, 
      label: 'نقطة البيع', 
      active: false,
      expanded: false,
      subItems: [
        { label: 'فواتير المبيعات', active: false, path: '/pos', icon: FileText },
        { label: 'مرتجع المبيعات', active: false, path: '/pos/returns', icon: RefreshCcw },
      ]
    },
    { 
      icon: Box, 
      label: 'المشتريات', 
      active: false,
      expanded: false,
      subItems: [
        { label: 'فواتير المشتريات', active: false, path: '/purchases', icon: FileText },
        { label: 'مرتجع المشتريات', active: false, path: '/purchases/returns', icon: RefreshCcw },
      ]
    },
    { icon: CreditCard, label: 'المصروفات', active: false, path: '/expenses' },
    { icon: FileText, label: 'إذونات القبض', active: false, path: '/receipts' },
    { icon: FileText, label: 'إذونات الصرف', active: false, path: '/payments' },
    { 
      icon: TrendingUp, 
      label: 'التقارير', 
      active: true,
      expanded: true,
      subItems: [
        { label: 'تقارير المبيعات', active: currentReport === 'sales', path: '/reports', icon: BarChart },
        { label: 'تقارير المشتريات', active: currentReport === 'purchases', path: '/reports/purchases', icon: Box },
        { label: 'أكثر العملاء شراءً', active: currentReport === 'top-customers', path: '/reports/top-customers', icon: Users },
        { label: 'أكثر الأصناف مبيعاً', active: currentReport === 'top-products', path: '/reports/top-products', icon: Package },
        { label: 'تقارير الأرباح', active: currentReport === 'profits', path: '/reports/profits', icon: TrendingUp },
        { label: 'تقارير العملاء', active: currentReport === 'customers', path: '/reports/customers', icon: Users },
      ]
    },
    { icon: Settings, label: 'المستخدمين والصلاحيات', active: false, path: '/users' },
  ]

  const reportNavItems = [
    { label: 'تقارير المبيعات', path: '/reports', active: currentReport === 'sales' },
    { label: 'تقارير المشتريات', path: '/reports/purchases', active: currentReport === 'purchases' },
    { label: 'أكثر العملاء شراءً', path: '/reports/top-customers', active: currentReport === 'top-customers' },
    { label: 'أكثر الأصناف مبيعاً', path: '/reports/top-products', active: currentReport === 'top-products' },
    { label: 'تقارير الأرباح', path: '/reports/profits', active: currentReport === 'profits' },
    { label: 'تقارير العملاء', path: '/reports/customers', active: currentReport === 'customers' },
  ]

  // Sample data for sales reports
  const salesData: ReportSale[] = [
    { id: '1', invoiceNumber: 'INV-2026-001', date: '13-2-2026', customer: 'أحمد محمد', total: 14500, paid: 14500, remaining: 0 },
    { id: '2', invoiceNumber: 'INV-2026-001', date: '13-2-2026', customer: 'أحمد محمد', total: 14500, paid: 14500, remaining: 0 },
    { id: '3', invoiceNumber: 'INV-2026-001', date: '13-2-2026', customer: 'أحمد محمد', total: 14500, paid: 14500, remaining: 0 },
    { id: '4', invoiceNumber: 'INV-2026-001', date: '13-2-2026', customer: 'أحمد محمد', total: 14500, paid: 14500, remaining: 0 },
  ]

  // Sample data for purchases reports
  const purchasesData: ReportPurchase[] = [
    { id: '1', invoiceNumber: 'INV-2026-001', date: '13-2-2026', supplier: 'أحمد محمد', total: 14500, paid: 14500, remaining: 0 },
    { id: '2', invoiceNumber: 'INV-2026-001', date: '13-2-2026', supplier: 'أحمد محمد', total: 14500, paid: 14500, remaining: 0 },
    { id: '3', invoiceNumber: 'INV-2026-001', date: '13-2-2026', supplier: 'أحمد محمد', total: 14500, paid: 14500, remaining: 0 },
    { id: '4', invoiceNumber: 'INV-2026-001', date: '13-2-2026', supplier: 'أحمد محمد', total: 14500, paid: 14500, remaining: 0 },
  ]

  // Sample data for top customers
  const topCustomersData: TopCustomer[] = [
    { rank: 1, name: 'أحمد محمد محمود', phone: '01234567890', purchases: 8, totalSpent: 52000, avgOrder: 6500 },
    { rank: 2, name: 'أحمد حسن علي', phone: '01234567890', purchases: 8, totalSpent: 52000, avgOrder: 6500 },
    { rank: 3, name: 'سارة أحمد محمود', phone: '01234567890', purchases: 8, totalSpent: 52000, avgOrder: 6500 },
    { rank: 4, name: 'محمود عبدالله أحمد', phone: '01234567890', purchases: 8, totalSpent: 52000, avgOrder: 6500 },
    { rank: 5, name: 'هاجر أحمد محمود', phone: '01234567890', purchases: 8, totalSpent: 52000, avgOrder: 6500 },
  ]

  // Sample data for top products
  const topProductsData: TopProduct[] = [
    { rank: 1, name: 'لابتوب Dell XPS 15', quantity: 7, revenue: 25000, avgPrice: 25000 },
    { rank: 2, name: 'شاشة Samsung 27 بوصة', quantity: 2, revenue: 25000, avgPrice: 25000 },
    { rank: 3, name: 'طابعة HP LaserJet', quantity: 5, revenue: 25000, avgPrice: 25000 },
    { rank: 4, name: 'كيبورد وماوس Logitech', quantity: 7, revenue: 25000, avgPrice: 25000 },
    { rank: 5, name: 'ماوس لاسلكي Logitech', quantity: 1, revenue: 25000, avgPrice: 25000 },
  ]

  // Sample data for customers report
  const customersReportData: CustomerReport[] = [
    { rank: 1, name: 'أحمد محمد محمود', phone: '01089785743', email: 'Ahmed11@gmail.com', totalSales: 25000, totalPaid: 25000, balance: 25000, percentage: 30.2 },
    { rank: 2, name: 'أحمد محمد محمود', phone: '01089785743', email: 'Ahmed11@gmail.com', totalSales: 52000, totalPaid: 52000, balance: 52000, percentage: 30.2 },
    { rank: 3, name: 'أحمد محمد محمود', phone: '01089785743', email: 'Ahmed11@gmail.com', totalSales: 52000, totalPaid: 52000, balance: 52000, percentage: 30.2 },
    { rank: 4, name: 'أحمد محمد محمود', phone: '01089785743', email: 'Ahmed11@gmail.com', totalSales: 52000, totalPaid: 52000, balance: 52000, percentage: 30.2 },
  ]

  // Summary stats for different reports
  const salesStats = {
    totalSales: 40300,
    totalPaid: 29000,
    remaining: 11300,
    percentageChange: '+12%',
    collectionRate: '72.0%'
  }

  const purchasesStats = {
    totalPurchases: 40300,
    totalPaid: 29000,
    remaining: 11300,
    percentageChange: '+12%',
    paymentRate: '72.0%'
  }

  const topCustomersStats = {
    totalPurchases: 172000,
    top5Purchases: '5 عملاء',
    avgPurchases: 34400,
    bestCustomer: 'خالد عبدالله'
  }

  const topProductsStats = {
    totalReturns: 172000,
    totalRevenue: 34400,
    bestProduct: 'لابتوب Dell XPS 15'
  }

  const profitsStats = {
    netProfit: 245700,
    profitMargin: '609.68%',
    totalRevenue: 40300,
    totalExpenses: 286000
  }

  const customersStats = {
    totalCustomers: 5,
    totalSales: 172000,
    avgBalance: 15500,
    customersWithBalance: 3
  }

  const renderSalesReport = () => (
    <>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-1">إجمالي المبيعات</p>
          <p className="text-xl font-bold text-green-600">{salesStats.totalSales.toLocaleString()} ج</p>
          <p className="text-green-600 text-xs mt-1">+12% عن الشهر الماضي</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-1">المبلغ المحصل</p>
          <p className="text-xl font-bold text-green-600">{salesStats.totalPaid.toLocaleString()} ج</p>
          <p className="text-green-600 text-xs mt-1">{salesStats.collectionRate} من الإجمالي</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-1">المبلغ المتبقي</p>
          <p className="text-xl font-bold text-red-600">{salesStats.remaining.toLocaleString()} ج</p>
          <p className="text-red-600 text-xs mt-1">ذمم العملاء</p>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-bold text-center mb-4">المبيعات اليومية (آخر 7 أيام)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { day: 'فبر 10', sales: 15000 },
              { day: 'فبر 11', sales: 8500 },
              { day: 'فبر 12', sales: 12000 },
              { day: 'فبر 13', sales: 25000 },
              { day: 'فبر 14', sales: 32000 },
              { day: 'فبر 15', sales: 28000 },
              { day: 'فبر 16', sales: 19500 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(value) => `${value.toLocaleString()}`} />
              <Tooltip 
                formatter={(value) => [`${Number(value).toLocaleString()} ج`, 'المبيعات']}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Bar dataKey="sales" fill="#0e7eb5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-4 gap-4 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#0e7eb5] rounded"></span>
            المبيعات
          </span>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <h3 className="text-lg font-bold p-4 text-right">تفاصيل الفواتير</h3>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">المبلغ المتبقي</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">المدفوع</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">الإجمالي</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">العميل</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">التاريخ</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">رقم الفاتورة</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale) => (
              <tr key={sale.id} className="border-t border-gray-100">
                <td className="py-3 px-3 text-right text-red-600">{sale.remaining.toLocaleString()} ج</td>
                <td className="py-3 px-3 text-right text-green-600">{sale.paid.toLocaleString()} ج</td>
                <td className="py-3 px-3 text-right text-green-600">{sale.total.toLocaleString()} ج</td>
                <td className="py-3 px-3 text-right text-gray-800">{sale.customer}</td>
                <td className="py-3 px-3 text-right text-gray-600">{sale.date}</td>
                <td className="py-3 px-3 text-right text-gray-800">{sale.invoiceNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )

  const renderPurchasesReport = () => (
    <>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-1">إجمالي المشتريات</p>
          <p className="text-xl font-bold text-green-600">{purchasesStats.totalPurchases.toLocaleString()} ج</p>
          <p className="text-green-600 text-xs mt-1">+12% عن الشهر الماضي</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-1">المبلغ المدفوع</p>
          <p className="text-xl font-bold text-green-600">{purchasesStats.totalPaid.toLocaleString()} ج</p>
          <p className="text-green-600 text-xs mt-1">{purchasesStats.paymentRate} من الإجمالي</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-1">المبلغ المتبقي</p>
          <p className="text-xl font-bold text-red-600">{purchasesStats.remaining.toLocaleString()} ج</p>
          <p className="text-red-600 text-xs mt-1">ذمم الموردين</p>
        </div>
      </div>

      {/* Purchases Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-bold text-center mb-4">المشتريات اليومية (آخر 7 أيام)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { day: 'فبر 10', purchases: 18000 },
              { day: 'فبر 11', purchases: 12000 },
              { day: 'فبر 12', purchases: 8500 },
              { day: 'فبر 13', purchases: 25000 },
              { day: 'فبر 14', purchases: 15000 },
              { day: 'فبر 15', purchases: 22000 },
              { day: 'فبر 16', purchases: 19500 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(value) => `${value.toLocaleString()}`} />
              <Tooltip 
                formatter={(value) => [`${Number(value).toLocaleString()} ج`, 'المشتريات']}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Bar dataKey="purchases" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-4 gap-4 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-purple-500 rounded"></span>
            المشتريات
          </span>
        </div>
      </div>

      {/* Purchases Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <h3 className="text-lg font-bold p-4 text-right">تفاصيل الفواتير</h3>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">المبلغ المتبقي</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">المدفوع</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">الإجمالي</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">المورد</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">التاريخ</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">رقم الفاتورة</th>
            </tr>
          </thead>
          <tbody>
            {purchasesData.map((purchase) => (
              <tr key={purchase.id} className="border-t border-gray-100">
                <td className="py-3 px-3 text-right text-red-600">{purchase.remaining.toLocaleString()} ج</td>
                <td className="py-3 px-3 text-right text-green-600">{purchase.paid.toLocaleString()} ج</td>
                <td className="py-3 px-3 text-right text-green-600">{purchase.total.toLocaleString()} ج</td>
                <td className="py-3 px-3 text-right text-gray-800">{purchase.supplier}</td>
                <td className="py-3 px-3 text-right text-gray-600">{purchase.date}</td>
                <td className="py-3 px-3 text-right text-gray-800">{purchase.invoiceNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )

  const renderTopCustomersReport = () => (
    <>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-1">إجمالي مشتريات أفضل 5 عملاء</p>
          <p className="text-xl font-bold text-[#0e7eb5]">{topCustomersStats.totalPurchases.toLocaleString()} ج</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-1">متوسط المشتريات</p>
          <p className="text-xl font-bold text-green-600">{topCustomersStats.avgPurchases.toLocaleString()} ج</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-1">أفضل عميل</p>
          <p className="text-xl font-bold text-amber-500">{topCustomersStats.bestCustomer}</p>
        </div>
      </div>

      {/* Top Customers Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-bold text-center mb-4">مقارنة مشتريات العملاء</h3>
        <div className="h-64" style={{ minHeight: '250px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={[
                { name: 'أحمد محمد', purchases: 52000 },
                { name: 'أحمد علي', purchases: 52000 },
                { name: 'سارة أحمد', purchases: 52000 },
                { name: 'محمود عبدالله', purchases: 52000 },
                { name: 'هاجر أحمد', purchases: 52000 },
              ]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} interval={0} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(value) => `${value.toLocaleString()}`} />
              <Tooltip 
                formatter={(value) => [`${Number(value).toLocaleString()} ج`, 'المشتريات']}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Bar dataKey="purchases" fill="#0e7eb5" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Customers Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <h3 className="text-lg font-bold p-4 text-right">تفاصيل أفضل العملاء</h3>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">الترتيب</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">اسم العميل</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">عدد الزيارات</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">إجمالي المشتريات</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">متوسط الشراء</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">النسبة من المبيعات</th>
            </tr>
          </thead>
          <tbody>
            {topCustomersData.map((customer) => (
              <tr key={customer.rank} className="border-t border-gray-100">
                <td className="py-3 px-3 text-center">
                  <span className="w-6 h-6 bg-[#0e7eb5] text-white rounded-full flex items-center justify-center text-xs">
                    {customer.rank}
                  </span>
                </td>
                <td className="py-3 px-3 text-right text-gray-800">{customer.name}</td>
                <td className="py-3 px-3 text-right text-gray-600">{customer.purchases}</td>
                <td className="py-3 px-3 text-right text-green-600">{customer.totalSpent.toLocaleString()} ج</td>
                <td className="py-3 px-3 text-right text-[#0e7eb5]">{customer.avgOrder.toLocaleString()} ج</td>
                <td className="py-3 px-3 text-right text-red-500">30.2%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )

  const renderTopProductsReport = () => (
    <>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-1">إجمالي الإيرادات</p>
          <p className="text-xl font-bold text-[#0e7eb5]">{topProductsStats.totalReturns.toLocaleString()} ج</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-1">إجمالي الكمية المباعة</p>
          <p className="text-xl font-bold text-green-600">{topProductsStats.totalRevenue.toLocaleString()} ج</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-1">أكثر منتج مبيعاً</p>
          <p className="text-xl font-bold text-amber-500">{topProductsStats.bestProduct}</p>
        </div>
      </div>

      {/* Top Products Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-bold text-center mb-4">مقارنة إيرادات المنتجات</h3>
        <div className="h-64" style={{ minHeight: '250px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={[
                { name: 'لابتوب Dell', revenue: 25000 },
                { name: 'شاشة Samsung', revenue: 25000 },
                { name: 'طابعة HP', revenue: 25000 },
                { name: 'كيبورد Logitech', revenue: 25000 },
                { name: 'ماوس Logitech', revenue: 25000 },
              ]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} interval={0} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(value) => `${value.toLocaleString()}`} />
              <Tooltip 
                formatter={(value) => [`${Number(value).toLocaleString()} ج`, 'الإيرادات']}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <h3 className="text-lg font-bold p-4 text-right">تفاصيل أفضل المنتجات</h3>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">الترتيب</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">اسم المنتج</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">الكمية المباعة</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">الإيرادات</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">متوسط السعر</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">النسبة من المبيعات</th>
            </tr>
          </thead>
          <tbody>
            {topProductsData.map((product) => (
              <tr key={product.rank} className="border-t border-gray-100">
                <td className="py-3 px-3 text-center">
                  <span className="w-6 h-6 bg-[#0e7eb5] text-white rounded-full flex items-center justify-center text-xs">
                    {product.rank}
                  </span>
                </td>
                <td className="py-3 px-3 text-right text-gray-800">{product.name}</td>
                <td className="py-3 px-3 text-right text-gray-600">{product.quantity}</td>
                <td className="py-3 px-3 text-right text-green-600">{product.revenue.toLocaleString()} ج</td>
                <td className="py-3 px-3 text-right text-[#0e7eb5]">{product.avgPrice.toLocaleString()} ج</td>
                <td className="py-3 px-3 text-right text-red-500">30.2%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )

  const renderProfitsReport = () => (
    <>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-1">صافي الربح/الخسارة</p>
          <p className="text-xl font-bold text-gray-800">{profitsStats.netProfit.toLocaleString()} ج-م</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-1">هامش الربح</p>
          <p className="text-xl font-bold text-green-600">{profitsStats.profitMargin}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-1">إجمالي الإيرادات</p>
          <p className="text-xl font-bold text-[#0e7eb5]">{profitsStats.totalRevenue.toLocaleString()} ج-م</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-1">إجمالي التكاليف</p>
          <p className="text-xl font-bold text-amber-500">{profitsStats.totalExpenses.toLocaleString()} ج-م</p>
        </div>
      </div>

      {/* Profit Trend Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-bold text-center mb-4">تطور الربح الشهري</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { month: 'يناير', profit: 85000 },
              { month: 'فبراير', profit: 245700 },
              { month: 'مارس', profit: 120000 },
              { month: 'أبريل', profit: 180000 },
              { month: 'مايو', profit: 220000 },
              { month: 'يونيو', profit: 195000 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(value) => `${value.toLocaleString()}`} />
              <Tooltip 
                formatter={(value) => [`${Number(value).toLocaleString()} ج`, 'صافي الربح']}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue vs Expenses Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-bold text-center mb-4">مقارنة الإيرادات والتكاليف</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { month: 'يناير', revenue: 350000, expenses: 280000 },
              { month: 'فبراير', revenue: 403000, expenses: 286000 },
              { month: 'مارس', revenue: 380000, expenses: 260000 },
              { month: 'أبريل', revenue: 420000, expenses: 290000 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(value) => `${value.toLocaleString()}`} />
              <Tooltip 
                formatter={(value) => [`${Number(value).toLocaleString()} ج`, '']}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="revenue" name="الإيرادات" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="التكاليف" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4">
          <h4 className="text-center font-bold mb-4">نقاط مهمة</h4>
          <div className="space-y-3">
            <div className="bg-amber-100 rounded-lg p-3 text-sm text-amber-800">
              التكاليف تتجاوز الإيرادات هذا الشهر يمنح مزايجة المصروفات وزيادة المبيعات
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
              لم يتم شراء مخزون كبير هذا الشهر من المتوقع تحسن الأرباح الشهر القادم
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <h4 className="text-center font-bold mb-4">مكونات التكاليف</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-blue-50 rounded-lg p-2">
              <span className="text-sm text-gray-600">المشتريات</span>
              <span className="text-sm text-[#0e7eb5]">34,984</span>
            </div>
            <div className="flex justify-between items-center bg-blue-50 rounded-lg p-2">
              <span className="text-sm text-gray-600">المصروفات</span>
              <span className="text-sm text-[#0e7eb5]">76,088</span>
            </div>
            <div className="flex justify-between items-center bg-blue-50 rounded-lg p-2">
              <span className="text-sm text-gray-600">إجمالي التكاليف</span>
              <span className="text-sm text-[#0e7eb5]">276,088</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  const renderCustomersReport = () => (
    <>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-1">إجمالي العملاء</p>
          <p className="text-xl font-bold text-gray-800">{customersStats.totalCustomers}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-1">إجمالي المبيعات</p>
          <p className="text-xl font-bold text-green-600">{customersStats.totalSales.toLocaleString()} ج-م</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-1">الأرصدة المستحقة</p>
          <p className="text-xl font-bold text-[#0e7eb5]">{customersStats.avgBalance.toLocaleString()} ج-م</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
          <p className="text-gray-600 text-sm mb-1">عملاء لديهم أرصدة</p>
          <p className="text-xl font-bold text-amber-500">{customersStats.customersWithBalance}</p>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <h3 className="text-lg font-bold p-4 text-right">تفاصيل العملاء</h3>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">نسبة السداد</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">الرصيد المستحق</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">إجمالي المشتريات</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">البريد الالكتروني</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">رقم الهاتف</th>
              <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">اسم العميل</th>
            </tr>
          </thead>
          <tbody>
            {customersReportData.map((customer) => (
              <tr key={customer.rank} className="border-t border-gray-100">
                <td className="py-3 px-3 text-right text-red-500 text-sm">{customer.percentage}%</td>
                <td className="py-3 px-3 text-right text-[#0e7eb5]">{customer.balance.toLocaleString()} ج</td>
                <td className="py-3 px-3 text-right text-green-600">{customer.totalSales.toLocaleString()} ج</td>
                <td className="py-3 px-3 text-right text-gray-600 text-sm">{customer.email}</td>
                <td className="py-3 px-3 text-right text-gray-600">{customer.phone}</td>
                <td className="py-3 px-3 text-right text-gray-800">{customer.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4">
          <h4 className="text-center font-bold mb-4">أفضل 3 عملاء (حسب المبيعات)</h4>
          <div className="space-y-3">
            {[
              { rank: 1, name: 'خالد عبدالله', phone: '01234567890', amount: '276,088' },
              { rank: 2, name: 'خالد عبدالله', phone: '01234567890', amount: '76,088' },
              { rank: 3, name: 'خالد عبدالله', phone: '01234567890', amount: '34,984' },
            ].map((customer) => (
              <div key={customer.rank} className="flex items-center justify-between bg-amber-100 rounded-lg p-3">
                <span className="text-amber-600 font-bold">{customer.amount} ج</span>
                <div className="text-right">
                  <p className="text-sm font-medium">{customer.name}</p>
                  <p className="text-xs text-gray-600">{customer.phone}</p>
                </div>
                <span className="w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs">
                  {customer.rank}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <h4 className="text-center font-bold mb-4">أفضل 3 عملاء (حسب المبيعات)</h4>
          <div className="space-y-3">
            {[
              { rank: 1, name: 'خالد عبدالله', phone: '01234567890', amount: '34,984' },
              { rank: 2, name: 'خالد عبدالله', phone: '01234567890', amount: '76,088' },
              { rank: 3, name: 'خالد عبدالله', phone: '01234567890', amount: '276,088' },
            ].map((customer) => (
              <div key={customer.rank} className="flex items-center justify-between bg-blue-50 rounded-lg p-3">
                <span className="text-green-600 font-bold">{customer.amount} ج</span>
                <div className="text-right">
                  <p className="text-sm font-medium">{customer.name}</p>
                  <p className="text-xs text-gray-600">{customer.phone}</p>
                </div>
                <span className="w-6 h-6 bg-[#0e7eb5] text-white rounded-full flex items-center justify-center text-xs">
                  {customer.rank}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )

  const getReportTitle = () => {
    switch (currentReport) {
      case 'sales': return 'تقارير المبيعات'
      case 'purchases': return 'تقارير المشتريات'
      case 'top-customers': return 'أكثر العملاء شراءً'
      case 'top-products': return 'أكثر الأصناف مبيعاً'
      case 'profits': return 'تقارير الأرباح'
      case 'customers': return 'تقارير العملاء'
      default: return 'تقارير المبيعات'
    }
  }

  const getReportSubtitle = () => {
    switch (currentReport) {
      case 'sales': return 'تقرير شامل عن المبيعات والإيرادات'
      case 'purchases': return 'تقرير شامل عن المشتريات والموردين'
      case 'top-customers': return 'تقرير عن أفضل العملاء حسب قيمة المشتريات'
      case 'top-products': return 'تقرير عن المنتجات الأكثر مبيعاً'
      case 'profits': return 'تحليل الأرباح والخسائر'
      case 'customers': return 'تقرير شامل عن العملاء وأرصدتهم'
      default: return 'تقرير شامل عن المبيعات والإيرادات'
    }
  }

  return (
    <div className="min-h-screen bg-sky-50 flex">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Sidebar - Desktop: Static, Mobile: Slide-out */}
      <aside className={`fixed top-0 right-0 w-64 h-screen bg-sky-100 p-4 z-50 transition-transform duration-300 md:translate-x-0 md:static md:h-auto ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Close button for mobile */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden absolute top-4 left-4 p-2 bg-white/50 rounded-lg hover:bg-white/70 transition-colors"
        >
          <X size={20} />
        </button>
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const isOpen = openDropdown === item.label
            return (
              <div key={index}>
                <button
                  onClick={() => {
                    if (item.subItems) {
                      toggleDropdown(item.label)
                      // Navigate to first sub-item by default
                      if (item.subItems[0]?.path) {
                        navigate(item.subItems[0].path)
                      }
                    } else if (item.path) {
                      navigate(item.path)
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-colors ${
                    item.active 
                      ? 'bg-[#0e7eb5] text-white' 
                      : 'text-[#0e7eb5] hover:bg-sky-200'
                  }`}
                >
                  <span className="flex-1">{item.label}</span>
                  <div className="flex items-center gap-2">
                    {item.subItems ? (
                      <>
                        <item.icon size={20} />
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </>
                    ) : (
                      <item.icon size={20} />
                    )}
                  </div>
                </button>
                {item.subItems && isOpen && (
                  <div className="mr-4 mt-1 space-y-1">
                    {item.subItems.map((sub, subIndex) => {
                      const SubIcon = sub.icon
                      return (
                        <button
                          key={subIndex}
                          onClick={() => sub.path && navigate(sub.path)}
                          className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-right text-sm transition-colors ${
                            sub.active 
                              ? 'bg-[#0e7eb5]/20 text-[#0e7eb5] font-medium' 
                              : 'text-gray-600 hover:bg-sky-200'
                          }`}
                        >
                          <span className="flex-1">{sub.label}</span>
                          {SubIcon && <SubIcon size={16} />}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        
        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="mt-4 w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors bg-red-500 text-white hover:bg-red-600"
        >
          <span className="font-medium">تسجيل خروج</span>
          <LogOut size={20} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 bg-white rounded-lg shadow-md"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-bold text-[#0e7eb5]">التقارير</h1>
          <div className="w-10"></div>
        </div>

        {/* Header */}
        <header className="hidden md:flex bg-sky-100 rounded-3xl p-4 mb-6 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#0e7eb5] rounded-full flex items-center justify-center text-white font-bold text-xl">
              i
            </div>
            <div className="text-right">
              <p className="font-bold text-[#0e7eb5]">احمد محمد</p>
              <p className="text-sm text-gray-500">مدير النظام</p>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#0e7eb5]">نظام إدارة الشركات</h1>
            <p className="text-sm text-gray-500">إدارة شاملة للمبيعات والمشتريات</p>
          </div>
          <div className="w-12"></div>
        </header>

        {/* Page Title */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button className="bg-[#0e7eb5] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#0a6a99] transition-colors text-sm">
              <Printer size={16} />
              طباعة
            </button>
            <button className="bg-[#0e7eb5] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#0a6a99] transition-colors text-sm">
              <Download size={16} />
              اختر الفترة
            </button>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-[#0e7eb5]">{getReportTitle()}</h2>
            <p className="text-gray-400">{getReportSubtitle()}</p>
          </div>
        </div>

        {/* Report Content */}
        {currentReport === 'sales' && renderSalesReport()}
        {currentReport === 'purchases' && renderPurchasesReport()}
        {currentReport === 'top-customers' && renderTopCustomersReport()}
        {currentReport === 'top-products' && renderTopProductsReport()}
        {currentReport === 'profits' && renderProfitsReport()}
        {currentReport === 'customers' && renderCustomersReport()}
      </main>
    </div>
  )
}

export default Reports
