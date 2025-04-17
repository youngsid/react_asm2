// == Lab 6 == 
import { SanPhamModel, LoaiModel } from "@/app/lib/models";
import { ISanPham , ILoai } from "@/app/lib/cautrucdata";

export default async function SuaSP({ params }: { params: { id: string } }) {
  const id = Number(params.id); // Tiếp nhận tham số id sản phẩm
  const res1 = await fetch(`${process.env.APP_URL}/api/loai`); // Lấy danh sách loại
  const loai_arr: ILoai[] = await res1.json() as ILoai[];

  const res2 = await fetch(`${process.env.APP_URL}/api/san_pham/${id}`); // Lấy sản phẩm theo ID
  if (res2.status == 404) return <p className="text-red-500">Sản phẩm không tồn tại</p>;
  const sp: ISanPham = await res2.json() as ISanPham;

  return (
    <div className="p-1 border">
  <h1 className="text-xl font-bold mb-4 bg-orange-300 p-2">Chỉnh sửa Sản Phẩm</h1>
  <form action={`/api/san_pham/${id}`} method="POST">
    <div className="flex justify-between mb-3">
      <div className="W-[48%]">Tên sản phẩm
        <input type="text" name="ten_sp" defaultValue={sp.ten_sp} className="border p-2 w-full" />
      </div>
      <div className="W-[48%]">Hình ảnh (URL)
        <input type="text" name="hinh" defaultValue={sp.hinh} className="border p-2 w-full" />
      </div>
    </div>
    <div className="flex justify-between mb-3">
      <div className="W-[48%]">Giá gốc
        <input type="number" name="gia" defaultValue={sp.gia} className="border p-2 w-full" />
      </div>
      <div className="W-[48%]">Giá KM
        <input type="number" name="gia_km" defaultValue={sp.gia_km} className="border p-2 w-full" />
      </div>
    </div>
    <div className="flex justify-between mb-3">
      <div className="W-[48%]">Ngày
        <input type="date" name="ngay" defaultValue={sp.ngay} className="border p-2 w-full" />
      </div>
      <div className="W-[48%]">Loại sản phẩm
        <select name="id_loai" className="border p-2 w-full" defaultValue={sp.id_loai}>
          {loai_arr.map((c: any) => <option key={c.id} value={c.id}>{c.ten_loai}</option>)}
        </select>
      </div>
    </div>
    <div className="flex justify-between mb-3">
      <div className="W-[48%]">Ẩn/Hiện
        <input type="radio" name="an_hien" value="1" defaultChecked={sp.an_hien} className="ml-4"/> Hiện
        <input type="radio" name="an_hien" value="0" defaultChecked={!sp.an_hien} className="ml-4"/> Ẩn
      </div>
      <div className="W-[48%]">Nổi bật:
        <input type="radio" name="hot" value="1" defaultChecked={sp.hot} className="mx-4"/> Nổi bật
        <input type="radio" name="hot" value="0" defaultChecked={!sp.hot} className="mx-4"/> Bình thường
      </div>
    </div>
    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Lưu sản phẩm</button>
  </form>
</div>

  );
}
