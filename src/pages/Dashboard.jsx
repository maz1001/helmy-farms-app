import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FARMS, REPORT_TYPES } from '../lib/supabase'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [selectedFarm, setSelectedFarm] = useState(profile?.farm || null)
  const allowedFarms = profile?.allowed_farms || [profile?.farm] || Object.keys(FARMS)

  function handleSelectReport(reportType) {
    if (!selectedFarm) { toast.error('اختر المزرعة أولاً'); return }
    navigate(`/submit/${selectedFarm}/${reportType}`)
  }

  const today = new Date().toLocaleDateString('ar-EG', { weekday:'long', year:'numeric', month:'long', day:'numeric' })

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      <header style={{ background:'var(--surface)', borderBottom:'2px solid var(--border2)', padding:'0 20px', display:'flex', alignItems:'center', height:56, gap:14, position:'sticky', top:0, zIndex:100 }}>
        <div style={{ fontFamily:'var(--mono)', fontWeight:700, fontSize:13, color:'var(--green)', lineHeight:1.2 }}>HELMY<br /><span style={{ color:'var(--orange)' }}>FARMS</span></div>
        <div style={{ width:1, height:28, background:'var(--border2)' }} />
        <div style={{ fontFamily:'var(--mono)', fontSize:10, color:'var(--muted)', letterSpacing:'0.07em', textTransform:'uppercase' }}>Farm Intelligence</div>
        <div style={{ marginRight:'auto', display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:12, color:'var(--text2)' }}>مرحباً، <strong style={{ color:'var(--green)' }}>{profile?.display_name || profile?.email}</strong></span>
          <button className="btn btn-secondary" onClick={signOut} style={{ padding:'6px 12px', fontSize:10 }}>خروج</button>
        </div>
      </header>
      <main style={{ flex:1, padding:20, maxWidth:700, margin:'0 auto', width:'100%', display:'flex', flexDirection:'column', gap:20 }}>
        <div style={{ textAlign:'center', color:'var(--muted)', fontFamily:'var(--mono)', fontSize:11, paddingTop:8 }}>{today}</div>
        <div className="card">
          <div className="card-header"><span className="card-title">① اختر المزرعة</span></div>
          <div className="card-body">
            <div className="grid-2">
              {(allowedFarms || []).map(farmId => {
                const farm = FARMS[farmId]
                if (!farm) return null
                const selected = selectedFarm === farmId
                return (
                  <button key={farmId} onClick={() => setSelectedFarm(farmId)} style={{ padding:20, borderRadius:4, cursor:'pointer', border:`2px solid ${selected ? 'var(--green)' : 'var(--border2)'}`, background:selected ? 'rgba(122,182,72,0.1)' : 'var(--surface2)', display:'flex', flexDirection:'column', alignItems:'center', gap:8, transition:'all 0.2s' }}>
                    <span style={{ fontSize:28 }}>{farmId === 'orabi' ? '🌿' : '🐔'}</span>
                    <span style={{ fontFamily:'var(--mono)', fontWeight:700, color:selected ? 'var(--green)' : 'var(--text2)', fontSize:13 }}>{farm.nameEn.toUpperCase()}</span>
                    <span style={{ fontSize:16, color:selected ? 'var(--text)' : 'var(--muted)' }}>{farm.nameAr}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
        <div className="card" style={{ opacity:selectedFarm ? 1 : 0.4 }}>
          <div className="card-header">
            <span className="card-title">② اختر نوع التقرير</span>
            {selectedFarm && <span className="badge badge-green">{FARMS[selectedFarm]?.nameAr}</span>}
          </div>
          <div className="card-body">
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {Object.values(REPORT_TYPES).map(rt => (
                <button key={rt.id} onClick={() => handleSelectReport(rt.id)} disabled={!selectedFarm} style={{ padding:'16px 20px', borderRadius:4, cursor:selectedFarm ? 'pointer' : 'not-allowed', border:'1px solid var(--border2)', background:'var(--surface2)', display:'flex', alignItems:'center', justifyContent:'space-between', transition:'all 0.15s' }}
                  onMouseEnter={e => { if(selectedFarm) e.currentTarget.style.borderColor='var(--green)' }}
                  onMouseLeave={e => e.currentTarget.style.borderColor='var(--border2)'}>
                  <span style={{ fontSize:20 }}>←</span>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:2 }}>
                    <span style={{ fontSize:16, color:'var(--text)', fontWeight:600 }}>{rt.label}</span>
                    <span style={{ fontFamily:'var(--mono)', fontSize:9, color:'var(--muted)', letterSpacing:'0.08em', textTransform:'uppercase' }}>{rt.labelEn}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <button className="btn btn-secondary btn-full" onClick={() => navigate('/reports')}>📋 عرض التقارير المقدمة</button>
      </main>
    </div>
  )
}
