# Anonymous Discord Chat App

A viral, anonymous chat app integrated with Discord, built for the ETHGlobal TEE track. Features public group chats with dynamically reassigned usernames, secured by Nillion SecretLLM (TEE) and logged on-chain via Privy.

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Discord.js
- Nillion SecretLLM
- Privy
- Vercel

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/anon-discord-chat.git
cd anon-discord-chat
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```bash
DISCORD_BOT_TOKEN=your_discord_bot_token
PRIVY_APP_ID=your_privy_app_id
PRIVY_PUBLIC_KEY=your_privy_public_key
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

- `/src` - Next.js application source
  - `/app` - App router components and pages
  - `/components` - Reusable React components
  - `/lib` - Utility functions and configurations
  - `/types` - TypeScript type definitions
- `/docs` - Project documentation
- `/public` - Static assets
- `/tests` - Test files

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT
