
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FormData } from '../IntakeFormWizard';

interface FamilyInfoStepProps {
  data: FormData;
  updateData: (section: keyof FormData, data: any) => void;
  errors: any;
  onValidationChange: (errors: any) => void;
}

export const FamilyInfoStep: React.FC<FamilyInfoStepProps> = ({
  data,
  updateData,
  errors,
  onValidationChange
}) => {
  return (
    <div className="p-8">
      <CardHeader>
        <CardTitle className="text-2xl">Family Information</CardTitle>
        <p className="text-gray-600">Information about your family situation and children.</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">This step is under development...</p>
      </CardContent>
    </div>
  );
};
