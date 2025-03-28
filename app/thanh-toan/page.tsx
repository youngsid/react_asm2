"use client";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../lib/store";
import { ICart } from "../cautrucdata";

export default function ThanhToan() {
    const router = useRouter();
    const listSP: ICart[] = useSelector((state: RootState) => state.cart.listSP);
    const hotenRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const ghichuRef = useRef<HTMLTextAreaElement>(null);

    const [thongbao, setThongbao] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // Kiểm tra giỏ hàng rỗng -> Điều hướng về trang chủ
    useEffect(() => {
        if (listSP.length === 0) {
            alert("Bạn chưa chọn sản phẩm nào. Vui lòng chọn sản phẩm trước khi thanh toán.");
            router.push("/");
        }
    }, [listSP, router]);

    const submitDuLieu = async (event: React.FormEvent) => {
        event.preventDefault(); // Chặn reload trang
        let ht = hotenRef.current?.value.trim();
        let email = emailRef.current?.value.trim();
        let ghichu = ghichuRef.current?.value.trim();

        if (!ht) {
            setThongbao("❌ Vui lòng nhập họ tên!");
            hotenRef.current!.style.backgroundColor = "yellow";
            hotenRef.current!.focus();
            return;
        } else hotenRef.current!.style.backgroundColor = "white";

        setLoading(true); // Hiện loading

        try {
            let response = await fetch("http://localhost:3000/api/luudonhang", {
                method: "POST",
                body: JSON.stringify({ ho_ten: ht, email, ghi_chu: ghichu }),
                headers: { "Content-Type": "application/json" },
            });
            let data = await response.json();
            
            if (data.dh) {
                setThongbao("✅ Đơn hàng đã được tạo thành công! 🎉");
                // router.push("/don-hang/" + data.dh.id); // Nếu muốn chuyển hướng sau khi tạo đơn
            } else {
                setThongbao("❌ Lỗi khi lưu đơn hàng, vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi khi gửi request:", error);
            setThongbao("❌ Có lỗi xảy ra! Kiểm tra lại hệ thống.");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={submitDuLieu} className="mx-auto w-[500px] bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-bold text-white text-center bg-gradient-to-r from-yellow-400 to-orange-500 py-3 rounded-lg shadow-md">
                🛒 Thanh toán đơn hàng
            </h2>
            <div className="mt-5">
                <label className="block font-medium text-gray-700 mb-1">Họ tên:</label>
                <input ref={hotenRef} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm transition-all" type="text" />
            </div>     
            <div className="mt-4">
                <label className="block font-medium text-gray-700 mb-1">Email:</label>
                <input ref={emailRef} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm transition-all" type="email" />
            </div>
            <div className="mt-4">
                <label className="block font-medium text-gray-700 mb-1">Ghi chú:</label>
                <textarea ref={ghichuRef} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm transition-all" rows={4} />
            </div>        
            <div className="mt-6 text-center">
                <button 
                    type="submit"
                    className="px-6 py-3 text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 rounded-lg shadow-md transition-all transform hover:scale-105"
                    disabled={loading}
                >
                    {loading ? "⏳ Đang lưu..." : "💾 Lưu đơn hàng"}
                </button>
            </div>
            <div className={`text-center font-bold text-lg mt-4 ${thongbao.includes("✅") ? "text-green-600" : "text-red-500"}`}>
                {thongbao}
            </div>
        </form>
    );
}
