import { NextRequest, NextResponse } from 'next/server';
import { getChatCompletion, ChatMessage } from '@/lib/groq';
import { getSystemPrompt } from '@/lib/knowledge-base';

export async function POST(request: NextRequest) {
  try {
    const { messages, language = 'pt' } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Add system prompt
    const systemPrompt = getSystemPrompt(language as 'pt' | 'en');
    const fullMessages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    // Get AI response from Groq
    const response = await getChatCompletion(fullMessages);

    return NextResponse.json({
      message: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    );
  }
}
