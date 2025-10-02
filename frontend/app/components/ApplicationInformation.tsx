import { TextField } from '@mui/material';

interface ApplicantInformationProps {
  formData: {
    fullName: string;
    position: string;
    email: string;
    reEnterEmail: string;
    mobileNumber: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEnabled: boolean;
}

const ApplicantInformation: React.FC<ApplicantInformationProps> = ({ formData, onChange, isEnabled }) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <TextField
        fullWidth
        size='small'
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={onChange}
        variant="outlined"
        margin="normal"
        required
        disabled={!isEnabled}
      />
      <TextField
        fullWidth
        size='small'
        label="Position within company"
        name="position"
        value={formData.position}
        onChange={onChange}
        variant="outlined"
        margin="normal"
        required
        disabled={!isEnabled}
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <TextField
        fullWidth
        size='small'
        label="Email Address"
        name="email"
        value={formData.email}
        onChange={onChange}
        variant="outlined"
        margin="normal"
        type="email"
        helperText="The report will be delivered on this email address"
        required
        disabled={!isEnabled}
        error={formData.email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)}
      />
      <TextField
        fullWidth
        size='small'
        label="Re-enter Email Address"
        name="reEnterEmail"
        value={formData.reEnterEmail}
        onChange={onChange}
        variant="outlined"
        margin="normal"
        type="email"
        required
        disabled={!isEnabled}
        error={formData.reEnterEmail !== '' && formData.email !== formData.reEnterEmail}
        helperText={formData.reEnterEmail !== '' && formData.email !== formData.reEnterEmail ? 'Emails do not match' : ''}
      />
    </div>
    <TextField
      fullWidth
      size='small'
      label="Mobile Number (+65)"
      name="mobileNumber"
      value={formData.mobileNumber}
      onChange={onChange}
      variant="outlined"
      margin="normal"
      type="tel"
      required
      disabled={!isEnabled}
      error={formData.mobileNumber !== '' && !/^(6|8|9)\d{7}$/.test(formData.mobileNumber)}
      helperText={formData.mobileNumber !== '' && !/^(6|8|9)\d{7}$/.test(formData.mobileNumber) ? 'Enter a valid 8-digit Singapore mobile number (starts with 6, 8, or 9)' : ''}
    />
  </>
);

export default ApplicantInformation;
