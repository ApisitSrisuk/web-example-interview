// src/components/Navbar.js

import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, useTheme } from '@mui/material';
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';
import { ColorModeContext } from '../App';

function Navbar() {
  const navigate = useNavigate();
  const { toggleColorMode } = useContext(ColorModeContext);
  const theme = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static" color="primary" elevation={0} // ลบเงาเริ่มต้น
      sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }} // เพิ่มเส้นแบ่งบางๆ
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          ระบบจัดการฟอร์ม
        </Typography>
        <Button color="inherit" onClick={() => navigate('/home')} sx={{ mx: 1 }}>
          หน้าหลัก
        </Button>
        {/* ปุ่มสลับโหมด */}
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <Button color="inherit" onClick={handleLogout} sx={{ ml: 1 }}>
          ออกจากระบบ
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;