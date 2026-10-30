import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CentralFeatureHighlight } from './components/CentralFeatureHighlight';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { EventsMapSection } from './components/EventsMapSection';
import { VolunteerFormSection } from './components/VolunteerFormSection';
import { ReportPollutionSection } from './components/ReportPollutionSection';
import { InspiringQuotesSection } from './components/InspiringQuotesSection';
import { AdminApprovalModal } from './components/AdminApprovalModal';
import { Footer } from './components/Footer';

import { 
  INITIAL_EVENTS, 
  INITIAL_BEFORE_AFTER, 
  INITIAL_PENDING_REPORTS 
} from './data/mockData';
import { CleanupEvent, DirtyAreaReport, VolunteerRegistration } from './types';
import { Check, HeartHandshake, MapPin } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [events, setEvents] = useState<CleanupEvent[]>(INITIAL_EVENTS);
  const [beforeAfterStories] = useState(INITIAL_BEFORE_AFTER);
  const [pendingReports, setPendingReports] = useState<DirtyAreaReport[]>(INITIAL_PENDING_REPORTS);
  
  // Modals & triggers
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [preselectedCleanupType, setPreselectedCleanupType] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Volunteer registration handler
  const handleRegisterSuccess = (vol: VolunteerRegistration) => {
    showToast(`Teşekkürler ${vol.fullName}! Gönüllü kaydınız başarıyla alındı.`);
  };

  // Join a cleanup event
  const handleJoinEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          const newCount = e.currentVolunteers + 1;
          showToast(`"${e.title}" temizlik etkinliğine katıldınız! Kontenjan güncellendi.`);
          return { ...e, currentVolunteers: newCount };
        }
        return e;
      })
    );
  };

  // User submits a new dirty area report
  const handleReportSubmitted = (newReport: DirtyAreaReport) => {
    setPendingReports((prev) => [newReport, ...prev]);
    showToast(`"${newReport.district}" bildiriminiz yönetici onayına sunuldu.`);
  };

  // Admin approves a report -> converts it into a live CleanupEvent!
  const handleApproveReport = (reportId: string) => {
    const reportToApprove = pendingReports.find((r) => r.id === reportId);
    if (!reportToApprove) return;

    const newEvent: CleanupEvent = {
      id: 'evt-approved-' + Date.now(),
      title: `${reportToApprove.district} ${reportToApprove.neighborhood} Temizlik Hareketi`,
      district: reportToApprove.district,
      neighborhood: reportToApprove.neighborhood,
      fullAddress: reportToApprove.fullAddress,
      mapCoords: {
        x: Math.floor(Math.random() * 30) + 40,
        y: Math.floor(Math.random() * 30) + 35,
        lat: 41.0082,
        lng: 28.9784,
      },
      pollutionType: reportToApprove.pollutionType,
      status: 'Gönüllü Aranıyor',
      eventDate: 'Önümüzdeki Hafta Sonu, 10:00',
      volunteerTarget: 40,
      currentVolunteers: 1,
      photoUrl: reportToApprove.photoUrl,
      description: `[Vatandaş Bildirimi Onaylandı] ${reportToApprove.description}`,
      tags: ['Yeni Onaylandı', reportToApprove.pollutionType, 'Gönüllü Aranıyor'],
    };

    setEvents((prev) => [newEvent, ...prev]);
    setPendingReports((prev) => prev.filter((r) => r.id !== reportId));
    showToast(`Bildirim onaylandı ve "${newEvent.title}" olarak temizlik haritasında yayınlandı!`);
  };

  // Admin rejects a report
  const handleRejectReport = (reportId: string) => {
    setPendingReports((prev) => prev.filter((r) => r.id !== reportId));
    showToast('Bildirim incelendi ve listeden kaldırıldı.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenVolunteerModal={() => scrollToSection('volunteer')}
        onOpenReportModal={() => scrollToSection('report')}
        pendingReportsCount={pendingReports.length}
        onOpenAdminModal={() => setIsAdminOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <Hero
          onOpenVolunteer={() => scrollToSection('volunteer')}
          onOpenReport={() => scrollToSection('report')}
          onExploreEvents={() => scrollToSection('events')}
        />

        {/* 2. Inspiring Leaders Spotlight Strip with Side Placement (Requirement 7) */}
        <section className="py-8 bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-4 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Çevre Bilinci & Doğa Sevgisi
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  Tarihe ve Geleceğe İlham Veren Düşünceler
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  İstanbul’u temiz tutma gayemiz, doğaya ve insanlığa gönül vermiş öncülerin ilkelerinden güç alıyor. Sayfayı her ziyaret ettiğinizde yeni bir rehber söz sizi karşılar.
                </p>
                <div className="pt-2 flex items-center gap-3 text-xs text-emerald-300 font-semibold">
                  <span>✦ 39 İlçe Gönüllü Hareketi</span>
                </div>
              </div>

              {/* Inspiring Quotes Showcase Widget (Right Side Placement) */}
              <div className="lg:col-span-8">
                <InspiringQuotesSection />
              </div>

            </div>
          </div>
        </section>

        {/* 3. Central Feature Highlight (Requirement 1: Ana sayfanın orta bölümünde canlı renklerle estetik ve dikkat çekici alan) */}
        <CentralFeatureHighlight
          onSelectType={(type) => setPreselectedCleanupType(type)}
          onOpenVolunteer={() => scrollToSection('volunteer')}
          onOpenReport={() => scrollToSection('report')}
        />

        {/* 4. Before & After Transformation Visual Section (Requirements 2 & 6) */}
        <BeforeAfterSection
          stories={beforeAfterStories}
          onOpenVolunteer={() => scrollToSection('volunteer')}
        />

        {/* 5. Approved Cleanup Events & Map (Requirement 5) */}
        <EventsMapSection
          events={events}
          onJoinEvent={handleJoinEvent}
          onOpenReport={() => scrollToSection('report')}
        />

        {/* 6. Report Dirty Area Section (Requirement 4) */}
        <ReportPollutionSection
          onReportSubmitted={handleReportSubmitted}
          onOpenAdminPanel={() => setIsAdminOpen(true)}
        />

        {/* 7. Volunteer Registration Section (Requirement 3) */}
        <VolunteerFormSection
          onRegisterSuccess={handleRegisterSuccess}
          preselectedType={preselectedCleanupType}
        />

      </main>

      {/* Admin Approval Reviewer Modal (Requirement 4: Yönetici inceleme ve yayınlama) */}
      <AdminApprovalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        pendingReports={pendingReports}
        onApproveReport={handleApproveReport}
        onRejectReport={handleRejectReport}
      />

      {/* Footer */}
      <Footer
        onNavClick={scrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

    </div>
  );
}
