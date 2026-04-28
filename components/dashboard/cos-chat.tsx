"use client";

import { FormEvent, useState } from "react";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Message = {
  role: "cos" | "you";
  content: string;
};

const starterMessages: Message[] = [
  {
    role: "cos",
    content:
      "Good evening, Traci. I can answer questions across revenue, attribution, ads, content, SEO, PR, approvals, blockers, and deploy status. What do you want to inspect first?"
  },
  {
    role: "you",
    content: "What is blocking live growth reporting?"
  },
  {
    role: "cos",
    content:
      "The highest-leverage blockers are Stripe reconciliation, Meta and Google Ads access, GA4/GSC access, ESP selection, and an admin auth decision for private areas."
  }
];

export function CosChat() {
  const [messages, setMessages] = useState<Message[]>(starterMessages);
  const [input, setInput] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt || isPending) return;

    setInput("");
    setIsPending(true);
    setMessages((current) => [...current, { role: "you", content: prompt }]);

    try {
      const response = await fetch("/api/cos-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = (await response.json()) as { answer?: string };
      setMessages((current) => [
        ...current,
        {
          role: "cos",
          content:
            data.answer ||
            "I checked the current dashboard context. The next move is to clear access blockers, keep compliance tight, and prioritize channels that can prove the 5x ROAS floor."
        }
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "cos",
          content:
            "I could not reach the chat route yet. The dashboard shell is ready; the production AI connection should be wired once the API key and auth model are approved."
        }
      ]);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex min-h-[520px] flex-col">
      <div className="flex items-center justify-between gap-3 border-b px-5 py-4">
        <div>
          <p className="text-sm font-bold text-foreground">COS-IG Chat</p>
          <p className="text-xs text-muted-foreground">Connected to dashboard context</p>
        </div>
        <Badge variant="muted">Read + recommend</Badge>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={
              message.role === "you"
                ? "ml-auto max-w-[82%] rounded-2xl bg-primary px-4 py-3 text-sm leading-6 text-primary-foreground shadow-card"
                : "max-w-[86%] rounded-2xl border bg-card/80 px-4 py-3 text-sm leading-6 text-card-foreground shadow-card"
            }
          >
            <div className="mb-1 text-[10px] font-black uppercase text-muted-foreground">
              {message.role === "you" ? "You" : "COS-IG"}
            </div>
            {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t bg-card/35 p-4">
        <label className="sr-only" htmlFor="cos-chat-input">
          Ask the AI Chief of Staff
        </label>
        <textarea
          id="cos-chat-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about ROAS, blockers, approvals, content, SEO, or deploy status..."
          className="min-h-12 flex-1 resize-none rounded-2xl border bg-background/80 px-4 py-3 text-sm outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
        <Button type="submit" disabled={isPending} className="h-auto rounded-2xl">
          <SendHorizonal data-icon="inline-start" />
          {isPending ? "Checking" : "Send"}
        </Button>
      </form>
    </div>
  );
}
