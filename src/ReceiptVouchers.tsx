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
  ChevronUp,
  CheckSquare,
  LogOut
} from 'lucide-react'
import { useAuth } from './AuthContext'

interface ReceiptVoucher {
  id: number
  voucherNumber: string
  date: string
  customerName: string
  amount: number
  paymentMethod: string
  description: string
}

function ReceiptVouchers() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedVoucher, setSelectedVoucher] = useState<ReceiptVoucher | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [todayOnly, setTodayOnly] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => prev === label ? null : label)
  }
  
  // Form states
  const [voucherNumber, setVoucherNumber] = useState('')
  const [voucherDate, setVoucherDate] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [description, setDescription] = useState('')

  const [vouchers, setVouchers] = useState<ReceiptVoucher[]>([
    { 
      id: 1, 
      voucherNumber: 'REC-2026-001', 
      date: '13-2-2026', 
      customerName: 'أحمد محمد',
      amount: 14500,
      paymentMethod: 'نقدي',
      description: 'دفعة من فاتورة INV-2026-001'
    },
    { 
      id: 2, 
      voucherNumber: 'REC-2026-001', 
      date: '13-2-2026', 
      customerName: 'أحمد محمد',
      amount: 14500,
      paymentMethod: 'نقدي',
      description: 'دفعة من فاتورة INV-2026-001'
    },
    { 
      id: 3, 
      voucherNumber: 'REC-2026-001', 
      date: '13-2-2026', 
      customerName: 'أحمد محمد',
      amount: 14500,
      paymentMethod: 'نقدي',
      description: 'دفعة من فاتورة INV-2026-001'
    },
    { 
      id: 4, 
      voucherNumber: 'REC-2026-001', 
      date: '13-2-2026', 
      customerName: 'أحمد محمد',
      amount: 14500,
      paymentMethod: 'نقدي',
      description: 'دفعة من فاتورة INV-2026-001'
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
      active: false,
      expanded: false,
      subItems: [
        { label: 'فواتير المشتريات', active: false, path: '/purchases' },
        { label: 'مرتجع المشتريات', active: false, path: '/purchases/returns' },
      ]
    },
    { icon: CreditCard, label: 'المصروفات', active: false, path: '/expenses' },
    { icon: FileText, label: 'إذونات القبض', active: true, path: '/receipts' },
    { icon: FileText, label: 'إذونات الصرف', active: false, path: '/payments' },
    { icon: TrendingUp, label: 'التقارير', active: false, path: '/reports' },
    { icon: Settings, label: 'المستخدمين والصلاحيات', active: false, path: '/users' },
  ]

  // Calculate summary stats
  const totalVouchers = vouchers.length
  const totalCollected = vouchers.reduce((sum, v) => sum + v.amount, 0)
  const todayTotal = todayOnly ? vouchers.filter(v => v.date === '13-2-2026').reduce((sum, v) => sum + v.amount, 0) : 0

  const handleAddVoucher = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = Math.max(...vouchers.map(v => v.id), 0) + 1
    const newVoucher: ReceiptVoucher = {
      id: newId,
      voucherNumber,
      date: voucherDate,
      customerName,
      amount: parseFloat(amount) || 0,
      paymentMethod: paymentMethod === 'cash' ? 'نقدي' : 'تحويل بنكي',
      description
    }
    setVouchers([...vouchers, newVoucher])
    resetForm()
    setShowAddModal(false)
  }

  const handleEditVoucher = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedVoucher) {
      const updatedVouchers = vouchers.map(v => 
        v.id === selectedVoucher.id 
          ? { 
              ...v, 
              voucherNumber,
              date: voucherDate,
              customerName,
              amount: parseFloat(amount) || 0,
              paymentMethod: paymentMethod === 'cash' ? 'نقدي' : 'تحويل بنكي',
              description
            }
          : v
      )
      setVouchers(updatedVouchers)
      resetForm()
      setShowEditModal(false)
      setSelectedVoucher(null)
    }
  }

  const handleDeleteVoucher = () => {
    if (selectedVoucher) {
      setVouchers(vouchers.filter(v => v.id !== selectedVoucher.id))
      setShowDeleteModal(false)
      setSelectedVoucher(null)
    }
  }

  const resetForm = () => {
    setVoucherNumber('')
    setVoucherDate('')
    setCustomerName('')
    setAmount('')
    setPaymentMethod('cash')
    setDescription('')
  }

  const openEditModal = (voucher: ReceiptVoucher) => {
    setSelectedVoucher(voucher)
    setVoucherNumber(voucher.voucherNumber)
    setVoucherDate(voucher.date)
    setCustomerName(voucher.customerName)
    setAmount(voucher.amount.toString())
    setPaymentMethod(voucher.paymentMethod === 'نقدي' ? 'cash' : 'transfer')
    setDescription(voucher.description)
    setShowEditModal(true)
  }

  const openDeleteModal = (voucher: ReceiptVoucher) => {
    setSelectedVoucher(voucher)
    setShowDeleteModal(true)
  }

  const getPaymentMethodBadge = (method: string) => {
    const color = method === 'نقدي' ? 'bg-green-500' : 'bg-blue-500'
    return <span className={`${color} text-white px-3 py-1 rounded-full text-xs font-medium`}>{method}</span>
  }

  // Filter vouchers based on search query and today filter
  const filteredVouchers = vouchers.filter((v) => {
    if (todayOnly && v.date !== '13-2-2026') return false
    return searchQuery === '' || 
      v.voucherNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="min-h-screen bg-sky-50 flex">
      {/* Right Sidebar */}
      <aside className="w-64 bg-sky-100 min-h-screen p-4">
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
            <h2 className="text-3xl font-bold text-[#0e7eb5]">إذونات القبض</h2>
            <p className="text-gray-400">إدارة إذونات القبض والتحصيل من العملاء</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#0e7eb5] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#0a6a99] transition-colors"
          >
            <Plus size={20} />
            إضافة اذن قبض جديد
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <CheckSquare 
                size={24} 
                className={`cursor-pointer ${todayOnly ? 'text-[#0e7eb5]' : 'text-gray-400'}`}
                onClick={() => setTodayOnly(!todayOnly)}
              />
              <div className="text-right flex-1">
                <p className="text-gray-600 text-sm mb-1">اليوم</p>
                <p className="text-2xl font-bold text-[#0e7eb5]">{todayTotal.toLocaleString()} ج</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-amber-500 text-sm mb-1">إجمالي المبالغ المحصلة</p>
            <p className="text-2xl font-bold text-amber-500">{totalCollected.toLocaleString()} ج</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-gray-600 text-sm mb-1">عدد الإذونات</p>
            <p className="text-2xl font-bold text-gray-800">{totalVouchers}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="البحث برقم الإذن أو اسم العميل..."
              className="w-full bg-gray-50 rounded-lg py-3 px-4 pr-12 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Vouchers Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">الإجراءات</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">الوصف</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">طريقة الدفع</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">المبلغ</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">اسم العميل</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">التاريخ</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">رقم الإذن</th>
              </tr>
            </thead>
            <tbody>
              {filteredVouchers.map((voucher) => (
                <tr key={voucher.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => openDeleteModal(voucher)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-3 text-right text-gray-600 text-sm">{voucher.description}</td>
                  <td className="py-4 px-3">{getPaymentMethodBadge(voucher.paymentMethod)}</td>
                  <td className="py-4 px-3 text-right text-green-600 font-medium">{voucher.amount.toLocaleString()} ج</td>
                  <td className="py-4 px-3 text-right text-gray-800 font-medium">{voucher.customerName}</td>
                  <td className="py-4 px-3 text-right text-gray-600">{voucher.date}</td>
                  <td className="py-4 px-3 text-right text-gray-800 font-medium">{voucher.voucherNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add Voucher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-[#0e7eb5] hover:text-[#0a6a99]"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-bold text-[#0e7eb5]">إضافة اذن قبض جديد</h3>
            </div>
            
            <form onSubmit={handleAddVoucher}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">رقم الإذن</label>
                  <input
                    type="text"
                    value={voucherNumber}
                    onChange={(e) => setVoucherNumber(e.target.value)}
                    placeholder="REC-2026-XXX"
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">التاريخ</label>
                  <input
                    type="text"
                    value={voucherDate}
                    onChange={(e) => setVoucherDate(e.target.value)}
                    placeholder="13-2-2026"
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 text-right">اسم العميل</label>
                <select
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  required
                >
                  <option value="">اختر العميل</option>
                  <option value="أحمد محمد">أحمد محمد</option>
                  <option value="محمد محمود">محمد محمود</option>
                  <option value="علي أحمد">علي أحمد</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">المبلغ</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">طريقة الدفع</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  >
                    <option value="cash">نقدي</option>
                    <option value="transfer">تحويل بنكي</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2 text-right">الوصف</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5] resize-none"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                >
                  الغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#0e7eb5] text-white py-3 rounded-lg font-bold hover:bg-[#0a6a99] transition-colors"
                >
                  إضافة المصروف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Voucher Modal */}
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
              <h3 className="text-xl font-bold text-[#0e7eb5]">تعديل إذن القبض</h3>
            </div>
            
            <form onSubmit={handleEditVoucher}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">رقم الإذن</label>
                  <input
                    type="text"
                    value={voucherNumber}
                    onChange={(e) => setVoucherNumber(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">التاريخ</label>
                  <input
                    type="text"
                    value={voucherDate}
                    onChange={(e) => setVoucherDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 text-right">اسم العميل</label>
                <select
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  required
                >
                  <option value="">اختر العميل</option>
                  <option value="أحمد محمد">أحمد محمد</option>
                  <option value="محمد محمود">محمد محمود</option>
                  <option value="علي أحمد">علي أحمد</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">المبلغ</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">طريقة الدفع</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  >
                    <option value="cash">نقدي</option>
                    <option value="transfer">تحويل بنكي</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2 text-right">الوصف</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5] resize-none"
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
              هل أنت متأكد من حذف<br />هذا الإذن؟
            </h3>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
              >
                الغاء
              </button>
              <button
                onClick={handleDeleteVoucher}
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

export default ReceiptVouchers
