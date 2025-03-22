// Discord Types
export interface DiscordMessage {
  id: string;
  content: string;
  channelId: string;
  timestamp: Date;
  anonymousId: string;
}

export interface AnonymousChannel {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  messageCount: number;
}

// Nillion Types
export interface SecureMessage {
  content: string;
  signature: string;
  timestamp: Date;
}

export interface AnonymousIdentity {
  username: string;
  messageId: string;
  timestamp: Date;
}

// Privy Types
export interface BlockchainRecord {
  messageHash: string;
  channelId: string;
  timestamp: Date;
  anonymousId: string;
  transactionHash: string;
}

// Service Types
export interface MessageService {
  processMessage(message: DiscordMessage): Promise<SecureMessage>;
  broadcastMessage(message: SecureMessage): Promise<void>;
}

export interface ChannelService {
  createChannel(name: string): Promise<AnonymousChannel>;
  pauseChannel(id: string): Promise<void>;
  resumeChannel(id: string): Promise<void>;
}

export interface AuthService {
  verifyUser(userId: string): Promise<boolean>;
  isAdmin(userId: string): Promise<boolean>;
}
