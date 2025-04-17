//  Lab 7 - Đăng ký == http://localhost:3001/dang-ky
'use client';
import { useState } from 'react';

export default function DangKy() {
    const [ho_ten, setHT] = useState('');
    const [email, setEmail] = useState('');
    const [mat_khau, setPass1] = useState('');
    const [go_lai_mat_khau, setPass2] = useState('');
    const [thong_bao, setThongbao] = useState("");

    async function handleDangKy(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (ho_ten.length < 10) {
            setThongbao("⚠️ Họ tên nhập từ 10 ký tự!");
            return;
        }
        if (mat_khau.length < 6) {
            setThongbao("⚠️ Mật khẩu phải từ 6 ký tự!");
            return;
        }
        if (mat_khau !== go_lai_mat_khau) {
            setThongbao("⚠️ Hai mật khẩu chưa trùng khớp!");
            return;
        }

        const opt = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ho_ten, email, mat_khau })
        };

        try {
            const res = await fetch("http://localhost:3000/api/dangky", opt);
            const data = await res.json();
            setThongbao(data.thong_bao);
        } catch (error) {
            setThongbao("❌ Có lỗi xảy ra: " + JSON.stringify(error));
        }
    }

    return (
        <form onSubmit={handleDangKy} className="w-[50%] mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-center text-xl font-bold bg-yellow-400 text-black p-3 rounded">🔑 Đăng ký thành viên</h2>

            <div className="my-3">
                <label className="block font-semibold">📝 Họ tên:</label>
                <input type="text" className="w-full border p-2 rounded focus:ring-2 focus:ring-yellow-400" value={ho_ten} onChange={(e) => setHT(e.target.value)} />
                {ho_ten.length < 10 && <p className="text-red-500 text-sm mt-1">⚠️ Họ tên nhập từ 10 ký tự</p>}
            </div>

            <div className="my-3">
                <label className="block font-semibold">📧 Email:</label>
                <input type="email" className="w-full border p-2 rounded focus:ring-2 focus:ring-yellow-400" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="my-3">
                <label className="block font-semibold">🔒 Mật khẩu:</label>
                <input type="password" className="w-full border p-2 rounded focus:ring-2 focus:ring-yellow-400" value={mat_khau} onChange={(e) => setPass1(e.target.value)} />
                {mat_khau.length < 6 && <p className="text-red-500 text-sm mt-1">⚠️ Mật khẩu phải từ 6 ký tự</p>}
            </div>

            <div className="my-3">
                <label className="block font-semibold">🔏 Nhập lại mật khẩu:</label>
                <input type="password" className="w-full border p-2 rounded focus:ring-2 focus:ring-yellow-400" value={go_lai_mat_khau} onChange={(e) => setPass2(e.target.value)} />
                {mat_khau !== go_lai_mat_khau && <p className="text-red-500 text-sm mt-1">⚠️ Hai mật khẩu chưa trùng khớp</p>}
            </div>

            <div className="my-4 text-center">
                <button type="submit" className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition">
                    ✅ Đăng ký
                </button>
                {thong_bao && <p className="text-red-500 font-bold mt-2">{thong_bao}</p>}
            </div>
        </form>
    );
}
