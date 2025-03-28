import Image from "next/image";
import Show1SP from "./components/Show1SP";
import { ISanPham } from "./cautrucdata";
export default async function Home() {
let resHot = await fetch("http://localhost:3000/api/sphot/6");
let sp_hot = await resHot.json();
let resMoi = await fetch("http://localhost:3000/api/spmoi/9");
let sp_moi = await resMoi.json();

return (
<div className="home">
    <div className="home">
        <div className="sphot">
            <h2 className="bg-emerald-50 p-2 my-2 text-[1.2em] uppercase"> Sản phẩm nổi bật </h2>
            <div className="grid grid-cols-3 gap-4">
                {sp_hot.map((sp: ISanPham) => <Show1SP key={sp.id} sp={sp} />)}
            </div>
        </div>
        <div className="spmoi">
            <h2 className="bg-emerald-50 p-2 my-2 text-[1.2em] uppercase"> Sản phẩm nổi bật </h2>
            <div className="grid grid-cols-3 gap-4">
                {sp_moi.map((sp: ISanPham) => <Show1SP key={sp.id} sp={sp} />)}
            </div>
        </div>
    </div>
</div>
);
}
