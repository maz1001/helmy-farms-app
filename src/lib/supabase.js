import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
export const ADMIN_EMAIL = 'mazen@helmyfarms.com'

export const FARMS = {
  orabi: { id: 'orabi', name: 'عرابي / Orabi', nameAr: 'عرابي', nameEn: 'Orabi' },
  sekem: { id: 'sekem', name: 'سيكم / Sekem', nameAr: 'سيكم', nameEn: 'Sekem' },
}

export const REPORT_TYPES = {
  daily_report: { id: 'daily_report', label: '📋 التقرير اليومي', labelEn: 'Daily Report' },
  feed_tracker: { id: 'feed_tracker', label: '🌾 دفتر التغذية', labelEn: 'Feed Tracker' },
  compost_log:  { id: 'compost_log',  label: '🌱 سجل الكمبوست', labelEn: 'Compost Log' },
  azolla_log:   { id: 'azolla_log',   label: '🌿 سجل الأزولا',  labelEn: 'Azolla Log' },
}
