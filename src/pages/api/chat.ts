import type { NextApiRequest, NextApiResponse } from 'next'
import { SecretLLM } from '@/lib/secretllm'
import { ethers } from 'ethers'

// Initialize SecretLLM with API key
const secretLLM = new SecretLLM({
  apiKey: process.env.NILLION_API_KEY || '',
});

// ABI for the message logging contract
const MESSAGE_LOG_ABI = [
  'function logMessage(string memory message) public',
  'event MessageLogged(address indexed sender, string message, uint256 timestamp)'
];

// Initialize provider
const provider = ethers.getDefaultProvider(process.env.ETH_RPC_URL);

async function logToBlockchain(message: string, anonName: string, userAddress: string) {
  try {
    // Create contract instance
    const contract = new ethers.Contract(
      process.env.MESSAGE_LOG_CONTRACT_ADDRESS || '',
      MESSAGE_LOG_ABI,
      provider
    );

    // Create a transaction request for the user to sign
    const data = contract.interface.encodeFunctionData('logMessage', [`${anonName}: ${message}`]);
    
    // Return the transaction data for the frontend to sign
    return {
      to: process.env.MESSAGE_LOG_CONTRACT_ADDRESS,
      data,
      from: userAddress
    };
  } catch (error) {
    console.error('Error preparing blockchain transaction:', error);
    return null;
  }
}

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

    // Get user's wallet address from request headers
    const userAddress = req.headers['x-user-address'] as string;
    if (!userAddress) {
      return res.status(401).json({ error: 'No wallet address provided' });
    }

    // Prepare the blockchain transaction
    const txData = await logToBlockchain(message, result.anonId, userAddress);

    return res.status(200).json({
      ...result,
      transaction: txData // Frontend will handle signing and sending
    });
  } catch (error) {
    console.error('Error processing message:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
