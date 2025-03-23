'use client';

import { useState } from 'react';
import type { NextPageWithLayout } from '../_app';
import { MessageInput } from '@/components/MessageInput';
import { MessageList } from '@/components/MessageList';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  anonId: string;
  content: string;
  timestamp: number;
}

const MessengerPage: NextPageWithLayout = () => {
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

      const data = await response.json();
      const newMessage: Message = {
        id: uuidv4(),
        anonId: data.anonId,
        content: data.processedMessage,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // TODO: Show error to user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-lg shadow">
          <MessageList messages={messages} />
          <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default MessengerPage;
