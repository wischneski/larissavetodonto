export const WHATSAPP_NUMBER = '554796694624';

export const WHATSAPP_MESSAGE = 'Olá, gostaria de agendar uma consulta odontologica para meu pet com a Dra Larissa';

export function getWhatsAppLink() {
  const text = encodeURIComponent(WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export default getWhatsAppLink;
