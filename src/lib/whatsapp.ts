import { Product, StoreInfo } from '../types/store.ts';

export const DEFAULT_WHATSAPP_NUMBER = '+91 9386432892';

export function cleanPhoneForWa(phone: string): string {
  // Remove +, spaces, dashes, parentheses
  return phone.replace(/[^0-9]/g, '');
}

export function getProductWhatsAppUrl(
  product: Product,
  storeInfo?: StoreInfo,
  selectedSize?: string,
  selectedColor?: string
): string {
  const number = cleanPhoneForWa(storeInfo?.whatsappNumber || DEFAULT_WHATSAPP_NUMBER);
  
  let sizeText = selectedSize ? ` (Selected Size: ${selectedSize})` : '';
  let colorText = selectedColor ? ` (Color: ${selectedColor})` : '';

  const message = `Hello Dharmendra Garments, I would like to inquire about ${product.name}${sizeText}${colorText}. Please share its current availability, available sizes, colors, and price.`;
  
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getGeneralWhatsAppUrl(storeInfo?: StoreInfo, topic?: string): string {
  const number = cleanPhoneForWa(storeInfo?.whatsappNumber || DEFAULT_WHATSAPP_NUMBER);
  const message = topic
    ? `Hello Dharmendra Garments, I would like to inquire about ${topic}.`
    : `Hello Dharmendra Garments, I would like to inquire about your clothing collection and showroom visit at Block Road, Punpun, Patna.`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
