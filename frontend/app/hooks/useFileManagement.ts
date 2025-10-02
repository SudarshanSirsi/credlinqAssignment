import { useState, useEffect } from 'react';
import { MONTHS } from '../constants/form.constants';

export const useFileManagement = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<{ [key: string]: boolean }>({});

  const getLastSixMonths = () => {
    const date = new Date();
    const currentMonth = date.getMonth();
    const lastSixMonths = [];

    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      lastSixMonths.push(MONTHS[monthIndex]);
    }
    return lastSixMonths;
  };

  const lastSixMonths = getLastSixMonths();

  useEffect(() => {
    const initialMonths = lastSixMonths.reduce((acc, month) => {
      acc[month] = false;
      return acc;
    }, {} as { [key: string]: boolean });
    
    setSelectedMonths(initialMonths);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const filesToAdd = files.slice(0, 6 - uploadedFiles.length);

    if (filesToAdd.length > 0) {
      setUploadedFiles(prev => [...prev, ...filesToAdd]);
    }
    e.target.value = '';
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveAllFiles = () => {
    setUploadedFiles([]);
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonths(prev => ({
      ...prev,
      [month]: !prev[month]
    }));
  };

  return {
    uploadedFiles,
    selectedMonths,
    lastSixMonths,
    setUploadedFiles,
    setSelectedMonths,
    handleFileUpload,
    handleRemoveFile,
    handleRemoveAllFiles,
    handleMonthChange,
  };
};
