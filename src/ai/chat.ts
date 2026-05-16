import OpenAI from 'openai';

let openai: OpenAI | null = null;

function getClient(): OpenAI {
  if (!openai) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}

const SYSTEM_PROMPT = `Ты дружелюбный AI-помощник игрового Discord-сервера.
Отвечай на русском языке, кратко и по делу (максимум 2-3 предложения).
Ты помогаешь с: правилами сервера, командами бота, процессом подачи заявок, вопросами об играх.
Если вопрос не по теме — вежливо переведи разговор на тему сервера.
Будь дружелюбным и используй игровой сленг там, где это уместно.`;

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function getAIResponse(messages: Message[]): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    return '🤖 AI-помощник временно недоступен. Проверьте настройки OPENAI_API_KEY.';
  }

  try {
    const client = getClient();
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 500,
      temperature: 0.7,
    });
    return response.choices[0]?.message?.content || 'Нет ответа';
  } catch (err: any) {
    console.error('[AI] Ошибка:', err?.message);
    return '❌ Ошибка AI. Попробуйте позже.';
  }
}
