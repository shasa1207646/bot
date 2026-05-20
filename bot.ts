import Replicate from 'replicate';

let replicate: Replicate | null = null;

function getClient(): Replicate {
  if (!replicate) {
    replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
  }
  return replicate;
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
  if (!process.env.REPLICATE_API_TOKEN) {
    return '🤖 AI-помощник временно недоступен. Проверьте настройки REPLICATE_API_TOKEN.';
  }

  // Build a single prompt string from the conversation history
  const history = messages
    .map((m) => (m.role === 'user' ? `User: ${m.content}` : `Assistant: ${m.content}`))
    .join('\n');

  const prompt = `${SYSTEM_PROMPT}\n\n${history}\nAssistant:`;

  try {
    const client = getClient();
    const output = await client.run('intel/neural-chat-7b', {
      input: {
        prompt,
        max_new_tokens: 500,
        temperature: 0.7,
        top_p: 0.9,
        repetition_penalty: 1.1,
      },
    });

    // Replicate streams output as an array of string tokens
    const text = Array.isArray(output) ? (output as string[]).join('') : String(output ?? '');
    return text.trim() || 'Нет ответа';
  } catch (err: any) {
    console.error('[AI] Ошибка:', err?.message);
    return '❌ Ошибка AI. Попробуйте позже.';
  }
}
