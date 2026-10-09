/**
 * شجره‌نامه خانوادگی نجیه رویشدزاده
 * برای افزودن/ویرایش اعضا، این فایل را ویرایش کنید.
 */
export const familyConfig = {
  title: 'شجره‌نامه خانوادگی',
  subtitle: 'خاندان رویشدزاده',

  // نسل اول — پدر و مادر
  parents: [
    {
      id: 'father',
      name: 'حاج علی',
      role: 'پدر',
      avatar: '👨‍🦳',
      relation: 'father' as const,
    },
    {
      id: 'mother',
      name: 'تمیشه',
      role: 'مادر',
      avatar: '👩‍🦳',
      relation: 'mother' as const,
    },
  ],

  // خواهران و برادران — به ترتیب سن
  siblings: [
    { id: 'holeh', name: 'هوله', gender: 'female' as const },
    { id: 'oleh', name: 'عوله', gender: 'female' as const },
    { id: 'kazem', name: 'کاظم', gender: 'male' as const },
    { id: 'fakher', name: 'فاخر', gender: 'male' as const },
    { id: 'hamdool', name: 'همدول', gender: 'female' as const },
    { id: 'goosheh', name: 'گوشه', gender: 'female' as const },
    { id: 'najiyeh', name: 'نجیه', gender: 'female' as const, isMain: true },
    { id: 'aharmaleh', name: 'احرمله', gender: 'female' as const },
    { id: 'taher', name: 'طاهر', gender: 'male' as const },
    { id: 'zarool', name: 'زرول', gender: 'female' as const },
    { id: 'mahmood', name: 'محمود', gender: 'male' as const },
    { id: 'ahmad', name: 'احمد', gender: 'male' as const },
    { id: 'mohammad', name: 'محمد', gender: 'male' as const },
    { id: 'majid', name: 'مجید', gender: 'male' as const },
    { id: 'hamid', name: 'حمید', gender: 'male' as const },
    { id: 'hossein', name: 'حسین', gender: 'male' as const },
    { id: 'nasim', name: 'نسیم', gender: 'female' as const },
    { id: 'aref', name: 'عارف', gender: 'male' as const },
    { id: 'hatam', name: 'حاتم', gender: 'male' as const },
  ],

  // همسر
  spouse: {
    id: 'tayemeh',
    name: 'طعیمه',
    role: 'همسر',
    avatar: '👨',
  },

  // فرزندان — به ترتیب سن
  children: [
    { id: 'ali', name: 'علی', gender: 'male' as const },
    { id: 'hasan', name: 'حسن', gender: 'male' as const },
    { id: 'hadiyeh', name: 'هدیه', gender: 'female' as const },
    { id: 'atefeh', name: 'عاطفه', gender: 'female' as const },
    { id: 'ania', name: 'آنیا', gender: 'female' as const },
    { id: 'ramsin', name: 'رامسین', gender: 'male' as const },
  ],
} as const;