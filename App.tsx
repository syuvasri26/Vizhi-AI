import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MapView } from './components/MapView';
import { RouteSearchCard } from './components/RouteSearchCard';
import { RouteComparison } from './components/RouteComparison';
import { StreetlightReportModal } from './components/StreetlightReportModal';
import { MunicipalDashboard } from './components/MunicipalDashboard';
import { TrustedContactsModal } from './components/TrustedContactsModal';
import { SosModal } from './components/SosModal';
import { SafetyMapExplorer } from './components/SafetyMapExplorer';
import { MyReportsView } from './components/MyReportsView';
import { AdminConfigModal } from './components/AdminConfigModal';
import { DemoWorkflowBanner } from './components/DemoWorkflowBanner';
import { VizhiLogo } from './components/VizhiLogo';
import { LogoModal } from './components/LogoModal';
import { ProjectDownloadModal } from './components/ProjectDownloadModal';
import { VoiceGuidancePanel } from './components/VoiceGuidancePanel';
import { OfflineMapsModal } from './components/OfflineMapsModal';
import { NetworkNoticeModal } from './components/NetworkNoticeModal';
import { NetworkDetailsModal } from './components/NetworkDetailsModal';
import { LoginPage } from './components/LoginPage';
import { RouteOption } from './types';
import { Shield, Sparkles, Navigation, AlertTriangle, Building2, MapPin, Compass, ShieldCheck } from 'lucide-react';

const POPULAR_LOCALITIES = [
  { name: 'Gandhipuram', status: 'High Lighting' },
  { name: 'RS Puram', status: 'CCTV Monitored' },
  { name: 'Peelamedu', status: 'Police Patrols' },
  { name: 'Saibaba Colony', status: 'Active Grid' },
  { name: 'Singanallur', status: 'Arterial Corridor' },
  { name: 'Race Course', status: 'Well Lit' }
];

