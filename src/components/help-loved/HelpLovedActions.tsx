
import React from 'react';
import { Button } from '@/components/ui/button';

export const HelpLovedActions = () => {
  return (
    <section className="text-center mt-16 mb-16">
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button 
          size="lg" 
          className="bg-blue-600 hover:bg-blue-700 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 w-full sm:w-auto"
        >
          Get Immediate Help
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 w-full sm:w-auto"
        >
          Find Support Groups
        </Button>
      </div>
    </section>
  );
};
