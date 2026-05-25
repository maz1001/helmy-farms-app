export function generateAlerts(reportType, data, farm) {
  const alerts = []
  if (reportType === 'daily_report') {
    const d = data.poultry || {}
    if (d.mortality > 0) alerts.push({ type: 'danger', icon: '💀', title: 'نفوق في الدواجن', message: `${d.mortality} طير نفق اليوم. تحقق من السبب فوراً.` })
    if (d.isolated > 0) alerts.push({ type: 'warning', icon: '🔒', title: 'عزل طيور', message: `${d.isolated} طير معزول. تابع يومياً.` })
    if (data.water_issue) alerts.push({ type: 'danger', icon: '💧', title: 'مشكلة مياه', message: data.water_issue })
    if (data.general_issues) alerts.push({ type: 'warning', icon: '⚠️', title: 'متابعة مطلوبة', message: data.general_issues })
    const eggs = parseInt(d.egg_production) || 0
    if (eggs > 0 && eggs < 25) alerts.push({ type: 'warning', icon: '🥚', title: 'إنتاج بيض منخفض', message: `${eggs} بيضة فقط — أقل من المتوسط.` })
  }
  if (reportType === 'feed_tracker') {
    const rows = data.rows || []
    rows.forEach(row => {
      if (row.leftover && parseFloat(row.leftover) > 0) alerts.push({ type: 'warning', icon: '🌾', title: 'علف متبقي', message: `${row.unit}: ${row.leftover} كجم متبقي. قلل الكمية. لا تخمّر أبداً.` })
    })
  }
  if (reportType === 'compost_log') {
    const ph = parseFloat(data.ph), moisture = parseFloat(data.moisture), temp = parseFloat(data.temp)
    if (ph > 8.5) alerts.push({ type: 'danger', icon: '⚗️', title: 'pH مرتفع جداً', message: `pH = ${ph}. أضف مواد كربونية جافة وقلّب فوراً.` })
    else if (ph > 8.0) alerts.push({ type: 'warning', icon: '⚗️', title: 'pH مرتفع', message: `pH = ${ph}. أضف قش أو بقايا جافة.` })
    if (moisture > 80) alerts.push({ type: 'danger', icon: '💧', title: 'رطوبة عالية جداً', message: `${moisture}%. قلّب فوراً وأضف مواد جافة. وقّف الرش.` })
    else if (moisture > 70) alerts.push({ type: 'warning', icon: '💧', title: 'رطوبة مرتفعة', message: `${moisture}%. راقب وقلّب بشكل متكرر.` })
    if (temp < 25) alerts.push({ type: 'warning', icon: '🌡️', title: 'حرارة منخفضة', message: `${temp}°C. قلّب لتنشيط الميكروبات.` })
  }
  if (reportType === 'azolla_log') {
    const ph = parseFloat(data.ph), temp = parseFloat(data.temp), coverage = parseFloat(data.coverage)
    if (ph > 8.0) alerts.push({ type: 'danger', icon: '⚗️', title: 'pH بركة مرتفع', message: `pH = ${ph}. يضر بنمو الأزولا.` })
    if (temp > 32) alerts.push({ type: 'danger', icon: '🌡️', title: 'حرارة مرتفعة', message: `${temp}°C. أضف تظليل.` })
    if (coverage > 80) alerts.push({ type: 'warning', icon: '🌿', title: 'حصاد مطلوب', message: `تغطية ${coverage}%. احصد الآن.` })
  }
  return alerts
}
