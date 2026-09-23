export type AthleteDiscipline = 'sprint' | 'football' | 'soccer' | 'olympic';

export interface AssessmentProtocol {
  id: string;
  name: string;
  description: string;
  duration: string;
  estimatePrice: number;
  category: 'biomechanics' | 'velocity' | 'force_plate' | 'recovery';
  icon: string;
  helperText?: string;
}

export interface BookingRecord {
  id: string;
  ticketId: string;
  customerName: string;
  email: string;
  phone: string;
  vehicleType: AthleteDiscipline; // Re-mapped for compatibility
  vehicleMake: string; // Team or Club (e.g. Team USA Track)
  vehicleModel: string; // Event or Position (e.g. 100m Dash / Wide Receiver)
  serviceId: string;
  selectedDate: string;
  selectedTime: string;
  notes?: string;
  priceEstimate: number;
  status: TicketStatus;
}

export type TicketStatus = 'inspection' | 'parts_ordered' | 'in_progress' | 'quality_check' | 'ready';

export interface TicketStatusState {
  label: string;
  description: string;
  details: string;
  percentage: number;
  iconName: string;
}

export interface PackageTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface TestimonialRecord {
  id: string;
  author: string;
  vehicle: string; // Athlete & Division
  type: string; // "Top-Speed Kinetic Overhaul", "Combine 40yd Vectoring", etc.
  text: string;
  rating: number;
  beforeUrl: string;
  afterUrl: string;
  date: string;
}
