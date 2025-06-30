
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

export const CrisisBar = () => {
  const handleCrisisCall = () => {
    window.location.href = 'tel:304-523-4673';
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <span className="font-semibold">🚨 Need Help Now? Crisis Line: (304) 523-HOPE (4673)</span>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
            onClick={handleCrisisCall}
          >
            <Phone className="w-4 h-4 mr-1" />
            Call Now
          </Button>
        </div>
      </div>
    </div>
  );
};
