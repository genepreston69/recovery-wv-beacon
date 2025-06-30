
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CrisisBar } from '@/components/CrisisBar';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { PathwaysSection } from '@/components/PathwaysSection';
import { ImpactDashboard } from '@/components/ImpactDashboard';
import { SuccessStories } from '@/components/SuccessStories';
import { QuickActions } from '@/components/QuickActions';

const Index = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState({
    graduates: 1200,
    successRate: 68,
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

  const handlePathwaySelect = (type: string) => {
    const pathwayMessages = {
      individual: "Coming Soon",
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

  return (
    <>
      <CrisisBar />
      <Navigation />
      <HeroSection 
        metrics={{
          graduates: metrics.graduates,
          successRate: metrics.successRate,
          ridesProvided: metrics.ridesProvided,
          currentlyServed: metrics.currentlyServed
        }} 
      />
      <PathwaysSection onPathwaySelect={handlePathwaySelect} />
      <ImpactDashboard 
        metrics={{
          livesChanged: metrics.livesChanged,
          familiesReunited: metrics.familiesReunited,
          communityHours: metrics.communityHours,
          costSavings: metrics.costSavings
        }} 
      />
      <SuccessStories />
      <QuickActions />
    </>
  );
};

export default Index;
