# ThaiMED Design System

ระบบออกแบบสำหรับแอปพลิเคชันบริการแพทย์แผนไทยในโรงพยาบาลส่งเสริมสุขภาพตำบล (รพ.สต.)

---

## ภาพรวมผลิตภัณฑ์

**ThaiMED** คือแอปพลิเคชันเว็บสำหรับจัดการบริการแพทย์แผนไทยใน รพ.สต. ครบวงจร ตั้งแต่การลงทะเบียนผู้รับบริการ จัดคิว ซักประวัติ คัดกรองความเสี่ยง บันทึกหัตถการ จ่ายยาสมุนไพร นัดติดตาม ไปจนถึงรายงานผลงานรายเดือน รองรับการใช้งานบนคอมพิวเตอร์และแท็บเล็ต

### กลุ่มผู้ใช้งานหลัก

| กลุ่ม | บทบาท |
|---|---|
| เจ้าหน้าที่ รพ.สต. / เวชระเบียน | ลงทะเบียน ค้นหา จัดคิว |
| แพทย์แผนไทย / แพทย์แผนไทยประยุกต์ | ซักประวัติ วินิจฉัย สั่งบริการ |
| ผู้ช่วยแพทย์แผนไทย | บันทึกหัตถการ นวด ประคบ อบ |
| ผู้อำนวยการ / ผู้บริหาร | ดูรายงาน ตัวชี้วัดผลงาน |
| อสม. / ทีมเยี่ยมบ้าน | บันทึกบริการชุมชน |

### แหล่งข้อมูลที่ใช้สร้าง Design System

- **ข้อกำหนดระบบ:** ThaiMED System Design Document (ไฟล์ข้อกำหนดฉบับเต็ม — ไม่ได้รับไฟล์ Figma หรือ Codebase จริง)
- **แนวทางอ้างอิง:** กรมการแพทย์แผนไทยและการแพทย์ทางเลือก, สป.สช., แนวทางแอปสาธารณสุขไทย
- **ฟอนต์:** Sarabun (Google Fonts — ควรแทนที่ด้วยไฟล์ woff2 ในระบบ intranet ที่ไม่มีอินเทอร์เน็ต)

---

## CONTENT FUNDAMENTALS

### ภาษาและการเขียน
- **ภาษา:** ไทยเป็นหลัก — ใช้คำราชการแบบสุภาพแต่ไม่ซับซ้อนเกินไป
- **สรรพนาม:** ใช้ "ผู้รับบริการ" (ไม่ใช่ "คนไข้" หรือ "ผู้ป่วย" ยกเว้นในบริบทคลินิก), "เจ้าหน้าที่" หรือ "ผู้ให้บริการ"
- **การใช้ "คุณ":** หลีกเลี่ยง — ใช้ชื่อตำแหน่งหรือบทบาทแทน
- **ตัวเลข:** ใช้เลขอารบิก (1, 2, 3) ไม่ใช่เลขไทย ยกเว้นในบริบทที่ต้องการความเป็นทางการสูง
- **Emoji:** ไม่ใช้ใน UI หลัก — ใช้ icon SVG หรือสัญลักษณ์ Unicode แทน
- **Casing:** ภาษาไทยไม่มี uppercase — ชื่อปุ่มและ label ใช้ประโยคปกติ ไม่ตัวพิมพ์ใหญ่ทั้งหมด
- **ความยาวข้อความ:** กระชับ — ปุ่มไม่เกิน 3-4 คำ, label form ไม่เกิน 6-8 คำ
- **Tone:** เป็นมืออาชีพ ให้ความมั่นใจ ไม่ใช้ศัพท์เทคนิคเกินจำเป็น

### ตัวอย่างข้อความที่ถูกต้อง
| แบบผิด | แบบถูก |
|---|---|
| "คลิกที่นี่เพื่อบันทึกข้อมูล" | "บันทึกข้อมูล" |
| "ระบบตรวจพบว่าคุณมีข้อห้าม" | "พบข้อห้าม — กรุณาตรวจสอบ" |
| "Save & Continue" | "บันทึกและดำเนินการต่อ" |
| "Error 404" | "ไม่พบข้อมูลที่ต้องการ" |

