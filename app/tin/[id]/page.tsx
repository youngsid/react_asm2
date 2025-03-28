// /app/tin/page.tsx
import { redirect } from 'next/navigation'
import { TinTucModel } from '@/app/database'
export default async function ChiTiet1Tin({ params }: { params: { id: string } }) {
const id = params.id
const tin = await TinTucModel.findByPk(id)
if (tin == null) redirect("/")
return (
    <div className='m-3 leading-8 text-justify'>
        <h1 className='text-[1.1em] bg-sky-500 text-white p-2'>{tin.tieu_de}</h1>
        <h3 className='bold text-[1.1em] leading-10'>{tin.mo_ta}</h3>
        <hr></hr>
        <p className='italic text-right my-3'>
            Cập nhật: {new Date(tin.ngay).toLocaleDateString("vi")}.
            Lượt xem: {tin.luot_xem}
        </p>
    <div dangerouslySetInnerHTML={{ __html: tin.noi_dung }} />
    </div>
)
}
