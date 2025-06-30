
import React from 'react';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { AzureAuthButton } from '@/components/auth/AzureAuthButton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Search, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-semibold tracking-tight">CMS Admin</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Github className="w-5 h-5" />
              </button>
              <AzureAuthButton />
            </div>
          </div>
        </div>
      </header>
      <AdminPanel />
    </div>
  );
};

export default Admin;
