import { ISanPham , ILoai } from '@/app/cautrucdata';
import Show1SP from '@/app/components/Show1SP';

export default async function SPTrongLoai({ params }: { params: { id: number } }) {
    // Lấy tham số id trong route
    let id_loai = params.id;

    // Call API lấy sản phẩm trong loại
    let resSP = await fetch(`http://localhost:3000/api/sptrongloai/${id_loai}`);
    let kq_sp: any = await resSP.json();
    let sp_arr: ISanPham[] = kq_sp as ISanPham[];

    // Call API lấy loại
    let resLoai = await fetch(`http://localhost:3000/api/loai/${id_loai}`);
    let kq_loai: any = await resLoai.json();
    let loai: ILoai = kq_loai as ILoai;


    return (
        <div id="sptrongloai">
            <h2 className="bg-emerald-50 p-2 my-2 text-[1.2em] uppercase">
                Sản phẩm trong loại {loai.ten_loai}
            </h2>
            <div className="grid grid-cols-3 gap-4">
                {sp_arr.map((sp: ISanPham) => <Show1SP key={sp.id} sp={sp} />)}
            </div>
        </div>
    );
}
