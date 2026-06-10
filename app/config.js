/*
 * KPI HUNTER — Supabase Configuration
 * ─────────────────────────────────────────────────────────────
 * วิธีตั้งค่า:
 * 1. ไปที่ https://supabase.com → สร้าง Project ใหม่
 * 2. ไปที่ Project Settings → API
 * 3. คัดลอก "Project URL" ใส่ supabaseUrl
 * 4. คัดลอก "anon public" key ใส่ supabaseKey
 * 5. รัน SQL ใน supabase_schema.sql ใน Supabase SQL Editor
 * ─────────────────────────────────────────────────────────────
 */
window.KPIHUNTER_CONFIG = {
  supabaseUrl: 'YOUR_SUPABASE_URL',
  supabaseKey: 'YOUR_SUPABASE_ANON_KEY',
};
