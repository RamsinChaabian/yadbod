/**
 * لیست تماس با اقوام
 *
 * برای افزودن شماره جدید، یک آبجکت به آرایه contacts اضافه کنید.
 * فیلدهای اجباری: id, name, relation, phone, avatar
 * فیلدهای اختیاری: whatsapp, availableHours, note
 */
export const contactsConfig = {
  title: 'تماس با اقوام',
  description: 'برای تماس با اعضای خانواده، روی دکمه‌ی تماس یا واتساپ کلیک کنید.',

  contacts: [
    {
      id: 'hadiyeh-chaabian',
      name: 'هدیه چعبیان',
      relation: 'دختر',
      phone: '+989166023824',
      whatsapp: '+989166023824',
      avatar: '👩',
      availableHours: null as string | null,
      note: null as string | null,
    },
  ],
} as const;