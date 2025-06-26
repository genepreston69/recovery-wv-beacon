
-- Create the intakes table with all form fields
CREATE TABLE public.intakes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Welcome Step
  facility TEXT NOT NULL,
  
  -- Referral Information
  referral_source TEXT,
  referral_other_source TEXT,
  referral_date DATE,
  previous_resident TEXT, -- 'yes' or 'no'
  previous_residency_date TEXT,
  previous_leaving_reason TEXT,
  violent_crime TEXT, -- 'yes' or 'no'
  violent_crime_details TEXT,
  sex_offender TEXT, -- 'yes' or 'no'
  
  -- Personal Information
  first_name TEXT,
  last_name TEXT,
  date_of_birth DATE,
  social_security TEXT,
  phone_number TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  emergency_contact_relationship TEXT,
  
  -- Living Situation
  current_living_situation TEXT,
  housing_history TEXT,
  housing_stability TEXT,
  dependents INTEGER DEFAULT 0,
  dependent_details TEXT,
  
  -- Substance Use
  primary_substance TEXT,
  substances_used TEXT[], -- array for multiple substances
  frequency_of_use TEXT,
  last_use_date DATE,
  previous_treatment TEXT, -- 'yes' or 'no'
  previous_treatment_details TEXT,
  detox_needed TEXT, -- 'yes' or 'no'
  withdrawal_history TEXT,
  
  -- Physical Health
  medical_conditions TEXT[],
  current_medications TEXT[],
  allergies TEXT[],
  recent_hospitalizations TEXT, -- 'yes' or 'no'
  hospitalization_details TEXT,
  disability_status TEXT, -- 'yes' or 'no'
  disability_details TEXT,
  
  -- Mental Health
  mental_health_history TEXT, -- 'yes' or 'no'
  mental_health_conditions TEXT[],
  current_mental_health_treatment TEXT, -- 'yes' or 'no'
  mental_health_provider TEXT,
  suicide_history TEXT, -- 'yes' or 'no'
  suicide_details TEXT,
  trauma_history TEXT, -- 'yes' or 'no'
  trauma_details TEXT,
  
  -- Medications
  prescription_medications JSONB, -- array of objects with name, dosage, frequency
  medication_compliance TEXT,
  medication_allergies TEXT[],
  
  -- Legal Information
  current_legal_issues TEXT, -- 'yes' or 'no'
  legal_details TEXT,
  probation_parole TEXT, -- 'yes' or 'no'
  probation_officer_name TEXT,
  probation_officer_contact TEXT,
  court_dates TEXT[],
  pending_charges TEXT,
  
  -- Family Information
  family_support TEXT, -- 'yes' or 'no'
  family_contact_person TEXT,
  family_contact_phone TEXT,
  children_custody TEXT, -- 'yes' or 'no'
  custody_details TEXT,
  family_substance_abuse_history TEXT, -- 'yes' or 'no'
  
  -- Form metadata
  form_status TEXT DEFAULT 'incomplete', -- 'incomplete', 'completed', 'submitted'
  completed_steps INTEGER[] DEFAULT ARRAY[]::INTEGER[],
  signature_data TEXT, -- for digital signature
  signature_date TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  submitted_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.intakes ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own intakes" 
  ON public.intakes 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own intakes" 
  ON public.intakes 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own intakes" 
  ON public.intakes 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own intakes" 
  ON public.intakes 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create an updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_intakes_updated_at 
  BEFORE UPDATE ON public.intakes 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_intakes_user_id ON public.intakes(user_id);
CREATE INDEX idx_intakes_facility ON public.intakes(facility);
CREATE INDEX idx_intakes_form_status ON public.intakes(form_status);
CREATE INDEX idx_intakes_created_at ON public.intakes(created_at);
