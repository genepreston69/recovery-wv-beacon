import React from 'react';
import { CrisisBar } from '@/components/CrisisBar';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MessageCircle, Search, Users, BookOpen, Smartphone, Heart, Calendar, Shield } from 'lucide-react';

const HelpLoved = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CrisisBar />

      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Help a Loved One</h1>
          <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-8">
            When someone you care about is struggling with substance use, you're not alone. 
            Find support, resources, and evidence-based strategies to help your loved one 
            while taking care of yourself.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Immediate Help Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
              Immediate Support & Resources
            </h2>
            <p className="text-lg text-gray-600">
              Connect with professionals and find help for your loved one today
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Phone className="w-8 h-8" />
                  24/7 National Helpline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  SAMHSA's free, confidential treatment referral service for individuals and families facing substance use disorders.
                </p>
                <div className="mb-4">
                  <strong className="text-lg">1-800-662-HELP (4357)</strong><br />
                  <small className="text-gray-500">Text your ZIP to 435748 (HELP4U)</small>
                </div>
                <a href="tel:1-800-662-4357">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Call Now →
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <MessageCircle className="w-8 h-8" />
                  Crisis Text Line
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Free, 24/7 support for those in crisis. Text with a trained crisis counselor for immediate emotional support.
                </p>
                <div className="mb-4">
                  <strong className="text-lg">Text HOME to 741741</strong>
                </div>
                <a href="sms:741741">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Text Now →
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Search className="w-8 h-8" />
                  Find Treatment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Search for substance use treatment facilities, support groups, and healthcare providers in your area.
                </p>
                <a href="https://findtreatment.gov" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Search Treatment Options →
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Support Groups Section */}
        <section className="bg-blue-50 rounded-xl p-8 mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-700 text-center mb-4">
            Family Support Groups
          </h3>
          <p className="text-center text-gray-600 mb-8">
            Connect with others who understand what you're going through
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
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
            ].map((group, index) => (
              <Card key={index} className="bg-white text-center">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-800 mb-2">{group.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{group.description}</p>
                  <a 
                    href={group.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Find a Meeting →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CRAFT Section */}
        <section className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 md:p-12 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6">
              Learn About CRAFT
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Community Reinforcement and Family Training (CRAFT) is an evidence-based approach that helps families motivate their loved ones to seek treatment while improving their own lives.
            </p>
            
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[
                { stat: "70% Success Rate", desc: "Getting loved ones into treatment" },
                { stat: "Positive Communication", desc: "Learn effective strategies" },
                { stat: "Self-Care Focus", desc: "Improve your own wellbeing" },
                { stat: "Non-Confrontational", desc: "Build bridges, not walls" }
              ].map((benefit, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="font-bold text-blue-700 mb-2">{benefit.stat}</div>
                    <div className="text-sm text-gray-600">{benefit.desc}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
              Find CRAFT Programs
            </Button>
          </div>
        </section>

        {/* Educational Resources */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
              Educational Resources
            </h2>
            <p className="text-lg text-gray-600">
              Understanding addiction and learning how to help
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Understanding Substance Use Disorder",
                description: "Learn about addiction as a disease, signs and symptoms, and how it affects the brain and behavior."
              },
              {
                title: "Setting Healthy Boundaries",
                description: "Discover how to support your loved one while protecting your own mental health and wellbeing."
              },
              {
                title: "Effective Communication",
                description: "Learn how to have difficult conversations about substance use without judgment or confrontation."
              },
              {
                title: "Stages of Change",
                description: "Understand the recovery process and how to support your loved one through each stage."
              },
              {
                title: "Self-Care for Families",
                description: "Remember that you can't pour from an empty cup. Learn strategies for maintaining your own health."
              },
              {
                title: "When to Seek Professional Help",
                description: "Recognize when it's time to involve professionals and what treatment options are available."
              }
            ].map((resource, index) => (
              <Card key={index} className="border-l-4 border-l-blue-600 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">{resource.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{resource.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Resources */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
              Additional Resources
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive support for every step of the journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <BookOpen className="w-8 h-8" />
                  Family Education Program
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Free online courses and webinars designed to help families understand and cope with addiction.
                </p>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Explore Programs →
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Users className="w-8 h-8" />
                  Parent Support Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Connect with other parents who are navigating their child's substance use challenges.
                </p>
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  Join Network →
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Smartphone className="w-8 h-8" />
                  Mobile Support Apps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Download apps that provide daily support, coping strategies, and connection to resources.
                </p>
                <Button className="w-full bg-purple-500 hover:bg-purple-600">
                  View Apps →
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Action Buttons at Bottom of Content */}
        <section className="text-center mt-16 mb-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              Get Immediate Help
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 w-full sm:w-auto"
            >
              Find Support Groups
            </Button>
          </div>
        </section>
      </div>

      {/* Footer CTA */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            You Don't Have to Do This Alone
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Recovery Point is here to support both you and your loved one on the journey to healing.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg">
            Contact Us Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HelpLoved;
