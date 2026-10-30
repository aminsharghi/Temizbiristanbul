import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

export const LiveClockCalendar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');

  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const days = [
    'Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'
  ];

  const dayName = days[currentTime.getDay()];
  const monthName = months[currentTime.getMonth()];
  const dayNumber = currentTime.getDate();
  const year = currentTime.getFullYear();

  return (
    <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-emerald-100 shadow-sm text-xs text-slate-700">
      {/* Calendar part */}
      <div className="flex items-center gap-1.5 font-medium border-r border-slate-200 pr-3">
        <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span className="whitespace-nowrap">{dayNumber} {monthName} {year}</span>
        <span className="text-slate-400 font-normal">·</span>
        <span className="text-emerald-700 font-semibold">{dayName}</span>
      </div>

      {/* Clock part */}
      <div className="flex items-center gap-1.5 font-mono tabular-nums text-slate-800">
        <Clock className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
        <span className="font-bold text-sm tracking-tight text-slate-900">
          {hours}:{minutes}:{seconds}
        </span>
      </div>
    </div>
  );
};
