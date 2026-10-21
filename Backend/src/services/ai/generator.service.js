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

Use both the user's form inputs and the structured event planning blueprint to create a detailed, practical, personalized event plan. The user's form inputs are authoritative for event type, budget, guest count, location, date, and requested theme.

Return ONLY valid JSON.

The JSON must contain:
- eventOverview
- visualConcept
- sections
- theme
- decorationIdeas
- foodIdeas
- activities
- vendorRequirements
- detailedTimeline
- checklist
- recommendations

eventOverview must be an object containing title, summary, eventType, location, date, and guestCount, with values tailored to the provided form inputs.

visualConcept must be an object containing a unique title, description, and imagePrompt. imagePrompt must describe a detailed, event-specific image suitable for an image-generation model. Do not return an image URL.

sections must be an array of at least three objects containing:
- title: a specific, event- and theme-related title
- description: a short, useful explanation personalized to the location, date, budget, and guest count
- ideas: an array of practical suggestions

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
    `Create the final detailed event plan using these original user form inputs:

{request}

Use this AI-generated blueprint as additional planning context:

{blueprint}`
  ]
]);

const parser = new JsonOutputParser();

const generatorChain = generatorPrompt
  .pipe(generatorModel)
  .pipe(parser);

export const generateEventPlan = async (blueprint, eventData) => {
  try {
    const finalPlan = await generatorChain.invoke({
      request: JSON.stringify(eventData),
      blueprint: JSON.stringify(blueprint)
    });

    return finalPlan;
  } catch (error) {
    console.error("Mistral Generator Error:", error);
    throw new AIProviderUnavailableError(error);
  }
};