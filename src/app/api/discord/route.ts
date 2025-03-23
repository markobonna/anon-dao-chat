import { Client, Events, GatewayIntentBits, TextChannel } from 'discord.js';
import { NextResponse } from 'next/server';

// Initialize Discord client with required intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Track bot initialization
let isBotInitialized = false;

// Process message through TEE
const processMessageSecurely = async (message: string, channelId: string, userId: string) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, channelId, userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to process message securely');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error processing message:', error);
    throw error;
  }
};

// Handle bot ready event
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Discord bot logged in as ${readyClient.user.tag}`);
  isBotInitialized = true;
});

// Handle message creation
client.on(Events.MessageCreate, async (message) => {
  console.log('Received message:', {
    content: message.content,
    author: message.author.tag,
    channel: message.channel.id,
    guild: message.guild?.name
  });

  // Ignore bot messages
  if (message.author.bot) {
    console.log('Ignoring bot message');
    return;
  }
  
  // Handle anonchat command
  if (message.content.startsWith('!anonchat')) {
    console.log('Processing anonchat command');

    const content = message.content.replace('!anonchat', '').trim();
    
    // Ignore empty messages
    if (!content) {
      try {
        await message.reply('Please include a message after !anonchat');
        return;
      } catch (error) {
        console.error('Error sending help message:', error);
        return;
      }
    }

    try {
      console.log('Attempting to delete original message...');
      // Delete the original message for privacy
      await message.delete();
      console.log('Original message deleted successfully');
      
      // Process message securely in TEE
      const channel = message.channel as TextChannel;
      console.log('Processing message in TEE...');
      
      const secureResult = await processMessageSecurely(
        content,
        channel.id,
        message.author.id
      );
      
      console.log('Message processed securely, sending to channel:', channel.name);
      await channel.send({
        content: `${secureResult.anonId}: ${secureResult.message}`,
        allowedMentions: { parse: [] } // Prevent mentions from working in anonymous messages
      });
      console.log('Anonymous message sent successfully');

      // For future: Log to blockchain here
      console.log(`Anonymous message sent with ID: ${secureResult.anonId}`);
      
    } catch (error) {
      console.error('Error handling anonymous message:', error);
      
      // Try to send error message to user
      try {
        await message.author.send('There was an error processing your anonymous message. Please try again.');
      } catch (dmError) {
        console.error('Could not send error DM to user:', dmError);
      }
    }
  }
});

// Error handling
client.on(Events.Error, (error) => {
  console.error('Discord client error:', error);
});

// Initialize bot connection
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
if (DISCORD_TOKEN) {
  client.login(DISCORD_TOKEN).catch((error) => {
    console.error('Failed to login to Discord:', error);
    isBotInitialized = false;
  });
}

// API Routes
export async function GET() {
  return NextResponse.json({
    status: isBotInitialized ? 'Bot is running' : 'Bot is not initialized',
    uptime: isBotInitialized ? client.uptime : null
  });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    if (!isBotInitialized) {
      return NextResponse.json(
        { error: 'Discord bot is not initialized' },
        { status: 503 }
      );
    }
    
    return NextResponse.json({ received: data, botStatus: 'running' });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
