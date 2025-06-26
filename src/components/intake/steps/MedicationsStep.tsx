
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FormData } from '../IntakeFormWizard';

interface MedicationsStepProps {
  data: FormData;
  updateData: (section: keyof FormData, data: any) => void;
  errors: any;
  onValidationChange: (errors: any) => void;
}

export const MedicationsStep: React.FC<MedicationsStepProps> = ({
  data,
  updateData,
  errors,
  onValidationChange
}) => {
  return (
    <div className="p-8">
      <CardHeader>
        <CardTitle className="text-2xl">Current Medications</CardTitle>
        <p className="text-gray-600">List all medications you are currently taking.</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">This step is under development...</p>
      </CardContent>
    </div>
  );
};
