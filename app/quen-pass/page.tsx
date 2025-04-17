// == Lab 7 == Quên password
'use client';
import { useState } from 'react';

export default function LostPass() {
  const [email, setEmail] = useState('');
  const [thong_bao, setThongbao] = useState(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/quenpass', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setThongbao(data.thong_bao);
  }

  return (
    <form onSubmit={handleSubmit} className="w-[40%] mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-center text-xl font-bold bg-yellow-400 text-black py-3 rounded">🔑 Quên mật khẩu</h2>
      
      <div className="my-4">
        <label className="block font-semibold text-gray-700">📧 Nhập email:</label>
        <input 
          type="email" 
          className="w-full border p-2 rounded focus:ring-2 focus:ring-yellow-400"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Nhập email của bạn..."
        />
      </div>

      <div className="mt-5 text-center">
        <button 
          className="bg-yellow-400 text-black px-5 py-2 rounded hover:bg-yellow-500 transition"
          type="submit"
        >
          🚀 Gửi mật khẩu mới
        </button>
        {thong_bao && <p className="text-red-500 font-bold mt-2">{thong_bao}</p>}
      </div>
    </form>
  );
}
