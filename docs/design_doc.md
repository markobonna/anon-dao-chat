# Anonymous Discord Chat App Design Document

## Problem Statement
Building a privacy-focused chat application integrated with Discord that enables DAOs to have public group conversations while maintaining individual anonymity. The application leverages Trusted Execution Environments (TEEs) for security and blockchain for transparency and logging.

## Requirements

### Functional Requirements

1. Discord Integration
   - Discord bot with `!anonchat` command
   - Integration with existing Discord channels
   - Anonymous message relay system

2. Anonymity Features
   - Random username generation per message
   - No connection between messages and original Discord users
   - Public visibility within designated channels

3. Security & Privacy
   - TEE-based message processing using Nillion
   - Blockchain logging using Privy
   - Secure user session management

4. Message Handling
   - Real-time message delivery
   - Support for text messages
   - Public chat history within channels

### Non-Functional Requirements

1. Performance
   - Message delivery latency < 1 second
   - Smooth real-time chat experience
   - Scalable to handle multiple active channels

2. Security
   - Zero-knowledge of user identity
   - Tamper-proof message logging
   - Secure API communication

3. Reliability
   - High availability during demo
   - Graceful error handling
   - Robust against Discord API issues

### Technical Constraints

1. Time Constraints
   - MVP-focused development

2. Technology Stack
   - Next.js 14 + React + TypeScript
   - Discord API integration
   - Nillion for TEE
   - Privy for blockchain logging

3. Integration Dependencies
   - Discord Bot API availability
   - Nillion API/SDK access
   - Privy API access

### Implementation Details

#### 1. Username Generation
- Format: `AnonXXXX` (e.g., Anon1234)
- New random name generated for every message
- Generated and verified within TEE

#### 2. TEE Processing (Nillion)
- Username generation and management
- User-to-anonymous ID mapping
- Message sanitization for privacy
- Using SecretLLM API for secure processing

#### 3. Blockchain Logging (Privy)
- Platform: Ethereum Sepolia Testnet
- Logged Data:
  - Message hashes
  - Timestamps
  - Channel IDs
  - Anonymous message IDs
- Using Privy for wallet management and transaction handling

#### 4. Discord Bot Commands
User Commands:
```
!anonchat start  - Create new anonymous chat channel
!anonchat join   - Join existing anonymous chat
!anonchat status - Show channel statistics
!anonchat help   - Show available commands
```

Admin Commands:
```
!anonchat config  - Configure channel settings
!anonchat pause   - Temporarily pause anonymous chat
!anonchat resume  - Resume anonymous chat
```
