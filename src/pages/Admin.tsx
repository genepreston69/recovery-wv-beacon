
import React from 'react';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { AuthButton } from '@/components/auth/AuthButton';

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-blue-700">Recovery Point Admin</div>
            <AuthButton />
          </div>
        </div>
      </nav>
      <AdminPanel />
    </div>
  );
};

export default Admin;
