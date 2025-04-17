import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // Đổi tên import để dễ hiểu hơn

export const store = configureStore({
    reducer: {
        cart: cartReducer, // Quản lý giỏ hàng
        // Thêm các reducer khác nếu có
    },
    devTools: process.env.NODE_ENV !== "production", // Bật DevTools khi đang phát triển
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
