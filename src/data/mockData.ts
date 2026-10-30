import { CleanupEvent, BeforeAfterStory, InspiringFigure, DirtyAreaReport } from '../types';
import { IMAGES } from '../assets/images';

export const ISTANBUL_DISTRICTS = [
  'Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler',
  'Bakırköy', 'Başakşehir', 'Bayrampaşa', 'Beşiktaş', 'Beykoz', 'Beylikdüzü',
  'Beyoğlu', 'Büyükçekmece', 'Çatalca', 'Çekmeköy', 'Esenler', 'Esenyurt',
  'Eyüpsultan', 'Fatih', 'Gaziosmanpaşa', 'Güngören', 'Kadıköy', 'Kağıthane',
  'Kartal', 'Küçükçekmece', 'Maltepe', 'Pendik', 'Sancaktepe', 'Sarıyer',
  'Silivri', 'Sultanbeyli', 'Sultangazi', 'Şile', 'Şişli', 'Tuzla',
  'Ümraniye', 'Üsküdar', 'Zeytinburnu'
];

export const INITIAL_EVENTS: CleanupEvent[] = [
  {
    id: 'evt-1',
    title: 'Kadıköy Moda Sahili & Kayalıklar Plastik Temizliği',
    district: 'Kadıköy',
    neighborhood: 'Caferağa Mah.',
    fullAddress: 'Moda Sahil Parkı Kayalıkları, Kadıköy / İstanbul',
    mapCoords: { x: 57, y: 58, lat: 40.9785, lng: 29.0256 },
    pollutionType: 'Sahil Temizliği',
    status: 'Gönüllü Aranıyor',
    eventDate: '01 Kasım 2026, 09:30',
    volunteerTarget: 60,
    currentVolunteers: 42,
    photoUrl: IMAGES.cleanupBefore,
    description: 'Hafta sonu boyunca denizden vuran plastik ambalajlar ve kıyı kayalıklarına sıkışmış atıklar toplanacaktır. Eldiven ve çöp torbaları platform tarafından sağlanacaktır.',
    tags: ['Kıyı Temizliği', 'Mikroplastik', 'Eldiven Sağlanır']
  },
  {
    id: 'evt-2',
    title: 'Belgrad Ormanı Neşet Suyu Yürüyüş Yolu Atık Toplama',
    district: 'Sarıyer',
    neighborhood: 'Bahçeköy Merkez',
    fullAddress: 'Belgrad Ormanı Neşet Suyu Tabiat Parkı Girişi, Sarıyer / İstanbul',
    mapCoords: { x: 48, y: 26, lat: 41.1785, lng: 28.9880 },
    pollutionType: 'Orman Temizliği',
    status: 'Temizlik Planlandı',
    eventDate: '02 Kasım 2026, 10:00',
    volunteerTarget: 50,
    currentVolunteers: 36,
    photoUrl: IMAGES.volunteersAction,
    description: 'Sonbahar piknik sezonu sonrası orman patikaları ve gölet çevresindeki cam şişe, teneke ve plastik atıkların temizlenmesi ve geri dönüşüme kazandırılması hedeflenmektedir.',
    tags: ['Orman Koruma', 'Geri Dönüşüm', 'Aile Dostu']
  },
  {
    id: 'evt-3',
    title: 'Üsküdar Salacak Sahili ve Kız Kulesi Karşısı Kıyı Temizliği',
    district: 'Üsküdar',
    neighborhood: 'Salacak Mah.',
    fullAddress: 'Salacak Kordon Boyu Yürüyüş Yolu, Üsküdar / İstanbul',
    mapCoords: { x: 55, y: 50, lat: 41.0210, lng: 29.0062 },
    pollutionType: 'Sahil Temizliği',
    status: 'Devam Ediyor',
    eventDate: '30 Ekim 2026, 14:00',
    volunteerTarget: 35,
    currentVolunteers: 31,
    photoUrl: IMAGES.istanbulBosphorus,
    description: 'Tarihi yarımada manzaralı kıyı şeridinde sigara izmariti, meşrubat kutuları ve naylon atıkların temizliği gönüllü ekiplerimizle sürmektedir.',
    tags: ['Tarihi Doku', 'Boğaz Hattı', 'Aktif Saha']
  },
  {
    id: 'evt-4',
    title: 'Beşiktaş Abbasağa & Ihlamur Vadisi Park Temizliği',
    district: 'Beşiktaş',
    neighborhood: 'Abbasağa Mah.',
    fullAddress: 'Abbasağa Parkı Çevresi ve Yürüyüş Parkuru, Beşiktaş / İstanbul',
    mapCoords: { x: 52, y: 46, lat: 41.0490, lng: 29.0035 },
    pollutionType: 'Park ve Bahçe Temizliği',
    status: 'Gönüllü Aranıyor',
    eventDate: '07 Kasım 2026, 10:30',
    volunteerTarget: 40,
    currentVolunteers: 18,
    photoUrl: IMAGES.volunteersAction,
    description: 'Mahalle sakinleri ve genç gönüllüler ile kentsel yeşil vahanın derinlemesine temizliği, kırık camların toplanması ve kompost bilgilendirmesi.',
    tags: ['Şehir Parkı', 'Kompost Atölyesi', 'Gençlik']
  },
  {
    id: 'evt-5',
    title: 'Kınalıada & Büyükada Kıyı Şeridi Deniz Çöpü Seferberliği',
    district: 'Adalar',
    neighborhood: 'Kınalıada Kordon',
    fullAddress: 'Kınalıada İskele Caddesi Sahil Şeridi, Adalar / İstanbul',
    mapCoords: { x: 62, y: 72, lat: 40.9100, lng: 29.0550 },
    pollutionType: 'Atık Toplama',
    status: 'Temizlik Planlandı',
    eventDate: '08 Kasım 2026, 11:00',
    volunteerTarget: 45,
    currentVolunteers: 29,
    photoUrl: IMAGES.cleanupAfter,
    description: 'Adalara vapurla ulaşılarak sahilde biriken balıkçı ağları, şamandıra parçaları ve pet şişeler ayrıştırılarak belediye atık merkezine teslim edilecektir.',
    tags: ['Adalar', 'Deniz Ekosistemi', 'Ayrıştırma']
  },
  {
    id: 'evt-6',
    title: 'Fatih Balat Sahil Parkı & Haliç Kıyısı Temizleme',
    district: 'Fatih',
    neighborhood: 'Balat Mah.',
    fullAddress: 'Ayvansaray - Balat Sahil Şeridi Parkı, Fatih / İstanbul',
    mapCoords: { x: 47, y: 51, lat: 41.0345, lng: 28.9480 },
    pollutionType: 'Sokak Temizliği',
    status: 'Temizlendi',
    eventDate: '24 Ekim 2026, 10:00',
    volunteerTarget: 30,
    currentVolunteers: 34,
    photoUrl: IMAGES.cleanupAfter,
    description: 'Haliç kıyısındaki tarihi sur dipleri ve parklar 34 gönüllümüz tarafından temizlendi ve 280 kg atık geri dönüşüme kazandırıldı.',
    collectedKg: 280,
    tags: ['Tamamlandı', 'Haliç Temiz', 'Başarı Hikayesi']
  }
];

