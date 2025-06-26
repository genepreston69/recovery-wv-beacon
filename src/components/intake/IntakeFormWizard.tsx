
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Save, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

export interface FormData {
  facility: string;
  referralInfo: any;
  personalInfo: any;
  livingSituation: any;
  substanceUse: any;
  physicalHealth: any;
  mentalHealth: any;
  medications: any;
  legalInfo: any;
  familyInfo: any;
}

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
  const [formData, setFormData] = useState<FormData>({
    facility: '',
    referralInfo: {},
    personalInfo: {},
    livingSituation: {},
    substanceUse: {},
    physicalHealth: {},
    mentalHealth: {},
    medications: {},
    legalInfo: {},
    familyInfo: {},
  });
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('intake-form-data');
    const savedStep = localStorage.getItem('intake-form-step');
    const savedCompleted = localStorage.getItem('intake-form-completed');

    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }
    if (savedCompleted) {
      setCompletedSteps(JSON.parse(savedCompleted));
    }
  }, []);

  // Auto-save functionality
  const saveProgress = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem('intake-form-data', JSON.stringify(formData));
      localStorage.setItem('intake-form-step', currentStep.toString());
      localStorage.setItem('intake-form-completed', JSON.stringify(completedSteps));
      setLastSaved(new Date());
      
      toast({
        title: "Progress Saved",
        description: "Your form progress has been saved automatically.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Unable to save progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const validateCurrentStep = (): boolean => {
    // Implement validation logic for current step
    const CurrentStepComponent = STEPS[currentStep].component;
    // This would be implemented in each step component
    return true; // Placeholder
  };

  const goToNextStep = () => {
    if (validateCurrentStep()) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep]);
      }
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
        saveProgress();
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
              onClick={saveProgress}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Progress
            </Button>

            <Button
              onClick={goToNextStep}
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
