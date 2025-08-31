// Registration form interfaces (Frontend-only)
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
}

// Form validation interfaces
export interface FormErrors {
  [key: string]: string;
}

// Game information
export interface GameInfo {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export const GAMES: GameInfo[] = [
  {
    id: 'blitzkrieg',
    name: 'Operation Blitzkrieg',
    description: 'Lightning warfare tactics and strategic planning'
  },
  {
    id: 'normandy',
    name: 'D-Day Normandy',
    description: 'Beach assault and tactical coordination'
  },
  {
    id: 'stalingrad',
    name: 'Battle of Stalingrad',
    description: 'Urban warfare and defensive strategies'
  },
  {
    id: 'pacific',
    name: 'Pacific Theater',
    description: 'Naval combat and island hopping campaigns'
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
