import { NextResponse } from "next/server";
import { buildCosIgInstructions } from "@/lib/cos-ig-context";
import { getSessionAccount } from "@/lib/ig-auth";

type IncomingRole = "assistant" | "cos" | "user" | "you";

type IncomingMessage = {
  role?: IncomingRole;
  content?: string;
};

type NormalizedMessage = {
  role: "assistant" | "user";
  content: string;
};

type ChatRequest = {
  prompt?: string;
  messages?: IncomingMessage[];
};

const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.4-mini";
const MAX_MESSAGES = 14;
const MAX_MESSAGE_CHARS = 2400;

function normalizeMessage(message: IncomingMessage): NormalizedMessage | null {
  const content = String(message.content || "").trim().slice(0, MAX_MESSAGE_CHARS);
  if (!content) return null;

  return {
    role: message.role === "assistant" || message.role === "cos" ? "assistant" : "user",
    content
  };
}

function buildConversation(body: ChatRequest) {
  const history = Array.isArray(body.messages)
    ? body.messages.map(normalizeMessage).filter((message): message is NormalizedMessage => Boolean(message))
    : [];
  const prompt = String(body.prompt || "").trim();

  if (prompt) {
    history.push({ role: "user", content: prompt.slice(0, MAX_MESSAGE_CHARS) });
  }

  return history.slice(-MAX_MESSAGES).map((message) => ({
    role: message.role,
    content: message.content
  }));
}

function transcriptFromMessages(messages: ReturnType<typeof buildConversation>) {
  return messages
    .map((message) => `${message.role === "assistant" ? "COS-IG" : "Client"}: ${message.content}`)
    .join("\n\n");
}

function extractOutputText(responseBody: unknown) {
  if (!responseBody || typeof responseBody !== "object") return "";

  const body = responseBody as {
    output_text?: unknown;
    output?: Array<{ content?: Array<{ text?: unknown }> }>;
  };

  if (typeof body.output_text === "string") {
    return body.output_text.trim();
  }

  return (
    body.output
      ?.flatMap((item) => item.content || [])
      .map((content) => (typeof content.text === "string" ? content.text : ""))
      .join("\n")
      .trim() || ""
  );
}

function fallbackAnswer() {
  return "I can see the Injectors Guide business context, but production AI is not configured yet. Add OPENAI_API_KEY in the deployment environment so this chat can respond with the live COS-IG model.";
}

export async function POST(request: Request) {
  const account = await getSessionAccount();

  if (!account) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as ChatRequest;
  const messages = buildConversation(body);

  if (messages.length === 0) {
    return NextResponse.json({ error: "Message required." }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        answer: fallbackAnswer(),
        source: "cos-ig-business-context",
        productionAiConnected: false
      },
      { status: 503 }
    );
  }

  const instructions = await buildCosIgInstructions(account);
  const transcript = transcriptFromMessages(messages);

  try {
    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        instructions,
        input: transcript,
        max_output_tokens: 900
      })
    });

    const responseBody = await openaiResponse.json().catch(() => ({}));

    if (!openaiResponse.ok) {
      const message =
        typeof responseBody === "object" &&
        responseBody &&
        "error" in responseBody &&
        typeof responseBody.error === "object" &&
        responseBody.error &&
        "message" in responseBody.error
          ? String(responseBody.error.message)
          : "OpenAI request failed.";

      return NextResponse.json(
        {
          error: message,
          answer:
            "I reached the dashboard context, but the AI model call failed. Check the OpenAI key, model name, and deployment logs.",
          source: "cos-ig-business-context",
          productionAiConnected: false
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      answer:
        extractOutputText(responseBody) ||
        "I checked the Injectors Guide context, but the model returned an empty response. Try rephrasing the question.",
      model: OPENAI_MODEL,
      source: "cos-ig-business-context",
      productionAiConnected: true
    });
  } catch {
    return NextResponse.json(
      {
        answer:
          "I could not reach OpenAI from this deployment. The dashboard route is wired; check network access and the OPENAI_API_KEY environment variable.",
        source: "cos-ig-business-context",
        productionAiConnected: false
      },
      { status: 502 }
    );
  }
}
