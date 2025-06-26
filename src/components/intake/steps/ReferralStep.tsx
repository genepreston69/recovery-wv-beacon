
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { FormData } from '../IntakeFormWizard';

interface ReferralStepProps {
  data: FormData;
  updateData: (section: keyof FormData, data: any) => void;
  errors: any;
  onValidationChange: (errors: any) => void;
}

const REFERRAL_SOURCES = [
  'Self-referral',
  'Family/Friends',
  'Treatment Center',
  'Court System',
  'Probation/Parole Officer',
  'Healthcare Provider',
  'Social Services',
  'Religious Organization',
  'Other'
];

export const ReferralStep: React.FC<ReferralStepProps> = ({
  data,
  updateData,
  errors,
  onValidationChange
}) => {
  const referralData = data.referralInfo || {};

  const updateReferralData = (field: string, value: any) => {
    updateData('referralInfo' as keyof FormData, {
      ...referralData,
      [field]: value
    });
  };

  return (
    <div className="p-8">
      <CardHeader>
        <CardTitle className="text-2xl">Referral Information</CardTitle>
        <p className="text-gray-600">
          Help us understand how you learned about Recovery Point and your previous experience with us.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* How did you hear about us */}
        <div>
          <Label className="text-base font-semibold">How did you hear about Recovery Point? *</Label>
          <RadioGroup
            value={referralData.source || ''}
            onValueChange={(value) => updateReferralData('source', value)}
            className="mt-3"
          >
            {REFERRAL_SOURCES.map((source) => (
              <div key={source} className="flex items-center space-x-2">
                <RadioGroupItem value={source} id={source} />
                <Label htmlFor={source}>{source}</Label>
              </div>
            ))}
          </RadioGroup>
          
          {referralData.source === 'Other' && (
            <div className="mt-3">
              <Input
                placeholder="Please specify..."
                value={referralData.otherSource || ''}
                onChange={(e) => updateReferralData('otherSource', e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Referral Date */}
        <div>
          <Label className="text-base font-semibold">Referral Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full mt-2 justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {referralData.date ? format(new Date(referralData.date), 'PPP') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={referralData.date ? new Date(referralData.date) : undefined}
                onSelect={(date) => updateReferralData('date', date?.toISOString())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Previous Resident */}
        <div>
          <Label className="text-base font-semibold">Have you been a resident at Recovery Point before? *</Label>
          <RadioGroup
            value={referralData.previousResident || ''}
            onValueChange={(value) => updateReferralData('previousResident', value)}
            className="mt-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="prev-yes" />
              <Label htmlFor="prev-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="prev-no" />
              <Label htmlFor="prev-no">No</Label>
            </div>
          </RadioGroup>

          {referralData.previousResident === 'yes' && (
            <div className="mt-4 space-y-3">
              <div>
                <Label>When were you last a resident?</Label>
                <Input
                  type="text"
                  placeholder="e.g., January 2023"
                  value={referralData.previousResidencyDate || ''}
                  onChange={(e) => updateReferralData('previousResidencyDate', e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Reason for leaving previously</Label>
                <Textarea
                  placeholder="Please explain..."
                  value={referralData.previousLeavingReason || ''}
                  onChange={(e) => updateReferralData('previousLeavingReason', e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          )}
        </div>

        {/* Criminal History Screening */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Initial Screening Questions</h3>
          
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold">
                Have you ever been convicted of a violent crime? *
              </Label>
              <RadioGroup
                value={referralData.violentCrime || ''}
                onValueChange={(value) => updateReferralData('violentCrime', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="violent-yes" />
                  <Label htmlFor="violent-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="violent-no" />
                  <Label htmlFor="violent-no">No</Label>
                </div>
              </RadioGroup>

              {referralData.violentCrime === 'yes' && (
                <div className="mt-3">
                  <Label>Please provide details</Label>
                  <Textarea
                    placeholder="Describe the nature and date of the conviction..."
                    value={referralData.violentCrimeDetails || ''}
                    onChange={(e) => updateReferralData('violentCrimeDetails', e.target.value)}
                    className="mt-2"
                  />
                </div>
              )}
            </div>

            <div>
              <Label className="text-base font-semibold">
                Are you currently required to register as a sex offender? *
              </Label>
              <RadioGroup
                value={referralData.sexOffender || ''}
                onValueChange={(value) => updateReferralData('sexOffender', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="sex-yes" />
                  <Label htmlFor="sex-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="sex-no" />
                  <Label htmlFor="sex-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
};
