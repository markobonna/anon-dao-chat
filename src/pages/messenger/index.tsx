'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextPageWithLayout } from '../_app';
import { MessageInput } from '@/components/MessageInput';
import { MessageList } from '@/components/MessageList';
import { v4 as uuidv4 } from 'uuid';
import { usePrivy } from '@privy-io/react-auth';

interface Message {
  id: string;
  anonId: string;
  content: string;
  timestamp: number;
  txHash?: string;
}

interface TransactionData {
  to: string;
  data: string;
  from: string;
}

const MessengerPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { user, authenticated, login } = usePrivy();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authenticated) {
      // Redirect to login if not authenticated
      login();
    }
  }, [authenticated, login]);

  const handleSendMessage = async (content: string) => {
    setIsLoading(true);
    try {
      if (!authenticated || !user?.wallet?.address) {
        throw new Error('Please connect your wallet first');
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-address': user.wallet.address,
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
      
      // Sign and send the transaction if available
      let txHash;
      if (data.transaction && user?.wallet) {
        try {
          const tx = await user.wallet.sendTransaction(data.transaction as TransactionData);
          txHash = tx.hash;
          await tx.wait(); // Wait for transaction confirmation
        } catch (error) {
          console.error('Error sending transaction:', error);
        }
      }

      const newMessage: Message = {
        id: uuidv4(),
        anonId: data.anonId,
        content: data.processedMessage,
        timestamp: Date.now(),
        txHash
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
