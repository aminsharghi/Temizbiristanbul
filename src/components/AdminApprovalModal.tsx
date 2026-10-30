import React from 'react';
import { DirtyAreaReport } from '../types';
import { ShieldCheck, X, Check, Trash2, MapPin, AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface AdminApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingReports: DirtyAreaReport[];
  onApproveReport: (reportId: string) => void;
  onRejectReport: (reportId: string) => void;
}

export const AdminApprovalModal: React.FC<AdminApprovalModalProps> = ({
  isOpen,
  onClose,
  pendingReports,
  onApproveReport,
  onRejectReport,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 to-teal-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                Yönetici İnceleme ve Onay Masası
              </h3>
              <p className="text-[11px] text-slate-300">
                Vatandaş bildirimlerini onaylayarak harita ve temizlik takvimine ekleyin
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {pendingReports.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800">
                İncelenecek Bekleyen Bildirim Bulunmuyor
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Tüm kirli alan bildirimleri incelenmiş ve onaylanarak temizlik haritasında yayınlanmıştır.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
                <span>Bekleyen Bildirimler ({pendingReports.length})</span>
                <span>Onaylananlar anında web sitesinde yayınlanır</span>
              </div>

              {pendingReports.map((rep) => (
                <div
                  key={rep.id}
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-slate-300 transition-colors space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    
                    {/* Photo thumbnail */}
                    <div className="sm:col-span-4 rounded-xl overflow-hidden h-32 bg-slate-200 relative border border-slate-300">
                      <img
                        src={rep.photoUrl}
                        alt="Bildirilen alan"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/cleanup-before.jpg';
                        }}
                      />
                      <div className="absolute top-2 left-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          rep.urgency === 'Acil'
                            ? 'bg-rose-600 text-white'
                            : 'bg-amber-500 text-white'
                        }`}>
                          {rep.urgency} Aciliyet
                        </span>
                      </div>
                    </div>

                    {/* Report details */}
                    <div className="sm:col-span-8 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                            {rep.pollutionType}
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm">
                            {rep.district} / {rep.neighborhood}
                          </h4>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 shrink-0">
                          <Clock className="w-3 h-3" />
                          <span>{rep.createdAt}</span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-600 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="truncate">{rep.fullAddress}</span>
                      </div>

                      <p className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 leading-relaxed">
                        "{rep.description}"
                      </p>

                      <div className="text-[11px] text-slate-500 flex items-center gap-3 pt-1">
                        <span><strong>Bildiren:</strong> {rep.reporterName}</span>
                        <span>·</span>
                        <span><strong>İletişim:</strong> {rep.reporterContact}</span>
                      </div>
                    </div>

                  </div>

                  {/* Actions bar */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200/80">
                    <button
                      onClick={() => onRejectReport(rep.id)}
                      className="px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-1 border border-rose-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Reddet</span>
                    </button>

                    <button
                      onClick={() => onApproveReport(rep.id)}
                      className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Onayla ve Haritada Yayınla</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Kapat
          </button>
        </div>

      </div>
    </div>
  );
};
