/**
 * Single source of truth for the Watad WhatsApp contact number and link
 * building. All "contact" style CTAs across the site go straight to
 * WhatsApp with a ready-made message instead of a contact form.
 */
export const WHATSAPP_NUMBER = "962798124169";

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
