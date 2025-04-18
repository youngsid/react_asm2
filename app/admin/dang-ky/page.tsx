'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminRegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Đăng ký thành công!');
        router.push('/admin/dang-nhap');
      } else {
        setMessage(data.message || 'Đăng ký thất bại!');
      }
    } catch (error) {
      console.error('Lỗi:', error);
      setMessage('Đã xảy ra lỗi khi đăng ký.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Đăng ký Admin</h2>
      <form onSubmit={handleRegister}>
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
          Đăng ký
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default AdminRegisterPage;
