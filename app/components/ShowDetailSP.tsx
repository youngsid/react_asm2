"use client";
import { ISanPham } from "../cautrucdata";

export default function ShowDetailSP({ sp }: { sp: ISanPham }) {
    return (
        <div id="spdetail" className="flex flex-col md:flex-row bg-white p-5 rounded-lg shadow-lg gap-4">
            {/* Hình ảnh sản phẩm */}
            <div className="md:w-[40%] flex justify-center">
                <img 
                    src={sp.hinh === "" ? "/default.jpg" : sp.hinh} 
                    alt={sp.ten_sp} 
                    className="w-full h-[300px] object-cover rounded-lg shadow-md"
                />
            </div>
            {/* Thông tin sản phẩm */}
            <div className="md:w-[60%] flex flex-col justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{sp.ten_sp}</h3>
                    <p className="text-gray-700"><span className="font-semibold">Giá gốc:</span> {Number(sp.gia).toLocaleString("vi")} VNĐ</p>
                    <p className="text-red-500"><span className="font-semibold">Khuyến mãi:</span> {Number(sp.gia_km).toLocaleString("vi")} VNĐ</p>
                    <p className="text-gray-600"><span className="font-semibold">Ngày:</span> {new Date(sp.ngay).toLocaleDateString("vi")}</p>
                    <p className="text-gray-600"><span className="font-semibold">Lượt xem:</span> {sp.luot_xem}</p>
                    <p className="text-gray-600"><span className="font-semibold">Tính chất:</span> {sp.tinh_chat}</p>
                </div>
                {/* Nút Thêm vào giỏ */}
                <button 
                    type="button" 
                    className="mt-4 bg-blue-800 text-yellow-400 font-semibold py-2 px-5 rounded-lg hover:bg-blue-900 transition-colors w-full md:w-auto">
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    );
}
