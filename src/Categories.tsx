import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  Box
} from 'lucide-react'
import { useAuth } from './AuthContext'

interface Product {
  id: number
  code: string
  name: string
  category: string
  sellPrice: number
  costPrice: number
  quantity: number
  unit: string
}

function Categories() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => prev === label ? null : label)
  }
  
  // Form states
  const [productName, setProductName] = useState('')
  const [productCode, setProductCode] = useState('')
  const [category, setCategory] = useState('')
  const [sellPrice, setSellPrice] = useState('')
  const [costPrice, setCostPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState('')
  
  // Categories state
  const [categories, setCategories] = useState<string[]>(['ملحقات', 'أجهزة', 'برمجيات'])
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')

  const [products, setProducts] = useState<Product[]>([
    { id: 1, code: '001', name: 'ماوس لاسلكي Logitech M185', category: 'ملحقات', sellPrice: 50.00, costPrice: 150.00, quantity: 15, unit: 'قطعة' },
    { id: 2, code: '002', name: 'كيبورد ميكانيكي Redragon', category: 'ملحقات', sellPrice: 120.00, costPrice: 80.00, quantity: 10, unit: 'قطعة' },
    { id: 3, code: '003', name: 'شاشة سامسونج 27 بوصة', category: 'أجهزة', sellPrice: 800.00, costPrice: 600.00, quantity: 8, unit: 'قطعة' },
    { id: 4, code: '004', name: 'لابتوب Dell XPS 13', category: 'أجهزة', sellPrice: 3500.00, costPrice: 2800.00, quantity: 5, unit: 'قطعة' },
    { id: 5, code: '005', name: 'سماعات رأس Sony', category: 'ملحقات', sellPrice: 200.00, costPrice: 150.00, quantity: 20, unit: 'قطعة' },
    { id: 6, code: '006', name: 'طابعة HP LaserJet', category: 'أجهزة', sellPrice: 450.00, costPrice: 350.00, quantity: 12, unit: 'قطعة' },
  ])

  const menuItems = [
    { icon: Home, label: 'الصفحة الرئيسية', active: false, path: '/dashboard' },
    { icon: Package, label: 'الاصناف', active: true, path: '/categories' },
    { icon: Users, label: 'العملاء', active: false, path: '/customers' },
    { 
      icon: ShoppingCart, 
      label: 'نقطة البيع', 
      active: false,
      subItems: [
        { label: 'فواتير المبيعات', active: false, path: '/pos' },
        { label: 'مرتجع المبيعات', active: false, path: '/pos/returns' },
      ]
    },
    { 
      icon: Box, 
      label: 'المشتريات', 
      active: false,
      subItems: [
        { label: 'فواتير المشتريات', active: false, path: '/purchases' },
        { label: 'مرتجع المشتريات', active: false, path: '/purchases/returns' },
      ]
    },
    { icon: CreditCard, label: 'المصروفات', active: false, path: '/expenses' },
    { icon: FileText, label: 'إذونات القبض', active: false, path: '/receipts' },
    { icon: FileText, label: 'إذونات الصرف', active: false, path: '/payments' },
    { icon: TrendingUp, label: 'التقارير', active: false, path: '/reports' },
    { icon: Settings, label: 'المستخدمين والصلاحيات', active: false, path: '/users' },
  ]

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = Math.max(...products.map(p => p.id), 0) + 1
    
    // Auto-generate code if not provided
    let code = productCode
    if (!code.trim()) {
      const maxCode = Math.max(...products.map(p => parseInt(p.code) || 0), 0)
      code = String(maxCode + 1).padStart(3, '0')
    }
    
    const newProduct: Product = {
      id: newId,
      code: code,
      name: productName,
      category: category,
      sellPrice: parseFloat(sellPrice),
      costPrice: parseFloat(costPrice),
      quantity: parseInt(quantity),
      unit: unit
    }
    setProducts([...products, newProduct])
    resetForm()
    setShowAddModal(false)
  }

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedProduct) {
      const updatedProducts = products.map(p => 
        p.id === selectedProduct.id 
          ? { ...p, code: productCode, name: productName, category, sellPrice: parseFloat(sellPrice), costPrice: parseFloat(costPrice), quantity: parseInt(quantity), unit }
          : p
      )
      setProducts(updatedProducts)
      resetForm()
      setShowEditModal(false)
      setSelectedProduct(null)
    }
  }

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setProducts(products.filter(p => p.id !== selectedProduct.id))
      setShowDeleteModal(false)
      setSelectedProduct(null)
    }
  }

  const resetForm = () => {
    setProductName('')
    setProductCode('')
    setCategory('')
    setSellPrice('')
    setCostPrice('')
    setQuantity('')
    setUnit('')
  }

  const openEditModal = (product: Product) => {
    setSelectedProduct(product)
    setProductCode(product.code)
    setProductName(product.name)
    setCategory(product.category)
    setSellPrice(product.sellPrice.toString())
    setCostPrice(product.costPrice.toString())
    setQuantity(product.quantity.toString())
    setUnit(product.unit)
    setShowEditModal(true)
  }

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product)
    setShowDeleteModal(true)
  }

  const openAddCategoryModal = () => {
    setNewCategoryName('')
    setShowAddCategoryModal(true)
  }

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      setCategories([...categories, newCategoryName.trim()])
      setCategory(newCategoryName.trim())
      setNewCategoryName('')
      setShowAddCategoryModal(false)
    }
  }

  // Filter products based on search query - ensure unique results
  const filteredProducts = products.filter((product, index, self) => 
    // Remove duplicates by ID first
    index === self.findIndex(p => p.id === product.id) &&
    // Then apply search filter
    (searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()))
  )

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
            <h2 className="text-3xl font-bold text-[#0e7eb5]">الأصناف</h2>
            <p className="text-gray-400">إدارة المنتجات والمخزون</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#0e7eb5] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#0a6a99] transition-colors"
          >
            <Plus size={20} />
            إضافة صنف جديد
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

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-4 text-right text-gray-600 font-medium">الاجراءات</th>
                <th className="py-4 px-4 text-right text-gray-600 font-medium">الكود</th>
                <th className="py-4 px-4 text-right text-gray-600 font-medium">اسم الصنف</th>
                <th className="py-4 px-4 text-right text-gray-600 font-medium">الكمية</th>
                <th className="py-4 px-4 text-right text-gray-600 font-medium">سعر التكلفة</th>
                <th className="py-4 px-4 text-right text-gray-600 font-medium">سعر البيع</th>
                <th className="py-4 px-4 text-right text-gray-600 font-medium">التصنيف</th>
                <th className="py-4 px-4 text-right text-gray-600 font-medium">الوحدة</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => openDeleteModal(product)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button 
                        onClick={() => openEditModal(product)}
                        className="text-[#0e7eb5] hover:text-[#0a6a99]"
                      >
                        <Pencil size={18} />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-gray-800 font-medium">{product.code}</td>
                  <td className="py-4 px-4 text-right text-gray-800 font-medium">{product.name}</td>
                  <td className="py-4 px-4 text-right text-gray-600">{product.quantity}</td>
                  <td className="py-4 px-4 text-right text-gray-600">{product.costPrice.toFixed(2)} ج</td>
                  <td className="py-4 px-4 text-right text-gray-600">{product.sellPrice.toFixed(2)} ج</td>
                  <td className="py-4 px-4 text-right text-gray-600">{product.category}</td>
                  <td className="py-4 px-4 text-right text-gray-600">{product.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add Product Modal */}
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
              <h3 className="text-xl font-bold text-[#0e7eb5]">إضافة صنف جديد</h3>
            </div>
            
            <form onSubmit={handleAddProduct}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">الكود</label>
                  <input
                    type="text"
                    value={productCode}
                    onChange={(e) => setProductCode(e.target.value)}
                    placeholder="يولد تلقائياً"
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">اسم الصنف</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <button 
                    type="button" 
                    onClick={openAddCategoryModal}
                    className="text-gray-500 hover:text-[#0e7eb5]"
                  >
                    <Plus size={18} />
                  </button>
                  <label className="text-gray-700 text-sm">التصنيف</label>
                </div>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right appearance-none focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  >
                    <option value="">اختر التصنيف</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">سعر البيع</label>
                  <input
                    type="number"
                    step="0.001"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">سعر التكلفة</label>
                  <input
                    type="number"
                    step="0.001"
                    value={costPrice}
                    onChange={(e) => setCostPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">الكمية</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">الوحدة</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="قطعة"
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
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
                  إضافة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
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
              <h3 className="text-xl font-bold text-[#0e7eb5]">تعديل الصنف</h3>
            </div>
            
            <form onSubmit={handleEditProduct}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">الكود</label>
                  <input
                    type="text"
                    value={productCode}
                    onChange={(e) => setProductCode(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">اسم الصنف</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <button 
                    type="button" 
                    onClick={openAddCategoryModal}
                    className="text-gray-500 hover:text-[#0e7eb5]"
                  >
                    <Plus size={18} />
                  </button>
                  <label className="text-gray-700 text-sm">التصنيف</label>
                </div>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right appearance-none focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  >
                    <option value="">اختر التصنيف</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">سعر البيع</label>
                  <input
                    type="number"
                    step="0.001"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">سعر التكلفة</label>
                  <input
                    type="number"
                    step="0.001"
                    value={costPrice}
                    onChange={(e) => setCostPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">الكمية</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 text-right">الوحدة</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    required
                  />
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
              هل أنت متأكد من حذف<br />هذا الصنف؟
            </h3>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
              >
                الغاء
              </button>
              <button
                onClick={handleDeleteProduct}
                className="flex-1 bg-[#0e7eb5] text-white py-3 rounded-lg font-bold hover:bg-[#0a6a99] transition-colors"
              >
                تأكيد
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm mx-4">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setShowAddCategoryModal(false)}
                className="text-[#0e7eb5] hover:text-[#0a6a99]"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-bold text-[#0e7eb5]">إضافة تصنيف جديد</h3>
            </div>
            
            <form onSubmit={handleAddCategory}>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2 text-right">اسم التصنيف</label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="أدخل اسم التصنيف..."
                  className="w-full border border-gray-200 rounded-lg py-3 px-4 text-right focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(false)}
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
    </div>
  )
}

export default Categories
