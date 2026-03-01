import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  Plus, 
  Trash2, 
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
  ChevronUp,
  Eye
} from 'lucide-react'

interface InvoiceItem {
  id: number
  productCode: string
  productName: string
  quantity: number
  unit: string
  unitPrice: number
  discount: number
  total: number
}

interface Invoice {
  id: number
  invoiceNumber: string
  date: string
  customerName: string
  itemCount: number
  total: number
  paid: number
  remaining: number
  status: 'paid' | 'partial' | 'unpaid'
  items: InvoiceItem[]
}

function PointOfSale({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSalesModal, setShowSalesModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [expandedSidebar, setExpandedSidebar] = useState(true)
  const [newInvoiceNumber, setNewInvoiceNumber] = useState('')
  
  // Add Invoice Modal states
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('')
  const [itemQuantity, setItemQuantity] = useState('1')
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([])
  
  // Categories and products data
  const categories = ['ملحقات', 'أجهزة', 'برمجيات']
  const products = [
    { code: '001', name: 'ماوس لاسلكي Logitech M185', category: 'ملحقات', sellPrice: 50.00, unit: 'قطعة' },
    { code: '002', name: 'كيبورد ميكانيكي Redragon', category: 'ملحقات', sellPrice: 120.00, unit: 'قطعة' },
    { code: '003', name: 'شاشة سامسونج 27 بوصة', category: 'أجهزة', sellPrice: 800.00, unit: 'قطعة' },
    { code: '004', name: 'لابتوب Dell XPS 13', category: 'أجهزة', sellPrice: 3500.00, unit: 'قطعة' },
    { code: '005', name: 'سماعات رأس Sony', category: 'ملحقات', sellPrice: 200.00, unit: 'قطعة' },
    { code: '006', name: 'طابعة HP LaserJet', category: 'أجهزة', sellPrice: 450.00, unit: 'قطعة' },
  ]
  
  // Filter products by selected category
  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : products
  
  // Form states for edit modal
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [invoiceDate, setInvoiceDate] = useState('')
  const [itemCount, setItemCount] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
  const [paidAmount, setPaidAmount] = useState('')
  const [remainingAmount, setRemainingAmount] = useState('')
  const [customerName, setCustomerName] = useState('')

  const [invoices, setInvoices] = useState<Invoice[]>([
    { 
      id: 1, 
      invoiceNumber: 'INV-2026-001', 
      date: '13-4-2026', 
      customerName: 'أحمد محمد',
      itemCount: 2,
      total: 25700,
      paid: 20000,
      remaining: 5700,
      status: 'partial',
      items: [
        { id: 1, productCode: '004', productName: 'لابتوب Dell XPS 13', quantity: 1, unit: 'قطعة', unitPrice: 25000, discount: 0, total: 25000 },
        { id: 2, productCode: '001', productName: 'ماوس لاسلكي', quantity: 1, unit: 'قطعة', unitPrice: 700, discount: 0, total: 700 }
      ]
    },
    { 
      id: 2, 
      invoiceNumber: 'INV-2026-002', 
      date: '13-4-2026', 
      customerName: 'أحمد محمد',
      itemCount: 2,
      total: 25700,
      paid: 25700,
      remaining: 0,
      status: 'paid',
      items: [
        { id: 1, productCode: '003', productName: 'شاشة سامسونج 27 بوصة', quantity: 1, unit: 'قطعة', unitPrice: 20000, discount: 0, total: 20000 },
        { id: 2, productCode: '002', productName: 'كيبورد ميكانيكي', quantity: 1, unit: 'قطعة', unitPrice: 5700, discount: 0, total: 5700 }
      ]
    },
    { 
      id: 3, 
      invoiceNumber: 'INV-2026-003', 
      date: '13-4-2026', 
      customerName: 'أحمد محمد',
      itemCount: 2,
      total: 25700,
      paid: 0,
      remaining: 25700,
      status: 'unpaid',
      items: [
        { id: 1, productCode: '006', productName: 'طابعة HP LaserJet', quantity: 1, unit: 'قطعة', unitPrice: 20000, discount: 0, total: 20000 },
        { id: 2, productCode: '007', productName: 'حبر طابعة', quantity: 2, unit: 'قطعة', unitPrice: 2850, discount: 0, total: 5700 }
      ]
    },
    { 
      id: 4, 
      invoiceNumber: 'INV-2026-004', 
      date: '13-4-2026', 
      customerName: 'أحمد محمد',
      itemCount: 2,
      total: 25700,
      paid: 15000,
      remaining: 10700,
      status: 'partial',
      items: [
        { id: 1, productCode: '005', productName: 'سماعات رأس Sony', quantity: 1, unit: 'قطعة', unitPrice: 15000, discount: 0, total: 15000 },
        { id: 2, productCode: '001', productName: 'ماوس لاسلكي', quantity: 2, unit: 'قطعة', unitPrice: 5350, discount: 0, total: 10700 }
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
        { label: 'فواتير المبيعات', active: true, path: '/pos' },
        { label: 'مرتجع المبيعات', active: false, path: '/pos/returns' },
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
  const totalInvoices = invoices.length
  const totalSales = invoices.reduce((sum, inv) => sum + inv.total, 0)
  const totalCollected = invoices.reduce((sum, inv) => sum + inv.paid, 0)
  const totalRemaining = invoices.reduce((sum, inv) => sum + inv.remaining, 0)

  const handleDeleteInvoice = () => {
    if (selectedInvoice) {
      setInvoices(invoices.filter(inv => inv.id !== selectedInvoice.id))
      setShowDeleteModal(false)
      setSelectedInvoice(null)
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
              customerName
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
    setCustomerName('')
  }

  const openEditModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setInvoiceNumber(invoice.invoiceNumber)
    setInvoiceDate(invoice.date)
    setItemCount(invoice.itemCount.toString())
    setTotalAmount(invoice.total.toString())
    setPaidAmount(invoice.paid.toString())
    setRemainingAmount(invoice.remaining.toString())
    setCustomerName(invoice.customerName)
    setShowEditModal(true)
  }

  const openDeleteModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setShowDeleteModal(true)
  }

  const openAddInvoiceModal = () => {
    // Generate next invoice number
    const maxNum = Math.max(...invoices.map(inv => {
      const match = inv.invoiceNumber.match(/INV-2026-(\d+)/)
      return match ? parseInt(match[1]) : 0
    }), 0)
    const nextNum = String(maxNum + 1).padStart(3, '0')
    setNewInvoiceNumber(`INV-2026-${nextNum}`)
    // Reset invoice items
    setInvoiceItems([])
    setSelectedCategory('')
    setSelectedProduct('')
    setItemQuantity('1')
    setShowAddInvoiceModal(true)
  }

  const addItemToInvoice = () => {
    if (!selectedProduct || !itemQuantity) return
    
    const product = products.find(p => p.code === selectedProduct)
    if (!product) return
    
    const quantity = parseInt(itemQuantity) || 1
    const total = product.sellPrice * quantity
    
    const newItem: InvoiceItem = {
      id: Date.now(),
      productCode: product.code,
      productName: product.name,
      quantity: quantity,
      unit: product.unit,
      unitPrice: product.sellPrice,
      discount: 0,
      total: total
    }
    
    setInvoiceItems([...invoiceItems, newItem])
    setSelectedProduct('')
    setItemQuantity('1')
  }

  const removeInvoiceItem = (itemId: number) => {
    setInvoiceItems(invoiceItems.filter(item => item.id !== itemId))
  }

  // Calculate invoice total
  const calculateInvoiceTotal = () => {
    return invoiceItems.reduce((sum, item) => sum + item.total, 0)
  }

  const openSalesModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setShowSalesModal(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">مدفوعة</span>
      case 'partial':
        return <span className="bg-amber-400 text-white px-3 py-1 rounded-full text-xs font-medium">مدفوعة جزئياً</span>
      case 'unpaid':
        return <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">غير مدفوع</span>
      default:
        return null
    }
  }

  // Filter invoices based on search query
  const filteredInvoices = invoices.filter((invoice) => 
    searchQuery === '' || 
    invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h2 className="text-3xl font-bold text-[#0e7eb5]">فواتير المبيعات</h2>
            <p className="text-gray-400">إدارة فواتير البيع والمبيعات</p>
          </div>
          <button 
            onClick={openAddInvoiceModal}
            className="bg-[#0e7eb5] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#0a6a99] transition-colors"
          >
            <Plus size={20} />
            إنشاء فاتورة جديد
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-gray-600 text-sm mb-1">عدد الفواتير</p>
            <p className="text-2xl font-bold text-gray-800">{totalInvoices}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-amber-500 text-sm mb-1">إجمالي المبيعات</p>
            <p className="text-2xl font-bold text-amber-500">{totalSales.toLocaleString()} ج</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-[#0e7eb5] text-sm mb-1">إجمالي المحصل</p>
            <p className="text-2xl font-bold text-[#0e7eb5]">{totalCollected.toLocaleString()} ج</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-green-500 text-sm mb-1">المبلغ المتبقي</p>
            <p className="text-2xl font-bold text-green-500">{totalRemaining.toLocaleString()} ج</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="البحث برقم الفاتورة أو اسم العميل..."
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
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">اسم العميل</th>
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
                  <td className="py-4 px-3 text-right text-gray-800 font-medium">{invoice.customerName}</td>
                  <td className="py-4 px-3 text-right text-gray-600">{invoice.date}</td>
                  <td className="py-4 px-3 text-right text-gray-800 font-medium">{invoice.invoiceNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Sales Modal */}
      {showSalesModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setShowSalesModal(false)}
                className="text-[#0e7eb5] hover:text-[#0a6a99]"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-bold text-[#0e7eb5]">البيعات</h3>
            </div>
            
            {/* Invoice Items Table */}
            <div className="bg-gray-50 rounded-xl overflow-hidden mb-6">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">الإجمالي</th>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">الخصم</th>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">السعر</th>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">الكمية</th>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">الوحدة</th>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">اسم الصنف</th>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">الكود</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.items.map((item) => (
                    <tr key={item.id} className="border-t border-gray-200">
                      <td className="py-3 px-4 text-right font-medium">{item.total.toLocaleString()} ج</td>
                      <td className="py-3 px-4 text-right text-red-500">{item.discount > 0 ? item.discount.toLocaleString() + ' ج' : '-'}</td>
                      <td className="py-3 px-4 text-right">{item.unitPrice.toLocaleString()} ج</td>
                      <td className="py-3 px-4 text-right">{item.quantity}</td>
                      <td className="py-3 px-4 text-right">{item.unit}</td>
                      <td className="py-3 px-4 text-right">{item.productName}</td>
                      <td className="py-3 px-4 text-right font-medium">{item.productCode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sales Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-right">
                  <p className="text-gray-600 text-sm mb-1">الإجمالي قبل الخصم</p>
                  <p className="text-xl font-bold text-[#0e7eb5]">{selectedInvoice.total.toLocaleString()} ج</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-sm mb-1">سلة البيع</p>
                  <p className="text-gray-800">{selectedInvoice.customerName}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-right">
                  <p className="text-gray-600 text-sm mb-1">طريقة الدفع</p>
                  <select className="w-full border border-gray-200 rounded-lg py-2 px-3 text-right mt-1">
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
              onClick={() => setShowSalesModal(false)}
              className="w-full bg-[#0e7eb5] text-white py-3 rounded-xl font-bold hover:bg-[#0a6a99] transition-colors"
            >
              إتمام البيع
            </button>
          </div>
        </div>
      )}

      {/* Edit Invoice Modal - View Only */}
      {showEditModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-[#0e7eb5] hover:text-[#0a6a99]"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-bold text-[#0e7eb5]">عرض الفاتورة</h3>
            </div>
            
            {/* Invoice Header Info */}
            <div className="flex items-center justify-end gap-6 mb-6 text-right">
              <div>
                <span className="text-gray-600 text-sm block mb-1">اسم العميل</span>
                <span className="font-bold text-gray-800">{selectedInvoice.customerName}</span>
              </div>
              <div>
                <span className="text-gray-600 text-sm block mb-1">عدد الاصناف</span>
                <span className="font-bold text-gray-800">{selectedInvoice.itemCount}</span>
              </div>
              <div>
                <span className="text-gray-600 text-sm block mb-1">التاريخ</span>
                <span className="font-bold text-gray-800">{selectedInvoice.date}</span>
              </div>
              <div>
                <span className="text-gray-600 text-sm block mb-1">رقم الفاتورة</span>
                <span className="font-bold text-gray-800">{selectedInvoice.invoiceNumber}</span>
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
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">الوحدة</th>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">اسم الصنف</th>
                    <th className="py-3 px-4 text-right text-gray-600 font-medium text-sm">الكود</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.items.map((item) => (
                    <tr key={item.id} className="border-t border-gray-200">
                      <td className="py-3 px-4 text-right font-medium">{item.total.toLocaleString()} ج</td>
                      <td className="py-3 px-4 text-right">{(item.unitPrice * 1.2).toFixed(2)}</td>
                      <td className="py-3 px-4 text-right">{item.unitPrice.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right">{item.quantity}</td>
                      <td className="py-3 px-4 text-right">{item.unit}</td>
                      <td className="py-3 px-4 text-right">{item.productName}</td>
                      <td className="py-3 px-4 text-right font-medium">{item.productCode}</td>
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
                <span className="font-bold text-amber-500">{selectedInvoice.remaining.toLocaleString()} ج</span>
              </div>
              <div className="text-right">
                <span className="text-gray-600 text-sm block">المدفوع</span>
                <span className="font-bold text-[#0e7eb5]">{selectedInvoice.paid.toLocaleString()} ج</span>
              </div>
              <div className="text-right">
                <span className="text-gray-600 text-sm block">الاجمالي</span>
                <span className="font-bold text-amber-500">{selectedInvoice.total.toLocaleString()} ج</span>
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

      {/* Add Invoice Modal */}
      {showAddInvoiceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setShowAddInvoiceModal(false)}
                className="text-[#0e7eb5] hover:text-[#0a6a99]"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-bold text-[#0e7eb5]">إنشاء فاتورة جديد</h3>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); setShowAddInvoiceModal(false); }}>
              {/* Invoice Number Display */}
              <div className="flex items-center justify-end gap-4 mb-4">
                <div className="text-left">
                  <span className="text-gray-600 text-sm">رقم الفاتورة</span>
                  <p className="text-xl font-bold text-gray-800">{newInvoiceNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">طريقة الدفع</label>
                  <select className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]">
                    <option value="cash">نقدي</option>
                    <option value="card">بطاقة</option>
                    <option value="credit">آجل</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">اسم العميل</label>
                  <select className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]">
                    <option value="">اختر العميل</option>
                    <option value="1">أحمد محمد</option>
                    <option value="2">محمد محمود</option>
                    <option value="3">علي أحمد</option>
                  </select>
                </div>
              </div>

              {/* Category Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 text-right">التصنيف</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value)
                    setSelectedProduct('')
                  }}
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                >
                  <option value="">اختر التصنيف</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Product Selection and Quantity */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">الكمية</label>
                  <input
                    type="number"
                    value={itemQuantity}
                    onChange={(e) => setItemQuantity(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    placeholder="1"
                    min="1"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700 text-sm mb-2 text-right">اسم الصنف</label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    disabled={!selectedCategory}
                  >
                    <option value="">{selectedCategory ? 'اختر الصنف' : 'اختر التصنيف أولاً'}</option>
                    {filteredProducts.map((product) => (
                      <option key={product.code} value={product.code}>
                        {product.name} - {product.sellPrice.toLocaleString()} ج
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add Item Button */}
              <button
                type="button"
                onClick={addItemToInvoice}
                disabled={!selectedProduct}
                className={`w-full py-2 rounded-lg font-bold mb-4 transition-colors ${
                  selectedProduct 
                    ? 'bg-[#0e7eb5] text-white hover:bg-[#0a6a99]' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                + إضافة صنف للفاتورة
              </button>

              {/* Products Table */}
              <div className="bg-gray-50 rounded-xl overflow-hidden mb-4">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-3 text-right text-gray-600 font-medium text-sm">حذف</th>
                      <th className="py-2 px-3 text-right text-gray-600 font-medium text-sm">الإجمالي</th>
                      <th className="py-2 px-3 text-right text-gray-600 font-medium text-sm">السعر</th>
                      <th className="py-2 px-3 text-right text-gray-600 font-medium text-sm">الكمية</th>
                      <th className="py-2 px-3 text-right text-gray-600 font-medium text-sm">الوحدة</th>
                      <th className="py-2 px-3 text-right text-gray-600 font-medium text-sm">الصنف</th>
                      <th className="py-2 px-3 text-right text-gray-600 font-medium text-sm">كود الصنف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceItems.length === 0 ? (
                      <tr className="border-t border-gray-200">
                        <td colSpan={7} className="py-4 px-3 text-center text-gray-500">
                          لا توجد أصناف مضافة بعد
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
                          <td className="py-2 px-3 text-right font-medium">{item.total.toLocaleString()} ج</td>
                          <td className="py-2 px-3 text-right">{item.unitPrice.toLocaleString()} ج</td>
                          <td className="py-2 px-3 text-right">{item.quantity}</td>
                          <td className="py-2 px-3 text-right">{item.unit}</td>
                          <td className="py-2 px-3 text-right">{item.productName}</td>
                          <td className="py-2 px-3 text-right font-medium">{item.productCode}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 mb-6">
                <div className="text-left">
                  <span className="text-gray-600 text-sm">اجمالي الفاتورة</span>
                  <p className="text-2xl font-bold text-[#0e7eb5]">{calculateInvoiceTotal().toLocaleString()} ج</p>
                </div>
                <div className="text-right">
                  <span className="text-gray-600 text-sm">عدد الأصناف</span>
                  <p className="text-xl font-bold text-gray-800">{invoiceItems.length}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddInvoiceModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                >
                  الغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#0e7eb5] text-white py-3 rounded-xl font-bold hover:bg-[#0a6a99] transition-colors"
                >
                  حفظ
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
              هل أنت متأكد من حذف<br />هذه الفاتورة؟
            </h3>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
              >
                الغاء
              </button>
              <button
                onClick={handleDeleteInvoice}
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

export default PointOfSale
