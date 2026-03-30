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
  LogOut,
  Menu
} from 'lucide-react'
import { useAuth } from './AuthContext'

interface User {
  id: number
  name: string
  email: string
  role: string
  permissions: string[]
  status: 'active' | 'inactive'
}

function UsersAndPermissions() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => prev === label ? null : label)
  }
  
  // Form states
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userRole, setUserRole] = useState('')
  const [permissions, setPermissions] = useState<string[]>([])
  const [userStatus, setUserStatus] = useState<'active' | 'inactive'>('active')

  const [users, setUsers] = useState<User[]>([
    { 
      id: 1, 
      name: 'احمد محمد احمد', 
      email: 'Ahmed1@gmail.com', 
      role: 'مدير النظام',
      permissions: ['الكل'],
      status: 'active'
    },
    { 
      id: 2, 
      name: 'احمد محمد احمد', 
      email: 'Ahmed1@gmail.com', 
      role: 'مسؤول المبيعات',
      permissions: ['المبيعات', 'القبض والصرف'],
      status: 'active'
    },
    { 
      id: 3, 
      name: 'محمد احمد', 
      email: 'Ahmed1@gmail.com', 
      role: 'مسؤول المشتريات',
      permissions: ['المشتريات', 'المصروفات'],
      status: 'inactive'
    },
    { 
      id: 4, 
      name: 'احمد محمد', 
      email: 'Ahmed1@gmail.com', 
      role: 'محاسب',
      permissions: ['التقارير', 'القبض والصرف'],
      status: 'inactive'
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
    { icon: FileText, label: 'إذونات القبض', active: false, path: '/receipts' },
    { icon: FileText, label: 'إذونات الصرف', active: false, path: '/payments' },
    { icon: TrendingUp, label: 'التقارير', active: false, path: '/reports' },
    { icon: Settings, label: 'المستخدمين والصلاحيات', active: true },
  ]

  const availablePermissions = [
    'المبيعات',
    'الموردين',
    'التقارير المالية',
    'المشتريات',
    'الاصناف',
    'القبض والصرف',
    'المصروفات',
    'العملاء',
    'التقارير',
    'الاعدادات',
    'المستخدمين'
  ]

  // Calculate summary stats
  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === 'active').length
  const inactiveUsers = users.filter(u => u.status === 'inactive').length

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = Math.max(...users.map(u => u.id), 0) + 1
    const newUser: User = {
      id: newId,
      name: userName,
      email: userEmail,
      role: userRole,
      permissions: permissions.length > 0 ? permissions : ['الكل'],
      status: userStatus
    }
    setUsers([...users, newUser])
    resetForm()
    setShowAddModal(false)
  }

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedUser) {
      const updatedUsers = users.map(u => 
        u.id === selectedUser.id 
          ? { 
              ...u, 
              name: userName,
              email: userEmail,
              role: userRole,
              permissions: permissions.length > 0 ? permissions : u.permissions,
              status: userStatus
            }
          : u
      )
      setUsers(updatedUsers)
      resetForm()
      setShowEditModal(false)
      setSelectedUser(null)
    }
  }

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(u => u.id !== selectedUser.id))
      setShowDeleteModal(false)
      setSelectedUser(null)
    }
  }

  const handleToggleStatus = (userId: number) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
        : u
    ))
  }

  const resetForm = () => {
    setUserName('')
    setUserEmail('')
    setUserRole('')
    setPermissions([])
    setUserStatus('active')
  }

  const openEditModal = (user: User) => {
    setSelectedUser(user)
    setUserName(user.name)
    setUserEmail(user.email)
    setUserRole(user.role)
    setPermissions(user.permissions)
    setUserStatus(user.status)
    setShowEditModal(true)
  }

  const openDeleteModal = (user: User) => {
    setSelectedUser(user)
    setShowDeleteModal(true)
  }

  const togglePermission = (permission: string) => {
    if (permissions.includes(permission)) {
      setPermissions(permissions.filter(p => p !== permission))
    } else {
      setPermissions([...permissions, permission])
    }
  }

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    return searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  })

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
          <h1 className="text-lg font-bold text-[#0e7eb5]">المستخدمين</h1>
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
            <h2 className="text-3xl font-bold text-[#0e7eb5]">المستخدمين والصلاحيات</h2>
            <p className="text-gray-400">إدارة المستخدمين وصلاحيات الوصول</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#0e7eb5] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#0a6a99] transition-colors"
          >
            <Plus size={20} />
            اضافة مستخدم جديد
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-gray-600 text-sm mb-1">إجمالي المستخدمين</p>
            <p className="text-2xl font-bold text-[#0e7eb5]">{totalUsers}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-gray-600 text-sm mb-1">المستخدمين النشطين</p>
            <p className="text-2xl font-bold text-amber-500">{activeUsers}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <p className="text-gray-600 text-sm mb-1">المستخدمين المعطلين</p>
            <p className="text-2xl font-bold text-gray-600">{inactiveUsers}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="البحث عن مستخدم..."
              className="w-full bg-gray-50 rounded-lg py-3 px-4 pr-12 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">الإجراءات</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">الحالة</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">الصلاحيات</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">الدور</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">البريد الالكتروني</th>
                <th className="py-4 px-3 text-right text-gray-600 font-medium text-sm">اسم المستخدم</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => openDeleteModal(user)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button 
                        onClick={() => openEditModal(user)}
                        className="text-[#0e7eb5] hover:text-[#0a6a99]"
                      >
                        <Pencil size={18} />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 ${
                        user.status === 'active' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-400 text-white'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-white' : 'bg-gray-200'}`}></span>
                      {user.status === 'active' ? 'نشط' : 'معطل'}
                    </button>
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.map((perm, idx) => (
                        <span 
                          key={idx} 
                          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                        >
                          {perm}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-3 text-right text-gray-600">{user.role}</td>
                  <td className="py-4 px-3 text-right text-gray-600 text-sm">{user.email}</td>
                  <td className="py-4 px-3 text-right text-gray-800 font-medium">{user.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add User Modal */}
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
              <h3 className="text-xl font-bold text-[#0e7eb5]">اضافة مستخدم جديد</h3>
            </div>
            
            <form onSubmit={handleAddUser}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">اسم المستخدم</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">البريد الالكتروني</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 text-right">الدور الوظيفي</label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  required
                >
                  <option value="">اختر الدور</option>
                  <option value="مدير النظام">مدير النظام</option>
                  <option value="مسؤول المبيعات">مسؤول المبيعات</option>
                  <option value="مسؤول المشتريات">مسؤول المشتريات</option>
                  <option value="محاسب">محاسب</option>
                  <option value="مشرف">مشرف</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 text-right">الصلاحيات</label>
                <div className="border border-gray-200 rounded-lg p-4 max-h-48 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-2">
                    {availablePermissions.map((permission) => (
                      <label key={permission} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={permissions.includes(permission)}
                          onChange={() => togglePermission(permission)}
                          className="rounded border-gray-300 text-[#0e7eb5] focus:ring-[#0e7eb5]"
                        />
                        <span className="text-sm text-gray-700">{permission}</span>
                      </label>
                    ))}
                  </div>
                </div>
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
                  اضافة المستخدم
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
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
              <h3 className="text-xl font-bold text-[#0e7eb5]">تعديل بيانات المستخدم</h3>
            </div>
            
            <form onSubmit={handleEditUser}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">اسم المستخدم</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">البريد الالكتروني</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 text-right">الدور الوظيفي</label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  required
                >
                  <option value="">اختر الدور</option>
                  <option value="مدير النظام">مدير النظام</option>
                  <option value="مسؤول المبيعات">مسؤول المبيعات</option>
                  <option value="مسؤول المشتريات">مسؤول المشتريات</option>
                  <option value="محاسب">محاسب</option>
                  <option value="مشرف">مشرف</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 text-right">الصلاحيات</label>
                <div className="border border-gray-200 rounded-lg p-4 max-h-48 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-2">
                    {availablePermissions.map((permission) => (
                      <label key={permission} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={permissions.includes(permission)}
                          onChange={() => togglePermission(permission)}
                          className="rounded border-gray-300 text-[#0e7eb5] focus:ring-[#0e7eb5]"
                        />
                        <span className="text-sm text-gray-700">{permission}</span>
                      </label>
                    ))}
                  </div>
                </div>
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
              هل أنت متأكد من حذف<br />هذا المستخدم؟
            </h3>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
              >
                الغاء
              </button>
              <button
                onClick={handleDeleteUser}
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

export default UsersAndPermissions
