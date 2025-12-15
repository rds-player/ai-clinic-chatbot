export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function getChatCompletion(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('Please add your OPENROUTER_API_KEY or GROQ_API_KEY to .env.local');
  }

  // Use OpenRouter (works globally) or Groq
  const baseURL = process.env.OPENROUTER_API_KEY
    ? 'https://openrouter.ai/api/v1'
    : 'https://api.groq.com/openai/v1';

  const model = process.env.OPENROUTER_API_KEY
    ? 'mistralai/devstral-2512:free' // FREE Mistral model on OpenRouter
    : 'llama-3.1-70b-versatile';

  const response = await fetch(`${baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      'X-Title': 'Clinic AI Chatbot',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'AI request failed');
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
}
