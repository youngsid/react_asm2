"use client";
import { useRouter } from "next/navigation";

export default function NutXoaSP({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Xóa sản phẩm này hả?")) return;
    const res = await fetch(`/api/san_pham/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
    else alert("Xóa thất bại!");
  };

  return (
    <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 ml-2 rounded shadow-md hover:bg-red-600 transition">
      🗑️ Xóa
    </button>
  );
}
