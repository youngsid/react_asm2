"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ThanhMenu() {
const [search, setSearch] = useState("");
const router = useRouter();

const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
    router.push(`/tim-kiem?tu_khoa=${encodeURIComponent(search)}`);
      setSearch(""); // Xóa input sau khi tìm kiếm
    }
};

return (
    <nav className="flex items-center justify-between p-4 bg-gray-200">
      {/* Danh sách menu */}
    <ul className="flex items-center space-x-4">
    {[
        { href: "/", label: "Trang Chủ" },
        { href: "/sp/1", label: "Sản phẩm" },
        { href: "/tin", label: "Tin tức" },
        { href: "/lien-he", label: "Liên Hệ" },
        { href: "/users/dang-ky", label: "Đăng Ký" }, // Thay đổi đường dẫn
        { href: "/users/dang-nhap", label: "Đăng Nhập" }, // Thay đổi đường dẫn
        { href: "/gio-hang", label: "Giỏ hàng"},
        { href: "/thanh-toan", label: "Thanh toán"},
    ].map((item) => (
        <li key={item.href}>
            <Link href={item.href} className="p-2 hover:text-blue-500">
                {item.label}
            </Link>
        </li>
    ))}
</ul>


      {/* Ô tìm kiếm */}
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
    <input
        type="text"
        placeholder="Tìm sản phẩm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
        className="p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500 w-40"
    />
        <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
        Tìm kiếm
        </button>
    </form>
    </nav>
);
}
