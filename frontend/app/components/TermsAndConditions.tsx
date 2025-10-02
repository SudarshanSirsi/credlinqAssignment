import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

interface TermsAndConditionsProps {
  terms: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEnabled: boolean;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ terms, onChange, isEnabled }) => (
  <FormGroup>
    <FormControlLabel
      control={<Checkbox name="terms" checked={terms} onChange={onChange} required disabled={!isEnabled} />}
      label="By ticking, you are confirming that you have understood and are agreeing to the details mentioned:"
    />
    <p className="ml-8 text-sm text-gray-600 space-y-2 mt-2">
      <span>✓ I confirm that I am the authorized person to upload bank statements on behalf of my company</span>
      <span>✓ I assure you that uploaded bank statements and provided company information match and are of the same company, if there is a mismatch then my report will not be generated</span>
      <span>✓ I understand that this is a general report based on the bank statements and Crediling is not providing a solution or guiding me for my business growth</span>
      <span>✓ I have read and understand the <a href="https://smehealthcheck.credilinq.ai/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-blue-500">Terms & Conditions</a></span>
    </p>
  </FormGroup>
);

export default TermsAndConditions;
