import Link from "next/link";
import { TinTucModel } from "../database";

export default async function ListSP() {
    const tin_arr = await TinTucModel.findAll({
        where: { an_hien: 1 },
        order: [['ngay', 'DESC'], ['luot_xem', 'ASC']],
        offset: 0, limit: 6,
    });
    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-blue-600 text-white p-3 rounded-xl shadow-lg text-center uppercase">
                📰 Danh sách bài viết
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                {tin_arr.map((tin) => (
                    <div key={tin.id} className="border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition-all bg-white">
                        <h3 className="text-lg font-semibold text-sky-700 hover:text-sky-900 transition-colors mb-2">
                            <Link href={`/tin/${tin.id}`}>{tin.tieu_de}</Link>
                        </h3>
                        <p className="text-gray-600 text-[1em] leading-6 line-clamp-3 overflow-hidden">
                            {tin.mo_ta}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
