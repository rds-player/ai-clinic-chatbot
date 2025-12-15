'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { BookingFlow } from './BookingFlow';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatWidgetProps {
  language: 'pt' | 'en';
  onLanguageChange?: (lang: 'pt' | 'en') => void;
}

export function ChatWidget({ language, onLanguageChange }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
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
    if (isOpen && messages.length === 0) {
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
  }, [isOpen, language, messages.length]);

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

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-primary-600 hover:bg-primary-700 text-white rounded-full p-3 sm:p-4 shadow-lg transition-all hover:scale-110 z-50"
        aria-label="Open chat"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-full sm:max-w-md bg-white sm:rounded-2xl shadow-2xl z-50 flex flex-col sm:h-[600px] sm:max-h-[80vh] h-full">
      {/* Header */}
      <div className="bg-primary-600 text-white p-3 sm:p-4 sm:rounded-t-2xl flex items-center justify-between shrink-0">
        <div>
          <h3 className="font-bold text-base sm:text-lg">HealthCare Clinic</h3>
          <p className="text-[11px] sm:text-xs text-primary-100">
            {language === 'pt' ? 'Assistente Virtual' : 'Virtual Assistant'}
          </p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-primary-700 rounded-full p-1 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-gray-50">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500 px-2 sm:px-0">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-xs sm:text-sm">
              {language === 'pt' ? 'A escrever...' : 'Typing...'}
            </span>
          </div>
        )}
        {showBookingFlow && (
          <BookingFlow
            language={language}
            onComplete={handleBookingComplete}
            onCancel={() => setShowBookingFlow(false)}
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 sm:p-4 border-t bg-white sm:rounded-b-2xl shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={language === 'pt' ? 'Escreva a sua mensagem...' : 'Type your message...'}
            className="flex-1 border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-3 sm:px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
