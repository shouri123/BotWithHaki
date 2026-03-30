<div align="center">
<h1>Chat Buddy</h1>

[![npm version](https://img.shields.io/npm/v/chat-buddy)](https://www.npmjs.com/package/chat-buddy)
[![npm downloads](https://img.shields.io/npm/dm/chat-buddy)](https://www.npmjs.com/package/chat-buddy)
[![license](https://img.shields.io/github/license/Asad-bot07/BotWithHaki)](https://github.com/Asad-bot07/BotWithHaki)

  <p><strong>A Highly Personalized, Personality-Driven WhatsApp AI Assistant</strong></p>

  <p>
    Built with the OpenAI Agents SDK, custom tools, memory architecture, and robust guardrails.
  </p>
</div>

---

## 📖 Overview

**Chat Buddy** is an advanced WhatsApp AI assistant packaged as a CLI tool. Originally built to act as a personal proxy when unavailable, it offers a seamless blend of context-aware intelligence, automated scheduling, and a uniquely engaging personality (inspired by lively, anime-esque energy).

Whether you need it to mirror conversational slang, schedule calendar events, or just manage your WhatsApp chats smartly while you're busy, Chat Buddy delivers an "unfiltered" yet strictly protected and helpful bot experience.

### 🌟 Key Capabilities
- **Agentic Core**: Built on the OpenAI Agents SDK for dynamic, tool-enabled responses.
- **Short-Term Memory**: Per-user context tracking to ensure natural, flowing conversations.
- **Interactive CLI Setup**: Secure onboarding wizard to locally encrypt API keys and preferences.
- **Tool-Calling Ecosystem**: Automatically handles tasks like fetching history, returning current time, or scheduling.
- **Guardrail Protected**: Output validation layer prevents undesirable or unsafe language.

---

## 🚀 Getting Started

The project is structured as a zero-config, securely stored NPM package with its own CLI.

### 1. Installation

You can install the package globally or run it directly using `npx`. However, for the best experience, clone this repository or install the local package:

```bash
npm install chat-buddy
# or install globally if published: npm -g install botwithaki
```

### 2. Configuration & Initialization

Chat Buddy uses an interactive wizard to configure your environment safely. 
Your secrets (like your `OPENAI_API_KEY`) are encrypted and stored locally.

Run the init command:
```bash
npx chat-buddy init
# or using the CLI: npx botwithaki init
```

The wizard will ask for:
- **Username**: Your name (so the agent knows who it represents).
- **Agent Name**: What you want your bot to be called.
- **OpenAI API Key**: Your `sk-proj-...` key to power the agent.
- **System Instructions**: Define your bot's personality, tone, and slang.

### 3. Starting the Bot

Once configured, run:
```bash
npx chat-buddy run
# or using the CLI: npx botwithaki run
```

1. A **QR code** will be displayed in your terminal.
2. Open **WhatsApp** on your phone > Settings > **Linked Devices** > **Link a Device**.
3. Scan the terminal's QR code.
4. The terminal will log: `WhatsApp Bot is READY and connected!`.

> **Session Persistence**: Your session is saved securely. On subsequent runs, you won't need to scan the QR code again unless you delete the local authentication folder (`.wwebjs_auth`).

---

## ⚙️ How it Works

Chat Buddy employs an event-driven architecture designed for modularity and safety:

```text
Incoming WhatsApp Message
       ↓
Message Handler (Flow Controller)
       ↓
Memory Store (Context Injection)
       ↓
OpenAI Agent Execution (Tool Invocation)
       ↓
Guardrails Layer (Safety & Persona Check)
       ↓
WhatsApp Reply
```

### Advanced Features Details:
- **Encrypted Local Storage**: API credentials and system configurations are obfuscated, never stored in plain text.
- **Chat History Limits**: Only the most recent 15 messages per user are stored in RAM to minimize footprint.
- **Dynamic Commands**:
  - `/history` - Display recent chat context for debugging.
  - `/reset` - Clears short-term user memory.
  - `/schedule`, `/time` - Tool demonstrations for action execution.

---

## 🛠 Project Structure

```text
├── src/
│   ├── cli/             # CLI commands for 'init' and 'run'
│   ├── config/          # Agent instructions and core protocol settings
│   ├── guardrails/      # Output validation & tripwires
│   ├── services/        # Message handling, memory, and command parsing
│   ├── storage/         # Secure local caching of keys and chat history
│   ├── tools/           # Callable tools inside the AI Agent
│   ├── index.ts         # Main entry point for the Application
│   └── bot.ts           # whatsapp-web.js client configuration
└── package.json
```

---

## 🔒 Safety & Privacy

1. **Guardrails**: A stringent output validation process ensures the AI refrains from exposing personal system configurations, engaging in offensive conduct, or answering out-of-bounds coding/tech support queries.
2. **Ephemeral Memory**: The chat history operates solely in your machine's RAM. It is cleared perfectly on restart. No remote databases are involved.
3. **Local Auth Credentialing**: `botwithaki` utilizes a cryptographic key matrix mapping for the `.env` settings to avoid plain text leaks on your filesystem.

---

## 📄 License & Contact

This project is licensed under the **[MIT License](LICENSE)**.

Developed by [Asad Hussain](mailto:techie.asad.dev@gmail.com).  
- **GitHub**: [@asad-bot07](https://github.com/Asad-bot07)  
- **LinkedIn**: [Asad Hussain](https://www.linkedin.com/in/asad-hussain-765502319/)  
- **Portfolio**: [asadhussain.in](https://www.asadhussain.in/)