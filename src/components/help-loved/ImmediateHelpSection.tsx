
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MessageCircle, Search } from 'lucide-react';

export const ImmediateHelpSection = () => {
  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
          Immediate Support & Resources
        </h2>
        <p className="text-lg text-gray-600">
          Connect with professionals and find help for your loved one today
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 items-stretch">
        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Phone className="w-8 h-8" />
              24/7 National Helpline
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div className="card-content flex-grow">
              <p className="text-gray-600 mb-4">
                SAMHSA's free, confidential treatment referral service for individuals and families facing substance use disorders.
              </p>
              <div className="mb-4">
                <strong className="text-lg">1-800-662-HELP (4357)</strong><br />
                <small className="text-gray-500">Text your ZIP to 435748 (HELP4U)</small>
              </div>
            </div>
            <div className="card-action">
              <a href="tel:1-800-662-4357">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Call Now →
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <MessageCircle className="w-8 h-8" />
              Crisis Text Line
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div className="card-content flex-grow">
              <p className="text-gray-600 mb-4">
                Free, 24/7 support for those in crisis. Text with a trained crisis counselor for immediate emotional support.
              </p>
              <div className="mb-4">
                <strong className="text-lg">Text HOME to 741741</strong>
              </div>
            </div>
            <div className="card-action">
              <a href="sms:741741">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Text Now →
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Search className="w-8 h-8" />
              Find Treatment
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div className="card-content flex-grow">
              <p className="text-gray-600 mb-4">
                Search for substance use treatment facilities, support groups, and healthcare providers in your area.
              </p>
            </div>
            <div className="card-action">
              <a href="https://findtreatment.gov" target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Search Treatment Options →
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
