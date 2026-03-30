import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
  Menu,
  Eye,
  Store
} from 'lucide-react'
import { useAuth } from './AuthContext'

interface InvoiceItem {
  id: number
  productName: string
  quantity: number
  unitPrice: number
  total: number
}

interface PurchaseInvoice {
  id: number
  invoiceNumber: string
  date: string
  supplierName: string
  itemCount: number
  total: number
  paid: number
  remaining: number
  status: 'paid' | 'partial' | 'unpaid'
  items: InvoiceItem[]
}

interface PurchaseReturn {
  id: number
  returnNumber: string
  originalInvoice: string
  date: string
  supplierName: string
  itemCount: number
  total: number
  reason: string
  items: InvoiceItem[]
}

function Purchases() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const location = useLocation()
  const isReturnsPage = location.pathname.includes('/returns')
  
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showInvoicePreview, setShowInvoicePreview] = useState(false)
  const [newInvoiceNumber, setNewInvoiceNumber] = useState('')
  
  // Add Invoice form states
  const [selectedSupplier, setSelectedSupplier] = useState('')
  const [itemName, setItemName] = useState('')
  const [itemQuantity, setItemQuantity] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [sellPrice, setSellPrice] = useState('')
  const [invoiceItems, setInvoiceItems] = useState<any[]>([])
  const [newInvoiceDate] = useState('13-4-2026')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<PurchaseInvoice | null>(null)
  const [selectedReturn, setSelectedReturn] = useState<PurchaseReturn | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>('المشتريات')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => prev === label ? null : label)
  }
  
  // Form states for edit modal
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [invoiceDate, setInvoiceDate] = useState('')
  const [itemCount, setItemCount] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
  const [paidAmount, setPaidAmount] = useState('')
  const [remainingAmount, setRemainingAmount] = useState('')
  const [supplierName, setSupplierName] = useState('')
  const [status, setStatus] = useState<'paid' | 'partial' | 'unpaid'>('paid')

  const [invoices, setInvoices] = useState<PurchaseInvoice[]>([
    { 
      id: 1, 
      invoiceNumber: 'INV-2026-001', 
      date: '13-4-2026', 
      supplierName: 'أحمد محمد',
      itemCount: 2,
      total: 25700,
      paid: 20000,
      remaining: 5700,
      status: 'partial',
      items: [
        { id: 1, productName: 'لابتوب Dell XPS 13', quantity: 1, unitPrice: 25000, total: 25000 },
        { id: 2, productName: 'ماوس لاسلكي', quantity: 1, unitPrice: 700, total: 700 }
      ]
    },
    { 
      id: 2, 
      invoiceNumber: 'INV-2026-001', 
      date: '13-4-2026', 
      supplierName: 'أحمد محمد',
      itemCount: 2,
      total: 25700,
      paid: 20000,
      remaining: 5700,
      status: 'unpaid',
      items: [
        { id: 1, productName: 'شاشة سامسونج 27 بوصة', quantity: 1, unitPrice: 20000, total: 20000 },
        { id: 2, productName: 'كيبورد ميكانيكي', quantity: 1, unitPrice: 5700, total: 5700 }
      ]
    },
    { 
      id: 3, 
      invoiceNumber: 'INV-2026-001', 
      date: '13-4-2026', 
      supplierName: 'أحمد محمد',
      itemCount: 2,
      total: 25700,
      paid: 25700,
      remaining: 0,
      status: 'paid',
      items: [
        { id: 1, productName: 'طابعة HP LaserJet', quantity: 1, unitPrice: 20000, total: 20000 },
        { id: 2, productName: 'حبر طابعة', quantity: 2, unitPrice: 2850, total: 5700 }
      ]
    },
    { 
      id: 4, 
      invoiceNumber: 'INV-2026-001', 
      date: '13-4-2026', 
      supplierName: 'أحمد محمد',
      itemCount: 2,
      total: 25700,
      paid: 20000,
      remaining: 5700,
      status: 'partial',
      items: [
        { id: 1, productName: 'سماعات رأس Sony', quantity: 1, unitPrice: 15000, total: 15000 },
        { id: 2, productName: 'ماوس لاسلكي', quantity: 2, unitPrice: 5350, total: 10700 }
      ]
    },
  ])

  const [returns, setReturns] = useState<PurchaseReturn[]>([
    { 
      id: 1, 
      returnNumber: 'INV-2026-001', 
      originalInvoice: 'RET-2026-001',
      date: '13-2-2026', 
      supplierName: 'احمد محمود',
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
      supplierName: 'احمد محمود',
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
      supplierName: 'احمد محمود',
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
      supplierName: 'احمد محمود',
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
      active: false,
      expanded: false,
      subItems: [
        { label: 'فواتير المبيعات', active: false, path: '/pos' },
        { label: 'مرتجع المبيعات', active: false, path: '/pos/returns' },
      ]
    },
    { 
      icon: Box, 
      label: 'المشتريات', 
      active: true,
      expanded: true,
      subItems: [
        { label: 'فواتير المشتريات', active: !isReturnsPage, path: '/purchases' },
        { label: 'مرتجع المشتريات', active: isReturnsPage, path: '/purchases/returns' },
      ]
    },
    { icon: CreditCard, label: 'المصروفات', active: false, path: '/expenses' },
    { icon: FileText, label: 'إذونات القبض', active: false, path: '/receipts' },
    { icon: FileText, label: 'إذونات الصرف', active: false, path: '/payments' },
    { icon: TrendingUp, label: 'التقارير', active: false, path: '/reports' },
    { icon: Settings, label: 'المستخدمين والصلاحيات', active: false, path: '/users' },
  ]

  // Calculate summary stats for invoices
  const totalInvoices = invoices.length
  const totalPurchases = invoices.reduce((sum, inv) => sum + inv.total, 0)
  const totalPaid = invoices.reduce((sum, inv) => sum + inv.paid, 0)
  const totalRemaining = invoices.reduce((sum, inv) => sum + inv.remaining, 0)

  // Calculate summary stats for returns
  const totalReturns = returns.length
  const totalReturnValue = returns.reduce((sum, ret) => sum + ret.total, 0)
  const returnRate = 90 // Percentage

  const handleDeleteInvoice = () => {
    if (selectedInvoice) {
      setInvoices(invoices.filter(inv => inv.id !== selectedInvoice.id))
      setShowDeleteModal(false)
      setSelectedInvoice(null)
    }
  }

  const handleDeleteReturn = () => {
    if (selectedReturn) {
      setReturns(returns.filter(ret => ret.id !== selectedReturn.id))
      setShowDeleteModal(false)
      setSelectedReturn(null)
    }
  }

  const handleEditInvoice = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedInvoice) {
      const updatedInvoices = invoices.map(inv => 
        inv.id === selectedInvoice.id 
          ? { 
              ...inv, 
              invoiceNumber,
              date: invoiceDate,
              itemCount: parseInt(itemCount) || 0,
              total: parseFloat(totalAmount) || 0,
              paid: parseFloat(paidAmount) || 0,
              remaining: parseFloat(remainingAmount) || 0,
              status,
              supplierName
            }
          : inv
      )
      setInvoices(updatedInvoices)
      resetForm()
      setShowEditModal(false)
      setSelectedInvoice(null)
    }
  }

  const resetForm = () => {
    setInvoiceNumber('')
    setInvoiceDate('')
    setItemCount('')
    setTotalAmount('')
    setPaidAmount('')
    setRemainingAmount('')
    setSupplierName('')
    setStatus('paid')
  }

  const openAddModal = () => {
    // Generate next invoice number
    const maxNum = Math.max(...invoices.map(inv => {
      const match = inv.invoiceNumber.match(/INV-2026-(\d+)/)
      return match ? parseInt(match[1]) : 0
    }), 0)
    const nextNum = String(maxNum + 1).padStart(3, '0')
    setNewInvoiceNumber(`INV-2026-${nextNum}`)
    setSelectedSupplier('')
    setItemName('')
    setItemQuantity('')
    setPurchasePrice('')
    setSellPrice('')
    setInvoiceItems([])
    setShowInvoicePreview(false)
    setShowAddModal(true)
  }

  const addItemToInvoice = () => {
    if (!itemName || !itemQuantity || !purchasePrice) return
    
    const qty = parseInt(itemQuantity) || 1
    const pPrice = parseFloat(purchasePrice) || 0
    const sPrice = parseFloat(sellPrice) || 0
    const total = pPrice * qty
    
    const newItem = {
      id: Date.now(),
      productName: itemName,
      quantity: qty,
      purchasePrice: pPrice,
      sellPrice: sPrice,
      total: total
    }
    
    setInvoiceItems([...invoiceItems, newItem])
    setItemName('')
    setItemQuantity('')
    setPurchasePrice('')
    setSellPrice('')
  }

  const removeInvoiceItem = (itemId: number) => {
    setInvoiceItems(invoiceItems.filter(item => item.id !== itemId))
  }

  const calculateInvoiceTotal = () => {
    return invoiceItems.reduce((sum, item) => sum + item.total, 0)
  }

  const handleSaveInvoice = () => {
    setShowInvoicePreview(true)
  }

  const openEditModal = (invoice: PurchaseInvoice) => {
    setSelectedInvoice(invoice)
    setInvoiceNumber(invoice.invoiceNumber)
    setInvoiceDate(invoice.date)
    setItemCount(invoice.itemCount.toString())
    setTotalAmount(invoice.total.toString())
    setPaidAmount(invoice.paid.toString())
    setRemainingAmount(invoice.remaining.toString())
    setStatus(invoice.status)
    setSupplierName(invoice.supplierName)
    setShowEditModal(true)
  }

  const openDeleteModal = (invoice: PurchaseInvoice) => {
    setSelectedInvoice(invoice)
    setShowDeleteModal(true)
  }

  const openReturnDeleteModal = (ret: PurchaseReturn) => {
    setSelectedReturn(ret)
    setShowDeleteModal(true)
  }

  const openReturnEditModal = (ret: PurchaseReturn) => {
    setSelectedReturn(ret)
    // Set form values for return
    setShowEditModal(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">مدفوعة</span>
      case 'partial':
        return <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium">مدفوعة جزئياً</span>
      case 'unpaid':
        return <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">غير مدفوع</span>
      default:
        return null
    }
  }

  const getReasonBadge = (reason: string) => {
    return <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium">{reason}</span>
  }

  // Filter based on search query
  const filteredInvoices = invoices.filter((inv) => 
    searchQuery === '' || 
    inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredReturns = returns.filter((ret) => 
    searchQuery === '' || 
    ret.returnNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ret.originalInvoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ret.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
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
          <h1 className="text-lg font-bold text-[#0e7eb5]">المشتريات</h1>
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

        {!isReturnsPage ? (
          <>
            {/* Purchase Invoices Page */}
            {/* Page Title */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-right">
                <h2 className="text-3xl font-bold text-[#0e7eb5]">فواتير المشتريات</h2>
                <p className="text-gray-400">إدارة فواتير الشراء والموردين</p>
              </div>
              <button 
                onClick={openAddModal}
                className="bg-[#0e7eb5] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#0a6a99] transition-colors"
              >
                <Plus size={20} />
                إنشاء فاتوره جديده
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <p className="text-gray-600 text-sm mb-1">عدد الفواتير</p>
                <p className="text-2xl font-bold text-gray-800">{totalInvoices}</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <p className="text-green-500 text-sm mb-1">إجمالي المشتريات</p>
                <p className="text-2xl font-bold text-green-500">{totalPurchases.toLocaleString()} ج</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <p className="text-[#0e7eb5] text-sm mb-1">إجمالي المدفوع</p>
                <p className="text-2xl font-bold text-[#0e7eb5]">{totalPaid.toLocaleString()} ج</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <p className="text-amber-500 text-sm mb-1">المبلغ المتبقي</p>
                <p className="text-2xl font-bold text-amber-500">{totalRemaining.toLocaleString()} ج</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="البحث برقم الفاتورة أو اسم المورد..."
                  className="w-full bg-gray-50 rounded-lg py-3 px-4 pr-12 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">الإجراءات</th>
                    <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">الحالة</th>
                    <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">المتبقي</th>
                    <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">المدفوع</th>
                    <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">الإجمالي</th>
                    <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">عدد الأصناف</th>
                    <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">اسم المورد</th>
                    <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">التاريخ</th>
                    <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">رقم الفاتورة</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => openDeleteModal(invoice)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                          <button 
                            onClick={() => openEditModal(invoice)}
                            className="text-[#0e7eb5] hover:text-[#0a6a99]"
                          >
                            <Eye size={18} />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-3">{getStatusBadge(invoice.status)}</td>
                      <td className="py-4 px-3 text-right text-amber-500 font-medium">{invoice.remaining.toLocaleString()} ج</td>
                      <td className="py-4 px-3 text-right text-gray-600">{invoice.paid.toLocaleString()} ج</td>
                      <td className="py-4 px-3 text-right text-gray-600">{invoice.total.toLocaleString()} ج</td>
                      <td className="py-4 px-3 text-right text-gray-600">{invoice.itemCount}</td>
                      <td className="py-4 px-3 text-right text-gray-800 font-medium">{invoice.supplierName}</td>
                      <td className="py-4 px-3 text-right text-gray-600">{invoice.date}</td>
                      <td className="py-4 px-3 text-right text-gray-800 font-medium">{invoice.invoiceNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            {/* Purchase Returns Page */}
            {/* Page Title */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-right">
                <h2 className="text-3xl font-bold text-[#0e7eb5]">مرتجع المشتريات</h2>
                <p className="text-gray-400">إدارة مرتجع المشتريات للموردين</p>
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
                  placeholder="البحث برقم المرتجع او اسم المورد..."
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
                    <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">اسم المورد</th>
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
                            onClick={() => openReturnDeleteModal(ret)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                          <button 
                            onClick={() => openReturnEditModal(ret)}
                            className="text-[#0e7eb5] hover:text-[#0a6a99]"
                          >
                            <Eye size={18} />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-3">{getReasonBadge(ret.reason)}</td>
                      <td className="py-4 px-3 text-right text-amber-500 font-medium">{ret.total.toLocaleString()} ج</td>
                      <td className="py-4 px-3 text-right text-gray-600">{ret.itemCount}</td>
                      <td className="py-4 px-3 text-right text-gray-800 font-medium">{ret.supplierName}</td>
                      <td className="py-4 px-3 text-right text-gray-600">{ret.date}</td>
                      <td className="py-4 px-3 text-right text-gray-600">{ret.originalInvoice}</td>
                      <td className="py-4 px-3 text-right text-gray-800 font-medium">{ret.returnNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>

      {/* Add Invoice Modal - Create Form Step */}
      {showAddModal && !showInvoicePreview && !isReturnsPage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-[#0e7eb5] hover:text-[#0a6a99]"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-bold text-[#0e7eb5]">انشاء فاتوره جديده</h3>
            </div>
            
            <div className="space-y-4">
              {/* Supplier Selection */}
              <div>
                <label className="block text-gray-700 text-sm mb-2 text-right">اسم المورد</label>
                <select 
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                >
                  <option value="">اختر المورد</option>
                  <option value="1">أحمد محمد</option>
                  <option value="2">محمد محمود</option>
                  <option value="3">علي أحمد</option>
                </select>
              </div>

              {/* Item and Quantity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">الكمية</label>
                  <input
                    type="number"
                    value={itemQuantity}
                    onChange={(e) => setItemQuantity(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    placeholder="الكمية"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">الصنف</label>
                  <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    placeholder="اسم الصنف"
                  />
                </div>
              </div>

              {/* Purchase and Sell Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">سعر البيع</label>
                  <input
                    type="number"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    placeholder="سعر البيع"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">سعر الشراء</label>
                  <input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    placeholder="سعر الشراء"
                  />
                </div>
              </div>

              {/* Items Table */}
              <div className="bg-gray-50 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-3 text-right text-gray-600 font-medium text-sm">حذف</th>
                      <th className="py-2 px-3 text-right text-gray-600 font-medium text-sm">السعر</th>
                      <th className="py-2 px-3 text-right text-gray-600 font-medium text-sm">الكمية</th>
                      <th className="py-2 px-3 text-right text-gray-600 font-medium text-sm">اسم الصنف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceItems.length === 0 ? (
                      <tr className="border-t border-gray-200">
                        <td colSpan={4} className="py-4 px-3 text-center text-gray-400 text-sm">
                          لا توجد أصناف مضافة
                        </td>
                      </tr>
                    ) : (
                      invoiceItems.map((item) => (
                        <tr key={item.id} className="border-t border-gray-200">
                          <td className="py-2 px-3 text-center">
                            <button
                              type="button"
                              onClick={() => removeInvoiceItem(item.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                          <td className="py-2 px-3 text-right">{item.purchasePrice.toFixed(2)}</td>
                          <td className="py-2 px-3 text-right">{item.quantity}</td>
                          <td className="py-2 px-3 text-right">{item.productName}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-300 text-white py-3 rounded-lg font-bold hover:bg-gray-400 transition-colors"
                >
                  الغاء
                </button>
                <button
                  type="button"
                  onClick={addItemToInvoice}
                  disabled={!itemName || !itemQuantity || !purchasePrice}
                  className={`flex-1 py-3 rounded-lg font-bold transition-colors ${
                    itemName && itemQuantity && purchasePrice
                      ? 'bg-[#0e7eb5] text-white hover:bg-[#0a6a99]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  اضافه
                </button>
                <button
                  type="button"
                  onClick={handleSaveInvoice}
                  disabled={invoiceItems.length === 0}
                  className={`flex-1 py-3 rounded-lg font-bold transition-colors ${
                    invoiceItems.length > 0
                      ? 'bg-[#0e7eb5] text-white hover:bg-[#0a6a99]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  حفظ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Invoice Modal - Preview Step */}
      {showAddModal && showInvoicePreview && !isReturnsPage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setShowInvoicePreview(false)}
                className="text-[#0e7eb5] hover:text-[#0a6a99]"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-bold text-[#0e7eb5]">عرض الفاتورة</h3>
            </div>
            
            {/* Invoice Header Info */}
            <div className="flex items-center justify-end gap-8 mb-6 text-right">
              <div>
                <span className="text-gray-600 text-sm block mb-1">اسم العميل</span>
                <span className="font-bold text-gray-800">
                  {selectedSupplier === '1' ? 'أحمد محمد' : selectedSupplier === '2' ? 'محمد محمود' : selectedSupplier === '3' ? 'علي أحمد' : ''}
                </span>
              </div>
              <div>
                <span className="text-gray-600 text-sm block mb-1">عدد الاصناف</span>
                <span className="font-bold text-gray-800">{invoiceItems.length}</span>
              </div>
              <div>
                <span className="text-gray-600 text-sm block mb-1">التاريخ</span>
                <span className="font-bold text-gray-800">{newInvoiceDate}</span>
              </div>
              <div>
                <span className="text-gray-600 text-sm block mb-1">رقم الفاتورة</span>
                <span className="font-bold text-gray-800">{newInvoiceNumber}</span>
              </div>
            </div>

            {/* Items Table */}
            <div className="bg-gray-50 rounded-xl overflow-hidden mb-6">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">الاجمالي</th>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">سعر البيع</th>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">سعر الشراء</th>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">الكمية</th>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">اسم الصنف</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceItems.map((item) => (
                    <tr key={item.id} className="border-t border-gray-200">
                      <td className="py-3 px-4 text-right font-medium">{item.total.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right">{item.sellPrice.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right">{item.purchasePrice.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right">{item.quantity}</td>
                      <td className="py-3 px-4 text-right">{item.productName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex gap-8 text-right">
                <div>
                  <span className="text-gray-600 text-sm block">الاجمالي</span>
                  <span className="font-bold text-amber-500">{calculateInvoiceTotal().toLocaleString()} ج</span>
                </div>
                <div>
                  <span className="text-gray-600 text-sm block">المدفوع</span>
                  <span className="font-bold text-[#0e7eb5]">20,000 ج</span>
                </div>
                <div>
                  <span className="text-gray-600 text-sm block">المتبقي</span>
                  <span className="font-bold text-amber-500">5,700 ج</span>
                </div>
                <div>
                  <span className="text-gray-600 text-sm block">طريقة الدفع</span>
                  <span className="font-bold">نقدي</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Return Modal - for Purchase Returns page */}
      {showAddModal && isReturnsPage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-[#0e7eb5] hover:text-[#0a6a99]"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-bold text-[#0e7eb5]">إضافة مرتجع جديد</h3>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); setShowAddModal(false); }}>
              {/* Return Number */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 text-right">رقم المرتجع</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  placeholder=""
                />
              </div>

              {/* Original Invoice */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 text-right">الفاتوره الاصليه</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  placeholder=""
                />
              </div>

              {/* Date and Item Count */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">التاريخ</label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    placeholder=""
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">عدد الاصناف</label>
                  <input
                    type="number"
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    placeholder=""
                  />
                </div>
              </div>

              {/* Total */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 text-right">الاجمالي</label>
                <input
                  type="number"
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  placeholder=""
                />
              </div>

              {/* Reason */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2 text-right">السبب</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  placeholder=""
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-300 text-white py-3 rounded-lg font-bold hover:bg-gray-400 transition-colors"
                >
                  الغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#0e7eb5] text-white py-3 rounded-lg font-bold hover:bg-[#0a6a99] transition-colors"
                >
                  اضافة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-[#0e7eb5] hover:text-[#0a6a99]"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-bold text-[#0e7eb5]">
                {isReturnsPage ? 'عرض مرتجع' : 'عرض الفاتوره'}
              </h3>
            </div>
            
            <form onSubmit={isReturnsPage ? (e) => { e.preventDefault(); setShowEditModal(false); } : handleEditInvoice}>
              {!isReturnsPage && (
                <>
                  {/* Invoice Header Info */}
                  <div className="flex items-center justify-end gap-6 mb-6 text-right">
                    <div>
                      <span className="text-gray-600 text-sm block mb-1">اسم العميل</span>
                      <span className="font-bold text-gray-800">{supplierName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm block mb-1">عدد الاصناف</span>
                      <span className="font-bold text-gray-800">{itemCount}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm block mb-1">التاريخ</span>
                      <span className="font-bold text-gray-800">{invoiceDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm block mb-1">رقم الفاتورة</span>
                      <span className="font-bold text-gray-800">{invoiceNumber}</span>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="bg-gray-50 rounded-xl overflow-hidden mb-6">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">الاجمالي</th>
                          <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">سعر البيع</th>
                          <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">سعر الشراء</th>
                          <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">الكمية</th>
                          <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">اسم الصنف</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedInvoice?.items?.map((item: any) => (
                          <tr key={item.id} className="border-t border-gray-200">
                            <td className="py-3 px-4 text-right font-medium">{item.total.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">{(item.unitPrice * 1.2).toFixed(2)}</td>
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
                      <span className="text-gray-600 text-sm block">طريقة الدفع</span>
                      <span className="font-bold">نقدي</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-600 text-sm block">المتبقي</span>
                      <span className="font-bold text-amber-500">{parseInt(remainingAmount).toLocaleString()} ج</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-600 text-sm block">المدفوع</span>
                      <span className="font-bold text-[#0e7eb5]">{parseInt(paidAmount).toLocaleString()} ج</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-600 text-sm block">الاجمالي</span>
                      <span className="font-bold text-amber-500">{parseInt(totalAmount).toLocaleString()} ج</span>
                    </div>
                  </div>
                </>
              )}

              {isReturnsPage && (
                <>
                  {/* Return Header Info */}
                  <div className="flex items-center justify-end gap-6 mb-6 text-right">
                    <div>
                      <span className="text-gray-600 text-sm block mb-1">السبب</span>
                      <span className="font-bold text-gray-800">{selectedReturn?.reason || 'عيب في المنتج'}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm block mb-1">عدد الاصناف</span>
                      <span className="font-bold text-gray-800">{selectedReturn?.itemCount || '4'}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm block mb-1">التاريخ</span>
                      <span className="font-bold text-gray-800">{selectedReturn?.date || '13-2-2026'}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm block mb-1">رقم المرتجع</span>
                      <span className="font-bold text-gray-800">{selectedReturn?.returnNumber || 'RET-2026-001'}</span>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="bg-gray-50 rounded-xl overflow-hidden mb-6">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">الاجمالي</th>
                          <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">سعر البيع</th>
                          <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">سعر الشراء</th>
                          <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">الكمية</th>
                          <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">اسم الصنف</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedReturn?.items?.map((item: any) => (
                          <tr key={item.id} className="border-t border-gray-200">
                            <td className="py-3 px-4 text-right font-medium">{item.total.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">{(item.unitPrice * 1.2).toFixed(2)}</td>
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
                      <span className="text-gray-600 text-sm block">طريقة الدفع</span>
                      <span className="font-bold">نقدي</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-600 text-sm block">الفاتوره الاصليه</span>
                      <span className="font-bold text-[#0e7eb5]">{selectedReturn?.originalInvoice || 'INV-2026-001'}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-600 text-sm block">الإجمالي</span>
                      <span className="font-bold text-amber-500">{(selectedReturn?.total || 5700).toLocaleString()} ج</span>
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-[#0e7eb5] text-white py-3 rounded-lg font-bold hover:bg-[#0a6a99] transition-colors"
                >
                  اغلاق
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
              هل أنت متأكد من حذف<br />
              {isReturnsPage ? 'هذا المرتجع' : 'هذه الفاتورة'}؟
            </h3>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
              >
                الغاء
              </button>
              <button
                onClick={isReturnsPage ? handleDeleteReturn : handleDeleteInvoice}
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

export default Purchases
