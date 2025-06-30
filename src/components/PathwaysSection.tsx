import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Heart, Stethoscope, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PathwaysSectionProps {
  onPathwaySelect: (type: string) => void;
}

export const PathwaysSection = ({ onPathwaySelect }: PathwaysSectionProps) => {
  const navigate = useNavigate();

  const handlePathwayClick = (pathwayId: string) => {
    console.log(`Pathway ${pathwayId} clicked - navigating...`);
    
    // Navigate to appropriate page based on pathway
    switch (pathwayId) {
      case 'individual':
        navigate('/intake');
        break;
      case 'family':
        onPathwaySelect(pathwayId);
        navigate('/helploved');
        break;
      case 'professional':
        onPathwaySelect(pathwayId);
        break;
      case 'support':
        onPathwaySelect(pathwayId);
        break;
      default:
        break;
    }
  };

  const pathways = [
    {
      id: 'individual',
      icon: <Users className="w-8 h-8" />,
      title: 'I Need Help',
      description: 'Ready to start your recovery journey? Get immediate support and program information.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'family',
      icon: <Heart className="w-8 h-8" />,
      title: 'Help a Loved One',
      description: 'Learn how to support someone struggling with addiction and get family resources.',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: 'professional',
      icon: <Stethoscope className="w-8 h-8" />,
      title: 'Professional Referral',
      description: 'Healthcare providers and social workers: refer clients to our programs.',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'support',
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Donate & Volunteer',
      description: 'Support our mission by contributing time, resources, or funding.',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section id="programs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Choose Your Path to Recovery</h2>
          <p className="text-xl text-gray-600">Every journey is unique. Find the right support for your situation.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pathways.map((pathway) => (
            <Card 
              key={pathway.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg flex flex-col h-full"
              onClick={() => handlePathwayClick(pathway.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${pathway.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {pathway.icon}
                </div>
                <CardTitle className="text-blue-700 group-hover:text-blue-800 transition-colors">
                  {pathway.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center flex flex-col flex-grow">
                <CardDescription className="mb-6 flex-grow">
                  {pathway.description}
                </CardDescription>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-full mt-auto">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
