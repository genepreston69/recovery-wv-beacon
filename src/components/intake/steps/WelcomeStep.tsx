
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FormData } from '../IntakeFormWizard';

interface WelcomeStepProps {
  data: FormData;
  updateData: (section: keyof FormData, data: any) => void;
  errors: any;
  onValidationChange: (errors: any) => void;
}

const FACILITIES = [
  { value: 'bluefield', label: 'Bluefield - Men\'s Facility' },
  { value: 'charleston', label: 'Charleston - Women\'s Facility' },
  { value: 'huntington', label: 'Huntington - Men\'s Facility' },
  { value: 'parkersburg', label: 'Parkersburg - Men\'s Facility' },
  { value: 'point-apartments', label: 'Point Apartments' },
];

export const WelcomeStep: React.FC<WelcomeStepProps> = ({
  data,
  updateData,
  errors,
  onValidationChange
}) => {
  const handleFacilityChange = (value: string) => {
    updateData('facility' as keyof FormData, value);
    // Clear any validation errors
    if (errors.facility) {
      onValidationChange({ ...errors, facility: null });
    }
  };

  return (
    <div className="p-8">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Welcome to Recovery Point</CardTitle>
        <p className="text-center text-gray-600 mt-4">
          Thank you for taking the first step in your recovery journey. This intake form will help us 
          understand your needs and provide you with the best possible care.
        </p>
      </CardHeader>

      <CardContent className="mt-8">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-6">Please select the facility you're applying to:</h3>
          
          <RadioGroup
            value={data.facility}
            onValueChange={handleFacilityChange}
            className="space-y-4"
          >
            {FACILITIES.map((facility) => (
              <Card 
                key={facility.value} 
                className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                  data.facility === facility.value ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem 
                    value={facility.value} 
                    id={facility.value}
                  />
                  <Label 
                    htmlFor={facility.value}
                    className="flex-1 cursor-pointer"
                  >
                    {facility.label}
                  </Label>
                </div>
              </Card>
            ))}
          </RadioGroup>

          {errors.facility && (
            <p className="text-red-600 text-sm mt-2">{errors.facility}</p>
          )}

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">What to Expect:</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• This form takes approximately 15-20 minutes to complete</li>
              <li>• Your progress is automatically saved</li>
              <li>• You can return to previous sections to make changes</li>
              <li>• All information is kept confidential and secure</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </div>
  );
};
