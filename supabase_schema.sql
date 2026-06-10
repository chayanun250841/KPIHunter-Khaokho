-- ═══════════════════════════════════════════════════════════════
-- KPI HUNTER — Supabase Schema
-- รันไฟล์นี้ใน Supabase → SQL Editor → New Query → Run
-- ═══════════════════════════════════════════════════════════════

-- ตาราง: ผลงาน KPI รายตัวชี้วัด
create table if not exists kpi_results (
  kpi_id     text        primary key,   -- K1, K2, K3 ...
  result     numeric,                   -- ค่าผลงาน (%)
  passfail   text,                      -- 'ผ่าน' | 'ไม่ผ่าน' | ''
  updated_at timestamptz default now()
);

-- ตาราง: ประวัติการอัปโหลดไฟล์
create table if not exists upload_sessions (
  id          uuid        primary key default gen_random_uuid(),
  file_name   text,
  upload_date text,
  rows_count  integer,
  created_at  timestamptz default now()
);

-- เปิด RLS (Row Level Security)
alter table kpi_results     enable row level security;
alter table upload_sessions enable row level security;

-- Policy: อนุญาตให้ anon (public) อ่านและเขียนได้
-- (ถ้าต้องการล็อกอินก่อน ให้แก้ using(auth.role() = 'authenticated'))
create policy "public_all" on kpi_results
  for all using (true) with check (true);

create policy "public_all" on upload_sessions
  for all using (true) with check (true);

-- ═══════════════════════════════════════════════════════════════
-- ตรวจสอบ: select * from kpi_results limit 5;
-- ═══════════════════════════════════════════════════════════════
