
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const craftBenefits = [
  { stat: "70% Success Rate", desc: "Getting loved ones into treatment" },
  { stat: "Positive Communication", desc: "Learn effective strategies" },
  { stat: "Self-Care Focus", desc: "Improve your own wellbeing" },
  { stat: "Non-Confrontational", desc: "Build bridges, not walls" }
];

export const CraftSection = () => {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 md:p-12 mb-16">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6">
          Learn About CRAFT
        </h3>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          Community Reinforcement and Family Training (CRAFT) is an evidence-based approach that helps families motivate their loved ones to seek treatment while improving their own lives.
        </p>
        
        <div className="grid md:grid-cols-4 gap-6 mb-8 items-stretch">
          {craftBenefits.map((benefit, index) => (
            <Card key={index} className="bg-white h-full flex flex-col">
              <CardContent className="p-6 text-center flex flex-col h-full">
                <div className="card-content flex-grow">
                  <div className="font-bold text-blue-700 mb-2">{benefit.stat}</div>
                  <div className="text-sm text-gray-600">{benefit.desc}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
          Find CRAFT Programs
        </Button>
      </div>
    </section>
  );
};
