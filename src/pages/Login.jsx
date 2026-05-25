import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) toast.error('بيانات الدخول غير صحيحة')
    else navigate('/dashboard')
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:20, background:'radial-gradient(ellipse at top, #1e2a14 0%, #0f1008 60%)' }}>
      <div style={{ width:'100%', maxWidth:380 }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <div style={{ fontFamily:'var(--mono)', fontSize:28, fontWeight:700, color:'var(--green)', lineHeight:1.2, letterSpacing:'0.05em' }}>
            HELMY<br /><span style={{ color:'var(--orange)' }}>FARMS</span>
          </div>
          <div style={{ fontFamily:'var(--mono)', fontSize:10, color:'var(--muted)', letterSpacing:'0.15em', textTransform:'uppercase', marginTop:8 }}>Farm Intelligence Platform</div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">🔐 تسجيل الدخول</span></div>
          <div className="card-body">
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <div className="form-group">
                <label className="form-label">البريد الإلكتروني</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@helmyfarms.com" required />
              </div>
              <div className="form-group">
                <label className="form-label">كلمة المرور</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
              </div>
              <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading} style={{ marginTop:6 }}>
                {loading ? <><span className="spinner" /> جاري الدخول...</> : 'دخول →'}
              </button>
            </form>
          </div>
        </div>
        <div style={{ textAlign:'center', marginTop:20, fontFamily:'var(--mono)', fontSize:9, color:'var(--muted)', letterSpacing:'0.08em' }}>
          Orabi · Sekem · Bilbeis, Sharqia, Egypt
        </div>
      </div>
    </div>
  )
}
