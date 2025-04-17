"use client";
import { useState } from "react";

export default function NutSuaSP({ id, ten_sp }: { id: number, ten_sp: string }) {
  const [newName, setNewName] = useState(ten_sp);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!confirm("Cập nhật sản phẩm này hả?")) return;
    
    const res = await fetch(`/api/san_pham/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ten_sp: newName })
    });

    if (res.ok) {
      alert("Cập nhật thành công!");
      setIsEditing(false);
    } else {
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="inline-block">
      {!isEditing ? (
        <button onClick={handleEdit} className="bg-blue-500 text-white px-3 py-1 rounded shadow-md hover:bg-blue-600 transition">
          ✏️ Sửa
        </button>
      ) : (
        <div className="bg-white p-4 shadow-lg rounded">
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="border p-2 w-full mb-2" />
          <button onClick={handleUpdate} className="bg-green-500 text-white px-3 py-1 rounded shadow-md hover:bg-green-600 transition">
            ✅ Lưu
          </button>
        </div>
      )}
    </div>
  );
}