---

## VISUAL FOUNDATIONS

### สี (Colors)
- **Primary:** เขียวป่า Deep Herb Green `#2D6A4F` — สื่อถึงธรรมชาติ ความน่าเชื่อถือ การรักษา
- **Secondary Warm:** น้ำตาลดิน Earth Brown `#9E6E3C` — ความอบอุ่น สมุนไพรแห้ง
- **Background:** เขียวอ่อนมาก `#F4FAF6` — ไม่ขาวจั้ว ลดความเมื่อยตาสำหรับการใช้งานนาน
- **Sidebar:** เขียวเข้มมาก `#1A3528` — แยกพื้นที่ navigation ชัดเจน
- **Surface/Card:** ขาว `#FFFFFF` พร้อม shadow เบา

### ตัวอักษร (Typography)
- **ฟอนต์หลัก:** Sarabun — ออกแบบเฉพาะสำหรับภาษาไทย อ่านง่ายบนจอ
- **ขนาดขั้นต่ำ:** 14px สำหรับ label, 16px สำหรับ body text
- **Line height:** 1.75 สำหรับภาษาไทย (สูงกว่า Latin เพราะตัวอักษรมีส่วนบน-ล่าง)
- **น้ำหนักที่ใช้:** Regular (400), Medium (500), Semibold (600), Bold (700)

### Spacing
- ใช้ระบบ 4px base — spacing ทั้งหมดเป็นทวีคูณของ 4px
- Card padding: 24px (--space-6)
- Section gap: 32px (--space-8)
- Form field gap: 20px (--space-5)

### Cards
- Border radius: 12px (--radius-lg)
- Shadow: `0 1px 3px rgba(0,0,0,0.08)` — เบา ไม่หนัก
- Background: #FFFFFF
- Hover: shadow ขึ้น (--shadow-md)
- ไม่ใช้ border ซ้ายสีเดียว (no colored left-border)
- ไม่ใช้ gradient background บน card

### ปุ่มและ Interactive Elements
- **Button height:** sm=32px, md=40px, lg=48px, xl=56px
- **Border radius:** 8px (--radius-md) — ไม่ใช้ rounded-full สำหรับปุ่มหลัก
- **Hover:** opacity 0.88 — ไม่ทำ background เปลี่ยนสีทันที
- **Press/Active:** scale(0.97) — feedback ชัดเจน
- **Focus:** 3px ring สีเขียว rgba(45,106,79,0.35)
- **Disabled:** opacity 0.5, cursor not-allowed

### Animation & Motion
- **Duration:** เร็ว — 150ms สำหรับ hover/focus, 200ms สำหรับ enter/exit
- **Easing:** `ease` หรือ `ease-out` — ไม่ใช้ bounce ใน UI ทางการแพทย์
- **Transitions:** opacity, box-shadow, transform — ไม่ animate layout
- **No animations** สำหรับ warning/alert — ต้องเห็นทันที

### Borders & Separators
- Default border: `1px solid #E5E7EB` (--color-border-default)
- ไม่ใช้ border หนา — ใช้ background/shadow แบ่งพื้นที่แทน

### Transparency & Blur
- Blur: ใช้เฉพาะ modal overlay backdrop — `backdrop-filter: blur(4px)`
- Transparency: ใช้สำหรับ sidebar hover/active states

### Imagery
- ไม่ใช้ hero image ตกแต่ง
- ใช้ icon SVG functional เท่านั้น
- Icon weight: stroke 1.5-2px, style consistent (Heroicons / Lucide style)

### Status Colors
ดู `tokens/colors.css` — สี status ทุกตัวมี bg/border/text/dot แยกกันเพื่อ accessibility

---

## ICONOGRAPHY

