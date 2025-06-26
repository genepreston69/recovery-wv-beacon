
import React from 'react';
import { CrisisBar } from '@/components/CrisisBar';
import { Navigation } from '@/components/Navigation';
import { HelpLovedHero } from '@/components/help-loved/HelpLovedHero';
import { ImmediateHelpSection } from '@/components/help-loved/ImmediateHelpSection';
import { SupportGroupsSection } from '@/components/help-loved/SupportGroupsSection';
import { CraftSection } from '@/components/help-loved/CraftSection';
import { EducationalResourcesSection } from '@/components/help-loved/EducationalResourcesSection';
import { AdditionalResourcesSection } from '@/components/help-loved/AdditionalResourcesSection';
import { HelpLovedActions } from '@/components/help-loved/HelpLovedActions';
import { FooterCTA } from '@/components/help-loved/FooterCTA';

const HelpLoved = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CrisisBar />
      <Navigation />
      <HelpLovedHero />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <ImmediateHelpSection />
        <SupportGroupsSection />
        <CraftSection />
        <EducationalResourcesSection />
        <AdditionalResourcesSection />
        <HelpLovedActions />
      </div>

      <FooterCTA />
    </div>
  );
};

export default HelpLoved;
