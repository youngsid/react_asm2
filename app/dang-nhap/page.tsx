// == Lab 7 == -- Đăng nhập
'use client';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const matkhauRef = useRef<HTMLInputElement>(null);
  const thongbaoRef = useRef<HTMLParagraphElement>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value.trim() || "";
    const mat_khau = matkhauRef.current?.value.trim() || "";

    if (!email) {
      thongbaoRef.current!.innerHTML = "⚠️ Vui lòng nhập email!";
      emailRef.current!.focus();
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/dangnhap", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mat_khau })
      });

      const data = await res.json();
      thongbaoRef.current!.innerHTML = data.thong_bao;

      if (data.token) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("expiresIn", data.expiresIn);
        sessionStorage.setItem("user", JSON.stringify(data.info));
        sessionStorage.setItem("email", data.info.email);
        router.push('/');
      }
    } catch (error) {
      thongbaoRef.current!.innerHTML = "❌ Có lỗi xảy ra: " + JSON.stringify(error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-[50%] mx-auto border p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-center text-xl font-bold bg-yellow-400 text-black p-3 rounded">🔑 Đăng nhập</h2>

      <div className="my-3">
        <label className="block font-semibold">📧 Email:</label>
        <input type="email" ref={emailRef} className="w-full border p-2 rounded focus:ring-2 focus:ring-yellow-400" />
      </div>

      <div className="my-3">
        <label className="block font-semibold">🔒 Mật khẩu:</label>
        <input type="password" ref={matkhauRef} className="w-full border p-2 rounded focus:ring-2 focus:ring-yellow-400" />
      </div>

      <div className="my-4 text-center">
        <button type="submit" className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition">
          🔑 Đăng nhập
        </button>
        <p ref={thongbaoRef} className="text-red-500 font-bold mt-2"></p>
      </div>
    </form>
  );
}
