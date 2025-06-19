
import React from 'react';
import { Button } from '@/components/ui/button';

interface Metrics {
  graduates: number;
  successRate: number;
  ridesProvided: number;
  currentlyServed: number;
}

interface HeroSectionProps {
  metrics: Metrics;
  onPathwaySelect: (type: string) => void;
}

export const HeroSection = ({ metrics, onPathwaySelect }: HeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Recovery is <span className="text-yellow-400">Possible</span>
          </h1>
          <p className="text-xl text-blue-100">
            <span className="font-bold">Free</span>, long-term recovery programs across West Virginia. No cost. No barriers. 
            Just hope, healing, and a new beginning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
              onClick={() => onPathwaySelect('individual')}
            >
              I Need Help Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 rounded-full transition-all duration-300"
              onClick={() => onPathwaySelect('family')}
            >
              Help Someone I Love
            </Button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 animate-scale-in">
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">{metrics.graduates.toLocaleString()}+</div>
              <div className="text-sm text-blue-100">Program Graduates</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">{metrics.successRate}%</div>
              <div className="text-sm text-blue-100">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">{metrics.ridesProvided.toLocaleString()}</div>
              <div className="text-sm text-blue-100">Transportation Rides</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">{metrics.currentlyServed.toLocaleString()}</div>
              <div className="text-sm text-blue-100">Currently Being Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
