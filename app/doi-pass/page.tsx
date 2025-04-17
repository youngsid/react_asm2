// == Lab 7 == Đổi password
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DoiPass() {
  const [email, setEmail] = useState('');
  const [pass_old, setPassOld] = useState('');
  const [pass_new1, setPass1] = useState('');
  const [pass_new2, setPass2] = useState('');
  const [token, setToken] = useState("");
  const [thong_bao, setThongbao] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      alert("Chưa đăng nhập mà");
      router.push("/dang-nhap");
    }
    setToken(sessionStorage.getItem("token") || "");
    setEmail(sessionStorage.getItem("email") || "");
  }, []);

  async function handleDoiPass(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!pass_old || pass_old.length < 6) {
      setThongbao("⚠️ Mật khẩu cũ không hợp lệ!");
      return;
    }
    if (pass_new1.length < 6) {
      setThongbao("⚠️ Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }
    if (pass_new1 !== pass_new2) {
      setThongbao("⚠️ Hai mật khẩu mới không khớp!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/doipass", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ pass_old, pass_new1, pass_new2 })
      });

      const data = await res.json();
      setThongbao(data.thong_bao);

      if (res.ok) {
        router.push("/thanhcong");
      }
    } catch (error) {
      setThongbao("❌ Có lỗi xảy ra: " + JSON.stringify(error));
    }
  }

  return (
    <form onSubmit={handleDoiPass} className="w-[40%] mx-auto p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-center text-xl font-bold bg-yellow-400 text-black py-3 rounded">🔑 Đổi mật khẩu</h2>

      <div className="my-4">
        <label className="block font-semibold text-gray-700">📧 Email:</label>
        <input
          type="email"
          className="w-full border p-2 rounded bg-gray-100 text-gray-800"
          value={email}
          disabled
        />
      </div>

      <div className="my-4">
        <label className="block font-semibold text-gray-700">🔒 Mật khẩu cũ:</label>
        <input
          type="password"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-yellow-400"
          value={pass_old}
          onChange={(e) => setPassOld(e.target.value)}
          placeholder="Nhập mật khẩu cũ..."
        />
      </div>

      <div className="my-4">
        <label className="block font-semibold text-gray-700">🔑 Mật khẩu mới:</label>
        <input
          type="password"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-yellow-400"
          value={pass_new1}
          onChange={(e) => setPass1(e.target.value)}
          placeholder="Nhập mật khẩu mới..."
        />
      </div>

      <div className="my-4">
        <label className="block font-semibold text-gray-700">🔏 Xác nhận mật khẩu:</label>
        <input
          type="password"
          className="w-full border p-2 rounded focus:ring-2 focus:ring-yellow-400"
          value={pass_new2}
          onChange={(e) => setPass2(e.target.value)}
          placeholder="Nhập lại mật khẩu..."
        />
      </div>

      <div className="mt-5 text-center">
        <button
          type="submit"
          className="bg-yellow-400 text-black px-5 py-2 rounded hover:bg-yellow-500 transition"
        >
          🔄 Cập nhật mật khẩu
        </button>
        {thong_bao && <p className="text-red-500 font-bold mt-2">{thong_bao}</p>}
      </div>
    </form>
  );
}
