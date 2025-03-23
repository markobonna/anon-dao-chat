import type { NextApiRequest, NextApiResponse } from 'next'
import { Client, GatewayIntentBits } from 'discord.js'
import { SecretLLM } from '@/lib/secretllm'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const secretLLM = new SecretLLM({
  apiKey: process.env.NILLION_API_KEY || '',
});

client.once('ready', () => {
  console.log('Discord bot is ready!');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!anonchat')) return;

  try {
    // Delete the original message for privacy
    await message.delete();

    // Process message in TEE
    const result = await secretLLM.processInTEE({
      message: message.content.slice('!anonchat'.length).trim(),
      channelId: message.channelId,
      userId: message.author.id,
    });

    // Verify the processed message
    const isValid = await secretLLM.verifyMessage(result.processedMessage);
    if (!isValid) {
      throw new Error('Message verification failed');
    }

    // Send anonymous message
    await message.channel.send(`**${result.anonId}**: ${result.processedMessage}`);
  } catch (error) {
    console.error('Error processing message:', error);
    await message.channel.send('Failed to process anonymous message.');
  }
});

// Login using the bot token
client.login(process.env.DISCORD_TOKEN);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Handle Discord webhook events here
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Discord webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
