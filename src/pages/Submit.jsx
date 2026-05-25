import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { supabase, FARMS, REPORT_TYPES } from '../lib/supabase'
import { generateAlerts } from '../lib/alerts'
import toast from 'react-hot-toast'
import DailyReportForm from '../components/forms/DailyReportForm'
import FeedTrackerForm from '../components/forms/FeedTrackerForm'
import CompostLogForm from '../components/forms/CompostLogForm'
import AzollaLogForm from '../components/forms/AzollaLogForm'
import AlertsPanel from '../components/AlertsPanel'

export default function Submit() {
  const { farm, reportType } = useParams()
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [checking, setChecking] = useState(false)
  const [duplicate, setDuplicate] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [alerts, setAlerts] = useState([])

  const farmInfo = FARMS[farm]
  const reportInfo = REPORT_TYPES[reportType]

  useEffect(() => { if (date) checkDuplicate() }, [date, farm, reportType])

  async function checkDuplicate() {
    setChecking(true)
    const { data } = await supabase.from('submissions').select('id, approved_refill').eq('farm', farm).eq('report_type', reportType).eq('date', date).single()
    setDuplicate(data ? !data.approved_refill : false)
    setChecking(false)
  }

  async function handleSubmit(data) {
    setSubmitting(true)
    try {
      const { error } = await supabase.from('submissions').insert([{ farm, report_type: reportType, date, submitted_by: profile?.id, submitted_by_name: profile?.display_name, data, created_at: new Date().toISOString() }])
      if (error) throw error
      const generatedAlerts = generateAlerts(reportType, data, farmInfo?.nameAr)
      setAlerts(generatedAlerts)
      setSubmitted(true)
      toast.success('تم تقديم التقرير بنجاح ✓')
    } catch (err) {
      toast.error('خطأ في الحفظ: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      <header style={{ background:'var(--surface)', borderBottom:'2px solid var(--border2)', padding:'0 20px', display:'flex', alignItems:'center', height:56, gap:14, position:'sticky', top:0, zIndex:100 }}>
        <button className="btn btn-secondary" onClick={() => navigate('/dashboard')} style={{ padding:'6px 12px', fontSize:10 }}>→ رجوع</button>
        <div style={{ fontFamily:'var(--mono)', fontWeight:700, fontSize:12, color:'var(--green)' }}>HELMY FARMS</div>
        <div style={{ marginRight:'auto', display:'flex', gap:8 }}>
          <span className="badge badge-green">{farmInfo?.nameAr}</span>
          <span className="badge badge-blue">{reportInfo?.labelEn}</span>
        </div>
      </header>
      <main style={{ flex:1, padding:20, maxWidth:700, margin:'0 auto', width:'100%', display:'flex', flexDirection:'column', gap:16 }}>
        {submitted ? (
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div className="alert alert-success"><span style={{ fontSize:20 }}>✅</span><div><strong>تم تسليم التقرير بنجاح</strong><br /><span style={{ fontSize:12 }}>{reportInfo?.label} · {farmInfo?.nameAr} · {date}</span></div></div>
            {alerts.length > 0 && <AlertsPanel alerts={alerts} />}
            <div style={{ display:'flex', gap:10 }}>
              <button className="btn btn-primary" onClick={() => navigate('/dashboard')} style={{ flex:1 }}>→ العودة للرئيسية</button>
              <button className="btn btn-secondary" onClick={() => { setSubmitted(false); setAlerts([]) }} style={{ flex:1 }}>تقرير جديد</button>
            </div>
          </div>
        ) : (
          <>
            <div className="card">
              <div className="card-header">
                <span className="card-title">{reportInfo?.label}</span>
                <span style={{ fontFamily:'var(--mono)', fontSize:10, color:'var(--muted)' }}>{farmInfo?.nameAr}</span>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label className="form-label">📅 تاريخ التقرير</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} max={new Date().toISOString().split('T')[0]} style={{ direction:'ltr', textAlign:'center', maxWidth:200 }} />
                </div>
                {checking && <div style={{ fontSize:12, color:'var(--muted)' }}>⏳ جاري التحقق...</div>}
                {duplicate && !checking && (
                  <div className="alert alert-danger"><span style={{ fontSize:20 }}>🚫</span><div><strong>تقرير هذا اليوم موجود بالفعل</strong><br /><span style={{ fontSize:12 }}>تواصل مع مازن للحصول على إذن إعادة التقديم.</span></div></div>
                )}
              </div>
            </div>
            {!duplicate && !checking && (
              <>
                {reportType === 'daily_report' && <DailyReportForm farm={farm} onSubmit={handleSubmit} submitting={submitting} />}
                {reportType === 'feed_tracker' && <FeedTrackerForm farm={farm} onSubmit={handleSubmit} submitting={submitting} />}
                {reportType === 'compost_log' && <CompostLogForm farm={farm} onSubmit={handleSubmit} submitting={submitting} />}
                {reportType === 'azolla_log' && <AzollaLogForm farm={farm} onSubmit={handleSubmit} submitting={submitting} />}
              </>
            )}
          </>
        )}
      </main>
    </div>
  )
}
