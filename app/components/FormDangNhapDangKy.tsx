'use client';

import React, { useState } from 'react';

interface FormDangNhapDangKyProps {
  type: 'login' | 'register';
  onSubmit: (data: { email: string; password: string }) => void;
}

export default function FormDangNhapDangKy({ type, onSubmit }: FormDangNhapDangKyProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {type === 'login' ? 'Đăng nhập' : 'Đăng ký'}
      </h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Mật khẩu"
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {type === 'login' ? 'Đăng nhập' : 'Đăng ký'}
      </button>
    </form>
  );
}
