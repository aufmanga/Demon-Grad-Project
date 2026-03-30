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
      <header className="bg-sky-100/95 backdrop-blur-md py-3 md:py-4 px-4 md:px-8 rounded-b-[20px] md:rounded-b-[40px] shadow-lg relative z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Store className="text-white" size={20} />
            </div>
            <div className="text-right">
              <h1 className="text-blue-800 font-bold text-lg md:text-2xl">نظام الادارة المتكامل</h1>
              <p className="text-blue-600 text-xs md:text-sm hidden sm:block">الحل الشامل لإدارة اعمالك</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={() => navigate('/signin')}
              className="border border-blue-600 text-blue-600 px-3 md:px-6 py-1.5 md:py-2 rounded-lg font-medium text-sm hover:bg-blue-600 hover:text-white transition-colors"
            >
              تسجيل الدخول
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-10 md:py-20 px-4 md:px-8 relative z-10">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-sky-100 px-3 md:px-4 py-2 rounded-full mb-4 md:mb-8">
            <span className="text-blue-700 text-xs md:text-sm font-medium">الحل الأمثل لإدارة الأعمال التجارية</span>
            <Star className="text-blue-600" size={14} fill="#2563eb" />
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2 leading-tight min-h-[1.2em] drop-shadow-lg">
            نظام إدارة شامل ومتكامل
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-5xl font-bold text-blue-400 mb-4 md:mb-6 leading-tight min-h-[1.2em]">
            <TypewriterText text="لشركتك ومتاجرك" delay={1000} className="text-blue-400" />
          </h2>
          
          <p className="text-white/90 text-sm md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md px-2">
            حل متكامل وسهل الاستخدام لإدارة المبيعات والمشتريات والمخازن والعملاء والتقارير المالية
            مصمم خصيصاً للشركات والمحلات التجارية من جميع الأحجام
          </p>

          <button 
            onClick={() => navigate('/signin')}
            className="bg-blue-600 text-white px-6 md:px-10 py-2.5 md:py-3 rounded-lg font-bold text-base md:text-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            تسجيل الدخول
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-12 px-4 md:px-8 relative z-10 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-16 relative z-10">
          <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-3 md:p-4">
            <p className="text-2xl md:text-3xl font-bold text-white">10+</p>
            <p className="text-white/80 text-xs md:text-sm">سنوات خبرة</p>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-3 md:p-4">
            <p className="text-2xl md:text-3xl font-bold text-white">24/7</p>
            <p className="text-white/80 text-xs md:text-sm">دعم فني</p>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-3 md:p-4">
            <p className="text-2xl md:text-3xl font-bold text-white">99.9%</p>
            <p className="text-white/80 text-xs md:text-sm">وقت التشغيل</p>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-3 md:p-4">
            <p className="text-2xl md:text-3xl font-bold text-white">1000+</p>
            <p className="text-white/80 text-xs md:text-sm">عميل راضي</p>
          </div>
        </div>
      </section>

      {/* What is the System Section */}
      <section className="py-10 md:py-16 px-4 md:px-8 bg-white/95 backdrop-blur-md relative z-10">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">ما هو نظام الإدارة المتكامل؟</h2>
          <p className="text-gray-600 text-sm md:text-lg leading-relaxed max-w-3xl mx-auto mb-8 md:mb-12">
            هو نظام إدارة متكامل (ERP) مصمم خصيصاً للشركات والمحلات التجارية ومراكز البيع في الوطن العربي،
            يوفر لك النظام كل الأدوات التي تحتاجها لإدارة عملك التجاري بكفاءة وسهولة من مكان واحد
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-md">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Award className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2 text-sm md:text-base">أسهل وموثوق</h3>
              <p className="text-gray-500 text-xs md:text-sm">واجهة سهلة الاستخدام تجعل إدارة أعمالك أمراً سهلاً</p>
            </div>
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-md">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Zap className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2 text-sm md:text-base">سريع ومتين</h3>
              <p className="text-gray-500 text-xs md:text-sm">أداء عالي وسرعة في معالجة البيانات</p>
            </div>
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-md">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <CheckCircle className="text-blue-600" size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2 text-sm md:text-base">سهل الاستخدام</h3>
              <p className="text-gray-500 text-xs md:text-sm">واجهة بسيطة وسهلة 8 أزرار تحكم شبة انجاز</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who is this for Section - لمن هذا النظام؟ */}
      <section className="py-10 md:py-16 px-4 md:px-8 bg-sky-50/95 backdrop-blur-md relative z-10">
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-xl md:text-3xl font-bold text-blue-700 text-center mb-2">لمن هذا النظام؟</h2>
          <p className="text-blue-600 text-center mb-8 md:mb-12 text-xs md:text-sm">قسم النظام لأقسام احتياجات مختلف أنواع الأعمال التجارية</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Card 1 - الشركات متعددة الفروع */}
            <div className="bg-white rounded-2xl p-4 md:p-6 border border-purple-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Building2 className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-purple-700 text-center mb-2 md:mb-3 text-sm md:text-base">الشركات متعددة الفروع</h3>
              <p className="text-gray-500 text-xs text-center leading-relaxed">
                إدارة متكاملة لجميع الفروع والمخازن مع ميزة المقارنة والتحليل لكل فرع على حدة
              </p>
            </div>

            {/* Card 2 - الشركات الصغيرة والمتوسطة */}
            <div className="bg-white rounded-2xl p-4 md:p-6 border border-green-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <TrendingUp className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-green-700 text-center mb-2 md:mb-3 text-sm md:text-base">الشركات الصغيرة والمتوسطة</h3>
              <p className="text-gray-500 text-xs text-center leading-relaxed">
                حلول متكاملة لإدارة عمليات التجارة - أتمتة الأرباح والخسائر وإدارة المبيعات والمشتريات
              </p>
            </div>

            {/* Card 3 - المحلات التجارية */}
            <div className="bg-white rounded-2xl p-4 md:p-6 border border-blue-200 hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Store className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-blue-700 text-center mb-2 md:mb-3 text-sm md:text-base">المحلات التجارية</h3>
              <p className="text-gray-500 text-xs text-center leading-relaxed">
                إدارة كاملة للمحلات التجاري من المبيعات اليومية، الجرد، والتقارير المالية
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Section - المميزات الرئيسية */}
      <section className="py-10 md:py-16 px-4 md:px-8 bg-sky-100/95 backdrop-blur-md relative z-10">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-xl md:text-3xl font-bold text-blue-800 text-center mb-2">المميزات الرئيسية</h2>
          <p className="text-blue-600 text-center mb-8 md:mb-12 text-xs md:text-sm">كل ما تحتاجه لإدارة عملك بكفاءة واحترافية في مكان واحد</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {/* Feature 1 - إدارة المنتجات */}
            <div className="bg-white rounded-2xl p-3 md:p-5 border border-green-300 hover:shadow-lg transition-shadow text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center mb-2 md:mb-3 border border-green-300 mx-auto">
                <Package className="text-green-600" size={20} />
              </div>
              <h3 className="font-bold text-green-700 text-xs md:text-sm mb-1 md:mb-2">إدارة المنتجات</h3>
              <p className="text-gray-500 text-xs leading-relaxed hidden sm:block">
                تتبع دقيق للمخزون والكميات مع التنبيهات عند نفاد الكميات
              </p>
            </div>

            {/* Feature 2 - إدارة العملاء والموردين */}
            <div className="bg-white rounded-2xl p-3 md:p-5 border border-purple-300 hover:shadow-lg transition-shadow text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-2 md:mb-3 border border-purple-300 mx-auto">
                <Users className="text-purple-600" size={20} />
              </div>
              <h3 className="font-bold text-purple-700 text-xs md:text-sm mb-1 md:mb-2">إدارة العملاء والموردين</h3>
              <p className="text-gray-500 text-xs leading-relaxed hidden sm:block">
                متابعة كاملة للعملاء والموردين وسجلاتهم المالية والتعامل بالتفصيل
              </p>
            </div>

            {/* Feature 3 - نقطة البيع POS */}
            <div className="bg-white rounded-2xl p-3 md:p-5 border border-cyan-300 hover:shadow-lg transition-shadow text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-2 md:mb-3 border border-cyan-300 mx-auto">
                <ShoppingCart className="text-cyan-600" size={20} />
              </div>
              <h3 className="font-bold text-cyan-700 text-xs md:text-sm mb-1 md:mb-2">نقطة البيع POS</h3>
              <p className="text-gray-500 text-xs leading-relaxed hidden sm:block">
                نظام نقاط بيع سريع وسهل الاستخدام مع دعم الباركود وإضافات احتياطية
              </p>
            </div>

            {/* Feature 4 - إدارة مستندات الدفع */}
            <div className="bg-white rounded-2xl p-3 md:p-5 border border-blue-300 hover:shadow-lg transition-shadow text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-2 md:mb-3 border border-blue-300 mx-auto">
                <CreditCard className="text-blue-600" size={20} />
              </div>
              <h3 className="font-bold text-blue-700 text-xs md:text-sm mb-1 md:mb-2">إدارة مستندات الدفع</h3>
              <p className="text-gray-500 text-xs leading-relaxed hidden sm:block">
                إدارة شاملة لجميع مستندات الدفع من فواتير وسندات قبض وصرف باحترافية
              </p>
            </div>

            {/* Feature 5 - تقارير متعددة */}
            <div className="bg-white rounded-2xl p-3 md:p-5 border border-orange-300 hover:shadow-lg transition-shadow text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-2 md:mb-3 border border-orange-300 mx-auto">
                <TrendingUp className="text-orange-600" size={20} />
              </div>
              <h3 className="font-bold text-orange-700 text-xs md:text-sm mb-1 md:mb-2">تقارير متعددة</h3>
              <p className="text-gray-500 text-xs leading-relaxed hidden sm:block">
                تقارير تفصيلية عن المبيعات والمخزون والأرباح والخسائر والمصروفات
              </p>
            </div>

            {/* Feature 6 - إدارة المصروفات */}
            <div className="bg-white rounded-2xl p-3 md:p-5 border border-yellow-300 hover:shadow-lg transition-shadow text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-2 md:mb-3 border border-yellow-300 mx-auto">
                <DollarSign className="text-yellow-600" size={20} />
              </div>
              <h3 className="font-bold text-yellow-700 text-xs md:text-sm mb-1 md:mb-2">إدارة المصروفات</h3>
              <p className="text-gray-500 text-xs leading-relaxed hidden sm:block">
                تسجيل ومراقبة جميع المصروفات وجميع الفواتير والحسابات لكل حساب
              </p>
            </div>

            {/* Feature 7 - إذونات القبض والصرف */}
            <div className="bg-white rounded-2xl p-3 md:p-5 border border-pink-300 hover:shadow-lg transition-shadow text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-2 md:mb-3 border border-pink-300 mx-auto">
                <ClipboardList className="text-pink-600" size={20} />
              </div>
              <h3 className="font-bold text-pink-700 text-xs md:text-sm mb-1 md:mb-2">إذونات القبض والصرف</h3>
              <p className="text-gray-500 text-xs leading-relaxed hidden sm:block">
                تسجيل جميع سندات القبض والصرفيات مع ربطها بالحساب والموردين
              </p>
            </div>

            {/* Feature 8 - الفواتير والسندات */}
            <div className="bg-white rounded-2xl p-3 md:p-5 border border-red-300 hover:shadow-lg transition-shadow text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-xl flex items-center justify-center mb-2 md:mb-3 border border-red-300 mx-auto">
                <FileText className="text-red-600" size={20} />
              </div>
              <h3 className="font-bold text-red-700 text-xs md:text-sm mb-1 md:mb-2">الفواتير والسندات</h3>
              <p className="text-gray-500 text-xs leading-relaxed hidden sm:block">
                إصدار فواتير البيع والشراء والفواتير الضريبية والفواتير والسندات والشيكات
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sky-100/95 backdrop-blur-md py-6 md:py-8 px-4 md:px-8 text-center relative z-10">
        <p className="text-blue-800 font-medium text-xs md:text-base">جميع الحقوق محفوظة © 2025 نظام الإدارة المتكامل</p>
      </footer>
    </div>
  )
}

export default LandingPage
