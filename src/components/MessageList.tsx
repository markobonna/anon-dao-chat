'use client';

import { useRef, useEffect } from 'react';

interface Message {
  id: string;
  anonId: string;
  content: string;
  timestamp: number;

}

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-blue-600">{message.anonId}</span>
            <span className="text-xs text-gray-500">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <p className="mt-1 text-gray-800 bg-gray-50 rounded-lg p-3">
            {message.content}
          </p>

        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
