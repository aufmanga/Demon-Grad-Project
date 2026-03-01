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
  Phone,
  Mail,
  MapPin
} from 'lucide-react'

interface Customer {
  id: number
  code: string
  name: string
  phone: string
  email: string
  address: string
  balance: number
}

function Customers({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  
  // Form states
  const [customerName, setCustomerName] = useState('')
  const [customerCode, setCustomerCode] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [openingBalance, setOpeningBalance] = useState('')

  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, code: '001', name: 'أحمد محمد علي', phone: '01012345678', email: 'ahmed@email.com', address: 'القاهرة، مصر', balance: 1500.00 },
    { id: 2, code: '002', name: 'محمد محمود حسن', phone: '01123456789', email: 'mohamed@email.com', address: 'الإسكندرية، مصر', balance: 2300.50 },
    { id: 3, code: '003', name: 'علي أحمد عبدالله', phone: '01234567890', email: 'ali@email.com', address: 'الجيزة، مصر', balance: 800.00 },
    { id: 4, code: '004', name: 'محمود عبدالرحمن', phone: '01556789012', email: 'mahmoud@email.com', address: 'المنصورة، مصر', balance: 3200.75 },
    { id: 5, code: '005', name: 'سامي حسن علي', phone: '01098765432', email: 'sami@email.com', address: 'طنطا، مصر', balance: 500.00 },
    { id: 6, code: '006', name: 'خالد عمر محمود', phone: '01111223344', email: 'khaled@email.com', address: 'الزقازيق، مصر', balance: 1800.25 },
  ])

  const menuItems = [
    { icon: Home, label: 'الصفحة الرئيسية', active: false, path: '/dashboard' },
    { icon: Package, label: 'الاصناف', active: false, path: '/categories' },
    { icon: Users, label: 'العملاء', active: true, path: '/customers' },
    { icon: ShoppingCart, label: 'نقطة البيع', active: false, path: '/pos' },
    { icon: Box, label: 'المشتريات', active: false, path: '/purchases' },
    { icon: CreditCard, label: 'المصروفات', active: false, path: '/expenses' },
    { icon: FileText, label: 'إذونات القبض', active: false, path: '/receipts' },
    { icon: FileText, label: 'إذونات الصرف', active: false, path: '/payments' },
    { icon: TrendingUp, label: 'التقارير', active: false, path: '/reports' },
    { icon: Settings, label: 'المستخدمين والصلاحيات', active: false, path: '/users' },
  ]

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = Math.max(...customers.map(c => c.id), 0) + 1
    
    // Auto-generate code if not provided
    let code = customerCode
    if (!code.trim()) {
      const maxCode = Math.max(...customers.map(c => parseInt(c.code) || 0), 0)
      code = String(maxCode + 1).padStart(3, '0')
    }
    
    const newCustomer: Customer = {
      id: newId,
      code: code,
      name: customerName,
      phone: phone,
      email: email,
      address: address,
      balance: parseFloat(openingBalance) || 0
    }
    setCustomers([...customers, newCustomer])
    resetForm()
    setShowAddModal(false)
  }

  const handleEditCustomer = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCustomer) {
      const updatedCustomers = customers.map(c => 
        c.id === selectedCustomer.id 
          ? { ...c, code: customerCode, name: customerName, phone, email, address, balance: parseFloat(openingBalance) || c.balance }
          : c
      )
      setCustomers(updatedCustomers)
      resetForm()
      setShowEditModal(false)
      setSelectedCustomer(null)
    }
  }

  const handleDeleteCustomer = () => {
    if (selectedCustomer) {
      setCustomers(customers.filter(c => c.id !== selectedCustomer.id))
      setShowDeleteModal(false)
      setSelectedCustomer(null)
    }
  }

  const resetForm = () => {
    setCustomerName('')
    setCustomerCode('')
    setPhone('')
    setEmail('')
    setAddress('')
    setOpeningBalance('')
  }

  const openEditModal = (customer: Customer) => {
    setSelectedCustomer(customer)
    setCustomerCode(customer.code)
    setCustomerName(customer.name)
    setPhone(customer.phone)
    setEmail(customer.email)
    setAddress(customer.address)
    setOpeningBalance(customer.balance.toString())
    setShowEditModal(true)
  }

  const openDeleteModal = (customer: Customer) => {
    setSelectedCustomer(customer)
    setShowDeleteModal(true)
  }

  // Filter customers based on search query
  const filteredCustomers = customers.filter((customer) => 
    searchQuery === '' || 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-sky-50 flex">
      {/* Right Sidebar */}
      <aside className="w-64 bg-sky-100 min-h-screen p-4">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => item.path ? navigate(item.path) : null}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-colors ${
                item.active 
                  ? 'bg-[#0e7eb5] text-white' 
                  : 'text-[#0e7eb5] hover:bg-sky-200'
              }`}
            >
              <span className="flex-1">{item.label}</span>
              <item.icon size={20} />
            </button>
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

        {/* Page Title - Button on LEFT, Title on RIGHT */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-right">
            <h2 className="text-3xl font-bold text-[#0e7eb5]">العملاء</h2>
            <p className="text-gray-400">إدارة بيانات العملاء</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#0e7eb5] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#0a6a99] transition-colors"
          >
            <Plus size={20} />
            إضافة عميل جديد
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="البحث عن الصنف..."
              className="w-full bg-gray-50 rounded-lg py-3 px-4 pr-12 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-4 text-right text-gray-600 font-medium">الاجراءات</th>
                <th className="py-4 px-4 text-right text-gray-600 font-medium">الرقم</th>
                <th className="py-4 px-4 text-right text-gray-600 font-medium">اسم العميل</th>
                <th className="py-4 px-4 text-right text-gray-600 font-medium">العنوان</th>
                <th className="py-4 px-4 text-right text-gray-600 font-medium">البريد الإلكتروني</th>
                <th className="py-4 px-4 text-right text-gray-600 font-medium">رقم الهاتف</th>
                <th className="py-4 px-4 text-right text-gray-600 font-medium">الرصيد</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => openDeleteModal(customer)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button 
                        onClick={() => openEditModal(customer)}
                        className="text-[#0e7eb5] hover:text-[#0a6a99]"
                      >
                        <Pencil size={18} />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-gray-800 font-medium">{customer.code}</td>
                  <td className="py-4 px-4 text-right text-gray-800 font-medium">{customer.name}</td>
                  <td className="py-4 px-4 text-right text-gray-600">{customer.address}</td>
                  <td className="py-4 px-4 text-right text-gray-600">{customer.email}</td>
                  <td className="py-4 px-4 text-right text-gray-600">{customer.phone}</td>
                  <td className="py-4 px-4 text-right text-gray-800 font-medium">{customer.balance.toFixed(2)} ج</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add Customer Modal */}
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
              <h3 className="text-xl font-bold text-[#0e7eb5]">إضافة عميل جديد</h3>
            </div>
            
            <form onSubmit={handleAddCustomer}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">الرقم</label>
                  <input
                    type="text"
                    value={customerCode}
                    onChange={(e) => setCustomerCode(e.target.value)}
                    placeholder="يولد تلقائياً"
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">اسم العميل</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 text-right">رقم الهاتف</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 text-right">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 text-right">العنوان</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2 text-right">الرصيد الافتتاحي</label>
                <input
                  type="number"
                  step="0.01"
                  value={openingBalance}
                  onChange={(e) => setOpeningBalance(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
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
                  إضافة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
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
              <h3 className="text-xl font-bold text-[#0e7eb5]">تعديل بيانات العميل</h3>
            </div>
            
            <form onSubmit={handleEditCustomer}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">الرقم</label>
                  <input
                    type="text"
                    value={customerCode}
                    onChange={(e) => setCustomerCode(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">اسم العميل</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 text-right">رقم الهاتف</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 text-right">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 text-right">العنوان</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2 text-right">الرصيد الافتتاحي</label>
                <input
                  type="number"
                  step="0.01"
                  value={openingBalance}
                  onChange={(e) => setOpeningBalance(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
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
              هل أنت متأكد من حذف<br />هذا العميل؟
            </h3>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
              >
                الغاء
              </button>
              <button
                onClick={handleDeleteCustomer}
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

export default Customers