export const INITIAL_BEFORE_AFTER: BeforeAfterStory[] = [
  {
    id: 'ba-1',
    title: 'Kilyos Gümüşdere Kıyısı Plastik ve Balıkçı Ağı Arındırma',
    location: 'Gümüşdere Koyu, Sarıyer',
    district: 'Sarıyer',
    date: '18 Ekim 2026',
    beforeImage: IMAGES.cleanupBefore,
    afterImage: IMAGES.cleanupAfter,
    collectedKg: 620,
    volunteersJoined: 54,
    summary: 'Karadeniz dalgalarının kıyıya sürüklediği yüzlerce plastik kasa, terkedilmiş ağ ve tek kullanımlık pet şişe 54 gönüllümüzle 5 saatlik titiz çalışma sonucu temizlendi.',
    category: 'Sahil Temizliği'
  },
  {
    id: 'ba-2',
    title: 'Aydos Ormanı Piknik ve Gölet Çevresi Rehabilitasyonu',
    location: 'Aydos Ormanı 2. Kapı Mevkii, Kartal / Pendik',
    district: 'Kartal',
    date: '11 Ekim 2026',
    beforeImage: IMAGES.cleanupBefore,
    afterImage: IMAGES.istanbulBosphorus,
    collectedKg: 430,
    volunteersJoined: 38,
    summary: 'Yangın tehlikesi oluşturan kırık cam şişeler, kömür külleri ve plastik tabaklar toplanarak orman zemini nefes alır hale getirildi.',
    category: 'Orman Temizliği'
  },
  {
    id: 'ba-3',
    title: 'Beykoz Çubuklu Sahil Kayalıkları Temizlik Hareketi',
    location: 'Çubuklu İskelesi Yanı, Beykoz',
    district: 'Beykoz',
    date: '04 Ekim 2026',
    beforeImage: IMAGES.cleanupBefore,
    afterImage: IMAGES.cleanupAfter,
    collectedKg: 350,
    volunteersJoined: 42,
    summary: 'Boğaz akıntısıyla kayalık aralarına sıkışmış poşetler ve ambalajlar özel aparatlarla çekilerek sahil hattı eski berrak görünümüne kavuştu.',
    category: 'Sahil Temizliği'
  }
];

