import { useState } from 'react'

const DEFAULT_ROWS = [
  { unit:'بياض 1', species:'دجاج بياض', count:'', feed_kg:'', forage:'', leftover:'', feed_price:'20.85', notes:'' },
  { unit:'بياض 2', species:'دجاج بياض', count:'', feed_kg:'', forage:'', leftover:'', feed_price:'20.85', notes:'' },
  { unit:'بياض 3', species:'دجاج بياض', count:'', feed_kg:'', forage:'', leftover:'', feed_price:'20.85', notes:'' },
  { unit:'عجول', species:'عجول', count:'', feed_kg:'', forage:'', leftover:'', feed_price:'16.70', notes:'' },
  { unit:'أغنام', species:'أغنام', count:'', feed_kg:'', forage:'', leftover:'', feed_price:'18.00', notes:'' },
]

export default function FeedTrackerForm({ farm, onSubmit, submitting }) {
  const [rows, setRows] = useState(DEFAULT_ROWS)
  const [generalNotes, setGeneralNotes] = useState('')

  function updateRow(i, field, value) { setRows(prev => prev.map((r,idx) => idx===i ? {...r,[field]:value} : r)) }
  function addRow() { setRows(prev => [...prev, { unit:'', species:'', count:'', feed_kg:'', forage:'', leftover:'', feed_price:'20.85', notes:'' }]) }
  function removeRow(i) { setRows(prev => prev.filter((_,idx) => idx!==i)) }
  function calcCost(row) { return ((parseFloat(row.feed_kg)||0)*(parseFloat(row.feed_price)||0)).toFixed(2) }
  function calcRate(row) { const kg=parseFloat(row.feed_kg)||0; const c=parseInt(row.count)||0; return c ? ((kg*1000)/c).toFixed(1)+' جم/رأس' : '—' }
  const totalCost = rows.reduce((s,r) => s+(parseFloat(calcCost(r))||0), 0)

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit({ rows, general_notes:generalNotes, total_cost:totalCost }) }} style={{ display:'flex', flexDirection:'column', gap:14 }}>
      {rows.map((row,i) => (
        <div key={i} className="card">
          <div className="card-header">
            <span className="card-title">{row.unit || `صف ${i+1}`}</span>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              {row.feed_kg && row.count && <span className="badge badge-green">{calcRate(row)}</span>}
              {row.feed_kg && <span className="badge badge-yellow">تكلفة: {calcCost(row)} جنيه</span>}
              <button type="button" onClick={() => removeRow(i)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--muted)', fontSize:16 }}>✕</button>
            </div>
          </div>
          <div className="card-body">
            <div className="grid-2">
              <div className="form-group"><label className="form-label">الوحدة</label><input type="text" value={row.unit} onChange={e => updateRow(i,'unit',e.target.value)} /></div>
              <div className="form-group"><label className="form-label">النوع</label><select value={row.species} onChange={e => updateRow(i,'species',e.target.value)}><option>دجاج بياض</option><option>كتاكيت</option><option>عجول</option><option>أغنام</option><option>أخرى</option></select></div>
              <div className="form-group"><label className="form-label">العدد</label><input type="number" value={row.count} onChange={e => updateRow(i,'count',e.target.value)} placeholder="89" min="0" /></div>
              <div className="form-group"><label className="form-label">علف (كجم)</label><input type="number" value={row.feed_kg} onChange={e => updateRow(i,'feed_kg',e.target.value)} placeholder="7" step="0.5" /></div>
              <div className="form-group"><label className="form-label">برسيم / دريس</label><input type="text" value={row.forage} onChange={e => updateRow(i,'forage',e.target.value)} /></div>
              <div className="form-group"><label className="form-label">متبقي (كجم)</label><input type="number" value={row.leftover} onChange={e => updateRow(i,'leftover',e.target.value)} placeholder="0" step="0.5" /></div>
              <div className="form-group"><label className="form-label">سعر/كجم</label><input type="number" value={row.feed_price} onChange={e => updateRow(i,'feed_price',e.target.value)} step="0.01" /></div>
            </div>
            {parseFloat(row.leftover) > 0 && <div className="alert alert-warning"><span>⚠️</span><span style={{ fontSize:12 }}>علف متبقي {row.leftover} كجم — قلل الكمية. لا تخمّر أبداً.</span></div>}
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-secondary" onClick={addRow}>+ إضافة صف</button>
      <div className="card">
        <div className="card-body">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontFamily:'var(--mono)', fontSize:11, color:'var(--muted)', textTransform:'uppercase' }}>إجمالي تكلفة العلف</span>
            <span style={{ fontFamily:'var(--mono)', fontSize:20, fontWeight:700, color:'var(--yellow)' }}>{totalCost.toFixed(2)} جنيه</span>
          </div>
          <div className="form-group" style={{ marginTop:8 }}><label className="form-label">ملاحظات عامة</label><textarea value={generalNotes} onChange={e => setGeneralNotes(e.target.value)} rows={2} /></div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={submitting}>
        {submitting ? <><span className="spinner" /> جاري الحفظ...</> : '✓ تسليم دفتر التغذية'}
      </button>
    </form>
  )
}
