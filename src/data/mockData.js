// src/data/mockData.js

export const mockUsers = [
  { id: '1', username: 'user1', password: 'password1' },
  { id: '2', username: 'user2', password: 'password2' },
];

export const mockForms = [
  {
    id: 'form1',
    title: 'แบบฟอร์มขอข้อมูลทั่วไป',
    description: 'แบบฟอร์มสำหรับเก็บข้อมูลพื้นฐานเพื่อการติดต่อและการวิเคราะห์',
    fields: [
      { name: 'fullName', label: 'ชื่อ-นามสกุล', type: 'text', required: true },
      { name: 'email', label: 'อีเมล', type: 'email', required: true },
      { name: 'phone', label: 'เบอร์โทรศัพท์', type: 'tel', required: false },
      { name: 'gender', label: 'เพศ', type: 'radio', options: ['ชาย', 'หญิง', 'ไม่ระบุ'], required: true },
      { name: 'interests', label: 'ความสนใจ', type: 'checkbox', options: ['กีฬา', 'ดนตรี', 'ศิลปะ', 'อ่านหนังสือ', 'ท่องเที่ยว', 'เกม'], required: false },
      { name: 'country', label: 'ประเทศ', type: 'dropdown', options: ['ไทย', 'สหรัฐอเมริกา', 'ญี่ปุ่น', 'จีน', 'เกาหลีใต้', 'แคนาดา'], required: true },
      { name: 'skills', label: 'ทักษะ (เลือกได้หลายอย่าง)', type: 'combobox', options: ['React', 'Angular', 'Vue', 'Node.js', 'Python', 'Java', 'SQL', 'UI/UX Design'], required: false },
      { name: 'birthDate', label: 'วันเกิด', type: 'date', required: true },
      { name: 'bio', label: 'ประวัติส่วนตัว/คำอธิบายเพิ่มเติม', type: 'textarea', required: false },
      { name: 'resume', label: 'อัปโหลดไฟล์ Resume (ถ้ามี)', type: 'attachments', required: false },
    ],
  },
  {
    id: 'form2',
    title: 'แบบฟอร์มสำรวจความพึงพอใจบริการ',
    description: 'แบบฟอร์มเพื่อสำรวจความคิดเห็นและความพึงพอใจในการให้บริการของเรา',
    fields: [
      { name: 'serviceQuality', label: 'คุณภาพการบริการ', type: 'dropdown', options: ['ดีเยี่ยม', 'ดี', 'ปานกลาง', 'พอใช้', 'ต้องปรับปรุง'], required: true },
      { name: 'feedbackDate', label: 'วันที่ให้ข้อเสนอแนะ', type: 'date', required: true },
      { name: 'overallComment', label: 'ข้อเสนอแนะโดยรวม', type: 'textarea', required: false },
      { name: 'suggestImprovements', label: 'ข้อเสนอแนะในการปรับปรุง (หากมี)', type: 'dynamic-text', required: false },
    ],
  },
];