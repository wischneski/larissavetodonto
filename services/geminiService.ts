import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API
// NOTE: In a real production environment, never expose API keys on the client side.
// This is for demonstration purposes within the requested environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendDentalQuery = async (message: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: `Você é um assistente virtual especializado da clínica veterinária da Dra. Larissa (Odontologia Veterinária). 
        Seu tom é profissional, empático e educativo.
        Responda dúvidas sobre saúde bucal de cães e gatos (tártaro, mau hálito, fraturas dentárias, canal).
        IMPORTANTE: Nunca dê diagnósticos definitivos ou prescreva medicamentos. Sempre finalize recomendando agendar uma consulta para avaliação presencial.
        Mantenha as respostas curtas (máximo 3 frases).`,
        temperature: 0.7,
      },
    });

    return response.text || "Desculpe, não consegui processar sua dúvida no momento. Por favor, tente novamente.";
  } catch (error) {
    console.error("Erro ao consultar Gemini:", error);
    return "Ocorreu um erro ao conectar com o assistente. Por favor, entre em contato via WhatsApp.";
  }
};