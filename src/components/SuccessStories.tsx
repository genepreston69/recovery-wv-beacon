
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const SuccessStories = () => {
  return (
    <section id="success" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">Recovery Success Stories</h2>
        <p className="text-xl text-gray-600 mb-12">Real people, real recovery, real hope</p>
        
        <Card className="bg-gray-50 border-0 shadow-lg">
          <CardContent className="p-12">
            <blockquote className="text-2xl italic text-gray-700 mb-6">
              "Recovery Point gave me more than sobriety - they gave me my life back. 
              Today I'm a certified peer recovery specialist helping others find their way."
            </blockquote>
            <div className="text-blue-600 font-semibold">- Sarah M., Graduate 2023</div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
