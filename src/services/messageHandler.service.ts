import { Message as MessageType } from "whatsapp-web.js";
import { runAgent } from "../agents/agent.servce.js";
import { botRebootTime } from "../bot.js";
import { createProtocols } from "../config/agent.protocol.js";
import { storeMessage } from "./memory.service.js";
import { handleCommand } from "./command.service.js";
import { appendMessage } from "../storage/chatHistoryStore.js";

export const handleMessages = async (
  message: MessageType,
  username: string = "Asad",
  agentName: string = "Luffy",
): Promise<void> => {
  // Ignore bot's own messages
  if (message.fromMe) return;

  // Ignore old synced messages
  if (message.timestamp * 1000 < botRebootTime) return;

  // Ignore empty
  if (!message.body) return;

  const userId = message.from;
  const text = message.body.trim();
  const textLower = text.toLowerCase();

  const protocols = createProtocols(agentName, username);

  // Ignore groups if disabled
  if (
    (message.from.endsWith("@g.us") && !protocols.allowGroupReplies) ||
    message.from === "status@broadcast"
  ) {
    return;
  }

  // Get contact name for chat history
  const contact = await message.getContact();
  const contactName = contact.pushname || contact.number;
  console.log(`${contactName}: ${text}`);

  // Store user message with timestamp
  storeMessage(contactName, text, false);

  // Commands
  if (textLower.startsWith("/")) {
    await handleCommand(message, textLower);
    return;
  }

  // ALL messages go through the agent — no hardcoded greeting shortcuts
  // Agent handles greetings, bye, and everything else naturally
  try {
    const reply = await runAgent(userId, contactName, text, username, agentName);

    // Store agent reply with timestamp
    storeMessage(contactName, reply, true);

    await message.reply(reply);
  } catch (error) {
    console.log("Tripwire triggered:", error);
    await message.reply("I cannot respond to that request.");
  }
};
