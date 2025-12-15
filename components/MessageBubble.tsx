'use client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  // Format the message content with better styling for lists and structure
  const formatContent = (content: string) => {
    const lines = content.split('\n');

    return lines.map((line, index) => {
      // Check if line is a numbered list item (e.g., "1. ", "2. ", etc.)
      if (/^\d+\.\s/.test(line)) {
        const [number, ...rest] = line.split(/\.\s(.+)/);
        return (
          <div key={index} className="flex gap-2 mb-2">
            <span className="font-semibold text-primary-600 min-w-[20px]">{number}.</span>
            <span className="flex-1">{rest.join('. ')}</span>
          </div>
        );
      }

      // Check if line has bold markers (e.g., **text**)
      if (line.includes('**')) {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={index} className={index < lines.length - 1 ? 'mb-2' : ''}>
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-semibold text-primary-700">{part.slice(2, -2)}</strong>;
              }
              return <span key={i}>{part}</span>;
            })}
          </p>
        );
      }

      // Check if line starts with a bullet or special character
      if (line.trim().startsWith('✓') || line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div key={index} className="flex gap-2 mb-1.5 items-start">
            <span className="text-primary-600 mt-0.5">{line.trim()[0]}</span>
            <span className="flex-1">{line.trim().slice(1).trim()}</span>
          </div>
        );
      }

      // Check if line is a section header (ends with :)
      if (line.trim().endsWith(':') && line.trim().length < 50) {
        return <p key={index} className="font-semibold text-primary-700 mt-3 mb-1">{line}</p>;
      }

      // Regular line
      if (line.trim()) {
        return <p key={index} className={index < lines.length - 1 ? 'mb-2' : ''}>{line}</p>;
      }

      return <div key={index} className="h-2"></div>;
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 sm:mb-4 px-2 sm:px-0`}>
      <div
        className={`max-w-[90%] sm:max-w-[85%] rounded-2xl px-3 sm:px-5 py-2.5 sm:py-3 shadow-sm ${
          isUser
            ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white'
            : 'bg-white text-gray-800 border border-gray-100'
        }`}
      >
        <div className={`text-[14px] sm:text-[15px] leading-relaxed ${!isUser ? 'text-gray-700' : ''}`}>
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            formatContent(message.content)
          )}
        </div>
        <p className={`text-[10px] sm:text-[11px] mt-1.5 sm:mt-2 ${isUser ? 'text-primary-100' : 'text-gray-400'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}
