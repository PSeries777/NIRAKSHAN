import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Worker,
  Job,
  WorkHistoryItem,
  SMSMessage,
  NotificationItem,
  AccessibilitySettings,
  MatchResult,
  LanguageCode,
  JobCategory
} from '../types';
import {
  INITIAL_WORKERS,
  INITIAL_JOBS,
  INITIAL_WORK_HISTORY,
  INITIAL_NOTIFICATIONS
} from '../data/seedData';
import {
  playClickSound,
  playSmsChime,
  playSuccessChime
} from '../utils/audioFeedback';

interface CreateJobInput {
  title: string;
  category: JobCategory;
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
}

interface RegisterWorkerInput {
  name: string;
  phone: string;
  primarySkill: JobCategory;
  additionalSkills: string[];
  experienceYears: number;
  location: string;
  preferredLanguage: LanguageCode;
  dailyRate: number;
  bio: string;
}

interface WorkforceContextType {
  // Data
  workers: Worker[];
  jobs: Job[];
  workHistory: WorkHistoryItem[];
  smsLogs: SMSMessage[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  activeJob: Job | null;
  selectedWorker: Worker | null;
  currentRole: 'recruiter' | 'worker';
  accessibility: AccessibilitySettings;

  // Modals & Panels
  isBasicPhoneOpen: boolean;
  isCreateWorkOpen: boolean;
  isMatchingOpen: boolean;
  isSendSmsOpen: boolean;
  isShramikAiOpen: boolean;
  isRegisterWorkerOpen: boolean;
  isNotificationDrawerOpen: boolean;
  isAccessibilityModalOpen: boolean;
  isWorkerProfileOpen: boolean;
  isDemoTourActive: boolean;
  demoStep: number;

  // Setters
  setCurrentRole: (role: 'recruiter' | 'worker') => void;
  setActiveJob: (job: Job | null) => void;
  setSelectedWorker: (worker: Worker | null) => void;
  setIsBasicPhoneOpen: (open: boolean) => void;
  setIsCreateWorkOpen: (open: boolean) => void;
  setIsMatchingOpen: (open: boolean) => void;
  setIsSendSmsOpen: (open: boolean) => void;
  setIsShramikAiOpen: (open: boolean) => void;
  setIsRegisterWorkerOpen: (open: boolean) => void;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  setIsAccessibilityModalOpen: (open: boolean) => void;
  setIsWorkerProfileOpen: (open: boolean) => void;
  setIsDemoTourActive: (active: boolean) => void;
  setDemoStep: (step: number) => void;

  // Operations
  createJob: (input: CreateJobInput) => Job;
  registerWorker: (input: RegisterWorkerInput) => Worker;
  findMatchesForJob: (jobId: string) => MatchResult[];
  shortlistWorkersForJob: (jobId: string, workerIds: string[]) => void;
  dispatchJobSMS: (jobId: string, workerIds: string[], lang: LanguageCode) => void;
  simulateWorkerResponse: (workerId: string, responseChoice: '1' | '2' | '3', jobId?: string) => void;
  assignWorkersToJob: (jobId: string, workerIds: string[]) => void;
  completeJob: (jobId: string) => void;
  markNotificationsAsRead: () => void;
  updateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
  resetToDemoState: () => void;
}

const WorkforceContext = createContext<WorkforceContextType | undefined>(undefined);

export const WorkforceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // LocalStorage initialization
  const [workers, setWorkers] = useState<Worker[]>(() => {
    const saved = localStorage.getItem('shramik_workers');
    return saved ? JSON.parse(saved) : INITIAL_WORKERS;
  });

  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('shramik_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [workHistory, setWorkHistory] = useState<WorkHistoryItem[]>(() => {
    const saved = localStorage.getItem('shramik_history');
    return saved ? JSON.parse(saved) : INITIAL_WORK_HISTORY;
  });

  const [smsLogs, setSmsLogs] = useState<SMSMessage[]>(() => {
    const saved = localStorage.getItem('shramik_sms_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('shramik_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('shramik_accessibility');
    return saved ? JSON.parse(saved) : {
      textSize: 'normal',
      contrast: 'standard',
      motion: 'standard',
      threeD: true,
      soundEnabled: true,
    };
  });

  // UI state
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [currentRole, setCurrentRole] = useState<'recruiter' | 'worker'>('recruiter');

  const [isBasicPhoneOpen, setIsBasicPhoneOpen] = useState(false);
  const [isCreateWorkOpen, setIsCreateWorkOpen] = useState(false);
  const [isMatchingOpen, setIsMatchingOpen] = useState(false);
  const [isSendSmsOpen, setIsSendSmsOpen] = useState(false);
  const [isShramikAiOpen, setIsShramikAiOpen] = useState(false);
  const [isRegisterWorkerOpen, setIsRegisterWorkerOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);
  const [isWorkerProfileOpen, setIsWorkerProfileOpen] = useState(false);
  const [isDemoTourActive, setIsDemoTourActive] = useState(false);
  const [demoStep, setDemoStep] = useState(1);

  // Set default active job to the first recruiting job
  useEffect(() => {
    if (!activeJob && jobs.length > 0) {
      setActiveJob(jobs[0]);
    }
  }, [jobs, activeJob]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('shramik_workers', JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem('shramik_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('shramik_history', JSON.stringify(workHistory));
  }, [workHistory]);

  useEffect(() => {
    localStorage.setItem('shramik_sms_logs', JSON.stringify(smsLogs));
  }, [smsLogs]);

  useEffect(() => {
    localStorage.setItem('shramik_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('shramik_accessibility', JSON.stringify(accessibility));

    // Update body classes for accessibility
    const body = document.body;
    body.classList.remove('text-size-lg', 'text-size-xl', 'high-contrast', 'reduce-motion');

    if (accessibility.textSize === 'large') body.classList.add('text-size-lg');
    if (accessibility.textSize === 'xlarge') body.classList.add('text-size-xl');
    if (accessibility.contrast === 'high') body.classList.add('high-contrast');
    if (accessibility.motion === 'reduced') body.classList.add('reduce-motion');
  }, [accessibility]);

  const unreadNotificationCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  // Operations
  const updateAccessibility = (settings: Partial<AccessibilitySettings>) => {
    setAccessibility(prev => ({ ...prev, ...settings }));
    playClickSound(accessibility.soundEnabled);
  };

  const createJob = (input: CreateJobInput): Job => {
    const newId = `SQ-J-${2045 + jobs.length + 1}`;
    const newJob: Job = {
      id: newId,
      ...input,
      status: 'recruiting',
      shortlistedWorkerIds: [],
      notifiedWorkerIds: [],
      interestedWorkerIds: [],
      assignedWorkerIds: [],
      completedWorkerIds: [],
      createdAt: new Date().toISOString(),
    };

    setJobs(prev => [newJob, ...prev]);
    setActiveJob(newJob);

    // Add notification
    const newNotif: NotificationItem = {
      id: `SQ-N-${Date.now()}`,
      title: 'New Project Created',
      description: `${newJob.title} in ${newJob.location} is ready for candidate matching.`,
      type: 'info',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);

    playSuccessChime(accessibility.soundEnabled);
    return newJob;
  };

  const registerWorker = (input: RegisterWorkerInput): Worker => {
    const newId = `SQ-W-${1042 + workers.length + 1}`;
    const newWorker: Worker = {
      id: newId,
      ...input,
      distanceKm: 2.5,
      availability: 'available',
      rating: 4.8,
      jobsCompleted: 0,
      serviceAreas: [input.location],
      certifications: ['Skill Identity Verified'],
      verified: true,
      avatarBg: 'from-blue-600 to-indigo-700',
    };

    setWorkers(prev => [newWorker, ...prev]);

    // Send simulated registration SMS
    const regSms: SMSMessage = {
      id: `SMS-${Date.now()}`,
      workerId: newId,
      workerPhone: newWorker.phone,
      workerName: newWorker.name,
      direction: 'outgoing',
      content: `SHRAMIK-QUOTE: Welcome ${newWorker.name}! Your Worker ID is ${newId}. You are now registered to receive direct local work opportunities via SMS.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered',
    };
    setSmsLogs(prev => [regSms, ...prev]);

    const newNotif: NotificationItem = {
      id: `SQ-N-${Date.now()}`,
      title: 'Worker Registered & Verified',
      description: `${newWorker.name} (${newWorker.primarySkill}) registered with ID ${newId}.`,
      type: 'success',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);

    playSuccessChime(accessibility.soundEnabled);
    return newWorker;
  };

  const findMatchesForJob = (jobId: string): MatchResult[] => {
    const job = jobs.find(j => j.id === jobId) || activeJob;
    if (!job) return [];

    return workers.map(worker => {
      // 1. Skill Score (Max 40)
      let skillScore = 0;
      if (worker.primarySkill.toLowerCase() === job.category.toLowerCase()) {
        skillScore = 40;
      } else if (worker.additionalSkills.some(s => s.toLowerCase().includes(job.category.toLowerCase()))) {
        skillScore = 25;
      } else {
        skillScore = 10;
      }

      // 2. Experience Score (Max 20)
      const expRatio = Math.min(worker.experienceYears / Math.max(job.experienceRequired, 1), 1.5);
      const experienceScore = Math.round(Math.min(expRatio * 20, 20));

      // 3. Proximity Score (Max 20)
      let proximityScore = 20;
      if (worker.distanceKm < 3) proximityScore = 20;
      else if (worker.distanceKm < 6) proximityScore = 16;
      else if (worker.distanceKm < 10) proximityScore = 12;
      else proximityScore = 8;

      // 4. Availability Score (Max 10)
      const availabilityScore = worker.availability === 'available' ? 10 : 2;

      // 5. Rating Score (Max 10)
      const ratingScore = Math.round((worker.rating / 5.0) * 10);

      const totalScore = Math.min(skillScore + experienceScore + proximityScore + availabilityScore + ratingScore, 98);

      return {
        worker,
        matchScore: totalScore,
        breakdown: {
          skillScore,
          experienceScore,
          proximityScore,
          availabilityScore,
          ratingScore,
        }
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  };

  const shortlistWorkersForJob = (jobId: string, workerIds: string[]) => {
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return {
          ...j,
          shortlistedWorkerIds: workerIds,
        };
      }
      return j;
    }));
    playClickSound(accessibility.soundEnabled);
  };

  const dispatchJobSMS = (jobId: string, workerIds: string[], lang: LanguageCode) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    const newSmsList: SMSMessage[] = [];

    workerIds.forEach(wId => {
      const worker = workers.find(w => w.id === wId);
      if (!worker) return;

      let msgText = '';
      if (lang === 'mr') {
        msgText = `SHRAMIK-QUOTE: नवीन कामाची संधी!\nकाम: ${job.title}\n📍 ${job.location}\n📅 ${job.startDate}\n⏱ ${job.durationDays} दिवस\n💰 ₹${job.dailyPayment}/दिवस\n\nउत्तर द्या:\n1 - होय (इच्छुक आहे)\n2 - नाही\n3 - अधिक माहिती`;
      } else if (lang === 'hi') {
        msgText = `SHRAMIK-QUOTE: नया कार्य अवसर!\nकार्य: ${job.title}\n📍 ${job.location}\n📅 ${job.startDate}\n⏱ ${job.durationDays} दिन\n💰 ₹${job.dailyPayment}/दिन\n\nउत्तर दें:\n1 - इच्छुक हूँ\n2 - नहीं\n3 - अधिक विवरण`;
      } else {
        msgText = `SHRAMIK-QUOTE: New Work Opportunity!\nWork: ${job.title}\n📍 ${job.location}\n📅 ${job.startDate}\n⏱ ${job.durationDays} Days\n💰 ₹${job.dailyPayment}/day\n\nReply:\n1 - Interested\n2 - Not Interested\n3 - More Details`;
      }

      newSmsList.push({
        id: `SMS-${Date.now()}-${wId}`,
        jobId,
        workerId: wId,
        workerPhone: worker.phone,
        workerName: worker.name,
        direction: 'outgoing',
        content: msgText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered',
      });
    });

    setSmsLogs(prev => [...newSmsList, ...prev]);

    // Update job notifiedWorkerIds
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return {
          ...j,
          notifiedWorkerIds: Array.from(new Set([...j.notifiedWorkerIds, ...workerIds])),
        };
      }
      return j;
    }));

    // Add notification
    const newNotif: NotificationItem = {
      id: `SQ-N-${Date.now()}`,
      title: 'SMS Dispatched',
      description: `Opportunity broadcast sent to ${workerIds.length} candidate craftspeople.`,
      type: 'info',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Confetti & chime
    playSmsChime(accessibility.soundEnabled);
    if (accessibility.motion !== 'reduced') {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const simulateWorkerResponse = (workerId: string, responseChoice: '1' | '2' | '3', jobId?: string) => {
    const targetJob = jobId ? jobs.find(j => j.id === jobId) : activeJob;
    const worker = workers.find(w => w.id === workerId) || workers[0];
    if (!targetJob) return;

    let incomingText = responseChoice;
    let desc = '';

    if (responseChoice === '1') {
      desc = `${worker.name} replied '1' (Interested) for ${targetJob.title}.`;
      setJobs(prev => prev.map(j => {
        if (j.id === targetJob.id) {
          return {
            ...j,
            interestedWorkerIds: Array.from(new Set([...j.interestedWorkerIds, worker.id])),
          };
        }
        return j;
      }));
    } else if (responseChoice === '2') {
      desc = `${worker.name} replied '2' (Not Available).`;
    } else {
      desc = `${worker.name} requested more job details via SMS.`;
    }

    const incomingSms: SMSMessage = {
      id: `SMS-${Date.now()}-IN`,
      jobId: targetJob.id,
      workerId: worker.id,
      workerPhone: worker.phone,
      workerName: worker.name,
      direction: 'incoming',
      content: incomingText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered',
    };

    setSmsLogs(prev => [incomingSms, ...prev]);

    const newNotif: NotificationItem = {
      id: `SQ-N-${Date.now()}`,
      title: responseChoice === '1' ? 'Worker Response: Interested!' : 'Worker Response Received',
      description: desc,
      type: responseChoice === '1' ? 'success' : 'info',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);

    playSmsChime(accessibility.soundEnabled);
  };

  const assignWorkersToJob = (jobId: string, workerIds: string[]) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return {
          ...j,
          assignedWorkerIds: workerIds,
          status: 'confirmed',
        };
      }
      return j;
    }));

    // Mark workers as busy
    setWorkers(prev => prev.map(w => {
      if (workerIds.includes(w.id)) {
        return { ...w, availability: 'busy' };
      }
      return w;
    }));

    const newNotif: NotificationItem = {
      id: `SQ-N-${Date.now()}`,
      title: 'Workers Assigned to Project',
      description: `${workerIds.length} workers successfully assigned to ${job.title}.`,
      type: 'success',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);

    playSuccessChime(accessibility.soundEnabled);
  };

  const completeJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    // Set job completed
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return {
          ...j,
          status: 'completed',
          completedWorkerIds: j.assignedWorkerIds.length > 0 ? j.assignedWorkerIds : j.interestedWorkerIds,
        };
      }
      return j;
    }));

    const workerIdsToReward = job.assignedWorkerIds.length > 0 
      ? job.assignedWorkerIds 
      : (job.interestedWorkerIds.length > 0 ? job.interestedWorkerIds : ['SQ-W-1042']);

    // Update worker stats: jobsCompleted + 1 and status to available
    setWorkers(prev => prev.map(w => {
      if (workerIdsToReward.includes(w.id)) {
        return {
          ...w,
          jobsCompleted: w.jobsCompleted + 1,
          availability: 'available',
        };
      }
      return w;
    }));

    // Add new verified work history entry for assigned workers
    const newHistoryItems: WorkHistoryItem[] = workerIdsToReward.map(wId => ({
      id: `SQ-H-${Date.now()}-${wId}`,
      workerId: wId,
      jobId: job.id,
      jobTitle: job.title,
      category: job.category,
      location: job.location,
      completedDate: 'Today (Verified)',
      durationDays: job.durationDays,
      rating: 5,
      recruiterFeedback: 'Outstanding craft, punctual reporting, and diligent work on site. Payment settled in full.',
      earnedAmount: job.dailyPayment * job.durationDays,
      recruiterName: 'State Infrastructure Head',
    }));

    setWorkHistory(prev => [...newHistoryItems, ...prev]);

    const newNotif: NotificationItem = {
      id: `SQ-N-${Date.now()}`,
      title: 'Work Completed & History Verified!',
      description: `${job.title} marked completed. ${workerIdsToReward.length} worker digital portfolios upgraded.`,
      type: 'success',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);

    playSuccessChime(accessibility.soundEnabled);
    if (accessibility.motion !== 'reduced') {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const resetToDemoState = () => {
    setWorkers(INITIAL_WORKERS);
    setJobs(INITIAL_JOBS);
    setWorkHistory(INITIAL_WORK_HISTORY);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSmsLogs([]);
    setActiveJob(INITIAL_JOBS[0]);
    localStorage.removeItem('shramik_workers');
    localStorage.removeItem('shramik_jobs');
    localStorage.removeItem('shramik_history');
    localStorage.removeItem('shramik_notifications');
    localStorage.removeItem('shramik_sms_logs');
    playClickSound(accessibility.soundEnabled);
  };

  return (
    <WorkforceContext.Provider
      value={{
        workers,
        jobs,
        workHistory,
        smsLogs,
        notifications,
        unreadNotificationCount,
        activeJob,
        selectedWorker,
        currentRole,
        accessibility,

        isBasicPhoneOpen,
        isCreateWorkOpen,
        isMatchingOpen,
        isSendSmsOpen,
        isShramikAiOpen,
        isRegisterWorkerOpen,
        isNotificationDrawerOpen,
        isAccessibilityModalOpen,
        isWorkerProfileOpen,
        isDemoTourActive,
        demoStep,

        setCurrentRole,
        setActiveJob,
        setSelectedWorker,
        setIsBasicPhoneOpen,
        setIsCreateWorkOpen,
        setIsMatchingOpen,
        setIsSendSmsOpen,
        setIsShramikAiOpen,
        setIsRegisterWorkerOpen,
        setIsNotificationDrawerOpen,
        setIsAccessibilityModalOpen,
        setIsWorkerProfileOpen,
        setIsDemoTourActive,
        setDemoStep,

        createJob,
        registerWorker,
        findMatchesForJob,
        shortlistWorkersForJob,
        dispatchJobSMS,
        simulateWorkerResponse,
        assignWorkersToJob,
        completeJob,
        markNotificationsAsRead,
        updateAccessibility,
        resetToDemoState,
      }}
    >
      {children}
    </WorkforceContext.Provider>
  );
};

export const useWorkforce = (): WorkforceContextType => {
  const context = useContext(WorkforceContext);
  if (!context) {
    throw new Error('useWorkforce must be used within a WorkforceProvider');
  }
  return context;
};
