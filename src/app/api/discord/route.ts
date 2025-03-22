import { Client, GatewayIntentBits } from 'discord.js';
import { NextResponse } from 'next/server';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Generate random 5-digit number for username
const generateAnonId = () => {
  return `Anon${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`;
};

client.once('ready', () => {
  console.log('Discord bot is ready!');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  if (message.content.startsWith('!anonchat')) {
    const content = message.content.replace('!anonchat', '').trim();
    if (!content) return;

    try {
      // Delete the original message for privacy
      await message.delete();
      
      // Send anonymous message
      await message.channel.send(`${generateAnonId()}: ${content}`);
    } catch (error) {
      console.error('Error handling anonymous message:', error);
    }
  }
});

// Initialize bot connection
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
if (DISCORD_TOKEN) {
  client.login(DISCORD_TOKEN).catch(console.error);
}

export async function GET() {
  return NextResponse.json({ status: 'Bot is running' });
}

export async function POST(req: Request) {
  const data = await req.json();
  return NextResponse.json({ received: data });
}
