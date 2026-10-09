/**
 * لایه Loader سطح بالاتر برای محتوا
 */
import { getCollection } from 'astro:content';

export async function getBio() {
  const entries = await getCollection('bio');
  return entries.sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}

export async function getTimeline() {
  const entries = await getCollection('timeline');
  return entries.sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}

/**
 * تبدیل مارک‌داون خام به یک excerpt کوتاه
 */
export function getExcerpt(body: string | undefined, max = 140): string {
  if (!body) return '';
  const cleaned = body
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#+\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/[*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned.length > max ? cleaned.slice(0, max).trimEnd() + '…' : cleaned;
}