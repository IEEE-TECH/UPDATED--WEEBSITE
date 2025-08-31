// Registration form interfaces
export interface MainRegistration {
  name: string;
  email: string;
  phone: string;
  prn: string;
  branch: string;
  year: string;
}

export interface GameRegistration {
  name: string;
  phone: string;
  prn: string;
  gameId: string;
  registrationId?: string;
}

// Database record interfaces
export interface RegistrationRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  prn: string;
  branch: string;
  year: string;
  registration_type: 'main' | 'game_only';
  created_at: string;
  updated_at: string;
}

export interface GameRegistrationRecord {
  id: string;
  registration_id: string;
  game_id: string;
  game_name: string;
  payment_status: 'pending' | 'paid' | 'failed';
  payment_amount: number;
  payment_id?: string;
  created_at: string;
}

// Form validation interfaces
export interface FormErrors {
  [key: string]: string;
}

export interface RegistrationFormProps {
  onSubmit: (data: MainRegistration) => void;
  onClose: () => void;
  isLoading?: boolean;
}

export interface GameRegistrationFormProps {
  gameId: string;
  gameName: string;
  onSubmit: (data: GameRegistration) => void;
  onClose: () => void;
  isLoading?: boolean;
}

// Game information
export interface GameInfo {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export const GAMES: GameInfo[] = [
  {
    id: 'blitzkrieg',
    name: 'Operation Blitzkrieg',
    description: 'Lightning warfare tactics and strategic planning',
    price: 299
  },
  {
    id: 'normandy',
    name: 'D-Day Normandy',
    description: 'Beach assault and tactical coordination',
    price: 299
  },
  {
    id: 'stalingrad',
    name: 'Battle of Stalingrad',
    description: 'Urban warfare and defensive strategies',
    price: 299
  },
  {
    id: 'pacific',
    name: 'Pacific Theater',
    description: 'Naval combat and island hopping campaigns',
    price: 299
  }
];

// Academic options
export const BRANCHES = [
  'Computer Engineering',
  'Information Technology',
  'Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Chemical Engineering',
  'Other'
];

export const YEARS = [
  'First Year',
  'Second Year', 
  'Third Year',
  'Fourth Year',
  'Graduate',
  'Other'
];