### แนวทาง
- ใช้ **Heroicons** (stroke style, 24px) เป็นชุดหลัก — โหลดจาก CDN หรือ inline SVG
- ขนาดมาตรฐาน: 16px (small), 20px (default), 24px (large)
- Stroke width: 1.5px สำหรับ 24px icon, 1.5px สำหรับ 20px
- ไม่ใช้ filled style ผสมกับ outline style ในหน้าเดียวกัน
- ไม่ใช้ emoji เป็น icon ใน UI

### Service Type Icons (Inline SVG ใน Service Tag)
แต่ละบริการมีสีประจำตัวแต่ใช้ icon รูปแบบเดียวกัน (stroke, consistent weight)

### ไม่มี Icon Font ที่ฝังในระบบ
ใช้ inline SVG หรือ CDN เท่านั้น — ไม่มี font icon ที่ต้อง host เอง

---

## ไฟล์ในโปรเจกต์

```
styles.css                    ← Entry point (import นี้ไฟล์เดียว)
tokens/
  colors.css                  ← Color custom properties
  typography.css              ← Font + type scale
  spacing.css                 ← Space scale + layout dims
  shadows.css                 ← Shadow + focus ring
  radii.css                   ← Border radius scale
  base.css                    ← Reset + base element styles
assets/
  logo/
    logo.svg                  ← Full logo (green, light bg)
    logo-white.svg            ← Full logo (white, dark bg)
    icon.svg                  ← Mark only (leaf icon)
guidelines/
  colors-primary.card.html    ← Primary green palette
  colors-neutral.card.html    ← Neutral grays + warm earth
  colors-semantic.card.html   ← Status + service colors
  type-display.card.html      ← Display & heading type
  type-body.card.html         ← Body, label, caption type
  spacing.card.html           ← Spacing scale
  shadows-radii.card.html     ← Shadow + radius tokens
  status-indicators.card.html ← Status badge specimens
  service-types.card.html     ← Service tag specimens
components/
  core/
    Button.jsx                ← Primary action button
    StatusBadge.jsx           ← Service status indicator
    ServiceTag.jsx            ← Treatment type tag
    AlertWarning.jsx          ← Contraindication alert
    PatientCard.jsx           ← Queue/patient list card
    core.card.html            ← Component showcase
ui_kits/
  thaimed_app/
    index.html                ← Interactive app prototype
    App.jsx                   ← Main app shell + navigation
    Dashboard.jsx             ← Dashboard screen
    QueueScreen.jsx           ← Queue management screen
    PatientScreen.jsx         ← Patient profile + screening
    ServiceScreen.jsx         ← Service recording screen
    ReportsScreen.jsx         ← Analytics & reports screen
    README.md                 ← UI kit notes
```

### Components
| Component | วัตถุประสงค์ |
|---|---|
| `Button` | ปุ่มหลักทุกประเภท (primary, secondary, ghost, danger, warning, transfer) |
| `StatusBadge` | แสดงสถานะบริการ (รอ, กำลังให้บริการ, เสร็จ, นัดติดตาม, ส่งต่อ, เร่งด่วน) |
| `ServiceTag` | Tag แสดงประเภทบริการแพทย์แผนไทย (10 ประเภท) |
| `AlertWarning` | แจ้งเตือนข้อห้าม / ความเสี่ยง พร้อมปุ่มส่งต่อ |
| `PatientCard` | Card แสดงข้อมูลผู้รับบริการในคิว |

---

## ข้อกำหนดด้านความปลอดภัย
1. ห้ามใช้ข้อมูลผู้ป่วยจริงใน prototype / mockup
2. ระบบต้องมี Role-based Access Control (RBAC) ก่อน deploy จริง
3. ต้องมี Audit Log ทุกครั้งที่เข้าถึงหรือแก้ไขข้อมูลผู้รับบริการ
4. ปฏิบัติตาม PDPA พ.ศ. 2562 และแนวทางกระทรวงสาธารณสุข
5. ระบบนี้เป็นเครื่องมือสนับสนุน — ไม่วินิจฉัยโรคแทนบุคลากรวิชาชีพ
6. ทุก warning ต้องมีปุ่ม "ส่งต่อ / ปรึกษาแพทย์" เสมอ
