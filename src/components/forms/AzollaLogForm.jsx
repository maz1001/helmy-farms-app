import { useState } from 'react'

export default function AzollaLogForm({ farm, onSubmit, submitting }) {
  const [data, setData] = useState({ pond_number:'1', ph:'', temp:'', moisture:'', coverage:'', color:'bright_green', odor:'none', turned:'لا', harvest_kg:'', visual_notes:'', action_taken:'' })
  function set(field, value) { setData(d => ({ ...d, [field]:value })) }
  const ph = parseFloat(data.ph), temp = parseFloat(data.temp)
  const phStatus = !isNaN(ph) ? ph > 8.0 ? 'badge-red' : ph < 6.0 ? 'badge-yellow' : 'badge-green' : null
  const tpStatus = !isNaN(temp) ? temp > 35 ? 'badge-red' : temp > 30 ? 'badge-yellow' : 'badge-green' : null

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(data) }} style={{ display:'flex', flexDirection:'column', gap:14 }}>
      <div className="card">
        <div className="card-header"><span className="card-title">📊 المدى المثالي للأزولا</span></div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:11 }}>
            <thead><tr style={{ background:'var(--surface2)' }}>{['المؤشر','✅ مثالي','⚠️ تحذير','🔴 خطر'].map(h => <th key={h} style={{ padding:'8px 10px', textAlign:'center', fontFamily:'var(--mono)', fontSize:9, color:'var(--muted)', borderBottom:'1px solid var(--border2)' }}>{h}</th>)}</tr></thead>
            <tbody>{[['pH','6.5–7.5','<6.0 أو >8.0','<5.5 أو >8.5'],['Temp °C','20–28','>30','>35'],['Moisture','>80%','65–70%','<60%'],['تغطية %','50–75%','>80% أو <30%','<10%']].map(([p,g,w,c],i) => <tr key={i} style={{ background:i%2?'var(--surface2)':'var(--surface)' }}>{[p,g,w,c].map((v,j) => <td key={j} style={{ padding:'7px 10px', textAlign:'center', color:j===1?'var(--green)':j===2?'var(--yellow)':j===3?'var(--red)':'var(--text2)', borderBottom:'1px solid var(--border)', fontSize:11 }}>{v}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">🌿 قراءات الحوض</span></div>
        <div className="card-body">
          <div className="form-group"><label className="form-label">رقم الحوض</label><select value={data.pond_number} onChange={e => set('pond_number',e.target.value)}><option value="1">حوض 1 — عرابي (9×3 م)</option><option value="2">حوض 2</option></select></div>
          <div className="grid-2">
            <div className="form-group"><label className="form-label">pH {phStatus && <span className={`badge ${phStatus}`}>{data.ph}</span>}</label><input type="number" value={data.ph} onChange={e => set('ph',e.target.value)} placeholder="6.8" step="0.1" required /></div>
            <div className="form-group"><label className="form-label">الحرارة °C {tpStatus && <span className={`badge ${tpStatus}`}>{data.temp}°</span>}</label><input type="number" value={data.temp} onChange={e => set('temp',e.target.value)} placeholder="27" step="0.5" required /></div>
            <div className="form-group"><label className="form-label">الرطوبة %</label><input type="number" value={data.moisture} onChange={e => set('moisture',e.target.value)} placeholder="82" min="0" max="100" required /></div>
            <div className="form-group"><label className="form-label">التغطية %</label><input type="number" value={data.coverage} onChange={e => set('coverage',e.target.value)} placeholder="60" min="0" max="100" /></div>
            <div className="form-group"><label className="form-label">اللون</label><select value={data.color} onChange={e => set('color',e.target.value)}><option value="bright_green">🟢 أخضر فاتح — مثالي</option><option value="light_green">🌿 أخضر — جيد</option><option value="yellow_green">🟡 أصفر-أخضر — تحذير</option><option value="yellow">🟡 أصفر — مشكلة</option><option value="brown">🟤 بني — خطر</option></select></div>
            <div className="form-group"><label className="form-label">الرائحة</label><select value={data.odor} onChange={e => set('odor',e.target.value)}><option value="none">لا توجد — مثالي</option><option value="earthy">رائحة تراب — طبيعي</option><option value="slight">خفيفة — مقبول</option><option value="pungent">نفاذة — تحذير</option><option value="rotten">عفن — خطر</option></select></div>
            <div className="form-group"><label className="form-label">تم حصاد؟</label><select value={data.turned} onChange={e => set('turned',e.target.value)}><option value="لا">لا</option><option value="نعم">نعم</option></select></div>
            {data.turned === 'نعم' && <div className="form-group"><label className="form-label">كمية الحصاد (كجم)</label><input type="number" value={data.harvest_kg} onChange={e => set('harvest_kg',e.target.value)} placeholder="3.5" step="0.1" /></div>}
          </div>
          <div className="form-group"><label className="form-label">ملاحظة بصرية</label><textarea value={data.visual_notes} onChange={e => set('visual_notes',e.target.value)} rows={2} /></div>
          <div className="form-group"><label className="form-label">إجراء اتُخذ</label><textarea value={data.action_taken} onChange={e => set('action_taken',e.target.value)} rows={2} /></div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={submitting}>
        {submitting ? <><span className="spinner" /> جاري الحفظ...</> : '✓ تسليم سجل الأزولا'}
      </button>
    </form>
  )
}
