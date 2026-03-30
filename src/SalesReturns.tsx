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
  LogOut,
  Box,
  ChevronDown,
  ChevronUp,
  Eye,
  CheckCircle,
  XCircle,
  RefreshCcw,
  Menu
} from 'lucide-react'
import { useAuth } from './AuthContext'

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

function SalesReturns() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false)
  const [searchCustomer, setSearchCustomer] = useState('')
  const [searchInvoiceNumber, setSearchInvoiceNumber] = useState('')
  const [searchDateFrom, setSearchDateFrom] = useState('')
  const [searchDateTo, setSearchDateTo] = useState('')
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)
  const [returnItems, setReturnItems] = useState<any[]>([])
  const [selectedReturnItems, setSelectedReturnItems] = useState<number[]>([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedReturn, setSelectedReturn] = useState<SalesReturn | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>('نقطة البيع')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => prev === label ? null : label)
  }
  
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

  const openAddModal = () => {
    setShowAddModal(true)
    setShowInvoiceDetails(false)
    setSearchCustomer('')
    setSearchInvoiceNumber('')
    setSearchDateFrom('')
    setSearchDateTo('')
    setSelectedInvoice(null)
    setReturnItems([])
    setSelectedReturnItems([])
  }

  const handleShowInvoices = () => {
    // Mock finding an invoice based on search
    const foundInvoice = {
      id: 1,
      invoiceNumber: 'INV-2026-002',
      date: '2026/02/11',
      customerName: 'أحمد محمد',
      total: 25700,
      paid: 20000,
      items: [
        { id: 1, productName: 'ماوس لاسلكي Logitech', quantity: 5, unitPrice: 50.00, total: 250.00 },
        { id: 2, productName: 'ماوس لاسلكي Logitech', quantity: 2, unitPrice: 20.00, total: 40.00 },
        { id: 3, productName: 'ماوس لاسلكي Logitech', quantity: 1, unitPrice: 25.00, total: 25.00 },
        { id: 4, productName: 'ماوس لاسلكي Logitech', quantity: 1, unitPrice: 25.00, total: 25.00 },
        { id: 5, productName: 'ماوس لاسلكي Logitech', quantity: 1, unitPrice: 50.00, total: 50.00 },
        { id: 6, productName: 'ماوس لاسلكي Logitech', quantity: 1, unitPrice: 40.00, total: 40.00 },
      ]
    }
    setSelectedInvoice(foundInvoice)
    setReturnItems(foundInvoice.items)
    setShowInvoiceDetails(true)
  }

  const toggleSelectItem = (itemId: number) => {
    if (selectedReturnItems.includes(itemId)) {
      setSelectedReturnItems(selectedReturnItems.filter(id => id !== itemId))
    } else {
      setSelectedReturnItems([...selectedReturnItems, itemId])
    }
  }

  const handleSelectAllItems = () => {
    if (selectedReturnItems.length === returnItems.length) {
      setSelectedReturnItems([])
    } else {
      setSelectedReturnItems(returnItems.map(item => item.id))
    }
  }

  const handleDeleteSelectedItems = () => {
    setReturnItems(returnItems.filter(item => !selectedReturnItems.includes(item.id)))
    setSelectedReturnItems([])
  }

  const calculateReturnTotal = () => {
    return returnItems
      .filter(item => selectedReturnItems.includes(item.id))
      .reduce((sum, item) => sum + item.total, 0)
  }

  const handleRegisterReturn = () => {
    // Save return and close modal
    setShowAddModal(false)
    setShowInvoiceDetails(false)
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
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Right Sidebar - Desktop: Static, Mobile: Slide-out */}
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
                  {item.subItems ? (
                    <>
                      <item.icon size={20} />
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </>
                  ) : (
                    <item.icon size={20} />
                  )}
                </button>
                {item.subItems && isOpen && (
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
          <h1 className="text-lg font-bold text-[#0e7eb5]">مرتجع المبيعات</h1>
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
          <div className="text-right">
            <h2 className="text-3xl font-bold text-[#0e7eb5]">مرتجع المبيعات</h2>
            <p className="text-gray-400">إدارة مرتجع المبيعات</p>
          </div>
          <button 
            onClick={openAddModal}
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
                        <Eye size={18} />
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

      {/* Add Return Modal - Search Step */}
      {showAddModal && !showInvoiceDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-[#0e7eb5] hover:text-[#0a6a99]"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-bold text-[#0e7eb5]">إضافة مرتجع جديد</h3>
            </div>
            
            <div className="space-y-4">
              {/* Search by Customer Name */}
              <div>
                <label className="block text-gray-700 text-sm mb-2 text-right">بحث باسم العميل</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchCustomer}
                    onChange={(e) => setSearchCustomer(e.target.value)}
                    placeholder="اسم العميل..."
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 pr-10 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              {/* Search by Invoice Number */}
              <div>
                <label className="block text-gray-700 text-sm mb-2 text-right">بحث برقم الفاتورة</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchInvoiceNumber}
                    onChange={(e) => setSearchInvoiceNumber(e.target.value)}
                    placeholder="رقم الفاتورة..."
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 pr-10 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              {/* Search by Date Range */}
              <div>
                <label className="block text-gray-700 text-sm mb-2 text-right">بحث خلال الفترة</label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <span className="text-xs text-gray-500 block text-right mb-1">من</span>
                    <input
                      type="text"
                      value={searchDateFrom}
                      onChange={(e) => setSearchDateFrom(e.target.value)}
                      placeholder="2026/02/10"
                      className="w-full border border-gray-200 rounded-lg py-3 px-3 text-center focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-gray-500 block text-right mb-1">الى</span>
                    <input
                      type="text"
                      value={searchDateTo}
                      onChange={(e) => setSearchDateTo(e.target.value)}
                      placeholder="2026/02/20"
                      className="w-full border border-gray-200 rounded-lg py-3 px-3 text-center focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleShowInvoices}
                className="w-full bg-[#0e7eb5] text-white py-3 rounded-lg font-bold hover:bg-[#0a6a99] transition-colors mt-4"
              >
                عرض الفواتير
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Return Modal - Invoice Details Step */}
      {showAddModal && showInvoiceDetails && selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => setShowInvoiceDetails(false)}
                className="text-[#0e7eb5] hover:text-[#0a6a99]"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-bold text-[#0e7eb5]">إضافة مرتجع جديد</h3>
            </div>
            
            {/* Invoice Info */}
            <div className="flex items-center gap-6 mb-4 text-right">
              <div>
                <span className="text-gray-600 text-sm">رقم الفاتورة:</span>
                <span className="font-bold mr-2">{selectedInvoice.invoiceNumber}</span>
              </div>
              <div>
                <span className="text-gray-600 text-sm">تاريخ الفاتورة:</span>
                <span className="font-bold mr-2">{selectedInvoice.date}</span>
              </div>
            </div>

            <div className="flex gap-4">
              {/* Items Table */}
              <div className="flex-1 bg-gray-50 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">الاجمالي</th>
                      <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">سعر البيع</th>
                      <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">الكمية</th>
                      <th className="py-3 px-3 text-right text-gray-600 font-medium text-sm">اسم الصنف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {returnItems.map((item) => (
                      <tr 
                        key={item.id} 
                        className={`border-t border-gray-200 cursor-pointer transition-colors ${
                          selectedReturnItems.includes(item.id) ? 'bg-blue-50' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => toggleSelectItem(item.id)}
                      >
                        <td className="py-3 px-3 text-right font-medium">{item.total.toFixed(2)}</td>
                        <td className="py-3 px-3 text-right">{item.unitPrice.toFixed(2)}</td>
                        <td className="py-3 px-3 text-right">{item.quantity}</td>
                        <td className="py-3 px-3 text-right">{item.productName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Right Panel */}
              <div className="w-48 space-y-3">
                <div className="bg-gray-50 rounded-xl p-4 text-center mb-4">
                  <p className="text-gray-600 text-sm mb-2">المبلغ المسترد</p>
                  <p className="text-2xl font-bold text-gray-800">{calculateReturnTotal().toFixed(2)}</p>
                </div>
                
                <button
                  type="button"
                  onClick={handleSelectAllItems}
                  className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                >
                  تحديد اصناف
                </button>
                
                <button
                  type="button"
                  onClick={handleDeleteSelectedItems}
                  disabled={selectedReturnItems.length === 0}
                  className={`w-full py-2 rounded-lg font-bold transition-colors ${
                    selectedReturnItems.length > 0
                      ? 'bg-white border border-red-300 text-red-600 hover:bg-red-50'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  حذف اصناف
                </button>
                
                <button
                  type="button"
                  onClick={handleRegisterReturn}
                  disabled={selectedReturnItems.length === 0}
                  className={`w-full py-3 rounded-lg font-bold transition-colors ${
                    selectedReturnItems.length > 0
                      ? 'bg-[#0e7eb5] text-white hover:bg-[#0a6a99]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  تسجيل مرتجع
                </button>
              </div>
            </div>

            {/* Bottom Summary */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <div className="flex gap-8">
                <div className="text-right">
                  <p className="text-gray-600 text-sm">رقم فاتورة المبيعات:</p>
                  <p className="font-bold">{selectedInvoice.invoiceNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-sm">تاريخ البيع:</p>
                  <p className="font-bold">{selectedInvoice.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-sm">المبلغ المدفوع:</p>
                  <p className="font-bold text-[#0e7eb5]">{selectedInvoice.paid.toLocaleString()} ج</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-sm">الاجمالي:</p>
                  <p className="font-bold text-amber-500">{selectedInvoice.total.toLocaleString()} ج</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Return Modal */}
      {showEditModal && selectedReturn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-[#0e7eb5] hover:text-[#0a6a99]"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-bold text-[#0e7eb5]">عرض مرتجع</h3>
            </div>
            
            {/* Return Header Info */}
            <div className="flex items-center justify-end gap-6 mb-6 text-right">
              <div>
                <span className="text-gray-600 text-sm block mb-1">السبب</span>
                <span className="font-bold text-gray-800">{selectedReturn.reason}</span>
              </div>
              <div>
                <span className="text-gray-600 text-sm block mb-1">عدد الاصناف</span>
                <span className="font-bold text-gray-800">{selectedReturn.itemCount}</span>
              </div>
              <div>
                <span className="text-gray-600 text-sm block mb-1">التاريخ</span>
                <span className="font-bold text-gray-800">{selectedReturn.date}</span>
              </div>
              <div>
                <span className="text-gray-600 text-sm block mb-1">رقم المرتجع</span>
                <span className="font-bold text-gray-800">{selectedReturn.returnNumber}</span>
              </div>
            </div>

            {/* Items Table */}
            <div className="bg-gray-50 rounded-xl overflow-hidden mb-6">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">الاجمالي</th>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">سعر البيع</th>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">الكمية</th>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">اسم الصنف</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedReturn.items.map((item) => (
                    <tr key={item.id} className="border-t border-gray-200">
                      <td className="py-3 px-4 text-right font-medium">{item.total.toLocaleString()} ج</td>
                      <td className="py-3 px-4 text-right">{item.unitPrice.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right">{item.quantity}</td>
                      <td className="py-3 px-4 text-right">{item.productName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Footer */}
            <div className="flex items-center justify-end gap-8 pt-4 border-t border-gray-200">
              <div className="text-right">
                <span className="text-gray-600 text-sm block">الفاتوره الاصليه</span>
                <span className="font-bold text-[#0e7eb5]">{selectedReturn.originalInvoice}</span>
              </div>
              <div className="text-right">
                <span className="text-gray-600 text-sm block">الإجمالي</span>
                <span className="font-bold text-amber-500">{selectedReturn.total.toLocaleString()} ج</span>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="w-full bg-[#0e7eb5] text-white py-3 rounded-lg font-bold hover:bg-[#0a6a99] transition-colors"
              >
                اغلاق
              </button>
            </div>
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
