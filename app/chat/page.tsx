'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, ArrowLeft, Globe } from 'lucide-react';
import { MessageBubble } from '@/components/MessageBubble';
import { BookingFlow } from '@/components/BookingFlow';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showBookingFlow, setShowBookingFlow] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      // Initial greeting
      const greeting = language === 'pt'
        ? 'Olá! Bem-vindo à HealthCare Clinic. Como posso ajudá-lo hoje?'
        : 'Hello! Welcome to HealthCare Clinic. How can I help you today?';

      setMessages([{
        role: 'assistant',
        content: greeting,
        timestamp: new Date(),
      }]);
    }
  }, [language, messages.length]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Check if user wants to book appointment
      const bookingKeywords = ['book', 'appointment', 'schedule', 'marcar', 'consulta', 'agendar'];
      const wantsToBook = bookingKeywords.some(keyword =>
        input.toLowerCase().includes(keyword)
      );

      if (wantsToBook && !showBookingFlow) {
        setShowBookingFlow(true);
        const response = language === 'pt'
          ? 'Ótimo! Vou ajudá-lo a marcar uma consulta. Por favor, preencha o formulário abaixo.'
          : 'Great! I\'ll help you book an appointment. Please fill out the form below.';

        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response,
          timestamp: new Date(),
        }]);
        setIsLoading(false);
        return;
      }

      // Get AI response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.concat(userMessage).map(m => ({
            role: m.role,
            content: m.content
          })),
          language
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      }]);

    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = language === 'pt'
        ? 'Desculpe, ocorreu um erro. Por favor, tente novamente.'
        : 'Sorry, an error occurred. Please try again.';

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorMsg,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookingComplete = () => {
    setShowBookingFlow(false);
    const successMsg = language === 'pt'
      ? 'Obrigado! A sua marcação foi recebida. Entraremos em contacto em breve.'
      : 'Thank you! Your appointment request has been received. We will contact you soon.';

    setMessages(prev => [...prev, {
      role: 'assistant',
      content: successMsg,
      timestamp: new Date(),
    }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b shadow-sm shrink-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:inline">
                  {language === 'pt' ? 'Voltar' : 'Back'}
                </span>
              </Link>
              <div className="h-8 w-px bg-gray-300" />
              <div>
                <h1 className="font-bold text-lg sm:text-xl text-gray-900">HealthCare Clinic</h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  {language === 'pt' ? 'Assistente Virtual' : 'Virtual Assistant'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 border border-gray-300 rounded-lg hover:border-primary-600 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'pt' ? 'PT' : 'EN'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">
                    {language === 'pt' ? 'A escrever...' : 'Typing...'}
                  </span>
                </div>
              )}
              {showBookingFlow && (
                <div className="max-w-2xl">
                  <BookingFlow
                    language={language}
                    onComplete={handleBookingComplete}
                    onCancel={() => setShowBookingFlow(false)}
                  />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="shrink-0 bg-white border-t shadow-lg">
            <div className="max-w-4xl mx-auto p-4 sm:p-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder={language === 'pt' ? 'Escreva a sua mensagem...' : 'Type your message...'}
                  className="flex-1 border-2 border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl px-6 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
                >
                  <Send className="w-5 h-5" />
                  <span className="hidden sm:inline">
                    {language === 'pt' ? 'Enviar' : 'Send'}
                  </span>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                {language === 'pt'
                  ? 'Pergunte sobre os nossos serviços ou marque uma consulta'
                  : 'Ask about our services or book an appointment'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
