'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        // Lưu token vào localStorage nếu cần
        localStorage.setItem('adminToken', data.token);
        router.push('/admin'); // chuyển đến trang admin chính
      } else {
        setMessage(data.message || 'Đăng nhập thất bại!');
      }
    } catch (error) {
      console.error('Lỗi:', error);
      setMessage('Đã xảy ra lỗi khi đăng nhập.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Đăng nhập Admin</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          className="w-full mb-3 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Đăng nhập
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default AdminLoginPage;
