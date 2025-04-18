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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 p-6">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl space-y-6">
        <h2 className="text-center text-3xl font-extrabold text-yellow-500 mb-4">🔑 Đăng nhập</h2>

        <div className="my-4">
          <label className="block text-lg font-semibold text-gray-300">📧 Email:</label>
          <input
            type="email"
            ref={emailRef}
            className="w-full p-4 mt-2 rounded-xl border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-700 text-white placeholder-gray-400"
            placeholder="Nhập email của bạn"
          />
        </div>

        <div className="my-4">
          <label className="block text-lg font-semibold text-gray-300">🔒 Mật khẩu:</label>
          <input
            type="password"
            ref={matkhauRef}
            className="w-full p-4 mt-2 rounded-xl border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-700 text-white placeholder-gray-400"
            placeholder="Nhập mật khẩu của bạn"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Đăng nhập
          </button>
        </div>

        <div className="text-center">
          <p ref={thongbaoRef} className="text-red-500 font-bold mt-4"></p>
        </div>
      </form>
    </div>
  );
}
