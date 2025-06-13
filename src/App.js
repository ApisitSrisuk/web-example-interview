// src/App.js

import React, { useState, useMemo, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useMediaQuery, CssBaseline } from '@mui/material';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import FormDetailPage from './pages/FormDetailPage';
import PrivateRoute from './components/PrivateRoute';
import { getAppTheme } from './theme'; // นำเข้า getAppTheme

// สร้าง Context สำหรับ Dark Mode
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  // ตรวจสอบโหมดที่ผู้ใช้ตั้งค่าไว้ในระบบปฏิบัติการ (light/dark)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

  // ฟังก์ชันสำหรับสลับโหมด
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  // สร้าง Theme ตามโหมดปัจจุบัน
  const theme = useMemo(() => getAppTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* ใช้ CssBaseline เพื่อให้ MUI มี base styles ที่ดี */}
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/form/:formId"
              element={
                <PrivateRoute>
                  <FormDetailPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;