import { LoaiModel } from "@/app/lib/models";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const loai = await LoaiModel.findByPk(params.id);
    if (!loai) return NextResponse.json({ thong_bao: "Không tìm thấy" }, { status: 404 });

    await loai.destroy();
    return NextResponse.redirect(new URL("/loai", req.url));
    // return NextResponse.json({ thong_bao: "Xóa thành công" });
}
