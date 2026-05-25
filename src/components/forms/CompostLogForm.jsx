import { useState } from 'react'

export default function CompostLogForm({ farm, onSubmit, submitting }) {
  const [data, setData] = useState({ pile_number:'1', phase:'mesophilic', day_number:'', ph:'', temp:'', moisture:'', turned:'لا', visual_notes:'', action_taken:'' })
  function set(field, value) { setData(d => ({ ...d, [field]:value })) }
  const ph = parseFloat(data.ph), moisture = parseFloat(data.moisture), temp = parseFloat(data.temp)
  const phStatus = !isNaN(ph) ? ph > 8.5 ? 'badge-red' : ph > 8.0 ? 'badge-yellow' : ph < 6.0 ? 'badge-yellow' : 'badge-green' : null
  const moStatus = !isNaN(moisture) ? moisture > 80 ? 'badge-red' : moisture > 70 ? 'badge-yellow' : moisture < 50 ? 'badge-yellow' : 'badge-green' : null
  const tpStatus = !isNaN(temp) ? temp > 70 ? 'badge-red' : temp < 20 ? 'badge-yellow' : 'badge-green' : null

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(data) }} style={{ display:'flex', flexDirection:'column', gap:14 }}>
      <div className="card">
        <div className="card-header"><span className="card-title">📊 حدود القراءات</span></div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11 }}>
            <thead><tr style={{ background:'var(--surface2)' }}>{['المرحلة','pH','Temp °C','Moisture %'].map(h => <th key={h} style={{ padding:'8px 12px', textAlign:'center', fontFamily:'var(--mono)', fontSize:9, color:'var(--muted)', borderBottom:'1px solid var(--border2)' }}>{h}</th>)}</tr></thead>
            <tbody>{[['Mesophilic (1–25)','6.5–7.0','25–40°C','60–70%'],['Thermophilic (26–60)','7.0–8.5','55–70°C','50–60%'],['Curing (61–90)','6.5–7.5','20–30°C','40–50%']].map(([p,ph,t,m],i) => <tr key={i} style={{ background:i%2?'var(--surface2)':'var(--surface)' }}>{[p,ph,t,m].map((v,j) => <td key={j} style={{ padding:'7px 12px', textAlign:'center', color:'var(--text2)', borderBottom:'1px solid var(--border)', fontSize:11 }}>{v}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">🌱 قراءات الكومة</span></div>
        <div className="card-body">
          <div className="grid-2">
            <div className="form-group"><label className="form-label">رقم الكومة</label><select value={data.pile_number} onChange={e => set('pile_number',e.target.value)}><option value="1">كومة 1</option><option value="2">كومة 2</option><option value="3">كومة 3</option></select></div>
            <div className="form-group"><label className="form-label">المرحلة</label><select value={data.phase} onChange={e => set('phase',e.target.value)}><option value="mesophilic">Phase 1 — Mesophilic</option><option value="thermophilic">Phase 2 — Thermophilic</option><option value="curing">Phase 3 — Curing</option></select></div>
            <div className="form-group"><label className="form-label">اليوم رقم</label><input type="number" value={data.day_number} onChange={e => set('day_number',e.target.value)} placeholder="9" min="1" max="90" /></div>
            <div className="form-group"><label className="form-label">pH {phStatus && <span className={`badge ${phStatus}`}>{ph}</span>}</label><input type="number" value={data.ph} onChange={e => set('ph',e.target.value)} placeholder="7.0" step="0.1" min="0" max="14" required /></div>
            <div className="form-group"><label className="form-label">الحرارة °C {tpStatus && <span className={`badge ${tpStatus}`}>{temp}°</span>}</label><input type="number" value={data.temp} onChange={e => set('temp',e.target.value)} placeholder="40" step="0.5" required /></div>
            <div className="form-group"><label className="form-label">الرطوبة % {moStatus && <span className={`badge ${moStatus}`}>{moisture}%</span>}</label><input type="number" value={data.moisture} onChange={e => set('moisture',e.target.value)} placeholder="65" min="0" max="100" required /></div>
            <div className="form-group"><label className="form-label">تم التقليب؟</label><select value={data.turned} onChange={e => set('turned',e.target.value)}><option value="لا">لا</option><option value="نعم">نعم ✓</option></select></div>
          </div>
          <div className="form-group"><label className="form-label">ملاحظة بصرية</label><textarea value={data.visual_notes} onChange={e => set('visual_notes',e.target.value)} placeholder="لون، رائحة، قوام..." rows={2} /></div>
          <div className="form-group"><label className="form-label">إجراء اتُخذ</label><textarea value={data.action_taken} onChange={e => set('action_taken',e.target.value)} rows={2} /></div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={submitting}>
        {submitting ? <><span className="spinner" /> جاري الحفظ...</> : '✓ تسليم سجل الكمبوست'}
      </button>
    </form>
  )
}
