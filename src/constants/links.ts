import type { Locale } from '../shared/i18n/translation';
import { translations } from '../shared/i18n/translation';

export const links = {
  bookingUrl: 'https://gainmiles.simplybook.asia/v2/',
  whatsappPhoneNumber: '85260300900',
} as const;

export function getWhatsappUrl(locale: Locale) {
  const message = translations[locale].premiumConsultation.whatsapp.message;
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${links.whatsappPhoneNumber}?text=${encodedMessage}`;
}
