'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminDashboardPage = () => {
  const router = useRouter();
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const name = localStorage.getItem('adminName');

    if (!token) {
      router.push('/admin/dang-nhap');
    } else {
      setAdminName(name || 'Admin');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    router.push('/admin/dang-nhap');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Chào mừng, {adminName} 👋
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="p-6 border rounded-lg shadow hover:bg-gray-50 cursor-pointer"
            onClick={() => router.push('/admin/quan-ly-san-pham')}
          >
            <h2 className="text-xl font-semibold mb-2">📦 Quản lý sản phẩm</h2>
            <p>Thêm, sửa, xóa các sản phẩm trong cửa hàng.</p>
          </div>
          <div
            className="p-6 border rounded-lg shadow hover:bg-gray-50 cursor-pointer"
            onClick={() => router.push('/admin/quan-ly-don-hang')}
          >
            <h2 className="text-xl font-semibold mb-2">📋 Quản lý đơn hàng</h2>
            <p>Xem và duyệt các đơn hàng từ khách hàng.</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
