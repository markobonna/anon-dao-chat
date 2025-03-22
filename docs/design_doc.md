# Anonymous Discord Chat App Design Document

## Problem Statement
Build a privacy-focused chat application integrated with Discord that enables anonymous communication within DAOs. The application will protect user privacy through Trusted Execution Environments (TEEs) while maintaining transparency by logging conversations on the blockchain. This solution allows community members to freely express their thoughts without fear of attribution while ensuring accountability through blockchain records.

## Requirements

### Functional Requirements

1. Discord Integration
   - Single command interface using `!anonchat`
   - Support for both existing channels and dedicated anonymous channels
   - Messages after `!anonchat` command are automatically anonymized
   - Privy-based authentication for users to join/leave chat sessions

2. Anonymity Features
   - Username format: `AnonXXXXX` (5-digit random number)
   - Username changes with every message
   - No persistent connection between messages and Discord users
   - Natural randomization through 5-digit space (100,000 possibilities)

3. Security & Privacy (TEE)
   - Secure chat logs using Nillion's TEE
   - Message content protection
   - Access control through Privy authentication
   - Secure storage of user mappings

4. Blockchain Integration
   - Store chat logs on Ethereum Sepolia testnet
   - Log both messages and metadata
   - Accessible through Privy authentication
   - Gas fees handled through Sepolia testnet ETH

### Non-Functional Requirements

1. Performance
   - Message delivery latency < 1 second
   - Real-time chat experience
   - Efficient blockchain logging

2. Security
   - Zero-knowledge of user identity outside TEE
   - Tamper-proof message logging
   - Secure authentication flow

3. Development Constraints
   - Single-day development timeline
   - MVP focus on core features
   - Prioritize working functionality over feature completeness

### Technical Stack

1. Frontend & Backend
   - Next.js 14 with TypeScript
   - React for UI components
   - Discord.js for bot integration

2. Security & Privacy
   - Nillion TEE for secure message processing
   - Privy for authentication and blockchain integration

3. Blockchain
   - Ethereum Sepolia testnet
   - Smart contracts for message logging
   - Privy SDK for transaction management

### MVP Scope

Phase 1: Basic Integration
- Discord bot with `!anonchat` command
- Anonymous message relay
- Basic username generation

Phase 2: Security Layer
- TEE integration
- Message encryption
- Secure storage

Phase 3: Blockchain
- Message logging
- Transaction handling
- Access control

### Future Enhancements (Post-Hackathon)
- Multiple anonymous channels
- Advanced command system
- Enhanced privacy features
- Message threading
- Reaction support
