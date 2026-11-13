export interface ShrineEmotionalBadge {
  id: string;
  label: string;
  emoji: string;
  /** 0: رز سرخ | 1: لاله صورتی | 2: یاس سفید | 3: شکوفه طلایی | -1: ترکیب همه گل‌ها */
  petalType: -1 | 0 | 1 | 2 | 3;
  amount: number;
  gradient: string;
}

export interface ShrineConfig {
  panoramaUrl: string;
  defaultRainAmount: number;
  uiStrings: {
    avatarHoverText: string;
    avatarTitle: string;
    badgeTitle: string;
    onlineSuffix: string;
    enterCtaText: string;
    modalOnlineSuffix: string;
    shrineHint: string;
    defaultTributeLabel: string;
    defaultTributeEmoji: string;
  };
  emotionalBadges: ShrineEmotionalBadge[];
}

export const shrineConfig: ShrineConfig = {
  panoramaUrl: 'https://threejs.org/examples/textures/2294472375_24a3b8ef46_o.jpg',
  defaultRainAmount: 10,
  uiStrings: {
    avatarHoverText: 'مشاهده محراب 🌸',
    avatarTitle: 'برای ورود به محراب زنده کلیک کنید',
    badgeTitle: 'کلیک برای ورود به محراب',
    onlineSuffix: 'نفر آنلاین',
    enterCtaText: 'ورود ✦',
    modalOnlineSuffix: 'زائر آنلاین در محراب',
    shrineHint: 'برای گل‌باران همگانی، روی مزار یا یکی از ذکرهای زیر کلیک کنید 🌸',
    defaultTributeLabel: 'یادش گرامی',
    defaultTributeEmoji: '🌸',
  },
  emotionalBadges: [
    {
      id: 'roohash-shad',
      label: 'روحش شاد',
      emoji: '🕊️',
      petalType: 2,
      amount: 16,
      gradient:
        'from-sky-500/35 via-indigo-500/25 to-slate-500/30 border-sky-300/45 text-sky-100 hover:border-sky-300/80 shadow-sky-500/20',
    },
    {
      id: 'yadash-gerami',
      label: 'یادش گرامی',
      emoji: '🌹',
      petalType: 0,
      amount: 18,
      gradient:
        'from-rose-500/40 via-red-500/30 to-pink-500/30 border-rose-300/50 text-rose-100 hover:border-rose-300/85 shadow-rose-500/25',
    },
    {
      id: 'dostdashtani',
      label: 'دوست داشتنی',
      emoji: '❤️',
      petalType: 3,
      amount: 18,
      gradient:
        'from-amber-500/40 via-yellow-500/30 to-orange-500/30 border-amber-300/50 text-amber-100 hover:border-amber-300/85 shadow-amber-500/25',
    },
    {
      id: 'deltangetim',
      label: 'دلتنگتیم',
      emoji: '🕯️',
      petalType: 1,
      amount: 16,
      gradient:
        'from-pink-500/35 via-fuchsia-500/25 to-rose-400/30 border-pink-300/45 text-pink-100 hover:border-pink-300/80 shadow-pink-500/20',
    },
    {
      id: 'behesht',
      label: 'جایگاهش بهشت',
      emoji: '🌿',
      petalType: -1,
      amount: 20,
      gradient:
        'from-emerald-500/35 via-teal-500/25 to-cyan-500/30 border-emerald-300/45 text-emerald-100 hover:border-emerald-300/80 shadow-emerald-500/20',
    },
    {
      id: 'javdan',
      label: 'نامت جاودان',
      emoji: '✨',
      petalType: -1,
      amount: 22,
      gradient:
        'from-purple-500/35 via-violet-500/30 to-amber-500/25 border-purple-300/45 text-purple-100 hover:border-purple-300/80 shadow-purple-500/20',
    },
  ],
};