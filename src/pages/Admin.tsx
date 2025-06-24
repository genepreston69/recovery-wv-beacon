
import React from 'react';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { AuthButton } from '@/components/auth/AuthButton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="text-2xl font-bold text-blue-700">Recovery Point Admin</div>
            </div>
            <AuthButton />
          </div>
        </div>
      </nav>
      <AdminPanel />
    </div>
  );
};

export default Admin;
