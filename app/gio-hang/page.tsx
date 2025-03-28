// lab 4
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
        <div className="mx-auto w-[1000px] border-2 border-black">
        <h2 className="text-[1.1em] bg-amber-300 p-1">Giỏ hàng của bạn</h2>
        {cart_arr.map((sp: ICart, index: number) => {
            return (
            <div key={index} className="flex m-0 border border-black p-2">
                <div className="w-[300px]">{sp.ten_sp}</div>
                <div className="w-[150px]">
                <input type="number" defaultValue={sp.so_luong} className="w-[100%] text-center"
                    onClick={(event) =>dispatch(suaSL([sp.id, (event.target as HTMLInputElement).value]))}/>
                </div>
                <div className="w-[200px] text-right">
                {Number(sp.gia_mua).toLocaleString("vi")} VNĐ
                </div>
                <div className="w-[200px] text-right">
                {Number(sp.gia_mua * sp.so_luong).toLocaleString("vi")} VNĐ
                </div>
                <div className="w-[150px] text-right">
                <a className="bg-gray-400 w-8 h-8 text-center text-white rounded-3xl inline-block"
                href="#" onClick={ ()=>dispatch(xoaSP(sp.id)) }> x  </a>
                </div>
            </div>
            );
        })}
        <div className="p-2">
            <Link href='/thanh-toan' className="text-[0.8em] px-4 py-2 bg-amber-300 rouded">
                Thanh toán
            </Link>
        </div>

        </div>
    );
    }
