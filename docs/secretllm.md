=== Nillion SecretLLM API Documentation ===

What is SecretLLM:
SecretLLM is a set of OpenAI-compatible APIs that run AI models within a Trusted Execution Environment (TEE). It enables building private AI applications or migrating existing ones to a secure environment where data remains private.

How SecretLLM Works:
1. Send your prompt to SecretLLM over HTTPS.
2. The prompt runs inside a TEE, hidden from the cloud provider.
3. Receive the result back over HTTPS with a cryptographic signature.

Available Models:
- meta-llama/Llama-3.2-3B-Instruct
  - Parameters: 3B
  - Features: Chat completion, tool support
  - Best For: Quick responses, simple Q&A, basic chat (faster inference, lower resource usage)
  - Access: Testnet
- meta-llama/Llama-3.1-8B-Instruct
  - Parameters: 8B
  - Features: Chat completion, tool support
  - Best For: Complex tasks, detailed responses, code generation (higher quality, slower inference)
  - Access: Testnet
- deepseek-ai/DeepSeek-R1-Distill-Qwen-14B
  - Parameters: 14B
  - Features: Chat completion
  - Best For: Reasoning, complex tasks requiring long output (slowest inference)
  - Access: Apply for access
Recommendation: Start with the 3B model and scale up if needed.

Key Features:
- Drop-in Privacy: Use existing OpenAI-style code by pointing it to SecretLLM.
- Privacy Through TEEs: Processing occurs in a TEE using NVIDIA Confidential Computing.
- Standard Security: HTTPS encryption for end-to-end data protection in transit.
- Cryptographic Attestation: Verify TEE integrity via attestation API.
- Signed Responses: Responses include cryptographic signatures for verification.

Attestation & Verification:
1. Environment Attestation:
   - Verify CPU environment
   - Verify GPU environment
   - Service verification with a verifying key
2. Response Signatures:
   - Each chat completion response includes a signature to confirm it came from the attested environment.

Getting Started:
1. Obtain a nilAI API key and node URL for SecretLLM access.
2. Check the /models endpoint with your API key for available models.
3. Run private AI with your chosen model.
4. (Optional) Verify the environment using the attestation API.

Enhancements:
- Use nilRAG to integrate SecretLLM with SecretVault for context retrieval (see nilRAG docs for details).

# SecretLLM API Documentation

## Overview

SecretLLM is a set of OpenAI-compatible APIs that run AI models within a Trusted Execution Environment (TEE). It enables developers to build new private AI applications or migrate existing ones to a secure environment where data remains private. This documentation covers the core functionality, authentication, usage, and quickstart guide for SecretLLM.

---

## What is SecretLLM

SecretLLM provides secure, privacy-focused AI inference by leveraging Trusted Execution Environments (TEEs). It is designed to be compatible with OpenAI-style APIs, allowing seamless integration into existing workflows while ensuring data privacy.

---

## How SecretLLM Works

1. Send your prompt to SecretLLM over HTTPS (just like any secure web request).
2. Your prompt runs inside a Trusted Execution Environment, hidden from the cloud provider.
3. Get your result back over HTTPS, complete with a cryptographic signature.

---

## Available Models

| Model                            | Parameters | Features             | Best For                                              | Access         |
|----------------------------------|------------|----------------------|-------------------------------------------------------|----------------|
| meta-llama/Llama-3.2-3B-Instruct| 3B         | Chat completion, tool support | Quick responses, simple Q&A, basic chat. Faster inference with lower resource usage. | Testnet        |
| meta-llama/Llama-3.1-8B-Instruct| 8B         | Chat completion, tool support | More complex tasks, detailed responses, code generation. Higher quality but slower inference. | Testnet        |
| deepseek-ai/DeepSeek-R1-Distill-Qwen-14B | 14B | Chat completion      | Reasoning and complex tasks requiring long output. Slowest inference. | Apply for access |

**Recommendation**: Start with the 3B model and scale up if you need more capability.

---

## Key Features

- **Drop-in Privacy**: Use existing OpenAI-style code by pointing it to SecretLLM.
- **Privacy Through TEEs**: All processing occurs within a TEE, built on NVIDIA Confidential Computing.
- **Standard Security**: HTTPS encryption provides end-to-end protection for data in transit.
- **Cryptographic Attestation**: Verify TEE integrity via the attestation API.
- **Signed Responses**: Every model response includes a cryptographic signature for verification.

---

## Attestation & Verification

SecretLLM offers two layers of cryptographic proof:

1. **Environment Attestation**:
   - Verify CPU environment.
   - Verify GPU environment.
   - Service verification through a verifying key.
   - Access via the attestation endpoint.

2. **Response Signatures**:
   - Every chat completion response includes a cryptographic signature to confirm it came from the attested environment.

---

## Authentication

SecretLLM provides secure access to the nilAI node API through API key authentication.

### Create an API Key

1. Visit the [SecretLLM Registration Portal](#) to create and verify your API key.
2. Choose one of two authentication options:
   - **Keplr**: Authenticate using a Keplr wallet.
   - **MetaMask**: Authenticate using a MetaMask wallet.
3. Prove ownership of the account to generate an API key.
4. Verify the API key as instructed on the portal.
5. Use the verified API key to access SecretLLM services.

---

## Usage

Once you have a nilAI API key, you can start using SecretLLM with any OpenAI-compatible library.

### Getting Started with SecretLLM

1. Select a nilAI node URL (provided with your API key).
2. Query the `/v1/models` endpoint to list available models or refer to the table above.
3. Select a model and use it with the `/v1/chat/completions` endpoint.

#### Example: Querying Llama-3.1-8B Model

```javascript
// Example in Node.js (file: nilai/secretllm_nodejs/index.js)
// (Code not fully provided in docs, placeholder assumed)
const { OpenAI } = require('openai');
const client = new OpenAI({
  apiKey: '<your-nilAI-api-key>',
  baseURL: '<your-nilAI-node-url>',
});
async function getCompletion() {
  const response = await client.chat.completions.create({
    model: 'meta-llama/Llama-3.1-8B-Instruct',
    messages: [{ role: 'user', content: 'Is salad or pizza healthier?' }],
  });
  console.log(response.choices[0].message.content);
}
getCompletion();