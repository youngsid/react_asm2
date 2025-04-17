// == lAB 6 == http://localhost:3001/san_pham -- CÓ THỂ XOÁ SẢN PHẨM
import { ISanPham } from "../lib/cautrucdata";
import Link from "next/link";
import NutXoaSP from "./NutXoaSP"; // Import component xóa sản phẩm
import NutSuaSP from "./NutSuaSP"; // Import component sửa sản phẩm


export default async function ProductList() {
  const data = await fetch(`${process.env.APP_URL}/api/san_pham`);
  const sp_arr: ISanPham[] = await data.json() as ISanPham[];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📦 Danh sách sản phẩm</h1>
        <Link href="/san_pham/them" className="bg-yellow-400 text-black px-4 py-2 rounded-lg shadow-md hover:bg-yellow-500 transition">
          ➕ Thêm sản phẩm
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg shadow-md">
        <table className="w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-yellow-400 text-black text-left">
              <th className="p-4">ID</th>
              <th className="p-4">Tên sản phẩm</th>
              <th className="p-4">Giá</th>
              <th className="p-4 text-center">Hình</th>
              <th className="p-4">Ngày</th>
              <th className="p-4 text-center">Ẩn</th>
              <th className="p-4 text-center">Hot</th>
              <th className="p-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {sp_arr.map((sp: ISanPham) => (
              <tr key={sp.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-4">{sp.id}</td>
                <td className="p-4 font-semibold text-gray-700">{sp.ten_sp}</td>
                <td className="p-4 text-right text-green-600 font-bold">
                  {Number(sp.gia).toLocaleString("vi")} VNĐ
                </td>
                <td className="p-4 text-center">
                  <img src={sp.hinh} className="h-12 w-12 object-cover rounded shadow-md" />
                </td>
                <td className="p-4 text-gray-600">
                  {new Date(sp.ngay).toLocaleDateString("vi", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="p-4 text-center text-gray-600">
                  {sp.an_hien ? "✅" : "❌"}
                </td>
                <td className="p-4 text-center text-gray-600">
                  {sp.hot ? "🔥" : "❌"}
                </td>
                {/* CẬP NHẬT THÊM NÚT SỬA SẢN PHẨM */}
                <td className="p-4 text-center">
                    <NutSuaSP id={sp.id} ten_sp={sp.ten_sp} /> {/* Component sửa sản phẩm */}
                    <NutXoaSP id={sp.id} /> {/* Component xóa sản phẩm */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

