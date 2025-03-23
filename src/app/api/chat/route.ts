import { NextResponse } from 'next/server';
import { SecretLLM } from '@/lib/secretllm';

// Initialize SecretLLM with API key
const secretLLM = new SecretLLM({
  apiKey: process.env.NILLION_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { message, channelId, userId } = await req.json();

    if (!message || !channelId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
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
      return NextResponse.json(
        { error: 'Message verification failed' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        anonId: result.anonId,
        message: result.processedMessage,
      },
    });
  } catch (error) {
    console.error('Error processing message in TEE:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
