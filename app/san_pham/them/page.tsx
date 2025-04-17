// == Lab 6 == http://localhost:3001/san_pham/them
import { LoaiModel } from "@/app/lib/models";
export default async function ThemSP() {
  const loai_arr = await LoaiModel.findAll();

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 bg-yellow-400 text-black p-3 rounded-lg text-center">
          ➕ Thêm Sản Phẩm
        </h1>
        <form action="/api/san_pham" method="POST" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="font-semibold text-gray-700">Tên sản phẩm</label>
              <input type="text" name="ten_sp" required className="border p-2 w-full rounded" />
            </div>
            <div>
              <label className="font-semibold text-gray-700">Hình ảnh (URL)</label>
              <input type="text" name="hinh" className="border p-2 w-full rounded" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="font-semibold text-gray-700">Giá gốc</label>
              <input type="number" name="gia" required className="border p-2 w-full rounded" />
            </div>
            <div>
              <label className="font-semibold text-gray-700">Giá KM</label>
              <input type="number" name="gia_km" required className="border p-2 w-full rounded" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="font-semibold text-gray-700">Ngày</label>
              <input type="date" name="ngay" required className="border p-2 w-full rounded" />
            </div>
            <div>
              <label className="font-semibold text-gray-700">Loại sản phẩm</label>
              <select name="id_loai" className="border p-2 w-full rounded">
                {loai_arr.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.ten_loai}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <label className="font-semibold text-gray-700">Ẩn/Hiện:</label>
              <input type="radio" name="an_hien" value="1" defaultChecked /> Hiện
              <input type="radio" name="an_hien" value="0" /> Ẩn
            </div>
            <div className="flex items-center space-x-4">
              <label className="font-semibold text-gray-700">Nổi bật:</label>
              <input type="radio" name="hot" value="1" defaultChecked /> Nổi bật
              <input type="radio" name="hot" value="0" /> Bình thường
            </div>
          </div>

          <button type="submit" className="bg-yellow-500 text-black w-full p-3 rounded-lg font-semibold shadow-md hover:bg-yellow-600 transition">
            ➕ Thêm sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
}
