import Link from "next/link";
import { ILoai } from "../lib/cautrucdata";

export default async function LoaiList() {
  const data = await fetch(`${process.env.APP_URL}/api/loai`);
  const loai_arr: ILoai[] = await data.json() as ILoai[];
  
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold uppercase">Danh sách loại</h1>
      <Link href="/loai/them" className="btn btn-primary float-right">Thêm loại</Link>
      <table className="table-auto w-full mt-4 border text-[1em]">
        <thead>
          <tr className="bg-gray-300">
            <th className="p-2">ID</th><th>Tên loại</th><th>Thứ tự</th>
            <th>Ẩn hiện</th><th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {loai_arr.map((loai: any) =>
            <tr key={loai.id} className="border-t">
              <td className="p-2">{loai.id}</td>
              <td className="p-2 text-center">{loai.ten_loai}</td>
              <td className="p-2 text-center">{loai.thu_tu}</td>
              <td className="p-2 text-center w-[200px]">{loai.an_hien ? "✅" : "❌"}</td>
              <td className="p-2 text-center w-[200px]">Sửa | Xóa</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
