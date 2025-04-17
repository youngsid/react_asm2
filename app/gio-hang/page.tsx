"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { ICart } from "../cautrucdata";
import { suaSL, xoaSP } from "../lib/cartSlice";
import Link from "next/link";

export default function GioHang() {
    let cart_arr: ICart[] = useSelector((state: RootState) => state.cart.listSP);
    const dispatch = useDispatch();
    
    return (
        <div className="mx-auto w-[1000px] border-2 border-black p-4 bg-gray-100 rounded-lg">
            <h2 className="text-[1.2em] bg-amber-300 p-2 font-bold">🛒 Giỏ hàng của bạn</h2>

            {cart_arr.length === 0 ? (
                <p className="text-center p-4 text-gray-500">Giỏ hàng trống. Hãy thêm sản phẩm! </p>
            ) : (
                cart_arr.map((sp: ICart, index: number) => (
                    <div key={index} className="flex items-center p-2 border-b border-gray-300">
                        <img src={sp.hinh} className="w-20 h-20 object-cover rounded-lg border" alt={sp.ten_sp} />

                        <div className="flex-1 px-4">
                            <div className="font-bold">{sp.ten_sp}</div>
                            <div className="text-gray-600">Giá: {Number(sp.gia_mua).toLocaleString("vi")} VNĐ</div>
                        </div>

                        <input 
                            type="number"
                            defaultValue={sp.so_luong}
                            min="1"
                            className="w-16 text-center border rounded-lg p-1"
                            onChange={(e) => dispatch(suaSL([sp.id, Number(e.target.value)]))}
                        />

                        <div className="w-32 text-right font-bold">
                            {Number(sp.gia_mua * sp.so_luong).toLocaleString("vi")} VNĐ
                        </div>

                        <button 
                            onClick={() => dispatch(xoaSP(sp.id))}
                            className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700">
                            
                        </button>
                    </div>
                ))
            )}

            <div className="text-center mt-4">
                <Link href="/thanh-toan" className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    Thanh toán 
                </Link>
            </div>
        </div>
    );
}
