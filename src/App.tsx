import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { WorkforceProvider, useWorkforce } from './context/WorkforceContext';
import { Navbar } from './components/layout/Navbar';
import { LandingPage } from './pages/LandingPage';
import { RecruiterDashboard } from './pages/RecruiterDashboard';
import { WorkerMobileApp } from './pages/WorkerMobileApp';

// Modals and Drawers
import { CreateWorkModal } from './components/jobs/CreateWorkModal';
import { WorkerMatchingModal } from './components/jobs/WorkerMatchingModal';
import { SendOpportunityModal } from './components/sms/SendOpportunityModal';
import { WorkerRegisterModal } from './components/workers/WorkerRegisterModal';
import { WorkerProfileModal } from './components/workers/WorkerProfileModal';
import { ShramikAIChatModal } from './components/ai/ShramikAIChatModal';
import { BasicPhoneSimulator } from './components/sms/BasicPhoneSimulator';
import { NotificationDrawer } from './components/layout/NotificationDrawer';
import { AccessibilityModal } from './components/accessibility/AccessibilityModal';
import { HackathonDemoRunner } from './components/demo/HackathonDemoRunner';

const MainAppContent: React.FC = () => {
  const { currentRole } = useWorkforce();
  const [currentPage, setCurrentPage] = useState<'landing' | 'workspace'>('landing');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-shramik-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          if (currentPage !== 'workspace') setCurrentPage('workspace');
        }}
        onGoHome={() => setCurrentPage('landing')}
      />

      {/* Main Page View */}
      <main className="flex-1">
        {currentPage === 'landing' ? (
          <LandingPage onGetStarted={() => setCurrentPage('workspace')} />
        ) : currentRole === 'worker' ? (
          <WorkerMobileApp />
        ) : (
          <RecruiterDashboard
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        )}
      </main>

      {/* Global Modals & Floating Tools */}
      <CreateWorkModal />
      <WorkerMatchingModal />
      <SendOpportunityModal />
      <WorkerRegisterModal />
      <WorkerProfileModal />
      <ShramikAIChatModal />
      <BasicPhoneSimulator />
      <NotificationDrawer />
      <AccessibilityModal />
      <HackathonDemoRunner />

      {/* Footer */}
      {currentPage !== 'landing' && currentRole === 'recruiter' && (
        <footer className="border-t border-slate-200/80 bg-white py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 font-display">SHRAMIK-QUOTE</span>
              <span>— Connecting skilled workers with organized opportunities.</span>
            </div>
            <p>One mobile number. One worker identity. More opportunities.</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <WorkforceProvider>
        <MainAppContent />
      </WorkforceProvider>
    </LanguageProvider>
  );
}

export default App;
