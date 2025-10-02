import { useState, useEffect } from 'react';

export const useStepProgress = (
  section1Valid: boolean,
  section2Valid: boolean,
  section3Valid: boolean,
  section4Valid: boolean
) => {
  const [lastEnabledStep, setLastEnabledStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const validationStates = [section1Valid, section2Valid, section3Valid, section4Valid];

  useEffect(() => {
    const currentStepValid = validationStates[lastEnabledStep - 1];

    if (currentStepValid && !completedSteps.includes(lastEnabledStep)) {
      setCompletedSteps(prev => [...new Set([...prev, lastEnabledStep])].sort((a, b) => a - b));
    } else if (!currentStepValid && completedSteps.includes(lastEnabledStep)) {
      setCompletedSteps(prev => prev.filter(step => step !== lastEnabledStep));
    }

    if (currentStepValid && lastEnabledStep < 4) {
      setLastEnabledStep(prev => prev + 1);
    }
  }, [section1Valid, section2Valid, section3Valid, section4Valid, lastEnabledStep]);

  useEffect(() => {
    for (let step = 1; step <= 4; step++) {
      if (!validationStates[step - 1] && lastEnabledStep > step) {
        setLastEnabledStep(step);
        break;
      }
    }
  }, [section1Valid, section2Valid, section3Valid, section4Valid]);

  return { lastEnabledStep, completedSteps, setLastEnabledStep, setCompletedSteps };
};
