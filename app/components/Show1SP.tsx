"use client"
import Link from "next/link";
import { ISanPham } from "../cautrucdata";
import { useDispatch } from "react-redux";
import { themSP } from "../lib/cartSlice";
export default function Show1SP(props: any) {
    let sp = props.sp as ISanPham;
    const dispatch = useDispatch()
    return (
        <div className="text-center border border-black p-[10px]">
            <h3 className="m-2 text-[1.1em] h-[60px]">
                <Link href={`/sp/${sp.id}`}>{sp.ten_sp}</Link>
            </h3>
            <img src={sp.hinh} className="w-[100%] h-[250px]" />
            <p className="py-2">Giá: {Number(sp.gia_km).toLocaleString("vi")} VNĐ</p>
            <p className="py-2">Cập nhật: {new Date(sp.ngay).toLocaleDateString("vi")}</p>
            <p className="py-2">Lượt xem: {sp.luot_xem}</p>
            <button 
                onClick={() => dispatch(themSP(sp))} 
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 rounded-lg text-sm px-5 py-1.5">
                Thêm vào giỏ
            </button>
        </div>
    );
}
