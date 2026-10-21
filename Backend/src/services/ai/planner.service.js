import { ChatMistralAI } from "@langchain/mistralai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";

const plannerModel = new ChatMistralAI({
  model: "codestral-latest",
  temperature: 0.2,
  apiKey: process.env.MISTRAL_API_KEY
});

const plannerPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are an expert event planning assistant.

Your job is to analyze the user's event requirements and create a structured event planning blueprint.

Return ONLY valid JSON.

The JSON must contain:
- eventSummary
- budgetAllocation
- timeline
- tasks
- requirements

budgetAllocation must contain:
- venue
- catering
- photography
- decoration
- music
- other

timeline must be an array of objects with:
- task
- daysBeforeEvent
- priority

tasks must be an array of objects with:
- title
- category
- priority

requirements must be an array of strings.

Do not add markdown.
Do not add explanations.`
  ],
  [
    "human",
    `Create an event planning blueprint using these details:

Event Type: {eventType}
Budget: {budget}
Guest Count: {guestCount}
Location: {location}
Event Date: {date}
Additional Details: {description}`
  ]
]);

const parser = new JsonOutputParser();

const plannerChain = plannerPrompt
  .pipe(plannerModel)
  .pipe(parser);

export class AIProviderUnavailableError extends Error {
  constructor(cause) {
    const isRateLimited = cause?.statusCode === 429;
    const message = isRateLimited
      ? "Mistral API rate limit reached. Check your Mistral plan and usage limits, then try again."
      : "Mistral AI is temporarily unavailable. Check your MISTRAL_API_KEY and try again.";
    super(message, { cause });
    this.name = "AIProviderUnavailableError";
    this.statusCode = isRateLimited ? 429 : 503;
  }
}

export const generateEventBlueprint = async (eventData) => {
  const plannerInput = {
    eventType: eventData.eventType,
    budget: eventData.budget,
    guestCount: eventData.guestCount,
    location: eventData.location || "Not specified",
    date: eventData.date || "Not specified",
    description: eventData.description || "No additional details"
  };

  try {
    return await plannerChain.invoke(plannerInput);
  } catch (error) {
    console.error("Mistral Planner Error:", error);
    throw new AIProviderUnavailableError(error);
  }
};