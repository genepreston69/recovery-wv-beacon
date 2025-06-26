
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { FormData } from '../IntakeFormWizard';

interface BasicInfoStepProps {
  data: FormData;
  updateData: (section: keyof FormData, data: any) => void;
  errors: any;
  onValidationChange: (errors: any) => void;
}

const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  data,
  updateData,
  errors,
  onValidationChange
}) => {
  const personalInfo = data.personalInfo || {};

  const updatePersonalInfo = (field: string, value: any) => {
    updateData('personalInfo' as keyof FormData, {
      ...personalInfo,
      [field]: value
    });
  };

  const formatSSN = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 9)}`;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  return (
    <div className="p-8">
      <CardHeader>
        <CardTitle className="text-2xl">Basic Information</CardTitle>
        <p className="text-gray-600">
          Please provide your personal details and contact information.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-base font-semibold">First Name *</Label>
            <Input
              value={personalInfo.firstName || ''}
              onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
              className="mt-2"
              placeholder="Enter first name"
            />
          </div>
          <div>
            <Label className="text-base font-semibold">Last Name *</Label>
            <Input
              value={personalInfo.lastName || ''}
              onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
              className="mt-2"
              placeholder="Enter last name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-base font-semibold">Middle Initial</Label>
            <Input
              value={personalInfo.middleInitial || ''}
              onChange={(e) => updatePersonalInfo('middleInitial', e.target.value.slice(0, 1))}
              className="mt-2"
              placeholder="M"
              maxLength={1}
            />
          </div>
          <div>
            <Label className="text-base font-semibold">Preferred Name</Label>
            <Input
              value={personalInfo.preferredName || ''}
              onChange={(e) => updatePersonalInfo('preferredName', e.target.value)}
              className="mt-2"
              placeholder="What would you like to be called?"
            />
          </div>
        </div>

        {/* SSN and DOB */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-base font-semibold">Social Security Number *</Label>
            <Input
              value={personalInfo.ssn || ''}
              onChange={(e) => updatePersonalInfo('ssn', formatSSN(e.target.value))}
              className="mt-2"
              placeholder="XXX-XX-XXXX"
              maxLength={11}
            />
            <p className="text-xs text-gray-500 mt-1">This information is kept secure and confidential</p>
          </div>
          <div>
            <Label className="text-base font-semibold">Date of Birth *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full mt-2 justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {personalInfo.dateOfBirth ? format(new Date(personalInfo.dateOfBirth), 'PPP') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={personalInfo.dateOfBirth ? new Date(personalInfo.dateOfBirth) : undefined}
                  onSelect={(date) => updatePersonalInfo('dateOfBirth', date?.toISOString())}
                  disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-base font-semibold">Phone Number *</Label>
              <Input
                value={personalInfo.phone || ''}
                onChange={(e) => updatePersonalInfo('phone', formatPhone(e.target.value))}
                className="mt-2"
                placeholder="(XXX) XXX-XXXX"
                maxLength={14}
              />
            </div>
            <div>
              <Label className="text-base font-semibold">Email Address</Label>
              <Input
                type="email"
                value={personalInfo.email || ''}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                className="mt-2"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="mt-4">
            <Label className="text-base font-semibold">Mailing Address *</Label>
            <Input
              value={personalInfo.address || ''}
              onChange={(e) => updatePersonalInfo('address', e.target.value)}
              className="mt-2"
              placeholder="Street address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <Label className="text-base font-semibold">City *</Label>
              <Input
                value={personalInfo.city || ''}
                onChange={(e) => updatePersonalInfo('city', e.target.value)}
                className="mt-2"
                placeholder="City"
              />
            </div>
            <div>
              <Label className="text-base font-semibold">State *</Label>
              <Select value={personalInfo.state || ''} onValueChange={(value) => updatePersonalInfo('state', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {STATES.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-base font-semibold">ZIP Code *</Label>
              <Input
                value={personalInfo.zipCode || ''}
                onChange={(e) => updatePersonalInfo('zipCode', e.target.value.replace(/\D/g, '').slice(0, 5))}
                className="mt-2"
                placeholder="12345"
                maxLength={5}
              />
            </div>
          </div>
        </div>

        {/* Demographics */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Demographics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-base font-semibold">Gender *</Label>
              <RadioGroup
                value={personalInfo.gender || ''}
                onValueChange={(value) => updatePersonalInfo('gender', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold">Race/Ethnicity</Label>
              <Select value={personalInfo.race || ''} onValueChange={(value) => updatePersonalInfo('race', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select race/ethnicity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="white">White</SelectItem>
                  <SelectItem value="black">Black or African American</SelectItem>
                  <SelectItem value="hispanic">Hispanic or Latino</SelectItem>
                  <SelectItem value="asian">Asian</SelectItem>
                  <SelectItem value="native-american">Native American</SelectItem>
                  <SelectItem value="pacific-islander">Pacific Islander</SelectItem>
                  <SelectItem value="mixed">Mixed Race</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
};
