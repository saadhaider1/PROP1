"use client";
import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm your Propledger assistant 👋" },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const user = JSON.parse(localStorage.getItem("user"));

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          user: user,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply || "No response" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error getting response." },
      ]);
    }

    setLoading(false);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl flex items-center justify-center text-xl hover:scale-110 transition"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="w-80 h-[460px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border animate-fadeIn">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 flex justify-between items-center">
            <span className="font-semibold">Propledger AI</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`px-3 py-2 rounded-xl text-sm max-w-[75%] ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-white shadow"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Typing Animation */}
            {loading && (
              <div className="bg-white px-3 py-2 rounded-xl shadow w-fit">
                <span className="animate-pulse">Typing...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex border-t bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask about investments..."
              className="flex-1 p-2 px-3 text-sm outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 text-sm hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}