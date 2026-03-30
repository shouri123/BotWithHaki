import readline from "readline";
import resetAuth from "../utils/reset.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "⚠️ Do you really want to reset WhatsApp session? (y/n): ",
  (answer) => {
    const input = answer.trim().toLowerCase();

    if (input === "y" || input === "yes") {
      console.log("♻️ Resetting WhatsApp session...");

      resetAuth();

      console.log("✅ Reset complete");
      process.exit(0);
    } else {
      console.log("❌ Reset cancelled");
      process.exit(0);
    }
  },
);
