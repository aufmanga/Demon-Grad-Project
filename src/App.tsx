import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { ProtectedRoute } from './ProtectedRoute'
import LandingPage from './LandingPage'
import Dashboard from './Dashboard'
import SignIn from './SignIn'
import Categories from './Categories'
import Customers from './Customers'
import PointOfSale from './PointOfSale'
import SalesReturns from './SalesReturns'
import Purchases from './Purchases'
import Expenses from './Expenses'
import ReceiptVouchers from './ReceiptVouchers'
import PaymentVouchers from './PaymentVouchers'
import Reports from './Reports'
import UsersAndPermissions from './UsersAndPermissions'

function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <LandingPage />
        } 
      />
      <Route 
        path="/signin" 
        element={
          isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <SignIn />
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/categories" 
        element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/customers" 
        element={
          <ProtectedRoute>
            <Customers />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/pos" 
        element={
          <ProtectedRoute>
            <PointOfSale />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/pos/returns" 
        element={
          <ProtectedRoute>
            <SalesReturns />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/purchases" 
        element={
          <ProtectedRoute>
            <Purchases />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/purchases/returns" 
        element={
          <ProtectedRoute>
            <Purchases />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/expenses" 
        element={
          <ProtectedRoute>
            <Expenses />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/receipts" 
        element={
          <ProtectedRoute>
            <ReceiptVouchers />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/payments" 
        element={
          <ProtectedRoute>
            <PaymentVouchers />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/reports/purchases" 
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/reports/top-customers" 
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/reports/top-products" 
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/reports/profits" 
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/reports/customers" 
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/users" 
        element={
          <ProtectedRoute>
            <UsersAndPermissions />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
