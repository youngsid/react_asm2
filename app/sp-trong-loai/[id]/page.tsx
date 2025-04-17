import { ISanPham, ILoai } from "@/app/cautrucdata";
import Show1SP from "@/app/components/Show1SP";

export default async function SPTrongLoai({ params }: { params: { id: number } }) {
    let id_loai = params.id;

    // Fetch sản phẩm trong loại
    let resSP = await fetch(`http://localhost:3000/api/sptrongloai/${id_loai}`);
    let sp_arr: ISanPham[] = await resSP.json();

    // Fetch thông tin loại
    let resLoai = await fetch(`http://localhost:3000/api/loai/${id_loai}`);
    let loai: ILoai = await resLoai.json();

    return (
        <div id="sptrongloai" className="container mx-auto p-4">
            <h2 className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white p-3 my-4 text-2xl font-bold uppercase rounded-lg shadow-md">
                {loai.ten_loai}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {sp_arr.map((sp) => (
                    <Show1SP key={sp.id} sp={sp} />
                ))}
            </div>
        </div>
    );
}
