const OPENAI_API_KEY =
  "sk-proj-L1ottyKyUuXoGyXUmYImY_mti-X6wM_rwl5S2gIcTZz6XPNpI6NSr9xwXlKFLr38Oh32-kwiChT3BlbkFJMn0tantLdAD3oZxHTXckRfmVFEvasELaJ4EUvpp3ArVNMC6fnU51RD2W356UuLBPkDS2m7qeqYA";
const API_URL = "https://api.openai.com/v1/chat/completions";

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
