export type WorkerSkill = 
  | 'Plumber' 
  | 'Painter' 
  | 'Carpenter' 
  | 'Electrician' 
  | 'Mason' 
  | 'Mechanic' 
  | 'Welder' 
  | 'Construction' 
  | 'Cleaner' 
  | 'Agricultural';

export type JobCategory = WorkerSkill;

export type WorkerAvailability = 'available' | 'busy' | 'on_leave';

export type LanguageCode = 'en' | 'hi' | 'mr';

export interface Worker {
  id: string;
  name: string;
  phone: string;
  primarySkill: WorkerSkill;
  additionalSkills: string[];
  experienceYears: number;
  location: string;
  distanceKm: number;
  preferredLanguage: LanguageCode;
  availability: WorkerAvailability;
  rating: number;
  jobsCompleted: number;
  dailyRate: number;
  bio: string;
  serviceAreas: string[];
  certifications: string[];
  verified: boolean;
  avatarBg: string;
}

export type JobStatus = 'draft' | 'recruiting' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export interface Job {
  id: string;
  title: string;
  category: WorkerSkill;
  description: string;
  location: string;
  startDate: string;
  durationDays: number;
  reportingTime: string;
  workersRequired: number;
  skills: string[];
  experienceRequired: number;
  preferredLanguage: LanguageCode;
  dailyPayment: number;
  paymentNotes: string;
  status: JobStatus;
  shortlistedWorkerIds: string[];
  notifiedWorkerIds: string[];
  interestedWorkerIds: string[];
  assignedWorkerIds: string[];
  completedWorkerIds: string[];
  createdAt: string;
}

export interface WorkAssignment {
  id: string;
  jobId: string;
  workerId: string;
  status: 'notified' | 'interested' | 'assigned' | 'declined' | 'completed';
  responseTimestamp?: string;
  workerNotes?: string;
}

export interface WorkHistoryItem {
  id: string;
  workerId: string;
  jobId: string;
  jobTitle: string;
  category: WorkerSkill;
  location: string;
  completedDate: string;
  durationDays: number;
  rating: number;
  recruiterFeedback: string;
  earnedAmount: number;
  recruiterName: string;
}

export interface SMSMessage {
  id: string;
  jobId?: string;
  workerId?: string;
  workerPhone: string;
  workerName: string;
  direction: 'outgoing' | 'incoming';
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'failed';
}

export interface ChatMessage {
  id: string;
  sender: 'worker' | 'ai' | 'system';
  content: string;
  timestamp: string;
  language: LanguageCode;
  jobContextId?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'info' | 'warning' | 'urgent';
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface AccessibilitySettings {
  textSize: 'normal' | 'large' | 'xlarge';
  contrast: 'standard' | 'high';
  motion: 'standard' | 'reduced';
  threeD: boolean;
  soundEnabled: boolean;
}

export interface MatchResult {
  worker: Worker;
  matchScore: number;
  breakdown: {
    skillScore: number;
    experienceScore: number;
    proximityScore: number;
    availabilityScore: number;
    ratingScore: number;
  };
}
