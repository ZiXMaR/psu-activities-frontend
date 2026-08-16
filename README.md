# ระบบกิจกรรมพัฒนานักศึกษา (Front-end)

เว็บแอปพลิเคชันสำหรับค้นหา ดูรายละเอียด และลงทะเบียนเข้าร่วมกิจกรรมพัฒนานักศึกษา
พัฒนาสำหรับข้อสอบภาคปฏิบัติ (POC) ตำแหน่งนักวิชาการศึกษา
กองพัฒนานักศึกษาและศิษย์เก่าสัมพันธ์ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่

## เทคโนโลยีที่ใช้

- **React 18 + TypeScript** — UI library
- **Vite** — build tool
- **React Router v6** — routing ระหว่างหน้า
- **Tailwind CSS** — styling และ responsive design
- **json-server** — จำลอง RESTful API จาก `db.json` ชุด Mock API ที่คณะกรรมการจัดเตรียมไว้ให้

## โครงสร้างโปรเจกต์

psu-activities-frontend/
├── mock-api/ # Mock REST API (json-server) 
│ ├── db.json
│ └── package.json
├── src/
│ ├── api/ # ฟังก์ชันเรียก API (client.ts, activities.ts, registrations.ts)
│ ├── types/ # TypeScript interfaces
│ ├── utils/ # format.ts (มาสก์ข้อมูล/วันที่), validate.ts (ตรวจสอบฟอร์ม)
│ ├── components/ # UI ที่ใช้ซ้ำ (Card, Pagination, Loading/Empty/Error state และอื่นๆ)
│ ├── pages/ # 
│ │ ├── ActivityListPage.tsx → หน้ารายการกิจกรรม ใช้ ค้นหา/กรอง/แบ่งหน้า 
│ │ ├── ActivityDetailPage.tsx → หน้ารายละเอียดกิจกรรม
│ │ ├── RegisterPage.tsx → ฟอร์มลงทะเบียน (validation + PDPA)
│ │ └── RegistrantsPage.tsx → รายชื่อผู้ลงทะเบียน (data masking)
│ ├── App.tsx # routing
│ └── main.tsx # entry point
├── docs/
│ └── user-manual.pdf 
└── package.json

## วิธีติดตั้งและรัน

**สำคัญ: ต้องรันสองส่วนพร้อมกัน (เปิด 2 terminal)**

### รัน Mock API

```bash
terminal ที่ 1 
cd mock-api
npm install
npm start
```

จะได้ API ให้บริการที่ `http://localhost:3001` (เช่น `GET http://localhost:3001/activities`)

### รัน Front-end

```bash
terminal ที่ 2
npm install
npm run dev
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:5173`


## ฟีเจอร์ที่พัฒนา

| ฟีเจอร์ | ไฟล์หลัก |
|---|---|
| รายการกิจกรรม + ค้นหา + กรองประเภท + แบ่งหน้า | `pages/ActivityListPage.tsx` |
| รายละเอียดกิจกรรม | `pages/ActivityDetailPage.tsx` |
| ฟอร์มลงทะเบียน + validation + PDPA consent | `pages/RegisterPage.tsx`, `utils/validate.ts` |
| รายชื่อผู้ลงทะเบียน + data masking | `pages/RegistrantsPage.tsx`, `utils/format.ts` |
| Responsive design (มือถือ/แท็บเล็ต/เดสก์ท็อป) | ทุกหน้า ใช้ Tailwind breakpoints |
| RESTful API + Loading/Error/Empty state | `components/LoadingState.tsx`, `ErrorState.tsx`, `EmptyState.tsx` |

## คู่มือการใช้งาน

ดูรายละเอียดวิธีใช้งานแต่ละหน้าได้ที่ [`docs/user-manual.pdf`](./docs/user-manual.pdf)

## การใช้ AI Tools ในการพัฒนา

โปรเจกต์นี้พัฒนาโดยใช้ Claude (Anthropic) ช่วยในการ:
- ออกแบบโครงสร้างโปรเจกต์และวางแผนไฟล์/คอมโพเนนต์ตามเกณฑ์การให้คะแนน
- ออกแบบระบบดีไซน์ (สี/ฟอนต์/เลย์เอาต์) ให้เหมาะกับเนื้อหา
- แก้ไข error ระหว่างพัฒนา (เช่น ปัญหา syntax, import และปัญหาอื่นๆระหว่างพัฒนา)