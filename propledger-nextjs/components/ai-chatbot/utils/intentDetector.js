export function detectIntent(message) {
  const msg = message.toLowerCase();

  if (msg.includes("login") || msg.includes("password")) {
    return "LOGIN_HELP";
  }

  if (msg.includes("buy token") || msg.includes("invest")) {
    return "INVESTMENT_HELP";
  }

  if (msg.includes("property")) {
    return "PROPERTY_INFO";
  }

  return "GENERAL";
}