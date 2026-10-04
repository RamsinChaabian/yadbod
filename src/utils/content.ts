/**
 * لایه Loader سطح بالاتر برای محتوا
 * ماژول‌ها فقط از اینجا استفاده می‌کنند، نه مستقیم از getCollection.
 */
import { getCollection } from 'astro:content';

export async function getBio() {
  const entries = await getCollection('bio');
  return entries.sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}

export async function getMemories() {
  const entries = await getCollection('memories');
  return entries.sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}

export async function getFeaturedMemories() {
  const memories = await getMemories();
  return memories.filter((m) => m.data.featured);
}

export async function getTimeline() {
  const entries = await getCollection('timeline');
  return entries.sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}

/**
 * تبدیل مارک‌داون خام به یک excerpt کوتاه متنی
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

/**
 * استخراج همه تگ‌های یکتا از لیست خاطرات (به ترتیب الفبا)
 */
export function extractAllTags(
  memories: Awaited<ReturnType<typeof getMemories>>
): string[] {
  const set = new Set<string>();
  memories.forEach((m) => m.data.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort((a, b) => a.localeCompare(b, 'fa'));
}