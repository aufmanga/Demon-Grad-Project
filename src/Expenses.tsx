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
  Wallet
} from 'lucide-react'

interface Expense {
  id: number
  date: string
  category: string
  description: string
  amount: number
  paymentMethod: string
}

function Expenses({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)
  const [expandedSidebar, setExpandedSidebar] = useState(true)
  
  // Form states
  const [expenseDate, setExpenseDate] = useState('')
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  const [expenses, setExpenses] = useState<Expense[]>([
    { 
      id: 1, 
      date: '13-2-2026', 
      category: 'ايجار',
      description: 'ايجار المحل - فبراير 2026',
      amount: 14500,
      paymentMethod: 'نقدي'
    },
    { 
      id: 2, 
      date: '13-2-2026', 
      category: 'رواتب',
      description: 'رواتب الموظفين - فبراير 2026',
      amount: 14500,
      paymentMethod: 'تحويل بنكي'
    },
    { 
      id: 3, 
      date: '13-2-2026', 
      category: 'كهرباء',
      description: 'فاتورة الكهرباء - يناير 2026',
      amount: 14500,
      paymentMethod: 'نقدي'
    },
    { 
      id: 4, 
      date: '13-2-2026', 
      category: 'صيانة',
      description: 'صيانة اجهزة الكمبيوتر',
      amount: 14500,
      paymentMethod: 'تحويل بنكي'
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
    { icon: CreditCard, label: 'المصروفات', active: true, path: '/expenses' },
    { icon: FileText, label: 'إذونات القبض', active: false, path: '/receipts' },
    { icon: FileText, label: 'إذونات الصرف', active: false, path: '/payments' },
    { icon: TrendingUp, label: 'التقارير', active: false, path: '/reports' },
    { icon: Settings, label: 'المستخدمين والصلاحيات', active: false, path: '/users' },
  ]

  // Calculate summary stats
  const totalExpenses = expenses.length
  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const averageExpense = totalExpenses > 0 ? Math.round(totalAmount / totalExpenses) : 0

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = Math.max(...expenses.map(e => e.id), 0) + 1
    const newExpense: Expense = {
      id: newId,
      date: expenseDate,
      category,
      description,
      amount: parseFloat(amount) || 0,
      paymentMethod: paymentMethod === 'cash' ? 'نقدي' : 'تحويل بنكي'
    }
    setExpenses([...expenses, newExpense])
    resetForm()
    setShowAddModal(false)
  }

  const handleEditExpense = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedExpense) {
      const updatedExpenses = expenses.map(exp => 
        exp.id === selectedExpense.id 
          ? { 
              ...exp, 
              date: expenseDate,
              category,
              description,
              amount: parseFloat(amount) || 0,
              paymentMethod: paymentMethod === 'cash' ? 'نقدي' : 'تحويل بنكي'
            }
          : exp
      )
      setExpenses(updatedExpenses)
      resetForm()
      setShowEditModal(false)
      setSelectedExpense(null)
    }
  }

  const handleDeleteExpense = () => {
    if (selectedExpense) {
      setExpenses(expenses.filter(exp => exp.id !== selectedExpense.id))
      setShowDeleteModal(false)
      setSelectedExpense(null)
    }
  }

  const resetForm = () => {
    setExpenseDate('')
    setAmount('')
    setPaymentMethod('cash')
    setCategory('')
    setDescription('')
  }

  const openEditModal = (expense: Expense) => {
    setSelectedExpense(expense)
    setExpenseDate(expense.date)
    setAmount(expense.amount.toString())
    setPaymentMethod(expense.paymentMethod === 'نقدي' ? 'cash' : 'transfer')
    setCategory(expense.category)
    setDescription(expense.description)
    setShowEditModal(true)
  }

  const openDeleteModal = (expense: Expense) => {
    setSelectedExpense(expense)
    setShowDeleteModal(true)
  }

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      'ايجار': 'bg-blue-500',
      'رواتب': 'bg-green-500',
      'كهرباء': 'bg-amber-500',
      'صيانة': 'bg-purple-500',
    }
    const color = colors[category] || 'bg-gray-500'
    return <span className={`${color} text-white px-3 py-1 rounded-full text-xs font-medium`}>{category}</span>
  }

  // Filter expenses based on search query
  const filteredExpenses = expenses.filter((exp) => 
    searchQuery === '' || 
    exp.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exp.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h2 className="text-3xl font-bold text-[#0e7eb5]">المصروفات</h2>
            <p className="text-gray-400">إدارة المصروفات والنفقات</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#0e7eb5] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#0a6a99] transition-colors"
          >
            <Plus size={20} />
            إنشاء مصروف جديد
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-gray-600 text-sm mb-1">إجمالي المصروفات</p>
            <p className="text-2xl font-bold text-gray-800">{totalAmount.toLocaleString()} ج</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-amber-500 text-sm mb-1">عدد المصروفات</p>
            <p className="text-2xl font-bold text-amber-500">{totalExpenses}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-[#0e7eb5] text-sm mb-1">متوسط المصروف</p>
            <p className="text-2xl font-bold text-[#0e7eb5]">{averageExpense.toLocaleString()} ج</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="البحث في المصروفات..."
              className="w-full bg-gray-50 rounded-lg py-3 px-4 pr-12 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Expenses Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">الإجراءات</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">طريقة الدفع</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">المبلغ</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">الوصف</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">التصنيف</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => openDeleteModal(expense)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button 
                        onClick={() => openEditModal(expense)}
                        className="text-[#0e7eb5] hover:text-[#0a6a99]"
                      >
                        <Pencil size={18} />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-3 text-right text-gray-600">{expense.paymentMethod}</td>
                  <td className="py-4 px-3 text-right text-gray-800 font-medium">{expense.amount.toLocaleString()} ج</td>
                  <td className="py-4 px-3 text-right text-gray-600">{expense.description}</td>
                  <td className="py-4 px-3">{getCategoryBadge(expense.category)}</td>
                  <td className="py-4 px-3 text-right text-gray-600">{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add Expense Modal */}
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
              <h3 className="text-xl font-bold text-[#0e7eb5]">إضافة مصروف جديد</h3>
            </div>
            
            <form onSubmit={handleAddExpense}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">التاريخ</label>
                  <input
                    type="text"
                    value={expenseDate}
                    onChange={(e) => setExpenseDate(e.target.value)}
                    placeholder="13-2-2026"
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
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
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
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
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">التصنيف</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  >
                    <option value="">اختر التصنيف</option>
                    <option value="ايجار">ايجار</option>
                    <option value="رواتب">رواتب</option>
                    <option value="كهرباء">كهرباء</option>
                    <option value="صيانة">صيانة</option>
                    <option value="اخرى">اخرى</option>
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

      {/* Edit Expense Modal */}
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
              <h3 className="text-xl font-bold text-[#0e7eb5]">تعديل المصروف</h3>
            </div>
            
            <form onSubmit={handleEditExpense}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">التاريخ</label>
                  <input
                    type="text"
                    value={expenseDate}
                    onChange={(e) => setExpenseDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
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
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
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
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">التصنيف</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  >
                    <option value="">اختر التصنيف</option>
                    <option value="ايجار">ايجار</option>
                    <option value="رواتب">رواتب</option>
                    <option value="كهرباء">كهرباء</option>
                    <option value="صيانة">صيانة</option>
                    <option value="اخرى">اخرى</option>
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
              هل أنت متأكد من حذف<br />هذا المصروف؟
            </h3>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
              >
                الغاء
              </button>
              <button
                onClick={handleDeleteExpense}
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

export default Expenses
