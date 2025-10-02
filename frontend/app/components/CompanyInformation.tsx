import { TextField } from '@mui/material';

interface CompanyInformationProps {
  formData: {
    companyUEN: string;
    companyName: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompanyInformation: React.FC<CompanyInformationProps> = ({ formData, onChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <TextField
      fullWidth
      size='small'
      label="Company UEN"
      name="companyUEN"
      value={formData.companyUEN}
      onChange={onChange}
      variant="outlined"
      margin="normal"
      required
      error={formData.companyUEN !== '' && !/^\d{8}[A-Za-z]$/.test(formData.companyUEN)}
      helperText={
        formData.companyUEN !== '' && !/^\d{8}[A-Za-z]$/.test(formData.companyUEN)
          ? 'Eight digits followed by an alphabet (e.g., 23141543L)'
          : ''
      }
    />
    <TextField
      fullWidth
      size='small'
      label="Company Name"
      name="companyName"
      value={formData.companyName}
      onChange={onChange}
      variant="outlined"
      margin="normal"
      required
    />
  </div>
);

export default CompanyInformation;
