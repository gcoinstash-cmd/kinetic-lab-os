import { AssessmentProtocol, PackageTier, TestimonialRecord, BookingRecord } from './types';

export const SERVICES: AssessmentProtocol[] = [
  {
    id: 'force-plate',
    name: 'Dual Force Plate Asymmetry & Ground Contact Audit',
    category: 'force_plate',
    estimatePrice: 280,
    duration: '1 Hour',
    description: '1000Hz dual force plate telemetry logging ground reaction force (GRF), eccentric impulse, left/right limb asymmetry, and ground contact time (GCT) down to the millisecond.',
    icon: 'Activity',
    helperText: '(Hardware sensors track footstrike force and left/right imbalances to prevent soft-tissue injuries).'
  },
  {
    id: 'laser-speed',
    name: 'Optojump Laser Gate & Velocity Profiling',
    category: 'velocity',
    estimatePrice: 450,
    duration: '2 Hours',
    description: 'Triple-gate wireless timing laser traps capturing 10-yard acceleration split, peak top-end velocity (MPH), stride frequency, and flight phase kinematics.',
    icon: 'Gauge',
    helperText: '(Olympic-grade laser trap system measuring acceleration and maximum sprint speed).'
  },
  {
    id: 'markerless-3d',
    name: 'High-Speed Markerless Biomechanics Kinematics',
    category: 'biomechanics',
    estimatePrice: 799,
    duration: '3.5 Hours',
    description: '8-camera 240fps multi-view video tracking hip displacement, knee flexion angles, pelvic tilt, and rotational torso torque during maximum velocity sprint mechanics.',
    icon: 'Cpu',
    helperText: '(AI motion tracking diagnosing technical sprint flaws without restrictive markers).'
  },
  {
    id: 'rsi-power',
    name: 'Reactive Strength Index (RSI) & Elastic Stiffness',
    category: 'force_plate',
    estimatePrice: 220,
    duration: '1.5 Hours',
    description: 'Drop jump and continuous rebound jump evaluations calculating stretch-shortening cycle (SSC) efficiency and Achilles tendon elastic energy storage.',
    icon: 'Droplet',
    helperText: '(Measures explosive spring-like recoil in the tendons to increase sprint bounce).'
  },
  {
    id: 'recovery-thermo',
    name: 'Infrared Thermography & Neuromuscular Recovery',
    category: 'recovery',
    estimatePrice: 195,
    duration: '1 Hour',
    description: 'Clinical FLIR infrared scan mapping localized hamstring/groin micro-inflammation paired with central nervous system (CNS) heart-rate variability readiness.',
    icon: 'Sparkles',
    helperText: '(Heat-map imaging showing muscle strain hot-spots before a tear occurs).'
  },
  {
    id: 'combine-prep',
    name: 'Combine 40-Yard Sprint Acceleration Lab',
    category: 'velocity',
    estimatePrice: 650,
    duration: '2.5 Hours',
    description: 'NFL & collegiate combine acceleration clinic focusing on 3-point stance block exit angles, initial 3-step shin angles, and first-step projection force vectors.',
    icon: 'Sliders',
    helperText: '(Specific start-position biomechanics designed to shave 0.15s off 40-yard dash splits).'
  }
];

export const PACKAGES: PackageTier[] = [
  {
    id: 'pkg-foundation',
    name: 'Foundation Speed Audit',
    price: '$280',
    description: 'Comprehensive initial evaluation of sprint biomechanics, force plate asymmetry, and injury risk screening for competitive athletes.',
    features: [
      'Dual 1000Hz Force Plate Baseline Test',
      '10-Yard Acceleration Laser Split Gate',
      'Left vs Right Limb Asymmetry Diagnostic',
      'Certified Digital Biomechanics Telemetry Report'
    ]
  },
  {
    id: 'pkg-apex',
    name: 'Elite Velocity Lab Protocol',
    price: '$799',
    description: 'Our flagship full-stack athletic assessment combining 3D motion kinematics, top-speed radar, and customized neuromuscular programming.',
    features: [
      'Complete 8-Camera 3D Markerless Kinematics',
      'Triple Laser Gate Top-Speed Radar (MPH)',
      'Reactive Strength Index (RSI) Tendon Stiffness',
      'Pelvic & Torso Rotational Torque Mapping',
      '1-on-1 Senior Biomechanist Technical Debrief',
      'Supabase Database Export & Player Vault Sync'
    ],
    isPopular: true
  },
  {
    id: 'pkg-combine',
    name: 'Pro Combine & Draft Prep',
    price: '$1,450',
    description: 'White-glove testing battery tailored for NFL Combine, Olympic Trials, and Premier League draft candidates preparing for high-stakes showcases.',
    features: [
      'All Assessments in Elite Velocity Protocol',
      '3-Point Stance Shave-0.10s Block Exit Optimization',
      'FLIR Infrared Muscle Inflammation Scan',
      'Official Certified Telemetry Dossier for Scouts & Agents',
      'Priority Re-testing Window (14-Day Progress Audit)'
    ]
  }
];

