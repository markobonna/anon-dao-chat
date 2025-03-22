import { BlockchainRecord } from '../../types';
import crypto from 'crypto';

export class PrivyBlockchain {
  private apiKey: string;
  private appId: string;
  private baseUrl: string;

  constructor(apiKey: string, appId: string) {
    this.apiKey = apiKey;
    this.appId = appId;
    this.baseUrl = 'https://api.privy.io/v1';
  }

  private async makeRequest(endpoint: string, method: string, body?: any) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        'Authorization': `Basic ${Buffer.from(`${this.appId}:${this.apiKey}`).toString('base64')}`,
        'privy-app-id': this.appId,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Privy API error: ${response.statusText}`);
    }

    return response.json();
  }

  private generateMessageHash(content: string, channelId: string, timestamp: Date): string {
    const data = `${content}|${channelId}|${timestamp.toISOString()}`;
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  public async logMessage(
    content: string,
    channelId: string,
    anonymousId: string
  ): Promise<BlockchainRecord> {
    const timestamp = new Date();
    const messageHash = this.generateMessageHash(content, channelId, timestamp);

    // Create blockchain transaction using Privy
    const transaction = await this.makeRequest('/transactions', 'POST', {
      type: 'message_log',
      data: {
        messageHash,
        channelId,
        timestamp: timestamp.toISOString(),
        anonymousId,
      },
    });

    return {
      messageHash,
      channelId,
      timestamp,
      anonymousId,
      transactionHash: transaction.hash,
    };
  }

  public async verifyMessage(messageHash: string): Promise<boolean> {
    try {
      const verification = await this.makeRequest(
        `/transactions/verify/${messageHash}`,
        'GET'
      );
      return verification.verified;
    } catch (error) {
      console.error('Error verifying message:', error);
      return false;
    }
  }

  public async getChannelHistory(channelId: string): Promise<BlockchainRecord[]> {
    const history = await this.makeRequest(
      `/transactions?filter[channelId]=${channelId}`,
      'GET'
    );
    return history.data.map((record: any) => ({
      messageHash: record.data.messageHash,
      channelId: record.data.channelId,
      timestamp: new Date(record.data.timestamp),
      anonymousId: record.data.anonymousId,
      transactionHash: record.hash,
    }));
  }
}
