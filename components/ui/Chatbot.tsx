"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "bot";
  text: string;
};

const WEBHOOK_URL =
  "https://n8n.softxlogic.com/webhook/9d5fe05a-52f5-4484-9267-95a7f88b6d67";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    console.log("User message:", text);
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      console.log("Webhook response status:", res.status);

      const data = await res.json();
      console.log("Webhook response data:", data);

      let reply = "";

      const item = Array.isArray(data) ? data[0] : data;

      if (item?.output) {
        reply = item.output;
      } else if (item?.response) {
        reply = item.response;
      } else if (item?.message) {
        reply = item.message;
      } else if (item?.reply) {
        reply = item.reply;
      } else if (item?.text) {
        reply = item.text;
      } else if (item?.result) {
        reply = item.result;
      } else if (typeof data === "string") {
        reply = data;
      }

      if (!reply) {
        reply = "Thanks for your message. We'll get back to you soon.";
      }

      console.log("Bot reply:", reply);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (error) {
      console.error("Webhook error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* Chat window */}
      {open && (
        <div className="mb-3 w-[calc(100vw-2rem)] max-w-[340px] border-2 border-black bg-white flex flex-col shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-black bg-black px-4 py-3">
            <span className="text-xs font-black uppercase tracking-widest text-white">
              Chat with Maryam &amp; Ali
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white text-lg leading-none"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-3 overflow-y-auto p-4 h-64 sm:h-72">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 text-sm leading-relaxed border border-black break-words overflow-wrap-anywhere ${
                    msg.role === "user"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="border border-black px-3 py-2 text-sm text-black/40">
                  Typing...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t-2 border-black flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 min-w-0 px-4 py-3 text-sm outline-none placeholder:text-black/30 bg-white"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="shrink-0 border-l-2 border-black px-4 py-3 text-sm font-black uppercase tracking-wide bg-black text-white hover:bg-white hover:text-black transition-colors duration-150 disabled:opacity-40"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 border-2 border-black bg-black text-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:bg-white hover:text-black transition-colors duration-150"
        aria-label="Toggle chat"
      >
        {open ? (
          <span className="text-lg leading-none">✕</span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
