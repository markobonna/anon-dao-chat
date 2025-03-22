# Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Discord Configuration
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_REDIRECT_URI=http://localhost:3000/api/auth/callback/discord

# App Configuration
NODE_ENV=development
APP_URL=http://localhost:3000
```

To get Discord credentials:
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to OAuth2 settings
4. Add redirect URL: `http://localhost:3000/api/auth/callback/discord`
5. Copy Client ID and Client Secret
