import fs from "fs";
import path from "path";
import { getStorageDir, ensureStorageDir } from "./configStore.js";

// --- Types ---

/**
 * Chat history format:
 * {
 *   "shouri": {
 *     "2024-01-01T12:00:00.000+05:30": "HEY",
 *     "2024-01-01T12:01:00.000+05:30": "[agent] What's up?"
 *   }
 * }
 */
export type UserChatHistory = Record<string, string>; // timestamp → message
export type ChatHistory = Record<string, UserChatHistory>; // contactName → { timestamp → message }

// --- In-memory cache ---
let chatHistoryCache: ChatHistory | null = null;

// --- Paths ---
const getChatHistoryPath = (): string => {
  return path.join(getStorageDir(), "chat_history.json");
};

// --- Load / Save ---

export const loadChatHistory = (): ChatHistory => {
  if (chatHistoryCache) return chatHistoryCache;

  const historyPath = getChatHistoryPath();
  if (!fs.existsSync(historyPath)) {
    chatHistoryCache = {};
    return chatHistoryCache;
  }

  try {
    chatHistoryCache = JSON.parse(fs.readFileSync(historyPath, "utf-8"));
    return chatHistoryCache!;
  } catch {
    chatHistoryCache = {};
    return chatHistoryCache;
  }
};

const saveChatHistory = (): void => {
  if (!chatHistoryCache) return;
  ensureStorageDir();
  const historyPath = getChatHistoryPath();
  fs.writeFileSync(historyPath, JSON.stringify(chatHistoryCache, null, 2), "utf-8");
};

// --- Operations ---

/**
 * Appends a message with the current timestamp.
 * Prefix agent messages with [agent] to distinguish them.
 */
export const appendMessage = (
  contactName: string,
  message: string,
  isAgent: boolean = false,
): void => {
  const history = loadChatHistory();
  
  if (!history[contactName]) {
    history[contactName] = {};
  }

  const timestamp = new Date().toISOString();
  const formattedMessage = isAgent ? `[agent] ${message}` : message;
  history[contactName][timestamp] = formattedMessage;

  chatHistoryCache = history;
  saveChatHistory();
};

/**
 * Returns the last N messages for a user, formatted as context for the AI agent.
 * Format: "[HH:MM] name: message"
 */
export const getUserHistoryForContext = (
  contactName: string,
  maxMessages: number = 15,
): string[] => {
  const history = loadChatHistory();
  const userHistory = history[contactName];

  if (!userHistory) return [];

  const entries = Object.entries(userHistory);
  const recentEntries = entries.slice(-maxMessages);

  return recentEntries.map(([timestamp, message]) => {
    const date = new Date(timestamp);
    const timeStr = date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });

    if (message.startsWith("[agent] ")) {
      return `[${timeStr}] agent: ${message.replace("[agent] ", "")}`;
    }
    return `[${timeStr}] ${contactName}: ${message}`;
  });
};

/**
 * Returns raw history object for a user.
 */
export const getUserHistory = (contactName: string): UserChatHistory => {
  const history = loadChatHistory();
  return history[contactName] || {};
};

/**
 * Clears all chat history for a user.
 */
export const clearUserHistory = (contactName: string): void => {
  const history = loadChatHistory();
  delete history[contactName];
  chatHistoryCache = history;
  saveChatHistory();
};

/**
 * Clears all chat history.
 */
export const clearAllHistory = (): void => {
  chatHistoryCache = {};
  saveChatHistory();
};
