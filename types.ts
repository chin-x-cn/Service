export interface ServiceItem {
  id: string;
  title: string;
  category: 'travel' | 'dining' | 'lifestyle';
  description: string;
  originalPrice: number;
  memberPrice: number;
  imageUrl: string;
  location?: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface UserStats {
  savings: number;
  ordersCount: number;
  nextTrip: string;
}

export interface ItineraryItem {
  id: string;
  type: 'flight' | 'train' | 'hotel' | 'dining';
  title: string;
  date: string;
  status: 'confirmed' | 'processing';
  details: string;
}

export enum NavigationTab {
  DASHBOARD = 'dashboard',
  PRIVILEGES = 'privileges',
  BUTLER = 'butler',
  PROFILE = 'profile'
}