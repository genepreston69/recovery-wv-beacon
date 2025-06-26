
import React from 'react';
import { Button } from '@/components/ui/button';

export const FooterCTA = () => {
  return (
    <section className="bg-blue-600 text-white py-16 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          You Don't Have to Do This Alone
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Recovery Point is here to support both you and your loved one on the journey to healing.
        </p>
        <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg">
          Contact Us Today
        </Button>
      </div>
    </section>
  );
};
