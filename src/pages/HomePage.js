// src/pages/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Box, Card, CardContent, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import { mockForms } from '../data/mockData';

function HomePage() {
  return (
    <Box>
      <Navbar />
      <Container sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4, fontWeight: 700 }}>
          เลือกแบบฟอร์มที่ต้องการกรอก
        </Typography>
        {mockForms.length === 0 ? (
          <Typography variant="body1" align="center" color="text.secondary">
            ยังไม่มีฟอร์มให้แสดงในขณะนี้
          </Typography>
        ) : (
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fit, minmax(280px, 1fr))' },
            gap: 4, // เพิ่มระยะห่างระหว่าง Card
          }}>
            {mockForms.map((form) => (
              <Card key={form.id} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: 2, // เพิ่ม padding ใน Card
                transition: 'transform 0.2s ease-in-out', // เพิ่ม animation
                '&:hover': {
                  transform: 'translateY(-5px)', // ยก Card ขึ้นเล็กน้อยเมื่อ hover
                },
              }}>
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                    {form.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph sx={{ minHeight: '40px' }}>
                    {form.description}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/form/${form.id}`}
                    fullWidth // ทำให้ปุ่มเต็มความกว้าง Card
                  >
                    กรอกข้อมูล
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default HomePage;