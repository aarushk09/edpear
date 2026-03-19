export const OPENROUTER_BASE = "https://openrouter.ai/api/v1";

export interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OpenRouterChatOptions {
  messages: OpenRouterMessage[];
  model?: string;
  apiKey: string;
  responseFormat?: { type: "json_object" };
}

export interface OpenRouterChatChoice {
  message: OpenRouterMessage;
}

export interface OpenRouterChatResponse {
  id: string;
  model: string;
  choices: OpenRouterChatChoice[];
}

/**
 * Executes a chat completion against OpenRouter.
 */
export async function openRouterChat({
  messages,
  model = "openai/gpt-4o",
  apiKey,
  responseFormat,
}: OpenRouterChatOptions): Promise<OpenRouterChatResponse> {
  if (!apiKey.trim()) {
    throw new Error("An OpenRouter API key is required.");
  }

  const response = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://edpear.com",
      "X-Title": "EdPear",
    },
    body: JSON.stringify({
      model,
      messages,
      ...(responseFormat ? { response_format: responseFormat } : {}),
    }),
  });

  if (!response.ok) {
    const errorBody = (await response.text()) || response.statusText;
    throw new Error(`OpenRouter request failed: ${errorBody}`);
  }

  return (await response.json()) as OpenRouterChatResponse;
}

/**
 * Convenience helper for extracting the first response message.
 */
export async function openRouterText(
  options: OpenRouterChatOptions,
): Promise<{ model: string; content: string }> {
  const response = await openRouterChat(options);
  const content = response.choices[0]?.message.content?.trim();

  if (!content) {
    throw new Error("OpenRouter returned an empty response.");
  }

  return {
    model: response.model,
    content,
  };
}
