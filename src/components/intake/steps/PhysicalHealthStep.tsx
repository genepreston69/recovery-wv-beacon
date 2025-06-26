
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FormData } from '../IntakeFormWizard';

interface PhysicalHealthStepProps {
  data: FormData;
  updateData: (section: keyof FormData, data: any) => void;
  errors: any;
  onValidationChange: (errors: any) => void;
}

export const PhysicalHealthStep: React.FC<PhysicalHealthStepProps> = ({
  data,
  updateData,
  errors,
  onValidationChange
}) => {
  return (
    <div className="p-8">
      <CardHeader>
        <CardTitle className="text-2xl">Physical Health</CardTitle>
        <p className="text-gray-600">Help us understand your physical health needs.</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">This step is under development...</p>
      </CardContent>
    </div>
  );
};
