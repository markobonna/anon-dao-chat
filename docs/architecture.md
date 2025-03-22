# Technical Architecture

```mermaid
graph TB
    subgraph Client["Client Layer"]
        DC[Discord Client]
        WUI[Web UI]
    end

    subgraph App["Application Layer"]
        direction TB
        NX[Next.js Server]
        DB[Discord Bot]
        
        subgraph Core["Core Services"]
            direction LR
            MS[Message Service]
            AS[Auth Service]
            CS[Channel Service]
        end
        
        subgraph Security["Security Layer"]
            direction LR
            TEE[Nillion TEE]
            subgraph TEE_Services["TEE Services"]
                NG[Name Generator]
                MM[Message Manager]
                IM[Identity Mapper]
            end
        end
    end

    subgraph Storage["Storage Layer"]
        PW[Privy Wallet]
        BC[Blockchain - Sepolia]
    end

    %% Client Layer Connections
    DC -->|Commands| DB
    WUI -->|API Requests| NX
    
    %% Application Layer Connections
    DB -->|Process Messages| MS
    NX -->|Channel Management| CS
    NX -->|Auth Requests| AS
    
    %% Core to Security Layer
    MS -->|Secure Processing| TEE
    AS -->|Identity Verification| TEE
    CS -->|Channel Verification| TEE
    
    %% TEE Internal Connections
    TEE -->|Generate Names| NG
    TEE -->|Process Messages| MM
    TEE -->|Map Identities| IM
    
    %% Storage Layer Connections
    TEE -->|Log Events| PW
    PW -->|Store Records| BC

    classDef client fill:#d4eaff,stroke:#333,stroke-width:2px
    classDef app fill:#b8e6bf,stroke:#333,stroke-width:2px
    classDef security fill:#ffe6cc,stroke:#333,stroke-width:2px
    classDef storage fill:#d9d9d9,stroke:#333,stroke-width:2px
    
    class DC,WUI client
    class NX,DB,MS,AS,CS app
    class TEE,NG,MM,IM security
    class PW,BC storage
```

## Component Details

### Client Layer
- **Discord Client**: User interface for Discord commands and messages
- **Web UI**: Administrative interface and channel management

### Application Layer
- **Next.js Server**: Main application server handling web requests
- **Discord Bot**: Processes Discord commands and messages
- **Core Services**:
  - Message Service: Handles message processing and routing
  - Auth Service: Manages user authentication and sessions
  - Channel Service: Manages anonymous chat channels

### Security Layer (Nillion TEE)
- **Name Generator**: Creates unique anonymous usernames
- **Message Manager**: Processes and sanitizes messages
- **Identity Mapper**: Manages user-anonymous ID mappings

### Storage Layer
- **Privy Wallet**: Manages blockchain transactions
- **Sepolia Blockchain**: Stores message hashes and metadata

## Data Flow

1. **Message Flow**:
   ```
   User -> Discord -> Bot -> Message Service -> TEE -> Privy -> Blockchain
   ```

2. **Channel Creation**:
   ```
   Admin -> Web UI -> Next.js -> Channel Service -> TEE -> Discord Bot
   ```

3. **Authentication**:
   ```
   User -> Discord/Web -> Auth Service -> TEE -> Identity Mapper
   ```

## Security Considerations

1. **Privacy**:
   - All user-identifiable data processed in TEE
   - Messages sanitized before broadcasting
   - Random usernames per message

2. **Integrity**:
   - Message hashes stored on blockchain
   - TEE ensures secure processing
   - Cryptographic signatures for verification

3. **Access Control**:
   - Admin commands restricted by role
   - Channel-specific permissions
   - TEE-based identity verification
