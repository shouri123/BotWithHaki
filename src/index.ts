// Library exports — for programmatic usage
export { WhatsAppBot } from "./bot.js";
export { loadConfig, saveConfig, type BotConfig } from "./storage/configStore.js";
export { appendMessage, getUserHistoryForContext, clearUserHistory } from "./storage/chatHistoryStore.js";