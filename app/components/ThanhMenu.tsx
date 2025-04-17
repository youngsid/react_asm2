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
        <nav className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-900 text-white shadow-md">
            {/* Danh sách menu */}
            <ul className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6 text-sm md:text-base font-medium">
                {[
                    { href: "/", label: "Trang Chủ" },
                    { href: "/sp/1", label: "Sản phẩm" },
                    { href: "/tin", label: "Tin tức" },
                    { href: "/lien-he", label: "Liên Hệ" },
                    { href: "/users/dang-ky", label: "Đăng Ký" },
                    { href: "/users/dang-nhap", label: "Đăng Nhập" },
                    { href: "/gio-hang", label: "Giỏ hàng" },
                    { href: "/thanh-toan", label: "Thanh toán" },
                ].map((item) => (
                    <li key={item.href}>
                        <Link href={item.href} className="p-2 hover:text-yellow-400 transition-colors">
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
            {/* Ô tìm kiếm */}
            <form onSubmit={handleSearch} className="flex items-center space-x-2 mt-3 md:mt-0">
                <input
                    type="text"
                    placeholder="Tìm sản phẩm..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                    className="p-2 border border-gray-600 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 w-48 md:w-56"
                />
                <button
                    type="submit"
                    className="p-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
                >
                    Tìm kiếm
                </button>
            </form>
        </nav>
    );
}
