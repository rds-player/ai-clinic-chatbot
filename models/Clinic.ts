export interface ClinicService {
  name: string;
  price: string;
  duration: string;
  description?: string;
}

export interface ClinicHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface ClinicContact {
  phone: string;
  email: string;
  address: string;
}

export interface Clinic {
  name: string;
  logo: string;
  services: ClinicService[];
  hours: ClinicHours;
  contact: ClinicContact;
}
