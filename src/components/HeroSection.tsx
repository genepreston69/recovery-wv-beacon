import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleGetStarted = () => {
    console.log('Get Started button clicked - navigating to /intake');
    navigate('/intake');
  };

  const handleHelpSomeone = () => {
    console.log('Help Someone I Love button clicked - navigating to /helploved');
    navigate('/helploved');
  };

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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
              onClick={handleGetStarted}
            >
              I Need Help Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 rounded-full transition-all duration-300"
              onClick={handleHelpSomeone}
            >
              Help Someone I Love
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
