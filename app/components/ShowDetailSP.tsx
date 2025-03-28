"use client";
import { ISanPham } from "../cautrucdata";
export default function ShowDetailSP({ sp }: { sp: ISanPham }) {
    return (
        <div id="spdetail" className="flex">
            <div className="w-[40%]">
                <img src={sp.hinh === "" ? "/default.jpg" : sp.hinh} className="w-[100%] h-[300px]"/>
            </div>
            <div className="w-[60%] p-2">
                <h3 className="m-2 text-[1.2em]">{sp.ten_sp}</h3>
                <p className="py-2">Giá gốc : {sp.gia} VNĐ</p>
                <p className="py-2">Khuyến mãi: {sp.gia_km} VNĐ</p>
                <p className="py-2">Ngày: {sp.ngay}</p>
                <p className="py-2">Xem : {sp.luot_xem}</p>
                <p className="py-2">Tính chất : {sp.tinh_chat}</p>
                <button type="button" className="text-white bg-green-700 rounded-lg px-5 py-1">
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    );
}
