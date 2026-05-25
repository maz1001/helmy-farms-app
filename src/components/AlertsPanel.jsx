export default function AlertsPanel({ alerts }) {
  if (!alerts?.length) return null
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
      <div style={{ fontFamily:'var(--mono)', fontSize:10, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--orange)', padding:'8px 0', borderBottom:'1px solid var(--border)' }}>
        ⚡ تنبيهات إدارية — {alerts.length} {alerts.length === 1 ? 'تنبيه' : 'تنبيهات'}
      </div>
      {alerts.map((alert, i) => (
        <div key={i} className={`alert alert-${alert.type}`}>
          <span style={{ fontSize:20, flexShrink:0 }}>{alert.icon}</span>
          <div>
            <strong style={{ display:'block', marginBottom:3 }}>{alert.title}</strong>
            <span style={{ fontSize:13 }}>{alert.message}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
