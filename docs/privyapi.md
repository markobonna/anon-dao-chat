# Privy API Documentation

## Introduction

Privy builds authentication and wallet infrastructure to enable better products on crypto rails. It offers low-level APIs to interact directly with users, wallets, authorization keys, and policies, providing developers with tools to onboard users, manage wallets, and secure transactions seamlessly.

### Base URL
All requests to the Privy API must be made to:
https://api.privy.io

text

Collapse

Wrap

Copy
HTTPS is required; HTTP requests will be rejected.

### Authentication
All API endpoints require Basic Auth and a Privy App ID header:
- **Authorization**: `Basic <base64(app-id:app-secret)>` (required)
- **privy-app-id**: Your Privy App ID as a string (required)

**Example**:
```javascript
fetch('https://api.privy.io/v1/wallets', {
  method: 'GET',
  headers: {
    'Authorization': `Basic ${btoa('insert-your-app-id:insert-your-app-secret')}`,
    'privy-app-id': 'insert-your-app-id',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));
Find your App ID and secret in the App settings > Basics tab of the Privy Dashboard.

About Privy
Privy enables user onboarding and wallet infrastructure for crypto-based applications:

User Onboarding: Authenticate users, connect existing wallets, or provision self-custodial embedded wallets.
Wallet Infrastructure: Spin up user-centric or general-purpose wallets across chains.
Privy provides user-centric abstractions (authentication and wallet generation) and wallet-centric abstractions (create wallets with authorization keys).

Engineering Principles
Secure: Uses distributed key sharding and secure execution environments; audited regularly.
Flexible: Low-level API access for customized wallet flows.
Easy to Use: Out-of-the-box, customizable UIs for authentication and wallet management.
Portable: Supports all EVM- and SVM-compatible chains, plus others like Bitcoin via raw keys.
Authentication Overview
Privy supports API authentication (server-side) and user authentication (client-side) to enforce wallet access controls.

API Authentication
Authenticate server requests using an API secret.
Configure authorization keys for granular control over wallets and policies.
Ensures only your servers can execute requests.
User Authentication
Privy offers progressive authentication options:

JWT-based: Integrates with OIDC-compliant systems (e.g., OAuth 2.0, Auth0, Firebase).
Email or SMS: Passwordless login via one-time passcodes.
Passkey: Biometric or WebAuthn-based login.
OAuth and Socials: Google, Apple, Twitter, Discord, GitHub, LinkedIn, Spotify, Telegram, Farcaster, etc.
Wallets: Sign-In With Ethereum or Solana.
Users link accounts to a common user object, which includes a unique ID and linked accounts. Post-authentication, Privy issues an access token for session management or backend requests.

Wallet Overview
Privy’s wallet infrastructure supports embedded and external wallets across chains like Ethereum, Solana, and Base.

Embedded Wallets
User Wallets: Self-custodial wallets embedded in your app; users control keys without managing them directly.
Keys are sharded and reconstituted in secure environments.
Users can export keys for portability.
Managed Wallets: Server-controlled wallets for treasury management with signer quorums and policies.
Features

Cross-chain Usage: EVM, SVM, Bitcoin, etc.
Robust Transaction Controls: Transfer funds, interact with contracts, ensure idempotency.
Onchain Indexing: Webhooks for transaction status, deposits, and withdrawals.
Powerful Policy Engine: Allowlists, max amounts, MFA, quorum approvals.
Flexible Custody Model: m-of-n approvals for actions.
Automated Gas Sponsorship: Keeps wallets funded.
Rich Onchain Integrations: UI libraries, RainbowKit, webhooks.
External Wallets
Supports MetaMask, Phantom, etc.
Users can link multiple external wallets and sign transactions via Privy or libraries like wagmi.
Wallet Connectors
Privy integrates with popular wallet connectors:

Wagmi, Viem, Ethers, @solana/web3.js, web3swift.
Compatible with embedded and external wallets on browser and mobile devices.
Policies & Controls
Privy’s wallet system offers flexible controls for security and usability.

Security Without Compromise
Uses key splitting (Shamir’s Secret Sharing) and secure execution environments.
Non-custodial; users retain ultimate control.
Flexible Owner Configurations
User Self-Custody: Full user control.
Server Sessions: App takes limited actions.
Application-Managed: Service-level control.
Shared Control: Quorum approvals.
Robust Policies
Transaction Limits: Max transfer amounts.
Approved Destinations: Allowlisted recipients.
Contract Interactions: Restrict smart contracts.
Action Parameters: Define permitted operations.
Enhanced Security Options
MFA (TOTP, passkeys, SMS).
Biometric verification.
Hardware security keys.
User Management
Privy enables user lifecycle management via webhooks, the dashboard, and REST API.

Webhooks
Notify servers of user actions (e.g., creation, login).
Configure events and destination URLs.
Dashboard
Manage apps, API keys, and administrators.
View user metrics and configure features.
REST API
Endpoints to search, create, and delete users.
Security
Privy secures over 50M users’ wallets and billions in transactions.

Security Approach
Non-Custodial: Keys sharded and only accessible by owners.
Defense in Depth: Multiple security boundaries (cryptography, TEEs).
Continuous Validation: Audits, bug bounties, 24/7 monitoring.
Core Architecture
Key Sharding: Private keys never stored whole.
Secure Execution Environments:
Client-side: Browser iframes.
Server-side: TEEs (secure enclaves).
Security Validation
Audits by Cure53, Zellic, Doyensec.
SOC2 Type I/II certified.
Bug bounty on HackerOne.
Open-source cryptography on GitHub.
Recipes
Learn how to implement common Privy features and integrations in your app. (Detailed recipes not provided; refer to official docs for specifics.)