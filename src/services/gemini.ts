import { Property } from '@/data/properties';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'api key';
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3-flash-preview';

export async function askGemini(question: string, properties: Property[]) {
  const inventory = properties.slice(0, 12).map(p =>
    `- ${p.name}: ${p.priceLabel}, ${p.beds} bd/${p.baths} ba, ${p.sqft} sqft, risk ${p.risk}, signal ${p.signal}, cap rate ${p.capRate}%, address ${p.address}.`,
  ).join('\n');

  const prompt = `You are EstateIQ's real estate analysis assistant.
Answer only questions related to this app, real estate investing, property listings, ROI, valuation, market trends, neighborhood quality, and saved properties.
Use the app inventory below when it helps. Keep answers concise and practical.

Current EstateIQ inventory:
${inventory}

User question:
${question}`;

  const response = await fetch(`/api/gemini/v1beta/models/${GEMINI_MODEL}:generateContent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.4, maxOutputTokens: 700 },
    }),
  });

  if (!response.ok) throw new Error(`Gemini request failed (${response.status})`);
  const data = await response.json();
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  const text = parts.map((part: { text?: string }) => part.text).filter(Boolean).join('\n').trim();
  if (!text) throw new Error('Gemini returned an empty response.');
  return text;
}
