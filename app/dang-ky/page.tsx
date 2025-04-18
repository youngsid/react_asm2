'use client';
import { useState } from 'react';

export default function DangKy() {
    const [ho_ten, setHT] = useState('');
    const [email, setEmail] = useState('');
    const [mat_khau, setPass1] = useState('');
    const [go_lai_mat_khau, setPass2] = useState('');
    const [thong_bao, setThongbao] = useState('');

    async function handleDangKy(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const matKhauTrimmed = mat_khau.trim();
        const goLaiMatKhauTrimmed = go_lai_mat_khau.trim();

        if (ho_ten.length < 10) {
            setThongbao('⚠️ Họ tên nhập từ 10 ký tự!');
            return;
        }
        if (matKhauTrimmed.length < 6) {
            setThongbao('⚠️ Mật khẩu phải từ 6 ký tự!');
            return;
        }
        if (matKhauTrimmed !== goLaiMatKhauTrimmed) {
            setThongbao('⚠️ Hai mật khẩu chưa trùng khớp!');
            return;
        }

        const opt = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ho_ten, email, mat_khau: matKhauTrimmed })
        };

        try {
            const res = await fetch('http://localhost:3000/api/dangky', opt);
            const data = await res.json();
            setThongbao(data.thong_bao || '❌ Có lỗi xảy ra');
        } catch (error) {
            console.error('Lỗi fetch:', error);
            setThongbao('❌ Có lỗi xảy ra: ' + JSON.stringify(error));
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 p-6">
            <form
                onSubmit={handleDangKy}
                className="w-full max-w-lg bg-gray-800 rounded-xl shadow-xl p-8 space-y-6 transition-all hover:scale-105 hover:shadow-2xl transform duration-300 ease-in-out"
            >
                <h2 className="text-center text-4xl font-extrabold text-yellow-400 mb-6 tracking-wide">
                    Đăng ký 
                </h2>

                <div>
                    <label className="block text-lg font-semibold text-gray-200"> Họ tên</label>
                    <input
                        type="text"
                        value={ho_ten}
                        onChange={(e) => setHT(e.target.value)}
                        className="w-full p-4 mt-2 border border-gray-700 rounded-xl focus:ring-2 focus:ring-yellow-500 shadow-sm focus:outline-none transition-all bg-gray-700 text-white"
                        placeholder="Nhập họ tên đầy đủ"
                    />
                    {ho_ten.length < 10 && (
                        <p className="text-red-500 text-sm mt-1"> Họ tên nhập từ 10 ký tự</p>
                    )}
                </div>

                <div>
                    <label className="block text-lg font-semibold text-gray-200"> Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-4 mt-2 border border-gray-700 rounded-xl focus:ring-2 focus:ring-yellow-500 shadow-sm focus:outline-none transition-all bg-gray-700 text-white"
                        placeholder="example@email.com"
                    />
                </div>

                <div>
                    <label className="block text-lg font-semibold text-gray-200"> Mật khẩu</label>
                    <input
                        type="password"
                        value={mat_khau}
                        onChange={(e) => setPass1(e.target.value)}
                        className="w-full p-4 mt-2 border border-gray-700 rounded-xl focus:ring-2 focus:ring-yellow-500 shadow-sm focus:outline-none transition-all bg-gray-700 text-white"
                        placeholder="Tối thiểu 6 ký tự"
                    />
                    {mat_khau.length < 6 && (
                        <p className="text-red-500 text-sm mt-1"> Mật khẩu phải từ 6 ký tự</p>
                    )}
                </div>

                <div>
                    <label className="block text-lg font-semibold text-gray-200"> Nhập lại mật khẩu</label>
                    <input
                        type="password"
                        value={go_lai_mat_khau}
                        onChange={(e) => setPass2(e.target.value)}
                        className="w-full p-4 mt-2 border border-gray-700 rounded-xl focus:ring-2 focus:ring-yellow-500 shadow-sm focus:outline-none transition-all bg-gray-700 text-white"
                        placeholder="Nhập lại mật khẩu"
                    />
                    {mat_khau !== go_lai_mat_khau && (
                        <p className="text-red-500 text-sm mt-1"> Hai mật khẩu chưa trùng khớp</p>
                    )}
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl transition duration-300 ease-in-out transform hover:scale-105"
                    >
                         Đăng ký
                    </button>
                    {thong_bao && <p className="text-red-600 font-semibold mt-4">{thong_bao}</p>}
                </div>
            </form>
        </div>
    );
}
