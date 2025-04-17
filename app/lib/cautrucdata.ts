// lab 5
export interface ILoai {
    id: number;
    ten_loai: string;
    thu_tu: number;
    an_hien: number;
}
// lab 6
export interface ISanPham {
    id: number;
    ten_sp: string;
    slug: string;
    gia: number;
    gia_km: number;
    ngay: string;
    hinh: string;
    id_loai: number;
    luot_xem: number;
    hot: boolean;
    an_hien: boolean;
    tinh_chat: string;
  }
  

export interface ICart {
    id : number 
    ten_sp: string;
    so_luong:number;
    gia_mua : number;
    hinh: string;
}

