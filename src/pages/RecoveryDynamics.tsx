
import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Heart, Users, Award, Globe, BookOpen } from 'lucide-react';

const RecoveryDynamics = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            🌀 Recovery Dynamics®
          </h1>
          <p className="text-2xl mb-8 opacity-90">
            A Structured Path to Lasting Sobriety
          </p>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg leading-relaxed">
              Recovery Dynamics® is a clinically grounded, 12-step-based treatment model—originally developed in Little Rock, AR in the 1970s—that delivers a structured, step-by-step path to recovery. Over the past 40+ years, it has expanded beyond Arkansas into 14 state-funded centers in Kentucky's Recovery Kentucky program, as well as treatment facilities in Japan, and is evolving into Ghana.
            </p>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Program Overview</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology with over four decades of success in guiding individuals toward lasting recovery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="h-full">
              <CardHeader>
                <Users className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>Core Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  28 Facilitated Group Sessions guide clients through all 12 Steps of Alcoholics Anonymous, facilitated by certified counselors within a residential treatment setting.
                </p>
                <p className="text-gray-600">
                  These sessions offer a gradual build-up—from acknowledging addiction (Step 1), through building hope and commitment (Steps 2–3), to engaging in a "searching and fearless moral inventory" (Steps 4–5)—and conclude with tools to maintain long-term sobriety (Steps 6–12).
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <Heart className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>Integration & Flexibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Designed to integrate seamlessly with evidence-based therapies like Motivational Interviewing (MI), Recovery Dynamics® enhances motivation and readiness for change by pairing MI's rapport-building with the depth of the 12 Step curriculum.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>Comprehensive Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-600 space-y-2">
                  <li>• Counselor Manuals provide session-by-session guidance</li>
                  <li>• Client Guidebooks include definitions, visuals, and charts for participants</li>
                  <li>• Individual Evaluation Packets feature quizzes (aligned with the Big Book of AA), family/work histories, and tools for one-on-one counseling</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Proven Outcomes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Proven Outcomes</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-start space-x-4 mb-6">
                <Award className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Kentucky's Recovery Kentucky</h3>
                  <p className="text-gray-600">
                    As the exclusive model in Kentucky's Recovery Kentucky—a network of 14 residential centers since 2005—it has supported thousands in recovery achieving sustained sobriety.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Globe className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Global Effectiveness</h3>
                  <p className="text-gray-600">
                    Effective across addiction types, settings (residential and outpatient), and multiple countries, attesting to its adaptability and efficacy.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Why We Chose Recovery Dynamics®</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Clinically Validated</h4>
                    <p className="text-blue-800">40+ Years of real-world success in guiding individuals to long-term sobriety</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Evidence-Based Integration</h4>
                    <p className="text-blue-800">Ensures each client gains genuine insight and commitment—not just theoretical exposure</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Structured, Comprehensive Curriculum</h4>
                    <p className="text-blue-800">Ensures consistent and measurable progress for clients and counselors alike</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Scalable & Adaptable</h4>
                    <p className="text-blue-800">Proven effectiveness across diverse settings and populations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Invitation to Join */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Invitation to Join the Journey</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Recovery Dynamics® empowers clients to engage deeply with their own recovery, offering:
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">Guided Methodology</h3>
              <p className="opacity-90">A step-wise approach that ensures consistent progress</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">Strong Therapeutic Support</h3>
              <p className="opacity-90">Certified counselors facilitating every step of the journey</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">Proven Tools & Benchmarks</h3>
              <p className="opacity-90">Measurable materials and comprehensive evaluation methods</p>
            </div>
          </div>

          <div className="bg-white/20 p-8 rounded-lg backdrop-blur-sm max-w-4xl mx-auto">
            <p className="text-xl leading-relaxed">
              The result? A replicable, empathetic, and impactful path toward resilient, lasting recovery—a model we're proud to incorporate at Recovery Point West Virginia.
            </p>
          </div>

          <div className="mt-8">
            <p className="text-sm opacity-75">
              Learn more at <a href="https://kellyfdn.org" className="underline hover:no-underline" target="_blank" rel="noopener noreferrer">kellyfdn.org</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecoveryDynamics;
