
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';

type IntakeRecord = Database['public']['Tables']['intakes']['Row'];
type IntakeInsert = Database['public']['Tables']['intakes']['Insert'];
type IntakeUpdate = Database['public']['Tables']['intakes']['Update'];

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

export const useIntakeForm = () => {
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
  const [intakeId, setIntakeId] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load existing intake data on mount
  useEffect(() => {
    loadExistingIntake();
  }, []);

  const loadExistingIntake = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('intakes')
        .select('*')
        .eq('user_id', user.id)
        .eq('form_status', 'incomplete')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error loading intake:', error);
        return;
      }

      if (data) {
        setIntakeId(data.id);
        setCompletedSteps(data.completed_steps || []);
        
        // Map database fields back to form structure
        setFormData({
          facility: data.facility || '',
          referralInfo: {
            source: data.referral_source,
            otherSource: data.referral_other_source,
            date: data.referral_date,
            previousResident: data.previous_resident,
            previousResidencyDate: data.previous_residency_date,
            previousLeavingReason: data.previous_leaving_reason,
            violentCrime: data.violent_crime,
            violentCrimeDetails: data.violent_crime_details,
            sexOffender: data.sex_offender,
          },
          personalInfo: {
            firstName: data.first_name,
            lastName: data.last_name,
            dateOfBirth: data.date_of_birth,
            socialSecurity: data.social_security,
            phoneNumber: data.phone_number,
            email: data.email,
            address: data.address,
            city: data.city,
            state: data.state,
            zipCode: data.zip_code,
            emergencyContactName: data.emergency_contact_name,
            emergencyContactPhone: data.emergency_contact_phone,
            emergencyContactRelationship: data.emergency_contact_relationship,
          },
          livingSituation: {
            currentLivingSituation: data.current_living_situation,
            housingHistory: data.housing_history,
            housingStability: data.housing_stability,
            dependents: data.dependents,
            dependentDetails: data.dependent_details,
          },
          substanceUse: {
            primarySubstance: data.primary_substance,
            substancesUsed: data.substances_used,
            frequencyOfUse: data.frequency_of_use,
            lastUseDate: data.last_use_date,
            previousTreatment: data.previous_treatment,
            previousTreatmentDetails: data.previous_treatment_details,
            detoxNeeded: data.detox_needed,
            withdrawalHistory: data.withdrawal_history,
          },
          physicalHealth: {
            medicalConditions: data.medical_conditions,
            currentMedications: data.current_medications,
            allergies: data.allergies,
            recentHospitalizations: data.recent_hospitalizations,
            hospitalizationDetails: data.hospitalization_details,
            disabilityStatus: data.disability_status,
            disabilityDetails: data.disability_details,
          },
          mentalHealth: {
            mentalHealthHistory: data.mental_health_history,
            mentalHealthConditions: data.mental_health_conditions,
            currentMentalHealthTreatment: data.current_mental_health_treatment,
            mentalHealthProvider: data.mental_health_provider,
            suicideHistory: data.suicide_history,
            suicideDetails: data.suicide_details,
            traumaHistory: data.trauma_history,
            traumaDetails: data.trauma_details,
          },
          medications: {
            prescriptionMedications: data.prescription_medications,
            medicationCompliance: data.medication_compliance,
            medicationAllergies: data.medication_allergies,
          },
          legalInfo: {
            currentLegalIssues: data.current_legal_issues,
            legalDetails: data.legal_details,
            probationParole: data.probation_parole,
            probationOfficerName: data.probation_officer_name,
            probationOfficerContact: data.probation_officer_contact,
            courtDates: data.court_dates,
            pendingCharges: data.pending_charges,
          },
          familyInfo: {
            familySupport: data.family_support,
            familyContactPerson: data.family_contact_person,
            familyContactPhone: data.family_contact_phone,
            childrenCustody: data.children_custody,
            custodyDetails: data.custody_details,
            familySubstanceAbuseHistory: data.family_substance_abuse_history,
          },
        });
      }
    } catch (error) {
      console.error('Error loading existing intake:', error);
    }
  };

  const saveFormData = async (includeCompletedSteps = false) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Map form data to database structure with proper typing
      const baseIntakeData = {
        user_id: user.id,
        facility: formData.facility,
        
        // Referral Info
        referral_source: formData.referralInfo.source,
        referral_other_source: formData.referralInfo.otherSource,
        referral_date: formData.referralInfo.date,
        previous_resident: formData.referralInfo.previousResident,
        previous_residency_date: formData.referralInfo.previousResidencyDate,
        previous_leaving_reason: formData.referralInfo.previousLeavingReason,
        violent_crime: formData.referralInfo.violentCrime,
        violent_crime_details: formData.referralInfo.violentCrimeDetails,
        sex_offender: formData.referralInfo.sexOffender,
        
        // Personal Info
        first_name: formData.personalInfo.firstName,
        last_name: formData.personalInfo.lastName,
        date_of_birth: formData.personalInfo.dateOfBirth,
        social_security: formData.personalInfo.socialSecurity,
        phone_number: formData.personalInfo.phoneNumber,
        email: formData.personalInfo.email,
        address: formData.personalInfo.address,
        city: formData.personalInfo.city,
        state: formData.personalInfo.state,
        zip_code: formData.personalInfo.zipCode,
        emergency_contact_name: formData.personalInfo.emergencyContactName,
        emergency_contact_phone: formData.personalInfo.emergencyContactPhone,
        emergency_contact_relationship: formData.personalInfo.emergencyContactRelationship,
        
        // Living Situation
        current_living_situation: formData.livingSituation.currentLivingSituation,
        housing_history: formData.livingSituation.housingHistory,
        housing_stability: formData.livingSituation.housingStability,
        dependents: formData.livingSituation.dependents,
        dependent_details: formData.livingSituation.dependentDetails,
        
        // Substance Use
        primary_substance: formData.substanceUse.primarySubstance,
        substances_used: formData.substanceUse.substancesUsed,
        frequency_of_use: formData.substanceUse.frequencyOfUse,
        last_use_date: formData.substanceUse.lastUseDate,
        previous_treatment: formData.substanceUse.previousTreatment,
        previous_treatment_details: formData.substanceUse.previousTreatmentDetails,
        detox_needed: formData.substanceUse.detoxNeeded,
        withdrawal_history: formData.substanceUse.withdrawalHistory,
        
        // Physical Health
        medical_conditions: formData.physicalHealth.medicalConditions,
        current_medications: formData.physicalHealth.currentMedications,
        allergies: formData.physicalHealth.allergies,
        recent_hospitalizations: formData.physicalHealth.recentHospitalizations,
        hospitalization_details: formData.physicalHealth.hospitalizationDetails,
        disability_status: formData.physicalHealth.disabilityStatus,
        disability_details: formData.physicalHealth.disabilityDetails,
        
        // Mental Health
        mental_health_history: formData.mentalHealth.mentalHealthHistory,
        mental_health_conditions: formData.mentalHealth.mentalHealthConditions,
        current_mental_health_treatment: formData.mentalHealth.currentMentalHealthTreatment,
        mental_health_provider: formData.mentalHealth.mentalHealthProvider,
        suicide_history: formData.mentalHealth.suicideHistory,
        suicide_details: formData.mentalHealth.suicideDetails,
        trauma_history: formData.mentalHealth.traumaHistory,
        trauma_details: formData.mentalHealth.traumaDetails,
        
        // Medications
        prescription_medications: formData.medications.prescriptionMedications,
        medication_compliance: formData.medications.medicationCompliance,
        medication_allergies: formData.medications.medicationAllergies,
        
        // Legal Info
        current_legal_issues: formData.legalInfo.currentLegalIssues,
        legal_details: formData.legalInfo.legalDetails,
        probation_parole: formData.legalInfo.probationParole,
        probation_officer_name: formData.legalInfo.probationOfficerName,
        probation_officer_contact: formData.legalInfo.probationOfficerContact,
        court_dates: formData.legalInfo.courtDates,
        pending_charges: formData.legalInfo.pendingCharges,
        
        // Family Info
        family_support: formData.familyInfo.familySupport,
        family_contact_person: formData.familyInfo.familyContactPerson,
        family_contact_phone: formData.familyInfo.familyContactPhone,
        children_custody: formData.familyInfo.childrenCustody,
        custody_details: formData.familyInfo.custodyDetails,
        family_substance_abuse_history: formData.familyInfo.familySubstanceAbuseHistory,
      };

      let intakeData: IntakeInsert | IntakeUpdate = baseIntakeData;

      if (includeCompletedSteps) {
        intakeData = { ...baseIntakeData, completed_steps: completedSteps };
      }

      let result;
      if (intakeId) {
        // Update existing intake
        result = await supabase
          .from('intakes')
          .update(intakeData as IntakeUpdate)
          .eq('id', intakeId)
          .select()
          .single();
      } else {
        // Create new intake
        result = await supabase
          .from('intakes')
          .insert(intakeData as IntakeInsert)
          .select()
          .single();
      }

      if (result.error) {
        throw result.error;
      }

      if (!intakeId && result.data) {
        setIntakeId(result.data.id);
      }

      toast({
        title: "Progress Saved",
        description: "Your form progress has been saved successfully.",
      });

      return result.data;
    } catch (error) {
      console.error('Error saving form data:', error);
      toast({
        title: "Save Failed",
        description: "Unable to save progress. Please try again.",
        variant: "destructive",
      });
      throw error;
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

  const markStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      const newCompletedSteps = [...completedSteps, stepIndex];
      setCompletedSteps(newCompletedSteps);
      return newCompletedSteps;
    }
    return completedSteps;
  };

  const submitForm = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('intakes')
        .update({
          form_status: 'submitted',
          submitted_at: new Date().toISOString(),
        })
        .eq('id', intakeId);

      if (error) {
        throw error;
      }

      toast({
        title: "Form Submitted",
        description: "Your intake form has been submitted successfully.",
      });

      return true;
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: "Unable to submit form. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    formData,
    updateFormData,
    completedSteps,
    markStepComplete,
    saveFormData,
    submitForm,
    isLoading,
    intakeId,
  };
};
