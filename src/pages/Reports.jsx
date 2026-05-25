import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, FARMS, REPORT_TYPES } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'

export default function Reports() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({ farm:'ALL', type:'ALL' })

  useEffect(() => { fetchSubmissions() }, [])

  async function fetchSubmissions() {
    const { data } = await supabase.from('submissions').select('*').order('date', { ascending:false }).limit(100)
    setSubmissions(data || [])
    setLoading(false)
  }

  async function approveRefill(id) {
    await supabase.from('submissions').update({ approved_refill:true }).eq('id', id)
    fetchSubmissions()
  }

  const filtered = submissions.filter(s =>
    (filter.farm === 'ALL' || s.farm === filter.farm) &&
    (filter.type === 'ALL' || s.report_type === filter.type)
  )

  const isAdmin = profile?.role === 'admin'

  return (
    <div style={{ minHeight:'100vh' }}>
      <header style={{ background:'var(--surface)', borderBottom:'2px solid var(--border2)', padding:'0 20px', display:'flex', alignItems:'center', height:56, gap:14 }}>
        <button className="btn btn-secondary" onClick={() => navigate('/dashboard')} style={{ padding:'6px 12px', fontSize:10 }}>→ رجوع</button>
        <span style={{ fontFamily:'var(--mono)', fontWeight:700, fontSize:12, color:'var(--green)' }}>HELMY FARMS</span>
        <span style={{ fontFamily:'var(--mono)', fontSize:10, color:'var(--muted)', letterSpacing:'0.07em', textTransform:'uppercase' }}>التقارير المقدمة</span>
      </header>
      <main style={{ padding:20, maxWidth:800, margin:'0 auto', display:'flex', flexDirection:'column', gap:16 }}>
        <div className="card">
          <div className="card-body" style={{ flexDirection:'row', flexWrap:'wrap', gap:10 }}>
            <select style={{ background:'var(--surface2)', border:'1px solid var(--border2)', borderRadius:2, color:'var(--text2)', fontFamily:'var(--mono)', fontSize:10, padding:'8px 10px' }} value={filter.farm} onChange={e => setFilter(f => ({ ...f, farm:e.target.value }))}>
              <option value="ALL">كل المزارع</option>
              {Object.values(FARMS).map(f => <option key={f.id} value={f.id}>{f.nameAr}</option>)}
            </select>
            <select style={{ background:'var(--surface2)', border:'1px solid var(--border2)', borderRadius:2, color:'var(--text2)', fontFamily:'var(--mono)', fontSize:10, padding:'8px 10px' }} value={filter.type} onChange={e => setFilter(f => ({ ...f, type:e.target.value }))}>
              <option value="ALL">كل الأنواع</option>
              {Object.values(REPORT_TYPES).map(r => <option key={r.id} value={r.id}>{r.labelEn}</option>)}
            </select>
            <span style={{ fontFamily:'var(--mono)', fontSize:10, color:'var(--muted)', marginRight:'auto', alignSelf:'center' }}>{filtered.length} تقرير</span>
          </div>
        </div>
        {loading ? <div className="empty">⏳ جاري التحميل...</div>
        : filtered.length === 0 ? <div className="empty">لا توجد تقارير بعد</div>
        : filtered.map(s => (
          <div key={s.id} className="card">
            <div className="card-header">
              <div style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
                <span style={{ fontFamily:'var(--mono)', fontSize:12, color:'var(--green)' }}>{s.date}</span>
                <span className="badge badge-green">{FARMS[s.farm]?.nameAr || s.farm}</span>
                <span className="badge badge-blue">{REPORT_TYPES[s.report_type]?.labelEn || s.report_type}</span>
                <span style={{ fontSize:11, color:'var(--muted)' }}>بواسطة {s.submitted_by_name}</span>
              </div>
              {isAdmin && <button className="btn btn-secondary" onClick={() => approveRefill(s.id)} style={{ padding:'4px 10px', fontSize:9 }}>اعتماد إعادة تقديم</button>}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
