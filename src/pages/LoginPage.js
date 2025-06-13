// src/pages/LoginPage.js

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { login } from '../utils/auth';
import { Typography, Box } from '@mui/material';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    if (login(username, password)) {
      navigate('/home');
    } else {
      alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!');
    }
  };

  return (
    <Box>
      <AuthForm type="login" onSubmit={handleLogin} />
      <Typography variant="body2" align="center" mt={2}>
        ยังไม่มีบัญชีผู้ใช้? <Link to="/register">ลงทะเบียนที่นี่</Link>
      </Typography>
    </Box>
  );
}

export default LoginPage;