// src/pages/RegisterPage.js

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { register } from '../utils/auth';
import { Typography, Box } from '@mui/material';

function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = (username, password) => {
    if (register(username, password)) {
      alert('ลงทะเบียนสำเร็จ!');
      navigate('/home');
    } else {
      alert('ชื่อผู้ใช้นี้มีอยู่แล้ว!');
    }
  };

  return (
    <Box>
      <AuthForm type="register" onSubmit={handleRegister} />
      <Typography variant="body2" align="center" mt={2}>
        มีบัญชีผู้ใช้อยู่แล้ว? <Link to="/">เข้าสู่ระบบที่นี่</Link>
      </Typography>
    </Box>
  );
}

export default RegisterPage;