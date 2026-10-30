export type PollutionType = 
  | 'Sahil Temizliği' 
  | 'Sokak Temizliği' 
  | 'Park ve Bahçe Temizliği' 
  | 'Orman Temizliği' 
  | 'Atık Toplama'
  | 'İnşaat Molozu & Hafriyat';

export type CleanupStatus = 'Gönüllü Aranıyor' | 'Temizlik Planlandı' | 'Devam Ediyor' | 'Temizlendi';

export interface CleanupEvent {
  id: string;
  title: string;
  district: string;
  neighborhood: string;
  fullAddress: string;
  mapCoords: { x: number; y: number; lat: number; lng: number }; // percentage on stylized Istanbul map
  pollutionType: PollutionType;
  status: CleanupStatus;
  eventDate: string;
  volunteerTarget: number;
  currentVolunteers: number;
  photoUrl: string;
  description: string;
  collectedKg?: number;
  tags: string[];
}

export interface VolunteerRegistration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  fullAddress: string;
  participateRegions: string[]; // e.g. "Anadolu Yakası", "Avrupa Yakası", "Tüm İstanbul"
  cleanupTypes: PollutionType[];
  availableDays: string[];
  registeredAt: string;
}

export interface DirtyAreaReport {
  id: string;
  reporterName: string;
  reporterContact: string;
  district: string;
  neighborhood: string;
  fullAddress: string;
  locationNote: string;
  pollutionType: PollutionType;
  photoUrl: string;
  description: string;
  urgency: 'Düşük' | 'Orta' | 'Acil';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface BeforeAfterStory {
  id: string;
  title: string;
  location: string;
  district: string;
  date: string;
  beforeImage: string;
  afterImage: string;
  collectedKg: number;
  volunteersJoined: number;
  summary: string;
  category: PollutionType;
}

export interface InspiringFigure {
  id: string;
  name: string;
  role: string;
  quote: string;
  subquote?: string;
  imageUrl: string;
  lifespan?: string;
}
