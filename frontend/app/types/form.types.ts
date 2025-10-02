export interface ApplicationFormData {
  companyUEN: string;
  companyName: string;
  fullName: string;
  position: string;
  email: string;
  reEnterEmail: string;
  mobileNumber: string;
  terms: boolean;
}

export interface FormSectionProps {
  step: number;
  title: string;
  children: React.ReactNode;
  isCompleted: boolean;
  isEnabled: boolean;
}
