import CheckIcon from '@mui/icons-material/CheckCircleOutline';
import { FormSectionProps } from '../types/form.types';

const FormSection: React.FC<FormSectionProps> = ({ step, title, children, isCompleted, isEnabled }) => (
  <div className="relative mb-6">
    {step < 4 && (
      <div className="absolute left-[13px] top-8 bottom-0 w-1 bg-gray-300"></div>
    )}
    <div className="flex items-center mb-4">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm z-10 mr-4 
                  ${isCompleted ? 'bg-[#2e7d32]' : 'bg-pink-500'}`}>
        {isCompleted ? <CheckIcon sx={{ fontSize: 24 }} /> : step}
      </div>
      <div className='w-full bg-[#FDECF6] p-2'>
        <h3 className={`font-semibold text-sm text-[#ED0057] `}>
          {title}
        </h3>
      </div>
    </div>
    <div className={`ml-11 pr-4 ${!isEnabled ? 'opacity-60 pointer-events-none' : ''}`}>
      {children}
    </div>
  </div>
);

export default FormSection;
