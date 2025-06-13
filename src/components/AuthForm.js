// src/components/AuthForm.js

import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

function AuthForm({ type, onSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3, // เพิ่มระยะห่างระหว่าง input
        maxWidth: 450, // เพิ่มความกว้างเล็กน้อย
        margin: 'auto',
        p: 4, // เพิ่ม padding
        bgcolor: 'background.paper', // ใช้สีพื้นหลังตาม theme
        borderRadius: 3, // เพิ่มความโค้งมนของฟอร์ม
        boxShadow: 3, // เพิ่มเงาให้ดูมีมิติ
        mt: 8, // เพิ่ม margin-top
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" component="h1" gutterBottom align="center">
        {type === 'login' ? 'เข้าสู่ระบบ' : 'สร้างบัญชีผู้ใช้'}
      </Typography>
      <TextField
        label="ชื่อผู้ใช้"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="รหัสผ่าน"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
      />
      <Button variant="contained" type="submit" size="large" fullWidth>
        {type === 'login' ? 'เข้าสู่ระบบ' : 'ลงทะเบียน'}
      </Button>
    </Box>
  );
}

export default AuthForm;