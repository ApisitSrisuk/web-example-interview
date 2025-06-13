// src/index.js (ควรจะเป็นแบบนี้อยู่แล้ว)

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // หรือคุณอาจจะลบไฟล์นี้ถ้าไม่ใช้ CSS ทั่วไป
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();