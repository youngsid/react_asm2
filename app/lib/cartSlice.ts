// lab 4
import { createSlice } from '@reduxjs/toolkit'; //hàm tạo slice
import { current } from '@reduxjs/toolkit'; //current: lấy giá trị hiện tại trong store
import { ISanPham , ICart } from '../cautrucdata';
export const cartSlice = createSlice({
    name: 'cart',
    initialState: { listSP: [] as ICart[], order:{} },
    reducers: {
        // thêm sp
        themSP: (state, param) => {
            let sp = param.payload as ISanPham; //payload là {'id':'1','ten_sp'=>'A'}
            let index = state.listSP.findIndex((s:ICart) => s.id === sp.id);
            if (index >= 0) state.listSP[index].so_luong++;
            else {
                let c: ICart = {
                    id: sp.id,
                    ten_sp: sp.ten_sp,
                    so_luong: 1,
                    gia_mua: sp.gia_km,
                    hinh: sp.hinh
                };
                state.listSP.push(c); // thêm sp vào biến listSP trong store
            }
            console.log("Đã thêm sp vào store. listSP=", current(state).listSP);
        },
        // Sửa số lượng sản phẩm
        suaSL: (state, param) => {
            let id: number = Number(param.payload[0]);
            let so_luong: number = Number(param.payload[1]);
            let index = state.listSP.findIndex((s) => s.id === id);
            if (index !== -1) state.listSP[index].so_luong = so_luong;
            console.log("Đã sửa sp ", param);
        },
        // Xóa sản phẩm
        xoaSP: (state, param) => {
            let id: number = Number(param.payload);
            const index = state.listSP.findIndex((s) => s.id === id);
            if (index !== -1) state.listSP.splice(index, 1);
            console.log("Đã xóa sp ", param);
        },
        // Xóa giỏ hàng
        xoaGH: (state) => {
            state.listSP.length = 0;
            state.listSP = [];
            console.log("Đã xóa giỏ hàng");
        }
    },
});
export const { themSP, suaSL, xoaSP, xoaGH } = cartSlice.actions
export default cartSlice.reducer;
