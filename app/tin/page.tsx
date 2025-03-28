// /app/tin/page.tsx
import Link from "next/link";
import { TinTucModel } from "../database";
export default async function ListSP() {
const tin_arr = await TinTucModel.findAll({
    where: { an_hien: 1 },
    order: [['ngay', 'DESC'], ['luot_xem', 'ASC']],
    offset: 0, limit: 6,
})
return (
    <div>
    <h2 className="text-[1.2em] bg-sky-500 text-white p-2 uppercase"> Danh sách bài viết </h2>
    <div className="grid grid-cols-2 gap-4 m-2">
        {tin_arr.map((tin) =>
        <div className="border border p-2 rounded-lg">
            <h3 className="text-sky-600 bold text-[1.1em] my-2">
                <Link href={`/tin/${tin.id}`}> {tin.tieu_de} </Link>
            </h3>
            <p className="text-justify text-[1.1em] leading-8 overflow-hidden">{tin.mo_ta}</p>
        </div>
        )}
    </div>
    </div>
)
}
