'use client';

import { useRef, useEffect } from 'react';

interface Message {
  id: string;
  anonId: string;
  content: string;
  timestamp: number;
  txHash?: string;
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
          {message.txHash && (
            <a
              href={`https://sepolia.etherscan.io/tx/${message.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              <span>View on Etherscan</span>
            </a>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
