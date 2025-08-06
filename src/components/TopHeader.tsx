import React from 'react';
import { AzureAuthButton } from '@/components/auth/AzureAuthButton';

export const TopHeader = () => {
  return (
    <div className="bg-blue-600 text-white py-2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Recovery Point West Virginia</span>
          </div>
          <div className="flex items-center">
            <AzureAuthButton />
          </div>
        </div>
      </div>
    </div>
  );
};