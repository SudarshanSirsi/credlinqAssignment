import { 
  IsString, 
  IsEmail, 
  IsBoolean, 
  IsObject, 
  IsArray, 
  Matches, 
  IsNotEmpty 
} from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @Matches(/^\d{8}[A-Za-z]$/, { 
    message: 'Company UEN must be 8 digits followed by an alphabet (e.g., 12345678A)' 
  })
  uen: string;

  @IsString()
  @IsNotEmpty({ message: 'Company name is required' })
  companyName: string;

  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @IsString()
  @IsNotEmpty({ message: 'Position is required' })
  position: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsString()
  @Matches(/^(6|8|9)\d{7}$/, { 
    message: 'Mobile number must be a valid 8-digit Singapore number starting with 6, 8, or 9' 
  })
  phone: string;

  @IsObject()
  selectedMonths: Record<string, boolean>;

  @IsArray()
  fileNames: string[];

  @IsBoolean()
  terms: boolean;
}