function MainApp() {
  const [activeTab, setActiveTab] = useState<'navigate' | 'map' | 'report' | 'my-reports' | 'municipal' | 'login'>('navigate');
  
  // Modals state
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isContactsModalOpen, setIsContactsModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState<boolean>(false);
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState<boolean>(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const { 
    currentUser,
    isAuthenticated,
    calculatedRoutes, 
    selectedRoute, 
    setSelectedRoute, 
    startJourney, 
    trustedContacts, 
    activeJourney, 
    stopJourney,
    networkNoticeModalRoute,
    setNetworkNoticeModalRoute,
    selectedNetworkDetailsRoute,
    setSelectedNetworkDetailsRoute
  } = useApp();

  const handleStartJourney = (route: RouteOption) => {
    startJourney(route, 'Gandhipuram', 'Peelamedu', trustedContacts[0]?.id);
  };

  const handleShareJourney = (route: RouteOption) => {
    setIsContactsModalOpen(true);
  };

  const handleReportSubmitted = (refId: string) => {
    setActiveTab('my-reports');
  };

  // 1. FIRST REQUIRE THE USER TO LOGIN
  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen bg-[#090D14] text-slate-100 flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-200">
        {/* Top Minimal Header */}
        <header className="px-4 sm:px-8 py-3.5 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <VizhiLogo variant="compact" size="md" />
            <div className="hidden sm:block">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Coimbatore Live Grid &bull; 100 Wards
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Authentication Gateway</span>
            </span>
          </div>
        </header>

        {/* Hero + Login Container */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 sm:py-12 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14">
          
          {/* Left Column: Platform Mission & Features */}
          <div className="max-w-lg space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Vizhi AI &bull; Smart Safety &amp; Civic Infrastructure</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Navigate Safer. <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
                Report Smarter.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Please sign in to access personalized night safety routing, real Coimbatore OpenStreetMap GIS, CCMC municipal defect reporting, and emergency SOS tracking.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-3 text-left">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Safe Night Corridors</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Lighting &amp; dark spot intelligence</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-3 text-left">
                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">CCMC Ward GIS</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">100 municipal wards linked</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-3 text-left">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Safe Route to Home</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Personalized residential routing</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-3 text-left">
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Emergency SOS Dispatch</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Live coordinates &amp; contacts</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>ODbL OpenStreetMap</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>CCMC Municipal GIS</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span>256-Bit Encrypted</span>
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Login Card */}
          <div className="w-full max-w-md">
            <LoginPage isOpenAsModal={false} />
          </div>

        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-950/80 py-4 px-6 text-center text-xs text-slate-500">
          Vizhi AI &bull; Coimbatore Smart City &amp; Municipal Infrastructure &bull; Data &copy; OpenStreetMap Contributors
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090D14] text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openContactsModal={() => setIsContactsModalOpen(true)}
        openAdminModal={() => setIsAdminModalOpen(true)}
        openReportModal={() => setIsReportModalOpen(true)}
        openLogoModal={() => setIsLogoModalOpen(true)}
        openOfflineModal={() => setIsOfflineModalOpen(true)}
        openDownloadModal={() => setIsDownloadModalOpen(true)}
        openLoginModal={() => setIsLoginModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6 space-y-6">
        
        {/* Sleek Simulation Demo Banner */}
        <DemoWorkflowBanner />

        {/* TAB 1: Main Navigate & Safe Route Experience */}
        {activeTab === 'navigate' && (
          <div className="space-y-6">
            
            {/* Hero Section */}
            <div className="pt-2">
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-emerald-400 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Vizhi AI &middot; Coimbatore Night Safety &amp; Transit</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
                  Travel through Coimbatore with confidence.
                </h1>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed text-balance">
                  Compare dynamic night routes using streetlight coverage, emergency facility proximity, and real-time civic reports.
                </p>
              </div>
            </div>

            {/* Split Grid: Route Search on left, Map & Comparisons on right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Route Search Form Card */}
              <div className="lg:col-span-4 space-y-4">
                <RouteSearchCard onSearchComplete={() => {}} />

                {/* Quick Locality Guide & Coverage Nodes */}
                <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200 uppercase tracking-wider text-xs flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Coimbatore Hubs</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      Live Monitored
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {POPULAR_LOCALITIES.map((loc, i) => (
                      <div
                        key={i}
                        className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors"
                      >
                        <span className="text-xs font-semibold text-slate-200 block truncate">{loc.name}</span>
                        <span className="text-[10px] text-emerald-400/90 block truncate">{loc.status}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                    Coverage includes Gandhipuram, RS Puram, Peelamedu, Saibaba Colony, Singanallur, Ukkadam, Race Course, and Town Hall.
                  </p>
                </div>
              </div>

              {/* Right Column: Interactive Map & Route Recommendations */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Active Journey Live Voice Guidance HUD (When Journey In Progress) */}
                {activeJourney && selectedRoute && (
                  <div className="space-y-3 p-5 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 shadow-2xl backdrop-blur-md">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-emerald-800/60">
                      <div className="flex items-center gap-3">
                        <span className="relative flex h-3.5 w-3.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-emerald-300">
                            En Route to {activeJourney.destination} &middot; {activeJourney.currentProgressPercent}% Completed
                          </h4>
                          <p className="text-xs text-emerald-200/80">
                            Real-time safety voice guidance is actively monitoring turns
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={stopJourney}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-xs font-bold text-white transition-all shadow-md cursor-pointer"
                      >
                        End Journey
                      </button>
                    </div>

                    <VoiceGuidancePanel
                      route={selectedRoute}
                      currentProgressPercent={activeJourney.currentProgressPercent}
                      isSimulatingJourney={true}
                    />
                  </div>
                )}

                {/* Map Display Card */}
                <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 shadow-xl backdrop-blur-md space-y-3">
                  <div className="flex items-center justify-between text-xs px-1">
                    <span className="flex items-center gap-2 font-bold text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20" />
                      <span>Coimbatore Live Route &amp; Safety Map</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                      11.0168° N, 76.9558° E
                    </span>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-slate-800 shadow-inner">
                    <MapView
                      routes={calculatedRoutes}
                      selectedRoute={selectedRoute}
                      onSelectRoute={(r) => setSelectedRoute(r)}
                      showStreetlights={true}
                      showEmergencyFacilities={true}
                      heightClass="h-[450px] md:h-[520px]"
                    />
                  </div>
                </div>

                {/* Route Alternatives & Explainable AI breakdown */}
                <RouteComparison
                  onStartJourneyClick={handleStartJourney}
                  onShareClick={handleShareJourney}
                />

              </div>

            </div>

          </div>
        )}

        {/* TAB 2: Coimbatore Safety Map */}
        {activeTab === 'map' && (
          <SafetyMapExplorer />
        )}

        {/* TAB 3: My Reports */}
        {activeTab === 'my-reports' && (
          <MyReportsView onOpenReportModal={() => setIsReportModalOpen(true)} />
        )}

        {/* TAB 4: Municipal Dashboard */}
        {activeTab === 'municipal' && (
          <MunicipalDashboard />
        )}

        {/* TAB 5: Login / Authentication */}
        {activeTab === 'login' && (
          <LoginPage 
            isOpenAsModal={false} 
            onSuccess={() => setActiveTab('navigate')} 
          />
        )}

      </main>

      {/* Modern High-Contrast Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-6 px-4 md:px-8 text-xs text-slate-400 mt-auto backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <VizhiLogo variant="compact" size="sm" showSubtitle={false} />
            <div>
              <p className="font-bold text-slate-200">Vizhi AI &middot; Coimbatore, Tamil Nadu</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Real-time civic safety routing &middot; OpenStreetMap &amp; Google Maps Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span className="text-[11px]">
              Civic Infrastructure &amp; Night Safety Network
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <StreetlightReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmittedSuccess={handleReportSubmitted}
      />

      <TrustedContactsModal
        isOpen={isContactsModalOpen}
        onClose={() => setIsContactsModalOpen(false)}
      />

      <SosModal />

      <AdminConfigModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      <LogoModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
      />

      <OfflineMapsModal
        isOpen={isOfflineModalOpen}
        onClose={() => setIsOfflineModalOpen(false)}
      />

      <ProjectDownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      {/* Network Connectivity Intelligence Modals */}
      <NetworkNoticeModal
        isOpen={!!networkNoticeModalRoute}
        route={networkNoticeModalRoute}
        onClose={() => setNetworkNoticeModalRoute(null)}
        onViewDetails={(route) => {
          setNetworkNoticeModalRoute(null);
          setSelectedNetworkDetailsRoute(route);
        }}
      />

      <NetworkDetailsModal
        isOpen={!!selectedNetworkDetailsRoute}
        route={selectedNetworkDetailsRoute}
        onClose={() => setSelectedNetworkDetailsRoute(null)}
      />

      {/* User Login & Authentication Modal */}
      {isLoginModalOpen && (
        <LoginPage
          isOpenAsModal={true}
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={() => setIsLoginModalOpen(false)}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
