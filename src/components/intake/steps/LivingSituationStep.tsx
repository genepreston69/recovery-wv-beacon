
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FormData } from '../IntakeFormWizard';

interface LivingSituationStepProps {
  data: FormData;
  updateData: (section: keyof FormData, data: any) => void;
  errors: any;
  onValidationChange: (errors: any) => void;
}

export const LivingSituationStep: React.FC<LivingSituationStepProps> = ({
  data,
  updateData,
  errors,
  onValidationChange
}) => {
  return (
    <div className="p-8">
      <CardHeader>
        <CardTitle className="text-2xl">Living Situation</CardTitle>
        <p className="text-gray-600">Tell us about your current living arrangements.</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">This step is under development...</p>
      </CardContent>
    </div>
  );
};
