
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bed, Calendar, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

export const QuickActions = () => {
  return (
    <section id="support" className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Take Action Today</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Bed className="w-6 h-6" />
                Make a Bed Campaign
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                $47 provides one day of housing and support for someone in recovery.
              </p>
              <Link to="/make-a-bed-campaign">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 rounded-full">
                  Learn More
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Calendar className="w-6 h-6" />
                Schedule a Visit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Tour our facilities and meet our team to see our programs in action.
              </p>
              <Button className="w-full bg-green-500 hover:bg-green-600 rounded-full">
                Book a Tour
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Car className="w-6 h-6" />
                Routes to Recovery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Volunteer to drive someone to treatment, job interviews, or appointments.
              </p>
              <Button className="w-full bg-purple-500 hover:bg-purple-600 rounded-full">
                Become a Driver
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
