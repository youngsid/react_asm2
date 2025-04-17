"use client";
import Link from "next/link";
import { ISanPham } from "../cautrucdata";
import { useDispatch } from "react-redux";
import { themSP } from "../lib/cartSlice";

export default function Show1SP(props: any) {
    let sp = props.sp as ISanPham;
    const dispatch = useDispatch();
    return (
        <div className="border border-gray-300 rounded-lg shadow-md p-4 text-center bg-white hover:shadow-lg transition-shadow">
            {/* Tên sản phẩm */}
            <h3 className="mb-3 text-lg font-semibold h-[60px]">
                <Link href={`/sp/${sp.id}`} className="text-blue-600 hover:underline">
                    {sp.ten_sp}
                </Link>
            </h3>
            {/* Hình ảnh sản phẩm */}
            <div className="flex justify-center">
                <img src={sp.hinh} alt={sp.ten_sp} className="w-full h-[250px] object-cover rounded-md" />
            </div>
            {/* Thông tin sản phẩm */}
            <p className="py-2 text-gray-700 font-medium">
                <span className="font-semibold">Giá:</span> {Number(sp.gia_km).toLocaleString("vi")} VNĐ
            </p>
            <p className="py-1 text-gray-600 text-sm">
                <span className="font-semibold">Cập nhật:</span> {new Date(sp.ngay).toLocaleDateString("vi")}
            </p>
            <p className="py-1 text-gray-600 text-sm">
                <span className="font-semibold">Lượt xem:</span> {sp.luot_xem}
            </p>
            {/* Nút Thêm vào giỏ */}
            <button 
                onClick={() => dispatch(themSP(sp))}
                type="button"
                className="mt-3 w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-colors">
                Thêm vào giỏ
            </button>
        </div>
    );
}
