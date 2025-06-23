import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Heart, DollarSign, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const MakeABedCampaign = () => {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-blue-700 mb-4">Make A Bed Campaign</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Partner with Recovery Point West Virginia to provide housing and support for individuals 
              with substance use disorders at no cost to them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Heart className="w-6 h-6" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  We believe in caring for individuals with substance use disorders at no cost to them. 
                  Our "Make A Bed" responsibility teaches us to prioritize the needs of those we serve 
                  above our own comfort and convenience.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <DollarSign className="w-6 h-6" />
                  The Financial Reality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total daily cost per person:</span>
                    <span className="font-semibold text-lg">$47</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">State funding received:</span>
                    <span className="font-semibold text-green-600">$18</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Daily deficit per person:</span>
                    <span className="font-bold text-red-600 text-xl">$29</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-xl mb-12 bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-2xl">
                <Users className="w-8 h-8" />
                How You Can Help
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 text-lg mb-6 leading-relaxed">
                Your sponsorship of $47 provides one full day of housing, meals, counseling, 
                and comprehensive support services for someone on their recovery journey. 
                Every donation directly impacts a life and helps bridge the gap between 
                state funding and the true cost of care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full"
                >
                  Sponsor a Bed - $47
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 rounded-full"
                >
                  Monthly Sponsorship
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Together, we can ensure that financial barriers never prevent someone from receiving the help they need.
            </p>
            <Link to="/">
              <Button variant="outline" className="rounded-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeABedCampaign;
