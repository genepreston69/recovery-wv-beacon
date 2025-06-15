
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, Heart, Users, Home, Stethoscope, Car, Calendar, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState({
    graduates: 1200,
    successRate: 90,
    ridesProvided: 24901,
    currentlyServed: 1041,
    livesChanged: 3500,
    familiesReunited: 850,
    communityHours: 27517,
    costSavings: 2.8
  });

  // Simulate real-time metric updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        ridesProvided: prev.ridesProvided + Math.floor(Math.random() * 3) + 1,
        communityHours: prev.communityHours + Math.floor(Math.random() * 5) + 1,
        currentlyServed: prev.currentlyServed + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleCrisisCall = () => {
    window.location.href = 'tel:304-523-4673';
  };

  const handleCrisisChat = () => {
    toast({
      title: "🚨 Crisis Chat Initiated",
      description: "Connecting you with a certified peer recovery specialist. This is a safe, confidential space.",
      duration: 5000,
    });
  };

  const handlePathwaySelect = (type: string) => {
    const pathwayMessages = {
      individual: "Connecting you with intake coordinator... Next steps: Complete brief assessment, Schedule facility tour, Begin program within 24-48 hours",
      family: "Family Support Resources: Family therapy sessions, Support group meetings, Educational workshops, 24/7 family helpline",
      professional: "Professional Referral System: Secure online referral portal, Direct communication with intake team, Progress updates",
      support: "Make an Impact Today: $32 sponsors one day of recovery housing, $160 sponsors one week of support"
    };

    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Support`,
      description: pathwayMessages[type as keyof typeof pathwayMessages],
      duration: 6000,
    });
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

  const impactMetrics = [
    { label: 'Lives Transformed', value: metrics.livesChanged, suffix: '+', color: 'text-yellow-400' },
    { label: 'Families Reunited', value: metrics.familiesReunited, suffix: '+', color: 'text-blue-400' },
    { label: 'Community Service Hours', value: metrics.communityHours.toLocaleString(), suffix: '', color: 'text-green-400' },
    { label: 'Healthcare Cost Savings', value: `$${metrics.costSavings}M`, suffix: '', color: 'text-purple-400' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Crisis Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <span className="font-semibold">🚨 Need Help Now? Crisis Line: (304) 523-HOPE (4673)</span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
              onClick={handleCrisisChat}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Crisis Chat
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
              onClick={handleCrisisCall}
            >
              <Phone className="w-4 h-4 mr-1" />
              Call Now
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md sticky top-[52px] z-40 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-green-700">
            Recovery Point WV
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#programs" className="text-gray-700 hover:text-green-600 transition-colors">Programs</a>
            <a href="#locations" className="text-gray-700 hover:text-green-600 transition-colors">Locations</a>
            <a href="#success" className="text-gray-700 hover:text-green-600 transition-colors">Success Stories</a>
            <a href="#support" className="text-gray-700 hover:text-green-600 transition-colors">Get Support</a>
            <a href="#donate" className="text-gray-700 hover:text-green-600 transition-colors">Donate</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Recovery is <span className="text-yellow-400">Possible</span>
            </h1>
            <p className="text-xl text-blue-100">
              Free, long-term recovery programs across West Virginia. No cost. No barriers. 
              Just hope, healing, and a new beginning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
                onClick={() => handlePathwaySelect('individual')}
              >
                I Need Help Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 rounded-full transition-all duration-300"
                onClick={() => handlePathwaySelect('family')}
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

      {/* Pathways Section */}
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
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
                onClick={() => handlePathwaySelect(pathway.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${pathway.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {pathway.icon}
                  </div>
                  <CardTitle className="text-blue-700 group-hover:text-blue-800 transition-colors">
                    {pathway.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-6">
                    {pathway.description}
                  </CardDescription>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-full">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Dashboard */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Real-Time Community Impact</h2>
            <p className="text-xl text-green-100">See the difference we're making together, updated daily</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-0 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <CardContent className="p-8">
                  <div className={`text-4xl font-bold mb-2 ${metric.color}`}>
                    {metric.value}{metric.suffix}
                  </div>
                  <div className="text-white/90">{metric.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Recovery Success Stories</h2>
          <p className="text-xl text-gray-600 mb-12">Real people, real recovery, real hope</p>
          
          <Card className="bg-gray-50 border-0 shadow-lg">
            <CardContent className="p-12">
              <blockquote className="text-2xl italic text-gray-700 mb-6">
                "Recovery Point gave me more than sobriety - they gave me my life back. 
                Today I'm a certified peer recovery specialist helping others find their way."
              </blockquote>
              <div className="text-blue-600 font-semibold">- Sarah M., Graduate 2023</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Actions */}
      <section id="support" className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-700 mb-4">Take Action Today</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Home className="w-6 h-6" />
                  Make a Bed Campaign
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  $32 provides one day of housing and support for someone in recovery.
                </p>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 rounded-full">
                  Sponsor a Bed
                </Button>
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
                  Volunteer to Drive
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      <div 
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg z-40"
        onClick={() => toast({
          title: "💬 Live Chat",
          description: "Hi! I'm here to help. Whether you need immediate support or just have questions about our programs, I'm ready to listen.",
          duration: 5000,
        })}
      >
        <MessageCircle className="w-6 h-6" />
      </div>
    </div>
  );
};

export default Index;
