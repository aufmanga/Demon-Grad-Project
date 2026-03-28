import { useNavigate } from 'react-router-dom'
import { User, LogOut, Home, Box, Users, ShoppingCart, CreditCard, Wallet, ClipboardList, CreditCard as CardIcon, TrendingUp, Settings, FileText, ChevronUp, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from './AuthContext'

function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => prev === label ? null : label)
  }

  const navItems = [
    { icon: Home, label: 'الصفحة الرئيسية', active: true, path: '/dashboard' },
    { icon: Box, label: 'الاصناف', path: '/categories' },
    { icon: Users, label: 'العملاء', path: '/customers' },
    { 
      icon: ShoppingCart, 
      label: 'نقطة البيع', 
      dropdown: [
        { label: 'فواتير المبيعات', path: '/pos' },
        { label: 'مرتجع المبيعات', path: '/pos/returns' },
      ]
    },
    { 
      icon: CreditCard, 
      label: 'المشتريات', 
      dropdown: [
        { label: 'فواتير المشتريات', path: '/purchases' },
        { label: 'مرتجع المشتريات', path: '/purchases/returns' },
      ]
    },
    { icon: Wallet, label: 'المصروفات', path: '/expenses' },
    { icon: FileText, label: 'إذونات القبض', path: '/receipts' },
    { icon: CardIcon, label: 'إذونات الصرف', path: '/payments' },
    { 
      icon: TrendingUp, 
      label: 'التقارير', 
      dropdown: [
        { label: 'تقرير المشتريات', path: '/reports/purchases' },
        { label: 'أفضل العملاء', path: '/reports/top-customers' },
        { label: 'أفضل المنتجات', path: '/reports/top-products' },
        { label: 'الأرباح', path: '/reports/profits' },
        { label: 'تقرير العملاء', path: '/reports/customers' },
      ]
    },
    { icon: Settings, label: 'المستخدمين والصلاحيات', path: '/users' },
  ]

  const topProducts = [
    { rank: 1, name: 'لابتوب Dell XPS13', price: '50.00 ج' },
    { rank: 2, name: 'شاشة Samsung 27', price: '50.00 ج' },
    { rank: 3, name: 'ماوس لاسلكي Logitech', price: '50.00 ج' },
    { rank: 4, name: 'لابتوب Dell XPS 13', price: '50.00 ج' },
  ]

  const recentSales = [
    { id: '#1', customer: 'احمد محمد علي', date: '2015-2-11', amount: '50.00 ج', status: 'مدفوع' },
    { id: '#2', customer: 'احمد محمد عبدالله', date: '2015-2-12', amount: '50.00 ج', status: 'مسدد' },
    { id: '#3', customer: 'علي محمود حسن', date: '2015-7-11', amount: '50.00 ج', status: 'غير مسدد' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-24 bg-gradient-to-r from-sky-300 to-blue-400 z-50 shadow-md" style={{ borderRadius: '0 0 0 40px' }}>
        <div className="flex items-center justify-between h-full px-8">
          {/* User Info - Left */}
          <div className="flex items-center gap-3 ml-4">
            <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center text-white shadow-lg">
              <User size={32} />
            </div>
            <div className="text-right">
              <p className="text-white font-bold text-xl">احمد محمد</p>
              <p className="text-blue-100 text-sm">مدير النظام</p>
            </div>
          </div>
          
          {/* Title - Right */}
          <div className="flex items-center gap-4 mr-4">
            <h1 className="text-white text-4xl font-bold">نظام إدارة الشركات</h1>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed top-24 right-0 w-64 h-[calc(100vh-6rem)] bg-gradient-to-b from-sky-100 to-blue-200 pt-6 pb-4 px-3 overflow-y-auto" style={{ borderRadius: '40px 0 0 0' }}>
        <nav className="space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isOpen = openDropdown === item.label
            
            if (item.dropdown) {
              return (
                <div key={index}>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors w-full text-right ${
                      isOpen 
                        ? 'bg-blue-500 text-white shadow-md' 
                        : 'text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    <span className="font-medium">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <Icon size={20} />
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="mr-4 mt-1 space-y-1">
                      {item.dropdown.map((subItem, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() => navigate(subItem.path)}
                          className="block w-full text-right px-4 py-2 text-sm text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            
            return (
              <button
                key={index}
                onClick={() => item.path ? navigate(item.path) : null}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors w-full text-right ${
                  item.active 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'text-blue-700 hover:bg-blue-200'
                }`}
              >
                <span className="font-medium">{item.label}</span>
                <Icon size={20} />
              </button>
            )
          })}
        </nav>
        
        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="mt-4 w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors bg-red-500 text-white hover:bg-red-600"
        >
          <span className="font-medium">تسجيل خروج</span>
          <LogOut size={20} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="mr-64 pt-28 px-6 pb-6 flex-1">
        {/* Dashboard Title Section */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-blue-600 mb-1">لوحة التحكم</h2>
          <p className="text-gray-500">نظرة عامة على أداء الشركة</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* Customers Card */}
          <div className="bg-white rounded-2xl p-5 shadow-lg flex items-center gap-4 border border-gray-100">
            <div className="w-16 h-16 bg-purple-800 rounded-xl flex items-center justify-center shadow-md">
              <Users size={32} className="text-white" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">اجمالي العملاء</p>
              <p className="text-purple-800 text-2xl font-bold">73,778</p>
            </div>
          </div>

          {/* Profit Card */}
          <div className="bg-white rounded-2xl p-5 shadow-lg flex items-center gap-4 border border-gray-100">
            <div className="w-16 h-16 bg-green-700 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white text-3xl font-bold">$</span>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">صافي الربح</p>
              <p className="text-green-700 text-2xl font-bold">73,778</p>
            </div>
          </div>

          {/* Purchases Card */}
          <div className="bg-white rounded-2xl p-5 shadow-lg flex items-center gap-4 border border-gray-100">
            <div className="w-16 h-16 bg-amber-500 rounded-xl flex items-center justify-center shadow-md">
              <ClipboardList size={32} className="text-white" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">اجمالي المشتريات</p>
              <p className="text-amber-500 text-2xl font-bold">73,778</p>
            </div>
          </div>

          {/* Sales Card */}
          <div className="bg-white rounded-2xl p-5 shadow-lg flex items-center gap-4 border border-gray-100">
            <div className="w-16 h-16 bg-blue-700 rounded-xl flex items-center justify-center shadow-md">
              <ShoppingCart size={32} className="text-white" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">اجمالي المبيعات</p>
              <p className="text-blue-700 text-2xl font-bold">73,778</p>
            </div>
          </div>
        </div>

        {/* Top Products Table */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Box size={20} className="text-blue-600" />
            <h3 className="text-blue-600 font-bold text-lg">أكثر الاصناف مبيعا</h3>
          </div>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-800 font-medium">{product.price}</span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-700">{product.name}</span>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-blue-400' : index === 2 ? 'bg-blue-300' : 'bg-blue-200'
                  }`}>
                    {product.rank}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sales Table */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-blue-600 font-bold text-lg mb-4">اخر فواتير المبيعات</h3>
          <table className="w-full">
            <thead>
              <tr className="text-right border-b border-gray-200">
                <th className="pb-3 text-gray-600 font-medium">الحالة</th>
                <th className="pb-3 text-gray-600 font-medium">المبلغ</th>
                <th className="pb-3 text-gray-600 font-medium">التاريخ</th>
                <th className="pb-3 text-gray-600 font-medium">العميل</th>
                <th className="pb-3 text-gray-600 font-medium">رقم الفاتورة</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale, index) => (
                <tr key={index} className="border-b border-gray-100 last:border-0">
                  <td className="py-3">
                    <span className={`px-3 py-1 rounded text-xs font-medium ${
                      sale.status === 'مدفوع' ? 'bg-yellow-500 text-white' : 
                      sale.status === 'مسدد' ? 'bg-green-500 text-white' : 
                      'bg-orange-500 text-white'
                    }`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-800">{sale.amount}</td>
                  <td className="py-3 text-gray-800">{sale.date}</td>
                  <td className="py-3 text-gray-800">{sale.customer}</td>
                  <td className="py-3 text-gray-800 font-medium">{sale.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          {/* Total Products */}
          <div className="bg-orange-600 rounded-2xl p-6 text-white text-center shadow-lg">
            <p className="text-base mb-2 opacity-95">اجمالي المنتجات</p>
            <p className="text-4xl font-bold">250.00 ج</p>
          </div>

          {/* Monthly Expenses */}
          <div className="bg-lime-600 rounded-2xl p-6 text-white text-center shadow-lg">
            <p className="text-base mb-2 opacity-95">المصروفات الشهرية</p>
            <p className="text-4xl font-bold">150.00 ج</p>
          </div>

          {/* Customer Balance */}
          <div className="bg-sky-500 rounded-2xl p-6 text-white text-center shadow-lg">
            <p className="text-base mb-2 opacity-95">رصيد العملاء</p>
            <p className="text-4xl font-bold">50.00 ج</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
