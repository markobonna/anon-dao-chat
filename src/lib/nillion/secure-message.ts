import { OpenAI } from 'openai';
import { SecureMessage, AnonymousIdentity } from '../../types';

export class NillionSecureMessage {
  private client: OpenAI;
  private usedUsernames: Set<string>;

  constructor(apiKey: string, baseURL: string) {
    this.client = new OpenAI({
      apiKey,
      baseURL,
    });
    this.usedUsernames = new Set();
  }

  private async generateUsername(): Promise<string> {
    const max = 9999;
    const min = 1000;
    let username: string;
    
    do {
      const number = Math.floor(Math.random() * (max - min + 1)) + min;
      username = `Anon${number}`;
    } while (this.usedUsernames.has(username));
    
    this.usedUsernames.add(username);
    return username;
  }

  public async processMessage(content: string): Promise<SecureMessage> {
    try {
      // Process message in TEE using SecretLLM
      const response = await this.client.chat.completions.create({
        model: 'meta-llama/Llama-3.2-3B-Instruct',
        messages: [
          {
            role: 'system',
            content: 'Process this message and remove any identifying information.',
          },
          { role: 'user', content },
        ],
      });

      const processedContent = response.choices[0].message.content || '';
      
      return {
        content: processedContent,
        signature: 'tee-signature', // Implement actual signature
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Error processing message in TEE:', error);
      throw error;
    }
  }

  public async createIdentity(messageId: string): Promise<AnonymousIdentity> {
    const username = await this.generateUsername();
    
    return {
      username,
      messageId,
      timestamp: new Date(),
    };
  }

  // Clean up usernames after a certain time
  private async cleanupUsernames() {
    this.usedUsernames.clear();
  }
}
