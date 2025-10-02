'use client'
import { useState } from 'react';
import { Button } from '@mui/material';
import FormSection from './components/FormSection';
import Header from './components/Header';
import CompanyInformation from './components/CompanyInformation';
import ApplicantInformation from './components/ApplicationInformation';
import UploadDocuments from './components/UploadDocuments';
import TermsAndConditions from './components/TermsAndConditions';
import { useFormValidation } from './hooks/useFormValidation';
import { useStepProgress } from './hooks/useStepProgress';
import { useFileManagement } from './hooks/useFileManagement';
import { useFormSubmission } from './hooks/useFormSubmission';
import { ApplicationFormData } from './types/form.types';

const initialFormData: ApplicationFormData = {
  companyUEN: '',
  companyName: '',
  fullName: '',
  position: '',
  email: '',
  reEnterEmail: '',
  mobileNumber: '',
  terms: false,
};

export default function Home() {
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);

  const {
    uploadedFiles,
    selectedMonths,
    lastSixMonths,
    handleFileUpload,
    handleRemoveFile,
    handleRemoveAllFiles,
    handleMonthChange,
  } = useFileManagement();

  const { section1Valid, section2Valid, section3Valid, section4Valid } =
    useFormValidation(formData, uploadedFiles);

  const { lastEnabledStep, completedSteps, setLastEnabledStep, setCompletedSteps } =
    useStepProgress(section1Valid, section2Valid, section3Valid, section4Valid);

  const { submitForm } = useFormSubmission();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!section4Valid) {
      alert("Please ensure all sections are valid and Terms & Conditions are accepted.");
      return;
    }

    try {
      await submitForm(formData, uploadedFiles, selectedMonths);

      setFormData(initialFormData);
      setLastEnabledStep(1);
      setCompletedSteps([]);

      window.location.href = '/submissions';

    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Failed to submit form: ${error.message}`);
    }
  };

  const formSections = [
    {
      step: 1,
      title: "Company Information",
      isEnabled: true,
      component: <CompanyInformation formData={formData} onChange={handleChange} />
    },
    {
      step: 2,
      title: "Applicant Information",
      isEnabled: lastEnabledStep >= 2,
      component: (
        <ApplicantInformation
          formData={formData}
          onChange={handleChange}
          isEnabled={lastEnabledStep >= 2}
        />
      )
    },
    {
      step: 3,
      title: "Upload Documents",
      isEnabled: lastEnabledStep >= 3,
      component: (
        <UploadDocuments
          isEnabled={lastEnabledStep >= 3}
          uploadedFiles={uploadedFiles}
          selectedMonths={selectedMonths}
          lastSixMonths={lastSixMonths}
          onFileUpload={handleFileUpload}
          onRemoveFile={handleRemoveFile}
          onRemoveAllFiles={handleRemoveAllFiles}
          onMonthChange={handleMonthChange}
        />
      )
    },
    {
      step: 4,
      title: "Terms & Conditions",
      isEnabled: lastEnabledStep >= 4,
      component: (
        <TermsAndConditions
          terms={formData.terms}
          onChange={handleChange}
          isEnabled={lastEnabledStep >= 4}
        />
      )
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex justify-center flex-1">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl m-6 mb-8">
          {formSections.map((section) => (
            <FormSection
              key={section.step}
              step={section.step}
              title={section.title}
              isCompleted={completedSteps.includes(section.step)}
              isEnabled={section.isEnabled}
            >
              {section.component}
            </FormSection>
          ))}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!section4Valid}
            className="w-full mt-8 p-3 text-lg"
          >
            Submit Application
          </Button>
        </form>
      </div>
    </div>
  );
}
