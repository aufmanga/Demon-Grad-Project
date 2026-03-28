import { useState, useEffect } from 'react'
import { Star, Award, Zap, CheckCircle, Users, ShoppingCart, CreditCard, Wallet, ClipboardList, FileText, Store, ArrowLeft, X, Package, TrendingUp, DollarSign, Building2, BarChart3, Receipt, Boxes, CircleDollarSign } from 'lucide-react'

// Typewriter effect component
function TypewriterText({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    
    const startTyping = () => {
      setIsActive(true)
      let currentIndex = 0
      
      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typeInterval)
          setIsActive(false)
          setTimeout(() => {
            setIsActive(true)
            let deleteIndex = text.length
            
            const deleteInterval = setInterval(() => {
              if (deleteIndex > 0) {
                setDisplayText(text.slice(0, deleteIndex - 1))
                deleteIndex--
              } else {
                clearInterval(deleteInterval)
                setIsActive(false)
                setTimeout(() => {
                  startTyping()
                }, 500)
              }
            }, 100)
          }, 2000)
        }
      }, 200)
    }

    timeout = setTimeout(startTyping, delay)
    
    return () => clearTimeout(timeout)
  }, [text, delay])

  // Cursor blink effect - only when active
  useEffect(() => {
    if (!isActive) {
      setShowCursor(false)
      return
    }
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [isActive])

  return (
    <span className={className}>
      {displayText}
      <span className={`inline-block w-1 h-[1em] bg-current ml-1 ${showCursor && isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
    </span>
  )
}

import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-white relative">
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="/People_work_and_202603282317.mp4"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      {/* Header */}
      <header className="bg-sky-100/95 backdrop-blur-md py-4 px-8 rounded-b-[40px] shadow-lg relative z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Store className="text-white" size={24} />
            </div>
            <div className="text-right">
              <h1 className="text-blue-800 font-bold text-2xl">نظام الادارة المتكامل</h1>
              <p className="text-blue-600 text-sm">الحل الشامل لإدارة اعمالك</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/signin')}
              className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors"
            >
              تسجيل الدخول
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-8 relative z-10">
        {/* Left Side Decorations */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:block">
          {/* Floating Card 1 */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 shadow-xl mb-4 transform -rotate-6 hover:rotate-0 transition-transform duration-300 w-48">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-white" size={20} />
              </div>
              <span className="text-white font-bold text-sm">المبيعات</span>
            </div>
            <p className="text-white/80 text-xs">تتبع مبيعاتك بشكل فوري</p>
          </div>
          
          {/* Floating Card 2 */}
          <div className="bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-2xl p-4 shadow-xl ml-8 transform rotate-3 hover:rotate-0 transition-transform duration-300 w-44">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Receipt className="text-white" size={20} />
              </div>
              <span className="text-white font-bold text-sm">فواتير</span>
            </div>
            <p className="text-white/80 text-xs">إصدار فواتير احترافية</p>
          </div>
          
          {/* Decorative Circle */}
          <div className="absolute -left-4 top-20 w-24 h-24 bg-blue-200/50 rounded-full blur-xl"></div>
          <div className="absolute left-20 bottom-10 w-16 h-16 bg-cyan-200/50 rounded-full blur-lg"></div>
        </div>

        {/* Right Side Decorations */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block">
          {/* Floating Card 3 */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 shadow-xl mb-4 transform rotate-6 hover:rotate-0 transition-transform duration-300 w-48">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Boxes className="text-white" size={20} />
              </div>
              <span className="text-white font-bold text-sm">المخزون</span>
            </div>
            <p className="text-white/80 text-xs">تحكم كامل في المخزون</p>
          </div>
          
          {/* Floating Card 4 */}
          <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-2xl p-4 shadow-xl mr-8 transform -rotate-3 hover:rotate-0 transition-transform duration-300 w-44">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <CircleDollarSign className="text-white" size={20} />
              </div>
              <span className="text-white font-bold text-sm">الأرباح</span>
            </div>
            <p className="text-white/80 text-xs">حساب الأرباح تلقائياً</p>
          </div>
          
          {/* Decorative Circle */}
          <div className="absolute -right-4 top-20 w-24 h-24 bg-purple-200/50 rounded-full blur-xl"></div>
          <div className="absolute right-20 bottom-10 w-16 h-16 bg-green-200/50 rounded-full blur-lg"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-sky-100 px-4 py-2 rounded-full mb-8">
            <span className="text-blue-700 text-sm font-medium">الحل الأمثل لإدارة الأعمال التجارية</span>
            <Star className="text-blue-600" size={16} fill="#2563eb" />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-2 leading-tight min-h-[1.2em] drop-shadow-lg">
            نظام إدارة شامل ومتكامل
          </h1>
          <h2 className="text-5xl font-bold text-blue-400 mb-6 leading-tight min-h-[1.2em]">
            <TypewriterText text="لشركتك ومتاجرك" delay={1000} className="text-blue-400" />
          </h2>
          
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            حل متكامل وسهل الاستخدام لإدارة المبيعات والمشتريات والمخازن والعملاء والتقارير المالية
            مصمم خصيصاً للشركات والمحلات التجارية من جميع الأحجام
          </p>

          <button 
            onClick={() => navigate('/signin')}
            className="bg-blue-600 text-white px-10 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            تسجيل الدخول
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-8 relative z-10 bg-gradient-to-b from-transparent to-black/20">
        {/* Decorative elements */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-3 shadow-lg transform -rotate-12">
            <Award className="text-white" size={24} />
          </div>
          <div className="absolute -left-4 top-8 w-20 h-20 bg-blue-200/30 rounded-full blur-lg"></div>
        </div>
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-xl p-3 shadow-lg transform rotate-12">
            <Zap className="text-white" size={24} />
          </div>
          <div className="absolute -right-4 top-8 w-20 h-20 bg-cyan-200/30 rounded-full blur-lg"></div>
        </div>
        
        <div className="max-w-4xl mx-auto flex justify-center gap-16 relative z-10">
          <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-4">
            <p className="text-3xl font-bold text-white">10+</p>
            <p className="text-white/80 text-sm">سنوات خبرة</p>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-4">
            <p className="text-3xl font-bold text-white">24/7</p>
            <p className="text-white/80 text-sm">دعم فني</p>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-4">
            <p className="text-3xl font-bold text-white">99.9%</p>
            <p className="text-white/80 text-sm">وقت التشغيل</p>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-4">
            <p className="text-3xl font-bold text-white">1000+</p>
            <p className="text-white/80 text-sm">عميل راضي</p>
          </div>
        </div>
      </section>

      {/* What is the System Section */}
      <section className="py-16 px-8 bg-white/95 backdrop-blur-md relative z-10">
        {/* Decorative floating cards */}
        <div className="absolute left-8 top-20 hidden xl:block">
          <div className="bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-2xl p-4 shadow-xl transform -rotate-6 mb-4 w-40">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="text-white" size={20} />
              <span className="text-white font-bold text-xs">موثوق</span>
            </div>
            <p className="text-white/80 text-xs">نظام آمن وموثوق 100%</p>
          </div>
          <div className="absolute -left-4 top-12 w-24 h-24 bg-indigo-200/40 rounded-full blur-xl"></div>
        </div>
        
        <div className="absolute right-8 bottom-20 hidden xl:block">
          <div className="bg-gradient-to-br from-sky-400 to-sky-500 rounded-2xl p-4 shadow-xl transform rotate-6 w-40">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="text-white" size={20} />
              <span className="text-white font-bold text-xs">سريع</span>
            </div>
            <p className="text-white/80 text-xs">أداء عالي وسرعة فائقة</p>
          </div>
          <div className="absolute -right-4 bottom-12 w-24 h-24 bg-sky-200/40 rounded-full blur-xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">ما هو نظام الإدارة المتكامل؟</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mb-12">
            هو نظام إدارة متكامل (ERP) مصمم خصيصاً للشركات والمحلات التجارية ومراكز البيع في الوطن العربي،
            يوفر لك النظام كل الأدوات التي تحتاجها لإدارة عملك التجاري بكفاءة وسهولة من مكان واحد
          </p>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-blue-600" size={28} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">أسهل وموثوق</h3>
              <p className="text-gray-500 text-sm">واجهة سهلة الاستخدام تجعل إدارة أعمالك أمراً سهلاً</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-blue-600" size={28} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">سريع ومتين</h3>
              <p className="text-gray-500 text-sm">أداء عالي وسرعة في معالجة البيانات</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-blue-600" size={28} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">سهل الاستخدام</h3>
              <p className="text-gray-500 text-sm">واجهة بسيطة وسهلة 8 أزرار تحكم شبة انجاز</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who is this for Section - لمن هذا النظام؟ */}
      <section className="py-16 px-8 bg-sky-50/95 backdrop-blur-md relative z-10">
        {/* Decorative elements */}
        <div className="absolute left-6 top-1/3 hidden xl:block">
          <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl p-3 shadow-lg transform rotate-12">
            <Building2 className="text-white" size={22} />
          </div>
          <div className="absolute left-12 top-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl p-3 shadow-lg transform -rotate-6">
            <Store className="text-white" size={22} />
          </div>
          <div className="absolute -left-2 top-8 w-20 h-20 bg-purple-200/30 rounded-full blur-lg"></div>
        </div>
        
        <div className="absolute right-6 bottom-1/3 hidden xl:block">
          <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-3 shadow-lg transform -rotate-12">
            <TrendingUp className="text-white" size={22} />
          </div>
          <div className="absolute right-12 bottom-16 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl p-3 shadow-lg transform rotate-6">
            <DollarSign className="text-white" size={22} />
          </div>
          <div className="absolute -right-2 bottom-8 w-20 h-20 bg-green-200/30 rounded-full blur-lg"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-blue-700 text-center mb-2">لمن هذا النظام؟</h2>
          <p className="text-blue-600 text-center mb-12 text-sm">قسم النظام لأقسام احتياجات مختلف أنواع الأعمال التجارية</p>

          <div className="grid grid-cols-3 gap-6">
            {/* Card 1 - الشركات متعددة الفروع */}
            <div className="bg-white rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-purple-700 text-center mb-3">الشركات متعددة الفروع</h3>
              <p className="text-gray-500 text-xs text-center leading-relaxed">
                إدارة متكاملة لجميع الفروع والمخازن مع ميزة المقارنة والتحليل لكل فرع على حدة
              </p>
            </div>

            {/* Card 2 - الشركات الصغيرة والمتوسطة */}
            <div className="bg-white rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-green-700 text-center mb-3">الشركات الصغيرة والمتوسطة</h3>
              <p className="text-gray-500 text-xs text-center leading-relaxed">
                حلول متكاملة لإدارة عمليات التجارة - أتمتة الأرباح والخسائر وإدارة المبيعات والمشتريات
              </p>
            </div>

            {/* Card 3 - المحلات التجارية */}
            <div className="bg-white rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Store className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-blue-700 text-center mb-3">المحلات التجارية</h3>
              <p className="text-gray-500 text-xs text-center leading-relaxed">
                إدارة كاملة للمحلات التجاري من المبيعات اليومية، الجرد، والتقارير المالية
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Section - المميزات الرئيسية */}
      <section className="py-16 px-8 bg-sky-100/95 backdrop-blur-md relative z-10">
        {/* Decorative floating elements */}
        <div className="absolute left-8 top-10 hidden xl:block">
          <div className="bg-white/80 backdrop-blur rounded-2xl p-3 shadow-lg transform -rotate-6 mb-3">
            <Package className="text-green-500" size={24} />
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl p-3 shadow-lg transform rotate-12 ml-6">
            <Users className="text-purple-500" size={24} />
          </div>
          <div className="absolute -left-4 top-16 w-24 h-24 bg-blue-300/20 rounded-full blur-xl"></div>
        </div>
        
        <div className="absolute right-8 bottom-10 hidden xl:block">
          <div className="bg-white/80 backdrop-blur rounded-2xl p-3 shadow-lg transform rotate-6 mb-3">
            <CreditCard className="text-blue-500" size={24} />
          </div>
          <div className="bg-white/80 backdrop-blur rounded-2xl p-3 shadow-lg transform -rotate-12 mr-6">
            <ClipboardList className="text-pink-500" size={24} />
          </div>
          <div className="absolute -right-4 bottom-16 w-24 h-24 bg-cyan-300/20 rounded-full blur-xl"></div>
        </div>

        {/* Additional floating icons scattered */}
        <div className="absolute left-1/4 top-1/2 hidden lg:block">
          <div className="bg-gradient-to-br from-orange-400/20 to-orange-500/20 rounded-full p-2 backdrop-blur-sm">
            <TrendingUp className="text-orange-500" size={20} />
          </div>
        </div>
        <div className="absolute right-1/4 top-1/3 hidden lg:block">
          <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-full p-2 backdrop-blur-sm">
            <DollarSign className="text-yellow-600" size={20} />
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-2">المميزات الرئيسية</h2>
          <p className="text-blue-600 text-center mb-12 text-sm">كل ما تحتاجه لإدارة عملك بكفاءة واحترافية في مكان واحد</p>

          <div className="grid grid-cols-4 gap-4">
            {/* Feature 1 - إدارة المنتجات */}
            <div className="bg-white rounded-2xl p-5 border border-green-300 hover:shadow-lg transition-shadow text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3 border border-green-300 mx-auto">
                <Package className="text-green-600" size={24} />
              </div>
              <h3 className="font-bold text-green-700 text-sm mb-2">إدارة المنتجات</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                تتبع دقيق للمخزون والكميات مع التنبيهات عند نفاد الكميات
              </p>
            </div>

            {/* Feature 2 - إدارة العملاء والموردين */}
            <div className="bg-white rounded-2xl p-5 border border-purple-300 hover:shadow-lg transition-shadow text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3 border border-purple-300 mx-auto">
                <Users className="text-purple-600" size={24} />
              </div>
              <h3 className="font-bold text-purple-700 text-sm mb-2">إدارة العملاء والموردين</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                متابعة كاملة للعملاء والموردين وسجلاتهم المالية والتعامل بالتفصيل
              </p>
            </div>

            {/* Feature 3 - نقطة البيع POS */}
            <div className="bg-white rounded-2xl p-5 border border-cyan-300 hover:shadow-lg transition-shadow text-center">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-3 border border-cyan-300 mx-auto">
                <ShoppingCart className="text-cyan-600" size={24} />
              </div>
              <h3 className="font-bold text-cyan-700 text-sm mb-2">نقطة البيع POS</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                نظام نقاط بيع سريع وسهل الاستخدام مع دعم الباركود وإضافات احتياطية
              </p>
            </div>

            {/* Feature 4 - إدارة مستندات الدفع */}
            <div className="bg-white rounded-2xl p-5 border border-blue-300 hover:shadow-lg transition-shadow text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 border border-blue-300 mx-auto">
                <CreditCard className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-blue-700 text-sm mb-2">إدارة مستندات الدفع</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                إدارة شاملة لجميع مستندات الدفع من فواتير وسندات قبض وصرف باحترافية
              </p>
            </div>

            {/* Feature 5 - تقارير متعددة */}
            <div className="bg-white rounded-2xl p-5 border border-orange-300 hover:shadow-lg transition-shadow text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-3 border border-orange-300 mx-auto">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
              <h3 className="font-bold text-orange-700 text-sm mb-2">تقارير متعددة</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                تقارير تفصيلية عن المبيعات والمخزون والأرباح والخسائر والمصروفات
              </p>
            </div>

            {/* Feature 6 - إدارة المصروفات */}
            <div className="bg-white rounded-2xl p-5 border border-yellow-300 hover:shadow-lg transition-shadow text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-3 border border-yellow-300 mx-auto">
                <DollarSign className="text-yellow-600" size={24} />
              </div>
              <h3 className="font-bold text-yellow-700 text-sm mb-2">إدارة المصروفات</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                تسجيل ومراقبة جميع المصروفات وجميع الفواتير والحسابات لكل حساب
              </p>
            </div>

            {/* Feature 7 - إذونات القبض والصرف */}
            <div className="bg-white rounded-2xl p-5 border border-pink-300 hover:shadow-lg transition-shadow text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-3 border border-pink-300 mx-auto">
                <ClipboardList className="text-pink-600" size={24} />
              </div>
              <h3 className="font-bold text-pink-700 text-sm mb-2">إذونات القبض والصرف</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                تسجيل جميع سندات القبض والصرفيات مع ربطها بالحساب والموردين
              </p>
            </div>

            {/* Feature 8 - الفواتير والسندات */}
            <div className="bg-white rounded-2xl p-5 border border-red-300 hover:shadow-lg transition-shadow text-center">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-3 border border-red-300 mx-auto">
                <FileText className="text-red-600" size={24} />
              </div>
              <h3 className="font-bold text-red-700 text-sm mb-2">الفواتير والسندات</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                إصدار فواتير البيع والشراء والفواتير الضريبية والفواتير والسندات والشيكات
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sky-100/95 backdrop-blur-md py-8 px-8 text-center relative z-10">
        <p className="text-blue-800 font-medium">جميع الحقوق محفوظة © 2025 نظام الإدارة المتكامل</p>
      </footer>
    </div>
  )
}

export default LandingPage
