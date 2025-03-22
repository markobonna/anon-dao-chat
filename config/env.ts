export const env = {
  // Discord configuration
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID || '',
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET || '',
  DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI || 'http://localhost:3000/api/auth/callback/discord',
  
  // App configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
} as const;
