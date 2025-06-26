
import React from 'react';

interface Metrics {
  graduates: number;
  successRate: number;
  ridesProvided: number;
  currentlyServed: number;
}

interface HeroSectionProps {
  metrics: Metrics;
}

export const HeroSection = ({ metrics }: HeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Recovery is <span className="text-yellow-400">Possible</span>
          </h1>
          <p className="text-xl text-blue-100">
            <span className="font-bold">Free</span>, <span className="font-bold">long-term recovery programs across West Virginia. No cost. No barriers. 
            Just hope, healing, and a new beginning.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
