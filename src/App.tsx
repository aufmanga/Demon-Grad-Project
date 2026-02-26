import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <BrowserRouter>
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
              <SignIn onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? 
              <Dashboard onLogout={handleLogout} /> : 
              <Navigate to="/signin" replace />
          } 
        />
        <Route 
          path="/categories" 
          element={
            isAuthenticated ? 
              <Categories onLogout={handleLogout} /> : 
              <Navigate to="/signin" replace />
          } 
        />
        <Route 
          path="/customers" 
          element={
            isAuthenticated ? 
              <Customers onLogout={handleLogout} /> : 
              <Navigate to="/signin" replace />
          } 
        />
        <Route 
          path="/pos" 
          element={
            isAuthenticated ? 
              <PointOfSale onLogout={handleLogout} /> : 
              <Navigate to="/signin" replace />
          } 
        />
        <Route 
          path="/pos/returns" 
          element={
            isAuthenticated ? 
              <SalesReturns onLogout={handleLogout} /> : 
              <Navigate to="/signin" replace />
          } 
        />
        <Route 
          path="/purchases" 
          element={
            isAuthenticated ? 
              <Purchases onLogout={handleLogout} /> : 
              <Navigate to="/signin" replace />
          } 
        />
        <Route 
          path="/purchases/returns" 
          element={
            isAuthenticated ? 
              <Purchases onLogout={handleLogout} /> : 
              <Navigate to="/signin" replace />
          } 
        />
        <Route 
          path="/expenses" 
          element={
            isAuthenticated ? 
              <Expenses onLogout={handleLogout} /> : 
              <Navigate to="/signin" replace />
          } 
        />
        <Route 
          path="/receipts" 
          element={
            isAuthenticated ? 
              <ReceiptVouchers onLogout={handleLogout} /> : 
              <Navigate to="/signin" replace />
          } 
        />
        <Route 
          path="/payments" 
          element={
            isAuthenticated ? 
              <PaymentVouchers onLogout={handleLogout} /> : 
              <Navigate to="/signin" replace />
          } 
        />
        <Route 
          path="/reports" 
          element={
            isAuthenticated ? 
              <Reports onLogout={handleLogout} /> : 
              <Navigate to="/signin" replace />
          } 
        />
        <Route 
          path="/reports/purchases" 
          element={
            isAuthenticated ? 
              <Reports onLogout={handleLogout} /> : 
              <Navigate to="/signin" replace />
          } 
        />
        <Route 
          path="/reports/top-customers" 
          element={
            isAuthenticated ? 
              <Reports onLogout={handleLogout} /> : 
              <Navigate to="/signin" replace />
          } 
        />
        <Route 
          path="/reports/top-products" 
          element={
            isAuthenticated ? 
              <Reports onLogout={handleLogout} /> : 
              <Navigate to="/signin" replace />
          } 
        />
        <Route 
          path="/reports/profits" 
          element={
            isAuthenticated ? 
              <Reports onLogout={handleLogout} /> : 
              <Navigate to="/signin" replace />
          } 
        />
        <Route 
          path="/reports/customers" 
          element={
            isAuthenticated ? 
              <Reports onLogout={handleLogout} /> : 
              <Navigate to="/signin" replace />
          } 
        />
        <Route 
          path="/users" 
          element={
            isAuthenticated ? 
              <UsersAndPermissions onLogout={handleLogout} /> : 
              <Navigate to="/signin" replace />
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
