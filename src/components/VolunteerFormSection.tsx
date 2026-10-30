import React, { useState } from 'react';
import { PollutionType, VolunteerRegistration } from '../types';
import { ISTANBUL_DISTRICTS } from '../data/mockData';
import { HeartHandshake, CheckCircle2, User, Mail, Phone, MapPin, Calendar, Sparkles } from 'lucide-react';

interface VolunteerFormSectionProps {
  onRegisterSuccess?: (volunteer: VolunteerRegistration) => void;
  preselectedType?: string | null;
}

export const VolunteerFormSection: React.FC<VolunteerFormSectionProps> = ({
  onRegisterSuccess,
  preselectedType,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city] = useState('İstanbul');
  const [district, setDistrict] = useState(ISTANBUL_DISTRICTS[0]);
  const [fullAddress, setFullAddress] = useState('');
  
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['Anadolu Yakası']);
  const [selectedTypes, setSelectedTypes] = useState<PollutionType[]>(
    preselectedType ? [preselectedType as PollutionType] : ['Sahil Temizliği', 'Park ve Bahçe Temizliği']
  );
  const [selectedDays, setSelectedDays] = useState<string[]>(['Hafta sonu Cumartesi', 'Hafta sonu Pazar']);
  
  const [submittedVolunteer, setSubmittedVolunteer] = useState<VolunteerRegistration | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const regionOptions = [
    'Anadolu Yakası',
    'Avrupa Yakası',
    'Boğaz ve Kıyı Hattı',
    'Kuzey Ormanları Havzası',
    'Tüm İstanbul'
  ];

  const typeOptions: PollutionType[] = [
    'Sahil Temizliği',
    'Sokak Temizliği',
    'Park ve Bahçe Temizliği',
    'Orman Temizliği',
    'Atık Toplama'
  ];

  const dayOptions = [
    'Hafta sonu Cumartesi',
    'Hafta sonu Pazar',
    'Hafta içi Sabah (08:00 - 12:00)',
    'Hafta içi Akşam (17:00 - 20:00)',
    'Tüm Günler Uygun'
  ];

  const toggleRegion = (r: string) => {
    setSelectedRegions((prev) =>
      prev.includes(r) ? prev.filter((item) => item !== r) : [...prev, r]
    );
  };

  const toggleType = (t: PollutionType) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((item) => item !== t) : [...prev, t]
    );
  };

  const toggleDay = (d: string) => {
    setSelectedDays((prev) =>
      prev.includes(d) ? prev.filter((item) => item !== d) : [...prev, d]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    setIsSubmitting(true);
    const newVol: VolunteerRegistration = {
      id: 'vol-' + Date.now(),
      fullName,
      email,
      phone,
      city,
      district,
      fullAddress,
      participateRegions: selectedRegions.length > 0 ? selectedRegions : ['Tüm İstanbul'],
      cleanupTypes: selectedTypes.length > 0 ? selectedTypes : ['Sahil Temizliği'],
      availableDays: selectedDays.length > 0 ? selectedDays : ['Hafta sonu Cumartesi'],
      registeredAt: new Date().toLocaleDateString('tr-TR')
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedVolunteer(newVol);
      if (onRegisterSuccess) {
        onRegisterSuccess(newVol);
      }
    }, 600);
  };

  const handleReset = () => {
    setSubmittedVolunteer(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setFullAddress('');
  };

  return (
    <section id="volunteer" className="py-16 bg-gradient-to-b from-white via-emerald-50/40 to-teal-50/50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <HeartHandshake className="w-4 h-4" />
            <span>İstanbul Çevre Gönüllüsü Ol</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Gönüllü Kayıt Formu
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Temiz bir İstanbul için atacağınız küçük bir adım, şehrimizin geleceğini dönüştürecek. Bilgilerinizi doldurun, sizin için en uygun temizlik ekibine katılın.
          </p>
        </div>

        {/* Success Card or Form */}
        {submittedVolunteer ? (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900">
                Aramıza Hoş Geldin, {submittedVolunteer.fullName}!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                İstanbul çevre temizliği gönüllü kaydınız başarıyla oluşturuldu. Ekip liderlerimiz yakınınızdaki temizlik etkinliği öncesinde sizinle WhatsApp ve e-posta üzerinden iletişime geçecektir.
              </p>
            </div>

            {/* Volunteer Badge Card */}
            <div className="max-w-md mx-auto bg-gradient-to-br from-slate-900 to-teal-950 text-white p-6 rounded-2xl border border-teal-700/50 text-left space-y-3 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs uppercase font-mono text-emerald-400">Gönüllü Kimlik Kartı</span>
                <span className="text-xs font-bold text-white bg-emerald-600/60 px-2 py-0.5 rounded">Aktif</span>
              </div>
              <div className="space-y-1">
                <div className="text-base font-bold text-white">{submittedVolunteer.fullName}</div>
                <div className="text-xs text-slate-300">{submittedVolunteer.district} / {submittedVolunteer.city}</div>
              </div>
              <div className="text-[11px] text-slate-400 pt-2 border-t border-white/10 flex flex-wrap gap-2">
                <span>Tercihler:</span>
                {submittedVolunteer.cleanupTypes.map((t) => (
                  <span key={t} className="text-emerald-300 font-medium">{t} ·</span>
                ))}
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-200"
            >
              Yeni Bir Gönüllü Daha Kaydet
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Group 1: Kişisel Bilgiler */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-100 pb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>1. Kişisel ve İletişim Bilgileri</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ad ve Soyad *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Ayşe Demir"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      E-Posta Adresi *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="ayse.demir@ornek.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Telefon Numarası *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="05XX XXX XX XX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Şehir
                    </label>
                    <input
                      type="text"
                      disabled
                      value={city}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-600 text-sm cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Yaşadığı İlçe *
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
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Açık Adres Bilgisi
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Mahalle, cadde, sokak ve kapı no bilgisi..."
                    value={fullAddress}
                    onChange={(e) => setFullAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>
              </div>

              {/* Group 2: Tercih Edilen Temizlik Bölgeleri */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-100 pb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>2. Katılabileceği Temizlik Bölgeleri</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Ulaşabileceğiniz veya görev almak istediğiniz bölgeleri seçiniz:
                </p>

                <div className="flex flex-wrap gap-2">
                  {regionOptions.map((r) => {
                    const isSelected = selectedRegions.includes(r);
                    return (
                      <button
                        type="button"
                        key={r}
                        onClick={() => toggleRegion(r)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {r}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Group 3: Temizlik Türleri (Zorunlu Liste) */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-100 pb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>3. Hangi Tür Temizlik Çalışmalarına Katılabilirsiniz?</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Katılmak istediğiniz kirlilik türlerini işaretleyiniz:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {typeOptions.map((t) => {
                    const isChecked = selectedTypes.includes(t);
                    return (
                      <div
                        key={t}
                        onClick={() => toggleType(t)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-2.5 select-none ${
                          isChecked
                            ? 'border-emerald-500 bg-emerald-50/80 text-emerald-900 font-semibold'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center text-xs ${
                            isChecked ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && '✓'}
                        </div>
                        <span className="text-xs">{t}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Group 4: Uygun Olduğu Günler */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-100 pb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>4. Uygun Olduğunuz Günler</span>
                </h3>

                <div className="flex flex-wrap gap-2">
                  {dayOptions.map((d) => {
                    const isSelected = selectedDays.includes(d);
                    return (
                      <button
                        type="button"
                        key={d}
                        onClick={() => toggleDay(d)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-teal-700 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-[11px] text-slate-500">
                  Kayıt olarak çevre temizlik duyurularını almayı ve saha kurallarına uymayı kabul etmiş sayılırsınız.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/25 hover:from-emerald-700 hover:to-cyan-700 transition-all transform active:scale-98 whitespace-nowrap"
                >
                  {isSubmitting ? 'Kaydediliyor...' : 'Gönüllü Olarak Kaydımı Tamamla'}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
