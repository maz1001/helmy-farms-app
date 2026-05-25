import { useState } from 'react'

export default function DailyReportForm({ farm, onSubmit, submitting }) {
  const [data, setData] = useState({
    responsible:'', workers:'',
    poultry:{ egg_production:'', mortality:'', isolated:'', activities:'', sales_transfers:'', notes:'' },
    livestock:{ activities:'', feed:'', health:'', notes:'' },
    crops:{ activities:'', harvest:'', irrigation:'', notes:'' },
    stores:{ receipts:'', issues:'', notes:'' },
    visits:'', general_issues:'', water_issue:'', photos:'لا',
  })

  function setField(section, field, value) {
    if (section) setData(d => ({ ...d, [section]:{ ...d[section], [field]:value } }))
    else setData(d => ({ ...d, [field]:value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!data.responsible) { alert('أدخل اسم المسؤول'); return }
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
      <div className="card">
        <div className="card-header"><span className="card-title">📋 معلومات التقرير</span></div>
        <div className="card-body">
          <div className="grid-2">
            <div className="form-group"><label className="form-label">المسؤول <span className="required">*</span></label><input type="text" value={data.responsible} onChange={e => setField(null,'responsible',e.target.value)} placeholder="د. عصام" required /></div>
            <div className="form-group"><label className="form-label">عدد العمال</label><input type="number" value={data.workers} onChange={e => setField(null,'workers',e.target.value)} placeholder="5" min="0" /></div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">🐔 الطيور</span></div>
        <div className="card-body">
          <div className="grid-2">
            <div className="form-group"><label className="form-label">إنتاج البيض</label><input type="number" value={data.poultry.egg_production} onChange={e => setField('poultry','egg_production',e.target.value)} placeholder="38" min="0" /></div>
            <div className="form-group"><label className="form-label">نافق</label><input type="number" value={data.poultry.mortality} onChange={e => setField('poultry','mortality',e.target.value)} placeholder="0" min="0" /></div>
            <div className="form-group"><label className="form-label">معزول</label><input type="number" value={data.poultry.isolated} onChange={e => setField('poultry','isolated',e.target.value)} placeholder="0" min="0" /></div>
          </div>
          <div className="form-group"><label className="form-label">تم عمل</label><textarea value={data.poultry.activities} onChange={e => setField('poultry','activities',e.target.value)} placeholder="تنظيف العنابر..." rows={2} /></div>
          <div className="form-group"><label className="form-label">بيع / خروج / نقل</label><input type="text" value={data.poultry.sales_transfers} onChange={e => setField('poultry','sales_transfers',e.target.value)} placeholder="لا يوجد" /></div>
          <div className="form-group"><label className="form-label">ملاحظات</label><textarea value={data.poultry.notes} onChange={e => setField('poultry','notes',e.target.value)} rows={2} /></div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">🐄 المواشي</span></div>
        <div className="card-body">
          <div className="form-group"><label className="form-label">تم عمل</label><textarea value={data.livestock.activities} onChange={e => setField('livestock','activities',e.target.value)} rows={2} /></div>
          <div className="form-group"><label className="form-label">أعلاف</label><textarea value={data.livestock.feed} onChange={e => setField('livestock','feed',e.target.value)} placeholder="84 كجم علف + بالة دريس..." rows={2} /></div>
          <div className="form-group"><label className="form-label">كشف / علاج / وزن</label><textarea value={data.livestock.health} onChange={e => setField('livestock','health',e.target.value)} placeholder="لا يوجد" rows={2} /></div>
          <div className="form-group"><label className="form-label">ملاحظات</label><input type="text" value={data.livestock.notes} onChange={e => setField('livestock','notes',e.target.value)} placeholder="لا يوجد" /></div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">🌾 الزراعة</span></div>
        <div className="card-body">
          <div className="form-group"><label className="form-label">تم عمل</label><input type="text" value={data.crops.activities} onChange={e => setField('crops','activities',e.target.value)} /></div>
          <div className="form-group"><label className="form-label">زراعة / حصاد / حش</label><input type="text" value={data.crops.harvest} onChange={e => setField('crops','harvest',e.target.value)} placeholder="حش باكيتين برسيم" /></div>
          <div className="form-group"><label className="form-label">ري / تسميد</label><input type="text" value={data.crops.irrigation} onChange={e => setField('crops','irrigation',e.target.value)} /></div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">📦 المخازن</span></div>
        <div className="card-body">
          <div className="form-group"><label className="form-label">استلامات</label><textarea value={data.stores.receipts} onChange={e => setField('stores','receipts',e.target.value)} placeholder="لا يوجد" rows={2} /></div>
          <div className="form-group"><label className="form-label">صرف من المخزن</label><textarea value={data.stores.issues} onChange={e => setField('stores','issues',e.target.value)} rows={2} /></div>
          <div className="form-group"><label className="form-label">ملاحظات نقص</label><input type="text" value={data.stores.notes} onChange={e => setField('stores','notes',e.target.value)} placeholder="لا يوجد" /></div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">⚠️ مشاكل ومتابعات</span></div>
        <div className="card-body">
          <div className="form-group"><label className="form-label">زيارات</label><input type="text" value={data.visits} onChange={e => setField(null,'visits',e.target.value)} placeholder="لا يوجد" /></div>
          <div className="form-group"><label className="form-label">مشاكل عامة</label><textarea value={data.general_issues} onChange={e => setField(null,'general_issues',e.target.value)} rows={3} /></div>
          <div className="form-group"><label className="form-label">مشكلة مياه</label><input type="text" value={data.water_issue} onChange={e => setField(null,'water_issue',e.target.value)} placeholder="لا يوجد" /></div>
          <div className="form-group"><label className="form-label">صور</label><select value={data.photos} onChange={e => setField(null,'photos',e.target.value)}><option value="لا">لا</option><option value="نعم">نعم</option></select></div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={submitting}>
        {submitting ? <><span className="spinner" /> جاري الحفظ...</> : '✓ تسليم التقرير'}
      </button>
    </form>
  )
}