export const TESTIMONIALS: TestimonialRecord[] = [
  {
    id: 'review-1',
    author: 'Coach Vince Tyler',
    vehicle: 'Team USA Sprint Squad',
    type: 'Top-End Velocity Overhaul',
    text: 'Kinetic Lab shaved 0.12 seconds off our sprinter’s 60m split in 4 weeks. The force plate asymmetry radar pinpointed a right hip power leak we could never see with standard video cameras. Irreplaceable diagnostic rig.',
    rating: 5,
    beforeUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=700',
    afterUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=700',
    date: '2026-08-14'
  },
  {
    id: 'review-2',
    author: 'Dr. Aris Thorne',
    vehicle: 'Collegiate Combine WR Program',
    type: 'Combine 40-Yard Vectoring',
    text: 'The 3-point start block diagnostics transformed our receivers’ first step. We walked into the combine with verified 10-yard splits of 1.44s. The interactive live report was shared directly with NFL scouting departments.',
    rating: 5,
    beforeUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=700',
    afterUrl: 'https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&q=80&w=700',
    date: '2026-07-28'
  },
  {
    id: 'review-3',
    author: 'Elena Rostova',
    vehicle: 'European Track Federation',
    type: 'Reactive Strength Index (RSI)',
    text: 'Testing Achilles stiffness on their dual force plate arrays protected two Olympic hopefuls from serious tendonitis before European Championships. The instant data feedback is world-class.',
    rating: 5,
    beforeUrl: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&q=80&w=700',
    afterUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=700',
    date: '2026-09-02'
  }
];

export const PRESEEDED_BOOKINGS: BookingRecord[] = [
  {
    id: 'booking-knt-9502',
    ticketId: 'KNT-9502',
    customerName: 'Marcus Miller',
    email: 'marcus.m@trackconcept.net',
    phone: '(310) 555-0142',
    vehicleType: 'sprint',
    vehicleMake: 'Team USA Track',
    vehicleModel: '100m Dash Specialist',
    serviceId: 'force-plate',
    selectedDate: '2026-09-24',
    selectedTime: '09:00 AM',
    notes: 'Prior hamstring tightness at 40m transition. Requesting dual force plate ground impulse test.',
    priceEstimate: 280,
    status: 'in_progress'
  },
  {
    id: 'booking-knt-4108',
    ticketId: 'KNT-4108',
    customerName: 'Sarah Jenkins',
    email: 'sjenkins@combinespeed.io',
    phone: '(415) 555-8921',
    vehicleType: 'football',
    vehicleMake: 'Ohio State Football',
    vehicleModel: 'Slot Receiver (NFL Combine Prep)',
    serviceId: 'combine-prep',
    selectedDate: '2026-09-25',
    selectedTime: '11:30 AM',
    notes: 'Aiming to break 4.40s barrier. Needs block start video review and laser split timing.',
    priceEstimate: 650,
    status: 'inspection'
  },
  {
    id: 'booking-knt-7721',
    ticketId: 'KNT-7721',
    customerName: 'Kylian Vance',
    email: 'k.vance@arsenal-academy.uk',
    phone: '(323) 555-7744',
    vehicleType: 'soccer',
    vehicleMake: 'Arsenal Academy',
    vehicleModel: 'Winger (Maximum Sprint Velocity)',
    serviceId: 'markerless-3d',
    selectedDate: '2026-09-26',
    selectedTime: '02:00 PM',
    notes: 'Complete kinematics report requested for technical coaching staff.',
    priceEstimate: 799,
    status: 'quality_check'
  }
];
