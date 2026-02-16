const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";

if (!OPENAI_API_KEY) {
  throw new Error(
    "VITE_OPENAI_API_KEY environment variable is not set. Please add it to your .env file or environment.",
  );
}

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export const generateResponse = async (
  messages: Message[],
): Promise<string> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("AVATAR API Error:", errorData);
      throw new Error(
        `AVATAR API Error: ${response.status} - ${errorData.error?.message || "Unknown error"}`,
      );
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling AVATAR API service:", error);
    throw error;
  }
};
