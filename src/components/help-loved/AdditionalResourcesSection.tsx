
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Smartphone } from 'lucide-react';

export const AdditionalResourcesSection = () => {
  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
          Additional Resources
        </h2>
        <p className="text-lg text-gray-600">
          Comprehensive support for every step of the journey
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 items-stretch">
        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <BookOpen className="w-8 h-8" />
              Family Education Program
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div className="card-content flex-grow">
              <p className="text-gray-600 mb-4">
                Free online courses and webinars designed to help families understand and cope with addiction.
              </p>
            </div>
            <div className="card-action">
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Explore Programs →
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Users className="w-8 h-8" />
              Parent Support Network
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div className="card-content flex-grow">
              <p className="text-gray-600 mb-4">
                Connect with other parents who are navigating their child's substance use challenges.
              </p>
            </div>
            <div className="card-action">
              <Button className="w-full bg-green-500 hover:bg-green-600">
                Join Network →
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Smartphone className="w-8 h-8" />
              Mobile Support Apps
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div className="card-content flex-grow">
              <p className="text-gray-600 mb-4">
                Download apps that provide daily support, coping strategies, and connection to resources.
              </p>
            </div>
            <div className="card-action">
              <Button className="w-full bg-purple-500 hover:bg-purple-600">
                View Apps →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
