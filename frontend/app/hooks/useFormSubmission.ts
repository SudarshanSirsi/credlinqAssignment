import { ApplicationFormData } from '../types/form.types';

export const useFormSubmission = () => {
  const submitForm = async (
    formData: ApplicationFormData,
    uploadedFiles: File[],
    selectedMonths: { [key: string]: boolean }
  ) => {
    try {
      const formDataToSend = new FormData();

      Object.entries({
        uen: formData.companyUEN,
        companyName: formData.companyName,
        fullName: formData.fullName,
        position: formData.position,
        email: formData.email,
        reEnterEmail: formData.reEnterEmail,
        phone: formData.mobileNumber,
        terms: formData.terms.toString(),
        selectedMonths: JSON.stringify(selectedMonths),
      }).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      uploadedFiles.forEach((file) => {
        formDataToSend.append('files', file);
      });

      const response = await fetch('http://localhost:3001/applications/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  return { submitForm };
};
