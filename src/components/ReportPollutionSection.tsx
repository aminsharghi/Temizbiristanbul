import React, { useState } from 'react';
import { PollutionType, DirtyAreaReport } from '../types';
import { ISTANBUL_DISTRICTS } from '../data/mockData';
import { MapPin, Camera, AlertTriangle, CheckCircle2, UploadCloud, ShieldAlert, ArrowRight } from 'lucide-react';

interface ReportPollutionSectionProps {
  onReportSubmitted: (report: DirtyAreaReport) => void;
  onOpenAdminPanel: () => void;
}

export const ReportPollutionSection: React.FC<ReportPollutionSectionProps> = ({
  onReportSubmitted,
  onOpenAdminPanel,
}) => {
  const [reporterName, setReporterName] = useState('');
  const [reporterContact, setReporterContact] = useState('');
  const [district, setDistrict] = useState(ISTANBUL_DISTRICTS[0]);
  const [neighborhood, setNeighborhood] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [locationNote, setLocationNote] = useState('');
  const [pollutionType, setPollutionType] = useState<PollutionType>('Sahil Temizliği');
  const [photoPreview, setPhotoPreview] = useState<string>('/src/assets/images/cleanup_before_dirty_beach_1793362603854.jpg');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<'Düşük' | 'Orta' | 'Acil'>('Orta');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<DirtyAreaReport | null>(null);

  const samplePhotos = [
    { label: 'Kıyı & Deniz Çöpü', url: '/src/assets/images/cleanup_before_dirty_beach_1793362603854.jpg' },
    { label: 'Orman / Park Atığı', url: '/src/assets/images/volunteers_cleaning_istanbul_1793362604700.jpg' },
    { label: 'Boğaz Kıyısı Atıkları', url: '/src/assets/images/istanbul_bosphorus_clean_nature_1793362602758.jpg' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reporterName || !reporterContact || !fullAddress || !description) return;

    setIsSubmitting(true);
    const newReport: DirtyAreaReport = {
      id: 'rep-' + Date.now(),
      reporterName,
      reporterContact,
      district,
      neighborhood: neighborhood || 'Merkez Mah.',
      fullAddress,
      locationNote: locationNote || `${district} sahil / park alanı`,
      pollutionType,
      photoUrl: photoPreview || '/src/assets/images/cleanup_before_dirty_beach_1793362603854.jpg',
      description,
      urgency,
      status: 'pending',
      createdAt: new Date().toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setLastSubmitted(newReport);
      onReportSubmitted(newReport);
    }, 500);
  };

  const handleReset = () => {
    setLastSubmitted(null);
    setReporterName('');
    setReporterContact('');
    setNeighborhood('');
    setFullAddress('');
    setLocationNote('');
    setDescription('');
  };

  return (
    <section id="report" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Kirli Alan İhbar & Bildirim Hattı</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Çevrendeki Kirli Alanı Bildir
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            İstanbul’un sahilinde, ormanında veya sokağında karşılaştığınız kirlilikleri fotoğraflayarak bize iletin. Yönetici incelemesinin ardından bölge temizlik planına alınacaktır.
          </p>
        </div>

        {/* Success or Form */}
        {lastSubmitted ? (
          <div className="bg-slate-50 rounded-3xl p-8 border border-emerald-200 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900">
                Bildiriminiz Başarıyla Alındı!
              </h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Sayın <strong>{lastSubmitted.reporterName}</strong>, {lastSubmitted.district} bölgesindeki kirli alan bildirimi yönetici inceleme sırasına eklendi. İnceleme sonrası onaylanarak harita ve etkinlik listesinde yayınlanacaktır.
              </p>
            </div>

            {/* Submitted Summary preview */}
            <div className="max-w-md mx-auto bg-white p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-semibold">
                <span className="text-slate-600">Bildirim No: {lastSubmitted.id}</span>
                <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded">İnceleme Bekliyor</span>
              </div>
              <div className="text-slate-700"><strong>Bölge:</strong> {lastSubmitted.district} / {lastSubmitted.neighborhood}</div>
              <div className="text-slate-700"><strong>Kirlilik:</strong> {lastSubmitted.pollutionType} ({lastSubmitted.urgency} Aciliyet)</div>
              <p className="text-slate-500 italic mt-1">"{lastSubmitted.description}"</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={onOpenAdminPanel}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Yönetici Paneli’nde İncele & Onayla</span>
              </button>

              <button
                onClick={handleReset}
                className="px-4 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-100 transition-colors"
              >
                Başka Bir Alan Daha Bildir
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Reporter Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bildirim Yapanın Adı Soyadı *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Adınız ve Soyadınız"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    İletişim Bilgileri (Telefon veya E-posta) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="05XX XXX XX XX veya e-posta"
                    value={reporterContact}
                    onChange={(e) => setReporterContact(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Row 2: Location Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    İlçe *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {ISTANBUL_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mahalle Bilgisi
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Bebek Mah. veya Moda"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Konum / Tarif Notu
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: İskelenin 100m sağı, kayalıklar"
                    value={locationNote}
                    onChange={(e) => setLocationNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Açık Adres */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kirli Alanın Açık Adresi *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Cadde, sokak, park adı veya tam sahil mevkii..."
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              {/* Row 3: Kirlilik Türü & Aciliyet */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kirlilik Türü *
                  </label>
                  <select
                    value={pollutionType}
                    onChange={(e) => setPollutionType(e.target.value as PollutionType)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Sahil Temizliği">Sahil Temizliği (Plastik / Kıyı Atıkları)</option>
                    <option value="Orman Temizliği">Orman Temizliği (Piknik Atıkları / Kırık Cam)</option>
                    <option value="Park ve Bahçe Temizliği">Park ve Bahçe Temizliği</option>
                    <option value="Sokak Temizliği">Sokak Temizliği</option>
                    <option value="Atık Toplama">Genel Katı Atık Toplama</option>
                    <option value="İnşaat Molozu & Hafriyat">İnşaat Molozu & Hafriyat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Aciliyet Seviyesi
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Düşük', 'Orta', 'Acil'] as const).map((lvl) => (
                      <button
                        type="button"
                        key={lvl}
                        onClick={() => setUrgency(lvl)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                          urgency === lvl
                            ? lvl === 'Acil'
                              ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
                              : 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 4: Fotoğraf Yükleme Alanı */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                  Kirli Alanın Fotoğrafı *
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  
                  {/* Photo preview frame */}
                  <div className="sm:col-span-5 relative rounded-2xl overflow-hidden h-36 bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Kirlilik fotoğrafı önizlemesi"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-3 text-slate-400">
                        <Camera className="w-8 h-8 mx-auto mb-1 text-slate-300" />
                        <span className="text-[11px]">Fotoğraf seçilmedi</span>
                      </div>
                    )}
                  </div>

                  {/* Upload input & quick sample buttons */}
                  <div className="sm:col-span-7 space-y-2.5">
                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl cursor-pointer border border-slate-300 transition-colors">
                      <UploadCloud className="w-4 h-4 text-slate-600" />
                      <span>Cihazınızdan Fotoğraf Yükleyin</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <span>Veya örnek fotoğraf şablonu seçin:</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {samplePhotos.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setPhotoPreview(p.url)}
                          className="text-[10px] font-medium bg-emerald-50 text-emerald-800 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Açıklama */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kirlilik Hakkında Açıklama *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Gözlemlediğiniz kirliliğin durumunu, tahmini boyutunu ve çevreye etkisini detaylandırınız..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Bildiriminiz yönetici incelemesinin ardından onaylanıp haritaya işlenecektir.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-amber-600/20 hover:from-amber-700 hover:to-orange-700 transition-all transform active:scale-98 whitespace-nowrap"
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Kirli Alan Bildirimini Gönder'}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
