import {
  AIProviderUnavailableError,
  generateEventBlueprint
} from "../services/ai/planner.service.js";
import { generateEventPlan } from "../services/ai/generator.service.js";

export const generateAIEventPlan = async (req, res) => {
  try {
    const {
      eventType,
      budget,
      guestCount,
      location,
      date,
      description
    } = req.body;

    if (!eventType || !budget || !guestCount) {
      return res.status(400).json({
        success: false,
        message: "Event type, budget and guest count are required"
      });
    }

    // Step 1: Mistral creates the structured blueprint
    const blueprint = await generateEventBlueprint({
      eventType,
      budget,
      guestCount,
      location,
      date,
      description
    });

    // Step 2: Mistral creates the detailed final plan
    const finalPlan = await generateEventPlan(blueprint, {
      eventType,
      budget,
      guestCount,
      location,
      date,
      description
    });

    res.status(200).json({
      success: true,
      message: "AI event plan generated successfully",
      blueprint,
      plan: finalPlan
    });
  } catch (error) {
    console.error("AI Event Plan Error:", error);

    const statusCode = error instanceof AIProviderUnavailableError
      ? error.statusCode
      : 500;

    res.status(statusCode).json({
      success: false,
      message: error instanceof AIProviderUnavailableError
        ? error.message
        : "Failed to generate AI event plan"
    });
  }
};