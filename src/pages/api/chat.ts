import type { NextApiRequest, NextApiResponse } from 'next'
import { SecretLLM } from '@/lib/secretllm'
// Initialize SecretLLM with API key
const secretLLM = new SecretLLM({
  apiKey: process.env.NILLION_API_KEY || '',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, channelId, userId } = req.body;

    if (!message || !channelId || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Process message in TEE
    const result = await secretLLM.processInTEE({
      message,
      channelId,
      userId,
    });

    // Verify the processed message
    const isValid = await secretLLM.verifyMessage(result.processedMessage);
    if (!isValid) {
      return res.status(400).json({ error: 'Message verification failed' });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error processing message:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
