// src/theme.js

import { createTheme } from '@mui/material/styles';

// ฟังก์ชันสำหรับสร้าง Theme ตามโหมด (light/dark)
export const getAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#42a5f5', // สีน้ำเงินที่สดใสและทันสมัยขึ้น
        light: '#6ec6ff',
        dark: '#0077c2',
        contrastText: '#fff',
      },
      secondary: {
        main: '#ab47bc', // สีม่วงที่ดูดีเมื่อใช้คู่กับน้ำเงิน
        light: '#df78ef',
        dark: '#790e8b',
        contrastText: '#fff',
      },
      error: {
        main: '#ef5350',
      },
      warning: {
        main: '#ff9800',
      },
      info: {
        main: '#29b6f6',
      },
      success: {
        main: '#66bb6a',
      },
      // กำหนดสีพื้นหลังและกระดาษ (Card, Paper) สำหรับโหมด Dark โดยเฉพาะ
      ...(mode === 'dark' && {
        background: {
          default: '#1a202c', // สีพื้นหลังหลักใน Dark Mode (สีเทาเข้มอมน้ำเงิน)
          paper: '#2d3748', // สีพื้นหลังของ Card หรือ Paper ใน Dark Mode
        },
        text: {
          primary: '#e2e8f0', // สีข้อความหลัก
          secondary: '#a0aec0', // สีข้อความรอง
        },
      }),
      // กำหนดสีพื้นหลังและกระดาษสำหรับโหมด Light
      ...(mode === 'light' && {
        background: {
          default: '#f8f9fa', // สีพื้นหลังหลักใน Light Mode (สีขาวนวล)
          paper: '#ffffff', // สีพื้นหลังของ Card หรือ Paper ใน Light Mode
        },
        text: {
          primary: '#2d3748',
          secondary: '#718096',
        },
      }),
    },
    typography: {
      fontFamily: ['"Poppins"', 'sans-serif'].join(','), // ใช้ Poppins เพื่อความทันสมัย
      h4: {
        fontWeight: 600, // ปรับน้ำหนักฟอนต์สำหรับหัวข้อ
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 600,
      },
    },
    // เพิ่มค่า shadow ที่ดูนุ่มนวลและทันสมัยขึ้น
    shadows: Array(25).fill('none').map((_, i) => {
      if (i === 1) return '0px 1px 3px rgba(0, 0, 0, 0.1)';
      if (i === 2) return '0px 2px 5px rgba(0, 0, 0, 0.15)';
      if (i === 3) return '0px 3px 8px rgba(0, 0, 0, 0.2)';
      return `0px ${i * 0.5}px ${i * 1.5}px rgba(0, 0, 0, 0.1)`;
    }),
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none', // ปิดการแปลงเป็นตัวพิมพ์ใหญ่
            borderRadius: 8, // ทำให้ปุ่มมีมุมโค้งมนขึ้น
            padding: '10px 20px',
            boxShadow: 'none', // ลบ shadow เริ่มต้นของปุ่ม
            '&:hover': {
              boxShadow: 'none', // ลบ shadow เมื่อ hover
            },
          },
          containedPrimary: {
            '&:hover': {
              backgroundColor: '#0077c2', // สีเข้มขึ้นเมื่อ hover
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8, // ทำให้ TextField มีมุมโค้งมน
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12, // ทำให้ Card มีมุมโค้งมนที่ชัดเจน
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)', // เพิ่ม shadow เล็กน้อย
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)', // เพิ่ม shadow ให้ AppBar
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '&:before': {
              display: 'none', // ลบเส้นแบ่งด้านบน
            },
            boxShadow: 'none', // ลบ shadow เริ่มต้น
            border: '1px solid rgba(0, 0, 0, 0.1)', // เพิ่ม border แทน shadow
            '&.Mui-expanded': {
              margin: '16px 0',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8, // ทำให้ Chip มีมุมโค้งมน
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: 4, // ทำให้ MenuItem มีมุมโค้งมนเล็กน้อย
            margin: '0 8px',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          },
        },
      },
    },
    // กำหนด breakpoints เพื่อ Responsive Design (ค่าเริ่มต้นของ MUI ก็ใช้ได้ดี)
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });