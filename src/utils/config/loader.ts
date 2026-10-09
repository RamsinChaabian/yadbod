import { siteConfig } from '../../config/site.config';
import { personConfig } from '../../config/person.config';
import { locationConfig } from '../../config/location.config';
import { themeConfig } from '../../config/theme.config';
import { tabsConfig } from '../../config/tabs.config';
import { featuresConfig } from '../../config/features.config';
import { seoConfig } from '../../config/seo.config';
import { analyticsConfig } from '../../config/analytics.config';
import { contactsConfig } from '../../config/contacts.config';
import { familyConfig } from '../../config/family.config';

import {
  siteConfigSchema,
  personConfigSchema,
  locationConfigSchema,
  themeConfigSchema,
  tabsConfigSchema,
  featuresConfigSchema,
  seoConfigSchema,
  analyticsConfigSchema,
  contactsConfigSchema,
  familyConfigSchema,
} from './schemas';

function validate<T>(name: string, schema: { parse: (v: unknown) => T }, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (err) {
    console.error('❌ خطا در کانفیگ "' + name + '":');
    if (err && typeof err === 'object' && 'issues' in err) {
      const issues = (err as { issues: Array<{ path: (string | number)[]; message: string }> }).issues;
      issues.forEach((issue) => {
        console.error('  → ' + (issue.path.join('.') || '(ریشه)') + ': ' + issue.message);
      });
    } else {
      console.error(err);
    }
    throw new Error('کانفیگ "' + name + '" نامعتبر است. لطفاً خطای بالا را برطرف کنید.');
  }
}

export const config = {
  site: validate('site', siteConfigSchema, siteConfig),
  person: validate('person', personConfigSchema, personConfig),
  location: validate('location', locationConfigSchema, locationConfig),
  theme: validate('theme', themeConfigSchema, themeConfig),
  tabs: validate('tabs', tabsConfigSchema, tabsConfig),
  features: validate('features', featuresConfigSchema, featuresConfig),
  seo: validate('seo', seoConfigSchema, seoConfig),
  analytics: validate('analytics', analyticsConfigSchema, analyticsConfig),
  contacts: validate('contacts', contactsConfigSchema, contactsConfig),
  family: validate('family', familyConfigSchema, familyConfig),
} as const;

export type Config = typeof config;