export const INSPIRING_FIGURES: InspiringFigure[] = [
  {
    id: 'fig-1',
    name: 'Hayrettin Karaca',
    role: 'TEMA Vakfı Kurucusu & "Toprak Dede"',
    quote: 'Para kazanırsınız, biter; bina yaparsınız, yıkılır. Fakat yok olan doğayı geri getiremezsiniz. Yaşamak istiyorsak toprağımızı ve doğamızı korumak zorundayız.',
    subquote: 'Doğayı korumak bir tercih değil, yaşamsal bir zorunluluktur.',
    imageUrl: IMAGES.hayrettinKaraca,
    lifespan: '1922 – 2020'
  },
  {
    id: 'fig-2',
    name: 'Mustafa Kemal Atatürk',
    role: 'Türkiye Cumhuriyeti’nin Kurucusu',
    quote: 'Ormansız ve ağaçsız yurt vatan değildir. Yeşil görmeyen gözler renk zevkinden yoksundur. Burasını öyle bir ağaçlandırınız ki, kör bir insan dahi yeşillikler arasında olduğunu anlasın.',
    subquote: 'Yalova’da bir çınar dalını kesmemek için köşkü yürüten doğa sevgisi.',
    imageUrl: IMAGES.ataturkPortrait,
    lifespan: '1881 – 1938'
  },
  {
    id: 'fig-3',
    name: 'Rachel Carson',
    role: 'Biyolog, Yazar & Modern Çevre Hareketinin Öncüsü',
    quote: 'Doğanın dengesi insan iradesinin üstündedir. Doğaya hükmetmeye kalkışmak kibirden başka bir şey değildir; çünkü biz doğanın bir parçasıyız, efendisi değil.',
    subquote: '‘Sessiz Bahar’ (Silent Spring) kitabıyla dünya çevre bilincini uyandırdı.',
    imageUrl: IMAGES.rachelCarson,
    lifespan: '1907 – 1964'
  },
  {
    id: 'fig-4',
    name: 'Jane Goodall',
    role: 'Primatolog, Antropolog & BM Barış Elçisi',
    quote: 'Yaptığınız her hareket dünyada bir fark yaratır. Ne tür bir fark yaratmak istediğinize karar vermelisiniz. Birlikte hareket ettiğimizde temiz bir gelecek mümkündür.',
    subquote: 'Her birey önemlidir, her bireyin bir rolü vardır, her birey bir fark yaratır.',
    imageUrl: IMAGES.janeGoodall,
    lifespan: '1934 – Günümüz'
  },
  {
    id: 'fig-5',
    name: 'Sir David Attenborough',
    role: 'Doğa Tarihçisi ve Çevre Savunucusu',
    quote: 'Gezegenimizi kurtarmak artık sadece bilimsel bir mesele değil; ahlaki bir sorumluluktur. Doğayı temiz tutmak çocuklarımıza borcumuzdur.',
    subquote: 'Gezegenimizin sağlığı, içinde yaşayan her bir canlının ortak çabasına bağlıdır.',
    imageUrl: IMAGES.davidAttenborough,
    lifespan: '1926 – Günümüz'
  }
];

export const INITIAL_PENDING_REPORTS: DirtyAreaReport[] = [
  {
    id: 'rep-1',
    reporterName: 'Mert Aksoy',
    reporterContact: '0532 456 78 90',
    district: 'Bakırköy',
    neighborhood: 'Yeşilköy Mah.',
    fullAddress: 'Yeşilköy Çiroz Plajı batı çıkışı, kayalık alan',
    locationNote: 'Plajın bittiği noktada mendirek arkası',
    pollutionType: 'Sahil Temizliği',
    photoUrl: IMAGES.cleanupBefore,
    description: 'Dalgalarla gelip kayalıkların arasına sıkışan yüzlerce pet şişe ve plastik poşet var. Çocukların oyun oynadığı alana yakın.',
    urgency: 'Acil',
    status: 'pending',
    createdAt: '29 Ekim 2026 16:45'
  },
  {
    id: 'rep-2',
    reporterName: 'Selin Yılmaz',
    reporterContact: 'selin.yilmaz@email.com',
    district: 'Beykoz',
    neighborhood: 'Polonezköy',
    fullAddress: 'Tabiat Parkı 3. Yürüyüş Parkuru başlangıcı',
    locationNote: 'Ahşap köprünün 150 metre ilerisi',
    pollutionType: 'Orman Temizliği',
    photoUrl: IMAGES.volunteersAction,
    description: 'Piknikçilerin bıraktığı tek kullanımlık ambalajlar ve mangal külleri orman zeminine yayılmış durumda.',
    urgency: 'Orta',
    status: 'pending',
    createdAt: '30 Ekim 2026 09:15'
  }
];
