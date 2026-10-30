import React, { useState } from 'react';
import { Leaf, Menu, X, ShieldAlert, HeartHandshake, MapPin, Wind, Sparkles } from 'lucide-react';
import { LiveClockCalendar } from './LiveClockCalendar';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenVolunteerModal: () => void;
  onOpenReportModal: () => void;
  pendingReportsCount: number;
  onOpenAdminModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenVolunteerModal,
  onOpenReportModal,
  pendingReportsCount,
  onOpenAdminModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'events', label: 'Temizlik Alanları & Harita' },
    { id: 'before-after', label: 'Öncesi ve Sonrası' },
    { id: 'report', label: 'Kirli Alan Bildir' },
    { id: 'volunteer', label: 'Gönüllü Kayıt' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-emerald-200/80 shadow-md transition-all">
      {/* Top micro visual bar */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-900 text-white text-[11px] py-1 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>İstanbul Çevre Seferberliği</span>
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-200">
              <Wind className="w-3 h-3 text-cyan-300" />
              <span>Marmara & Boğaz Kıyı Şeridi Temizlik Nöbeti</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-emerald-200 font-medium">
            <span className="hidden md:inline">39 İlçe El Ele</span>
            <span className="text-white/40">·</span>
            <span className="text-white font-mono font-bold">14.250+ Kg Atık Temizlendi</span>
          </div>
        </div>
      </div>

      {/* Main navigation header row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Zone 1: Visual Brand Lockup */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-all">
                <Leaf className="w-6 h-6 transform group-hover:rotate-12 transition-transform" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white ring-1 ring-amber-300 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-800 bg-clip-text text-transparent">
                    TEMİZ İSTANBUL
                  </span>
                  <span className="hidden xl:inline text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Resmi Platform
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700/90 tracking-wide uppercase">
                  Çevre Kirliliği ile Mücadele ve Gönüllülük
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`whitespace-nowrap transition-all py-1.5 px-1 relative ${
                  activeTab === item.id
                    ? 'text-emerald-700 font-bold'
                    : 'hover:text-emerald-600 text-slate-600'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full shadow-xs" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Live Clock & Quick Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <LiveClockCalendar />

            {/* Admin review button */}
            <button
              onClick={onOpenAdminModal}
              title="Yönetici Bildirim İnceleme Paneli"
              className="relative p-2.5 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 transition-colors shadow-xs"
            >
              <ShieldAlert className="w-5 h-5" />
              {pendingReportsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white animate-bounce">
                  {pendingReportsCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenVolunteerModal}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-xl hover:from-emerald-700 hover:to-cyan-700 shadow-md shadow-emerald-600/30 hover:shadow-lg transition-all transform active:scale-98 whitespace-nowrap"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Gönüllü Ol</span>
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAdminModal}
              title="Yönetici Bildirim İnceleme"
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <ShieldAlert className="w-5 h-5" />
              {pendingReportsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {pendingReportsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Menüyü aç/kapat"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/98 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="py-2">
            <LiveClockCalendar />
          </div>
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReportModal();
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-amber-900 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-700" />
              <span>Kirli Alan Bildir</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVolunteerModal();
              }}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-lg shadow-sm"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Gönüllü Ol</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
