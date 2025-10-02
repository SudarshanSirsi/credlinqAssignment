import { useMemo } from 'react';
import { ApplicationFormData } from '../types/form.types';
import { FORM_VALIDATION } from '../constants/form.constants';

export const useFormValidation = (formData: ApplicationFormData, uploadedFiles: File[]) => {
  const validationResults = useMemo(() => {
    const isSectionValid = (stepNum: number): boolean => {
      switch (stepNum) {
        case 1:
          return FORM_VALIDATION.UEN_REGEX.test(formData.companyUEN) && 
                 formData.companyName.trim() !== '';
        
        case 2:
          return formData.fullName.trim() !== '' &&
                 formData.position.trim() !== '' &&
                 FORM_VALIDATION.EMAIL_REGEX.test(formData.email) &&
                 formData.email === formData.reEnterEmail &&
                 FORM_VALIDATION.MOBILE_REGEX.test(formData.mobileNumber);
        
        case 3:
          return uploadedFiles.length > 0;
        
        case 4:
          return formData.terms === true;
        
        default:
          return false;
      }
    };

    return {
      section1Valid: isSectionValid(1),
      section2Valid: isSectionValid(2),
      section3Valid: isSectionValid(3),
      section4Valid: isSectionValid(4),
      isSectionValid,
    };
  }, [formData, uploadedFiles]);

  return validationResults;
};
