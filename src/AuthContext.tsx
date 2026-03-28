import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'cashier'
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users for testing (in production, this comes from API/database)
const DEMO_USERS = [
  { id: '1', email: 'admin@company.com', password: 'admin123', name: 'احمد محمد', role: 'admin' as const },
  { id: '2', email: 'manager@company.com', password: 'manager123', name: 'خالد عمر', role: 'manager' as const },
  { id: '3', email: 'cashier@company.com', password: 'cashier123', name: 'فاطمة علي', role: 'cashier' as const },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user')
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
      } catch (e) {
        localStorage.removeItem('auth_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const foundUser = DEMO_USERS.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      const userData: User = userWithoutPassword
      
      setUser(userData)
      localStorage.setItem('auth_user', JSON.stringify(userData))
      return { success: true }
    }
    
    return { success: false, error: 'Invalid email or password' }
  }

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Check if user already exists
    const existingUser = DEMO_USERS.find(u => u.email === email)
    if (existingUser) {
      return { success: false, error: 'Email already exists' }
    }
    
    // In production, this would create a new user in the database
    // For now, just return success (new user would be created via API)
    
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      logout, 
      signup 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
