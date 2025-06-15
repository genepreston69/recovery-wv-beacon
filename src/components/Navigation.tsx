
import React from 'react';

export const Navigation = () => {
  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-[52px] z-40 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/3b28a01a-7eb2-4e2f-8c08-eb963c70d76b.png" 
            alt="Recovery Point West Virginia" 
            className="h-16 w-auto"
          />
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#programs" className="text-gray-700 hover:text-green-600 transition-colors">Programs</a>
          <a href="#locations" className="text-gray-700 hover:text-green-600 transition-colors">Locations</a>
          <a href="#success" className="text-gray-700 hover:text-green-600 transition-colors">Success Stories</a>
          <a href="#support" className="text-gray-700 hover:text-green-600 transition-colors">Get Support</a>
          <a href="#donate" className="text-gray-700 hover:text-green-600 transition-colors">Donate</a>
        </div>
      </div>
    </nav>
  );
};
