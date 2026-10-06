/**
 * نقشه نام نمادها به ایموجی
 * بعداً می‌توان با SVG جایگزین کرد.
 */
export const iconMap: Record<string, string> = {
  user: '👤',
  image: '🖼️',
  clock: '⏱️',
  'map-pin': '📍',
  camera: '📷',
  phone: '📞', 
};

export function getIcon(name: string): string {
  return iconMap[name] ?? '•';
}