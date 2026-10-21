import { ChatMistralAI } from "@langchain/mistralai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { AIProviderUnavailableError } from "./planner.service.js";

const generatorModel = new ChatMistralAI({
  model: "codestral-latest",
  temperature: 0.4,
  apiKey: process.env.MISTRAL_API_KEY
});

const generatorPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are an expert event planning assistant.

You will receive a structured event planning blueprint created by another AI planner.

Using that blueprint, create a detailed, practical and personalized event plan.

Return ONLY valid JSON.

The JSON must contain:
- eventOverview
- theme
- decorationIdeas
- foodIdeas
- activities
- vendorRequirements
- detailedTimeline
- checklist
- recommendations

decorationIdeas must be an array of strings.

foodIdeas must be an array of strings.

activities must be an array of strings.

vendorRequirements must be an array of objects containing:
- category
- requirement
- priority

detailedTimeline must be an array of objects containing:
- task
- timing
- priority

checklist must be an array of objects containing:
- task
- category
- completed

recommendations must be an array of strings.

Do not add markdown.
Do not add explanations.`
  ],
  [
    "human",
    `Create the final detailed event plan from this AI-generated blueprint:

{blueprint}`
  ]
]);

const parser = new JsonOutputParser();

const generatorChain = generatorPrompt
  .pipe(generatorModel)
  .pipe(parser);

export const generateEventPlan = async (blueprint) => {
  try {
    const finalPlan = await generatorChain.invoke({
      blueprint: JSON.stringify(blueprint)
    });

    return finalPlan;
  } catch (error) {
    console.error("Mistral Generator Error:", error);
    throw new AIProviderUnavailableError(error);
  }
};