export const WHATSAPP_NUMBER = '554796694624';

export const WHATSAPP_MESSAGE = 'Olá Dra Larissa, tudo bem? Acabei de realizar o teste de saúde bucal do meu pet e gostaria de agendar uma consulta para meu Pet.';

export function getWhatsAppLink() {
  const text = encodeURIComponent(WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function getWhatsAppLinkWithMessage(message: string) {
  const text = encodeURIComponent(message || WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export default getWhatsAppLink;
