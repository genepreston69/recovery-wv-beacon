
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const supportGroups = [
  {
    name: "Al-Anon Family Groups",
    description: "For families and friends affected by someone's drinking",
    link: "https://al-anon.org"
  },
  {
    name: "Nar-Anon",
    description: "12-step program for families affected by addiction",
    link: "https://nar-anon.org"
  },
  {
    name: "SMART Recovery Family",
    description: "Science-based support for families and friends",
    link: "https://www.smartrecovery.org/family/"
  },
  {
    name: "Families Anonymous",
    description: "For relatives concerned about drug use or behavioral problems",
    link: "https://www.familiesanonymous.org"
  }
];

export const SupportGroupsSection = () => {
  return (
    <section className="bg-blue-50 rounded-xl p-8 mb-16">
      <h3 className="text-2xl md:text-3xl font-bold text-blue-700 text-center mb-4">
        Family Support Groups
      </h3>
      <p className="text-center text-gray-600 mb-8">
        Connect with others who understand what you're going through
      </p>
      
      <div className="grid md:grid-cols-4 gap-6 items-stretch">
        {supportGroups.map((group, index) => (
          <Card key={index} className="bg-white text-center h-full flex flex-col">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="card-content flex-grow">
                <h4 className="font-semibold text-gray-800 mb-2">{group.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{group.description}</p>
              </div>
              <div className="card-action">
                <a 
                  href={group.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Find a Meeting →
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
