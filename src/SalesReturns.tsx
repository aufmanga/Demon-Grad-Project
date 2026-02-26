import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  Plus, 
  Trash2, 
  Pencil, 
  X, 
  Home,
  Package,
  ShoppingCart,
  Users,
  CreditCard,
  FileText,
  TrendingUp,
  Settings,
  Box,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

interface ReturnItem {
  id: number
  productName: string
  quantity: number
  unitPrice: number
  total: number
}

interface SalesReturn {
  id: number
  returnNumber: string
  originalInvoice: string
  date: string
  customerName: string
  itemCount: number
  total: number
  reason: string
  items: ReturnItem[]
}

function SalesReturns({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedReturn, setSelectedReturn] = useState<SalesReturn | null>(null)
  const [expandedSidebar, setExpandedSidebar] = useState(true)
  
  // Form states for edit modal
  const [returnNumber, setReturnNumber] = useState('')
  const [originalInvoice, setOriginalInvoice] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [itemCount, setItemCount] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
  const [reason, setReason] = useState('')
  const [customerName, setCustomerName] = useState('')

  const [returns, setReturns] = useState<SalesReturn[]>([
    { 
      id: 1, 
      returnNumber: 'INV-2026-001', 
      originalInvoice: 'RET-2026-001',
      date: '13-2-2026', 
      customerName: 'احمد محمود',
      itemCount: 4,
      total: 5700,
      reason: 'عيب في المنتج',
      items: [
        { id: 1, productName: 'لابتوب Dell XPS 13', quantity: 1, unitPrice: 25000, total: 25000 },
        { id: 2, productName: 'ماوس لاسلكي', quantity: 1, unitPrice: 700, total: 700 }
      ]
    },
    { 
      id: 2, 
      returnNumber: 'INV-2026-001', 
      originalInvoice: 'RET-2026-001',
      date: '13-2-2026', 
      customerName: 'احمد محمود',
      itemCount: 4,
      total: 5700,
      reason: 'عيب في المنتج',
      items: [
        { id: 1, productName: 'شاشة سامسونج 27 بوصة', quantity: 1, unitPrice: 20000, total: 20000 },
        { id: 2, productName: 'كيبورد ميكانيكي', quantity: 1, unitPrice: 5700, total: 5700 }
      ]
    },
    { 
      id: 3, 
      returnNumber: 'INV-2026-001', 
      originalInvoice: 'RET-2026-001',
      date: '13-2-2026', 
      customerName: 'احمد محمود',
      itemCount: 4,
      total: 5700,
      reason: 'عيب في المنتج',
      items: [
        { id: 1, productName: 'طابعة HP LaserJet', quantity: 1, unitPrice: 20000, total: 20000 },
        { id: 2, productName: 'حبر طابعة', quantity: 2, unitPrice: 2850, total: 5700 }
      ]
    },
    { 
      id: 4, 
      returnNumber: 'INV-2026-001', 
      originalInvoice: 'RET-2026-001',
      date: '13-2-2026', 
      customerName: 'احمد محمود',
      itemCount: 4,
      total: 5700,
      reason: 'عيب في المنتج',
      items: [
        { id: 1, productName: 'سماعات رأس Sony', quantity: 1, unitPrice: 15000, total: 15000 },
        { id: 2, productName: 'ماوس لاسلكي', quantity: 2, unitPrice: 5350, total: 10700 }
      ]
    },
  ])

  const menuItems = [
    { icon: Home, label: 'الصفحة الرئيسية', active: false, path: '/dashboard' },
    { icon: Package, label: 'الاصناف', active: false, path: '/categories' },
    { icon: Users, label: 'العملاء', active: false, path: '/customers' },
    { 
      icon: ShoppingCart, 
      label: 'نقطة البيع', 
      active: true,
      expanded: true,
      subItems: [
        { label: 'فواتير المبيعات', active: false, path: '/pos' },
        { label: 'مرتجع المبيعات', active: true, path: '/pos/returns' },
      ]
    },
    { icon: Box, label: 'المشتريات', active: false, path: '/purchases' },
    { icon: CreditCard, label: 'المصروفات', active: false, path: '/expenses' },
    { icon: FileText, label: 'إذونات القبض', active: false, path: '/receipts' },
    { icon: FileText, label: 'إذونات الصرف', active: false, path: '/payments' },
    { icon: TrendingUp, label: 'التقارير', active: false, path: '/reports' },
    { icon: Settings, label: 'المستخدمين والصلاحيات', active: false, path: '/users' },
  ]

  // Calculate summary stats
  const totalReturns = returns.length
  const totalReturnValue = returns.reduce((sum, ret) => sum + ret.total, 0)
  const returnRate = 90 // Percentage

  const handleDeleteReturn = () => {
    if (selectedReturn) {
      setReturns(returns.filter(ret => ret.id !== selectedReturn.id))
      setShowDeleteModal(false)
      setSelectedReturn(null)
    }
  }

  const handleEditReturn = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedReturn) {
      const updatedReturns = returns.map(ret => 
        ret.id === selectedReturn.id 
          ? { 
              ...ret, 
              returnNumber,
              originalInvoice,
              date: returnDate,
              itemCount: parseInt(itemCount) || 0,
              total: parseFloat(totalAmount) || 0,
              reason,
              customerName
            }
          : ret
      )
      setReturns(updatedReturns)
      resetForm()
      setShowEditModal(false)
      setSelectedReturn(null)
    }
  }

  const resetForm = () => {
    setReturnNumber('')
    setOriginalInvoice('')
    setReturnDate('')
    setItemCount('')
    setTotalAmount('')
    setReason('')
    setCustomerName('')
  }

  const openEditModal = (ret: SalesReturn) => {
    setSelectedReturn(ret)
    setReturnNumber(ret.returnNumber)
    setOriginalInvoice(ret.originalInvoice)
    setReturnDate(ret.date)
    setItemCount(ret.itemCount.toString())
    setTotalAmount(ret.total.toString())
    setReason(ret.reason)
    setCustomerName(ret.customerName)
    setShowEditModal(true)
  }

  const openDeleteModal = (ret: SalesReturn) => {
    setSelectedReturn(ret)
    setShowDeleteModal(true)
  }

  const getReasonBadge = (reason: string) => {
    return <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium">{reason}</span>
  }

  // Filter returns based on search query
  const filteredReturns = returns.filter((ret) => 
    searchQuery === '' || 
    ret.returnNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ret.originalInvoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ret.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-sky-50 flex">
      {/* Right Sidebar */}
      <aside className="w-64 bg-sky-100 min-h-screen p-4">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => {
                  if (item.path) {
                    navigate(item.path)
                  } else if (item.subItems) {
                    // Toggle expanded for pos menu
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-colors ${
                  item.active 
                    ? 'bg-[#0e7eb5] text-white' 
                    : 'text-[#0e7eb5] hover:bg-sky-200'
                }`}
              >
                <span className="flex-1">{item.label}</span>
                {item.subItems ? (
                  expandedSidebar ? <ChevronUp size={20} /> : <ChevronDown size={20} />
                ) : (
                  <item.icon size={20} />
                )}
              </button>
              {item.subItems && expandedSidebar && (
                <div className="mr-4 mt-1 space-y-1">
                  {item.subItems.map((sub, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => sub.path && navigate(sub.path)}
                      className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-right text-sm transition-colors ${
                        sub.active 
                          ? 'bg-[#0e7eb5]/20 text-[#0e7eb5]' 
                          : 'text-gray-600 hover:bg-sky-200'
                      }`}
                    >
                      <span className="flex-1">{sub.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="bg-sky-100 rounded-3xl p-4 mb-6 flex items-center justify-between">
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
          <div className="text-right">
            <h2 className="text-3xl font-bold text-[#0e7eb5]">مرتجع المبيعات</h2>
            <p className="text-gray-400">إدارة مرتجع المبيعات</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#0e7eb5] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#0a6a99] transition-colors"
          >
            <Plus size={20} />
            إضافة مرتجع جديد
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-gray-600 text-sm mb-1">عدد المرتجعات</p>
            <p className="text-2xl font-bold text-gray-800">{totalReturns}</p>
            <p className="text-xs text-gray-400 mt-1">13-2-2026</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-amber-500 text-sm mb-1">إجمالي قيمه المرتجعات</p>
            <p className="text-2xl font-bold text-amber-500">{totalReturnValue.toLocaleString()} ج</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-[#0e7eb5] text-sm mb-1">نسبة المرتجعات</p>
            <p className="text-2xl font-bold text-[#0e7eb5]">{returnRate}%</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="البحث برقم الفاتورة او اسم العميل..."
              className="w-full bg-gray-50 rounded-lg py-3 px-4 pr-12 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Returns Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">الإجراءات</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">السبب</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">الإجمالي</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">عدد الاصناف</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">اسم العميل</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">التاريخ</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">الفاتوره الاصليه</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">رقم المرتجع</th>
              </tr>
            </thead>
            <tbody>
              {filteredReturns.map((ret) => (
                <tr key={ret.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => openDeleteModal(ret)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button 
                        onClick={() => openEditModal(ret)}
                        className="text-[#0e7eb5] hover:text-[#0a6a99]"
                      >
                        <Pencil size={18} />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-3">{getReasonBadge(ret.reason)}</td>
                  <td className="py-4 px-3 text-right text-amber-500 font-medium">{ret.total.toLocaleString()} ج</td>
                  <td className="py-4 px-3 text-right text-gray-600">{ret.itemCount}</td>
                  <td className="py-4 px-3 text-right text-gray-800 font-medium">{ret.customerName}</td>
                  <td className="py-4 px-3 text-right text-gray-600">{ret.date}</td>
                  <td className="py-4 px-3 text-right text-gray-600">{ret.originalInvoice}</td>
                  <td className="py-4 px-3 text-right text-gray-800 font-medium">{ret.returnNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add Return Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-[#0e7eb5] hover:text-[#0a6a99]"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-bold text-[#0e7eb5]">مرتجع المبيعات</h3>
            </div>
            
            {/* Invoice Items Table */}
            <div className="bg-gray-50 rounded-xl overflow-hidden mb-6">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">الإجمالي</th>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">عدد الأصناف</th>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">اسم العميل</th>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">التاريخ</th>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">رقم الفاتورة</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 text-right font-medium">25,700 ج</td>
                    <td className="py-3 px-4 text-right">2</td>
                    <td className="py-3 px-4 text-right">أحمد محمد</td>
                    <td className="py-3 px-4 text-right">13-4-2026</td>
                    <td className="py-3 px-4 text-right">INV-2026-001</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 text-right font-medium">25,700 ج</td>
                    <td className="py-3 px-4 text-right">2</td>
                    <td className="py-3 px-4 text-right">أحمد محمد</td>
                    <td className="py-3 px-4 text-right">13-4-2026</td>
                    <td className="py-3 px-4 text-right">INV-2026-001</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 text-right font-medium">25,700 ج</td>
                    <td className="py-3 px-4 text-right">2</td>
                    <td className="py-3 px-4 text-right">أحمد محمد</td>
                    <td className="py-3 px-4 text-right">13-4-2026</td>
                    <td className="py-3 px-4 text-right">INV-2026-001</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 text-right font-medium">25,700 ج</td>
                    <td className="py-3 px-4 text-right">2</td>
                    <td className="py-3 px-4 text-right">أحمد محمد</td>
                    <td className="py-3 px-4 text-right">13-4-2026</td>
                    <td className="py-3 px-4 text-right">INV-2026-001</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-3 px-4 text-right font-medium">25,700 ج</td>
                    <td className="py-3 px-4 text-right">2</td>
                    <td className="py-3 px-4 text-right">أحمد محمد</td>
                    <td className="py-3 px-4 text-right">13-4-2026</td>
                    <td className="py-3 px-4 text-right">INV-2026-001</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              type="button"
              className="w-full bg-[#0e7eb5] text-white py-2 rounded-lg font-bold mb-6 hover:bg-[#0a6a99] transition-colors"
            >
              بيع بسعر الجملة
            </button>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-right">
                  <p className="text-gray-600 text-sm mb-1">الإجمالي قبل الخصم</p>
                  <p className="text-xl font-bold text-[#0e7eb5]">1000 ج</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-sm mb-1">سلة البيع</p>
                  <p className="text-gray-800">أحمد محمد</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-right">
                  <p className="text-gray-600 text-sm mb-1">طريقة الدفع</p>
                  <select className="w-full border border-gray-200 rounded-lg py-2 px-3 text-right">
                    <option value="cash">نقدي</option>
                    <option value="card">بطاقة</option>
                    <option value="credit">آجل</option>
                  </select>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-sm mb-1">أحمد محمد</p>
                  <p className="text-gray-800">الكاشير</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(false)}
              className="w-full bg-[#0e7eb5] text-white py-3 rounded-xl font-bold hover:bg-[#0a6a99] transition-colors"
            >
              إتمام المرتجع
            </button>
          </div>
        </div>
      )}

      {/* Edit Return Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-[#0e7eb5] hover:text-[#0a6a99]"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-bold text-[#0e7eb5]">تعديل مرتجع</h3>
            </div>
            
            <form onSubmit={handleEditReturn}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 text-right">رقم المرتجع</label>
                <input
                  type="text"
                  value={returnNumber}
                  onChange={(e) => setReturnNumber(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 text-right">الفاتوره الاصليه</label>
                <input
                  type="text"
                  value={originalInvoice}
                  onChange={(e) => setOriginalInvoice(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">عدد الاصناف</label>
                  <input
                    type="number"
                    value={itemCount}
                    onChange={(e) => setItemCount(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">التاريخ</label>
                  <input
                    type="text"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 text-right">الإجمالي</label>
                <input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2 text-right">السبب</label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                >
                  الغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#0e7eb5] text-white py-3 rounded-lg font-bold hover:bg-[#0a6a99] transition-colors"
                >
                  حفظ التعديلات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm mx-4 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-8">
              هل أنت متأكد من حذف<br />هذا المرتجع؟
            </h3>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
              >
                الغاء
              </button>
              <button
                onClick={handleDeleteReturn}
                className="flex-1 bg-[#0e7eb5] text-white py-3 rounded-lg font-bold hover:bg-[#0a6a99] transition-colors"
              >
                تأكيد
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SalesReturns
