import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, Check, X, Eye, EyeOff } from 'lucide-react'

interface SignInProps {
  onLogin: () => void
}

function SignIn({ onLogin }: SignInProps) {
  const navigate = useNavigate()
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'forgot' | 'otp' | 'reset'>('login')
  
  // Form states
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', ''])
  
  // Input states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin()
    navigate('/dashboard')
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // After registration, go to OTP
    setCurrentView('otp')
  }

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault()
    // After forgot password, go to OTP
    setCurrentView('otp')
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // After OTP, either go to dashboard (login flow) or reset password
    if (currentView === 'otp') {
      // Check if coming from forgot password or register
      setCurrentView('reset')
    }
  }

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    // After reset, login
    onLogin()
    navigate('/dashboard')
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newDigits = [...otpDigits]
      newDigits[index] = value
      setOtpDigits(newDigits)
      
      // Auto-focus next input
      if (value && index < 4) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const features = [
    { text: 'إدارة شاملة للمبيعات والمشتريات' },
    { text: 'تقارير مالية دقيقة ومفصلة' },
    { text: 'نظام نقطة بيع احترافي' },
    { text: 'دعم فني متواصل 24/7' },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Forms */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center p-12">
        {/* Logo */}
        <div className="w-16 h-16 bg-[#0e7eb5] rounded-lg flex items-center justify-center mb-4">
          <Home className="text-white" size={32} strokeWidth={1.5} />
        </div>

        {/* LOGIN FORM */}
        {currentView === 'login' && (
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center mb-1">مرحباً بك مجدداً</h2>
            <p className="text-gray-500 text-center text-sm mb-8">سجل دخولك للوصول إلى لوحة التحكم</p>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-center mb-1">تسجيل الدخول</h3>
              <p className="text-gray-500 text-center text-xs mb-6">أدخل بياناتك للدخول إلى حسابك</p>

              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="block text-gray-600 text-xs mb-2 text-right">البريد الالكتروني</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ahmed 12@gamil.com"
                    className="w-full bg-gray-100 rounded-lg py-3 px-4 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  />
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-gray-600 text-xs">كلمه المرور</label>
                    <button 
                      type="button"
                      onClick={() => setCurrentView('forgot')}
                      className="text-[#0e7eb5] text-xs hover:underline"
                    >
                      هل نسيت كلمه السر؟
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="******************"
                      className="w-full bg-gray-100 rounded-lg py-3 px-4 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0e7eb5] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#0a6a99] transition-colors"
                >
                  تسجيل الدخول
                </button>
              </form>

              <p className="text-center text-sm mt-4">
                ليس لديك حساب؟{' '}
                <button 
                  onClick={() => setCurrentView('register')}
                  className="text-[#0e7eb5] font-bold hover:underline"
                >
                  سجل الان
                </button>
              </p>
            </div>
          </div>
        )}

        {/* REGISTER FORM */}
        {currentView === 'register' && (
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center mb-1">ابدأ رحلتك معنا</h2>
            <p className="text-gray-500 text-center text-sm mb-8">أنشئ حسابك وابدأ في إدارة عملك بكفاءة</p>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-center mb-1">إنشاء حساب جديد</h3>
              <p className="text-gray-500 text-center text-xs mb-6">أدخل بياناتك لإنشاء حساب جديد</p>

              <form onSubmit={handleRegister}>
                <div className="mb-4">
                  <label className="block text-gray-600 text-xs mb-2 text-right">الاسم بالكامل</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="أحمد محمد محمود"
                    className="w-full bg-gray-100 rounded-lg py-3 px-4 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-600 text-xs mb-2 text-right">البريد الالكتروني</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ahmed 12@gamil.com"
                    className="w-full bg-gray-100 rounded-lg py-3 px-4 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-600 text-xs mb-2 text-right">كلمه المرور</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="******************"
                      className="w-full bg-gray-100 rounded-lg py-3 px-4 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-600 text-xs mb-2 text-right">تاكيد كلمه المرور</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="******************"
                      className="w-full bg-gray-100 rounded-lg py-3 px-4 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0e7eb5] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#0a6a99] transition-colors"
                >
                  تسجيل الدخول
                </button>
              </form>

              <p className="text-center text-sm mt-4">
                لديك حساب بالفعل؟{' '}
                <button 
                  onClick={() => setCurrentView('login')}
                  className="text-[#0e7eb5] font-bold hover:underline"
                >
                  سجل الدخول
                </button>
              </p>
            </div>
          </div>
        )}

        {/* FORGOT PASSWORD FORM */}
        {currentView === 'forgot' && (
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center mb-1">هل نسيت كلمة السر؟</h2>
            <p className="text-gray-500 text-center text-sm mb-8">لا تقلق، يمكنك إعادة تعيينها بسهولة</p>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-center mb-1">ادخل البريد الالكتروني الخاص بيك</h3>
              <p className="text-gray-500 text-center text-xs mb-6">سنرسل لك رمز التحقق لإعادة تعيين كلمة المرور</p>

              <form onSubmit={handleForgot}>
                <div className="mb-6">
                  <label className="block text-gray-600 text-xs mb-2 text-right">البريد الالكتروني</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ahmed 12@gamil.com"
                    className="w-full bg-gray-100 rounded-lg py-3 px-4 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0e7eb5] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#0a6a99] transition-colors"
                >
                  تأكيد
                </button>
              </form>

              <p className="text-center text-sm mt-4">
                <button 
                  onClick={() => setCurrentView('login')}
                  className="text-[#0e7eb5] font-bold hover:underline"
                >
                  العودة لتسجيل الدخول
                </button>
              </p>
            </div>
          </div>
        )}

        {/* OTP FORM */}
        {currentView === 'otp' && (
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center mb-1">ادخل OTP</h2>
            <p className="text-gray-500 text-center text-sm mb-8">أدخل الرمز المرسل إلى بريدك الإلكتروني</p>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-center mb-6">ادخل الرمز الخاص بيك</h3>

              <form onSubmit={handleOtpSubmit}>
                <div className="flex justify-center gap-3 mb-6">
                  {otpDigits.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-12 bg-gray-100 rounded-lg text-center text-xl font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0e7eb5] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#0a6a99] transition-colors"
                >
                  تأكيد
                </button>
              </form>

              <p className="text-center text-sm mt-4">
                لم تستلم الرمز؟{' '}
                <button className="text-[#0e7eb5] font-bold hover:underline">
                  إعادة الإرسال
                </button>
              </p>
            </div>
          </div>
        )}

        {/* RESET PASSWORD FORM */}
        {currentView === 'reset' && (
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center mb-1">تغيير كلمة السر</h2>
            <p className="text-gray-500 text-center text-sm mb-8">أدخل كلمة المرور الجديدة</p>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-center mb-1">اضف كلمه السر الجديدة</h3>

              <form onSubmit={handleResetPassword}>
                <div className="mb-4">
                  <label className="block text-gray-600 text-xs mb-2 text-right">كلمه المرور</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="******************"
                      className="w-full bg-gray-100 rounded-lg py-3 px-4 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-600 text-xs mb-2 text-right">تاكيد كلمه المرور</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="******************"
                      className="w-full bg-gray-100 rounded-lg py-3 px-4 text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#0e7eb5]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0e7eb5] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#0a6a99] transition-colors"
                >
                  تأكيد
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Right Side - Blue Background */}
      <div className="w-1/2 bg-[#0e7eb5] flex flex-col items-center justify-center p-12 text-white">
        {/* Logo */}
        <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center mb-6">
          <Home className="text-white" size={40} strokeWidth={1.5} />
        </div>
        
        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">نظام الإدارة المتكامل</h1>
        <p className="text-white/80 text-sm text-center mb-12">
          الحل الشامل لإدارة أعمالك التجارية بكفاءة واحترافية
        </p>

        {/* Feature Pills */}
        <div className="space-y-4 w-full max-w-sm">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/20 backdrop-blur-sm rounded-full py-3 px-6 flex items-center justify-between"
            >
              <span className="text-white font-medium">{feature.text}</span>
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <Check className="text-[#0e7eb5]" size={16} strokeWidth={3} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SignIn
