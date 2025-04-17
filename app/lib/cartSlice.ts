import { createSlice, current } from "@reduxjs/toolkit";
import { ISanPham, ICart } from "../cautrucdata";
import { after } from "node:test";

export const cartSlice = createSlice({
    name: "cart",
    initialState: { listSP: [] as ICart[], order: {} },
    reducers: {
        // Thêm sản phẩm vào giỏ
        themSP: (state, { payload }: { payload: ISanPham }) => {
            let index = state.listSP.findIndex((s) => s.id === payload.id);
            if (index >= 0) {
                state.listSP[index].so_luong++;
            } else {
                state.listSP.push({
                    id: payload.id,
                    ten_sp: payload.ten_sp,
                    so_luong: 1,
                    gia_mua: payload.gia_km,
                    hinh: payload.hinh || "/default.jpg", // Hiển thị hình ảnh sản phẩm hoặc ảnh mặc định
                });
            }
            console.log("Đã thêm sản phẩm:", JSON.stringify(current(state).listSP, null, 2));
            alert(`Đã thêm sản phẩm vào giỏ hàng thành công`)
        },

        // Sửa số lượng sản phẩm
        suaSL: (state, { payload }: { payload: [number, number] }) => {
            let [id, so_luong] = payload;
            let index = state.listSP.findIndex((s) => s.id === id);
            if (index !== -1 && so_luong > 0) {
                state.listSP[index].so_luong = so_luong;
            }
            console.log("Đã cập nhật số lượng:", JSON.stringify(payload));
            alert(`Số lượng đã được cập nhật`)
        },

        // Xóa sản phẩm khỏi giỏ hàng
        xoaSP: (state, { payload }: { payload: number }) => {
            state.listSP = state.listSP.filter((s) => s.id !== payload);
            console.log("Đã xóa sản phẩm có ID:", payload);
            alert(`Đã xóa sản phẩm thành công`)
        },

        // Xóa toàn bộ giỏ hàng
        xoaGH: (state) => {
            state.listSP = [];
            console.log("Đã xóa toàn bộ giỏ hàng.");
            alert(`Đã xóa toàn bộ sản phẩm`)
        },
    },
});

export const { themSP, suaSL, xoaSP, xoaGH } = cartSlice.actions;
export default cartSlice.reducer;
