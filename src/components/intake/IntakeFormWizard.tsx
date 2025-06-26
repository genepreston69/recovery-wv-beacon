
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Save, CheckCircle } from 'lucide-react';

// Import step components
import { WelcomeStep } from './steps/WelcomeStep';
import { ReferralStep } from './steps/ReferralStep';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { LivingSituationStep } from './steps/LivingSituationStep';
import { SubstanceUseStep } from './steps/SubstanceUseStep';
import { PhysicalHealthStep } from './steps/PhysicalHealthStep';
import { MentalHealthStep } from './steps/MentalHealthStep';
import { MedicationsStep } from './steps/MedicationsStep';
import { LegalInfoStep } from './steps/LegalInfoStep';
import { FamilyInfoStep } from './steps/FamilyInfoStep';
import { ReviewStep } from './steps/ReviewStep';

// Import the custom hook
import { useIntakeForm, FormData } from '@/hooks/useIntakeForm';

const STEPS = [
  { id: 'welcome', title: 'Welcome', component: WelcomeStep },
  { id: 'referral', title: 'Referral Info', component: ReferralStep },
  { id: 'basic', title: 'Basic Info', component: BasicInfoStep },
  { id: 'living', title: 'Living Situation', component: LivingSituationStep },
  { id: 'substance', title: 'Substance Use', component: SubstanceUseStep },
  { id: 'physical', title: 'Physical Health', component: PhysicalHealthStep },
  { id: 'mental', title: 'Mental Health', component: MentalHealthStep },
  { id: 'medications', title: 'Medications', component: MedicationsStep },
  { id: 'legal', title: 'Legal Info', component: LegalInfoStep },
  { id: 'family', title: 'Family Info', component: FamilyInfoStep },
  { id: 'review', title: 'Review & Sign', component: ReviewStep },
];

export const IntakeFormWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const {
    formData,
    updateFormData,
    completedSteps,
    markStepComplete,
    saveFormData,
    submitForm,
    isLoading,
  } = useIntakeForm();

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      if (formData.facility) { // Only save if form has been started
        try {
          await saveFormData();
          setLastSaved(new Date());
        } catch (error) {
          console.error('Auto-save failed:', error);
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [formData, saveFormData]);

  const validateCurrentStep = (): boolean => {
    // Basic validation for required fields
    if (currentStep === 0 && !formData.facility) {
      setValidationErrors({ facility: 'Please select a facility' });
      return false;
    }
    
    setValidationErrors({});
    return true;
  };

  const goToNextStep = async () => {
    if (validateCurrentStep()) {
      const newCompletedSteps = markStepComplete(currentStep);
      
      try {
        await saveFormData(true); // Save with completed steps
        setLastSaved(new Date());
        
        if (currentStep < STEPS.length - 1) {
          setCurrentStep(prev => prev + 1);
        }
      } catch (error) {
        console.error('Failed to save progress:', error);
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex <= Math.max(...completedSteps) + 1) {
      setCurrentStep(stepIndex);
    }
  };

  const handleSaveProgress = async () => {
    try {
      await saveFormData();
      setLastSaved(new Date());
    } catch (error) {
      console.error('Manual save failed:', error);
    }
  };

  const handleSubmitForm = async () => {
    if (currentStep === STEPS.length - 1) {
      const success = await submitForm();
      if (success) {
        // Redirect or show success message
        console.log('Form submitted successfully');
      }
    }
  };

  const progress = ((completedSteps.length) / STEPS.length) * 100;
  const CurrentStepComponent = STEPS[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recovery Point Intake</h1>
          <p className="text-gray-600">Step {currentStep + 1} of {STEPS.length}</p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">
              Progress: {Math.round(progress)}% Complete
            </span>
            {lastSaved && (
              <span className="text-sm text-gray-500">
                Last saved: {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>
          <Progress value={progress} className="mb-4" />
          
          {/* Step Navigation */}
          <div className="flex flex-wrap gap-2">
            {STEPS.map((step, index) => (
              <button
                key={step.id}
                onClick={() => goToStep(index)}
                disabled={index > Math.max(...completedSteps, currentStep) + 1}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  index === currentStep
                    ? 'bg-blue-600 text-white'
                    : completedSteps.includes(index)
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : index <= Math.max(...completedSteps) + 1
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
              >
                {completedSteps.includes(index) && (
                  <CheckCircle className="inline w-3 h-3 mr-1" />
                )}
                {step.title}
              </button>
            ))}
          </div>
        </Card>

        {/* Current Step Content */}
        <Card className="mb-8">
          <CurrentStepComponent
            data={formData}
            updateData={updateFormData}
            errors={validationErrors}
            onValidationChange={setValidationErrors}
          />
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={goToPreviousStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleSaveProgress}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Progress
            </Button>

            <Button
              onClick={currentStep === STEPS.length - 1 ? handleSubmitForm : goToNextStep}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {currentStep === STEPS.length - 1 ? 'Submit' : 'Continue'}
              {currentStep < STEPS.length - 1 && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FormData };
