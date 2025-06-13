// src/utils/auth.js

import { mockUsers } from '../data/mockData';

export const login = (username, password) => {
  const user = mockUsers.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }
  return false;
};

export const register = (username, password) => {
  // ในโลกจริงต้องมีการเช็ค username ซ้ำ และบันทึกลงฐานข้อมูล
  const userExists = mockUsers.some((u) => u.username === username);
  if (userExists) {
    return false; // User already exists
  }
  // เพิ่ม user ใหม่เข้าไปใน mockUsers (เป็นการจำลอง)
  const newUser = { id: (mockUsers.length + 1).toString(), username, password };
  mockUsers.push(newUser); // ในโลกจริงจะบันทึกลง DB
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('user', JSON.stringify(newUser));
  return true;
};

export const logout = () => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};