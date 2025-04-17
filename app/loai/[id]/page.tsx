// LAB 5
import { LoaiModel } from "@/app/lib/models";
import { ILoai } from "@/app/lib/cautrucdata";

export default async function SuaLoai({ params }: { params: { id: string } }) {
  let id = Number(params.id);

  const response = await fetch(`${process.env.APP_URL}/api/loai/${id}`);
  if (!response.ok) return <p className="text-red-500">Lỗi API, không thể lấy dữ liệu</p>;

  const loai: ILoai | null = await response.json();
  if (!loai) return <p className="text-red-500">Loại không tồn tại</p>;

  return (
    <div className="p-1 border">
      <h1 className="text-xl font-bold mb-4 bg-orange-300 p-2">Chỉnh sửa loại</h1>
      <form action={`/api/loai/${id}`} method="POST" className="space-y-4 px-2">
        <input type="hidden" name="_method" value="PUT" />
        <div className="">Tên loại
          <input type="text" name="ten_loai" defaultValue={loai.ten_loai ?? ""} className="border p-2 w-full"/>
        </div>
        <div className=""> Thứ tự
          <input type="number" name="thu_tu" defaultValue={loai.thu_tu ?? 0} className="border p-2 w-full"/>
        </div>
        <div className=""> Ẩn/Hiện
          <input type="radio" name="an_hien" value="1" defaultChecked={Boolean(loai.an_hien)} className="ml-4"/>Hiện
          <input type="radio" name="an_hien" value="0" defaultChecked={!Boolean(loai.an_hien)} className="ml-4"/>Ẩn
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Lưu loại</button>
      </form>
    </div>
  );
}
