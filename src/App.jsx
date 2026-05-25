import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './hooks/useAuth'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Submit from './pages/Submit'
import Reports from './pages/Reports'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <div className="spinner" style={{ width:32, height:32, borderWidth:3, margin:'0 auto' }} />
      </div>
    </div>
  )
  return user ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/submit/:farm/:reportType" element={<ProtectedRoute><Submit /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" toastOptions={{ style: { background:'var(--surface)', color:'var(--text)', border:'1px solid var(--border2)', fontFamily:'var(--sans)', direction:'rtl' }, success:{ iconTheme:{ primary:'#7ab648', secondary:'#0f1008' } }, error:{ iconTheme:{ primary:'#e05252', secondary:'#0f1008' } } }} />
      <AppRoutes />
    </AuthProvider>
  )
}
