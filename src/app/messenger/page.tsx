'use client';

import { useState } from 'react';
import { MessageInput } from '@/components/MessageInput';
import { MessageList } from '@/components/MessageList';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  anonId: string;
  content: string;
  timestamp: number;
}

export default function MessengerPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          channelId: 'webapp',
          userId: uuidv4(), // In production, use actual user ID from auth
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const result = await response.json();
      
      const newMessage: Message = {
        id: uuidv4(),
        anonId: result.data.anonId,
        content: result.data.message,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // TODO: Add error toast notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      <header className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Anonymous Chat</h1>
      </header>
      
      <main className="flex-1 flex flex-col min-h-0">
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}
