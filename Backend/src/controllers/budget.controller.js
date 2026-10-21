import Budget from "../models/Budget.js";
import Event from "../models/Event.js";

export const createBudget = async (req, res) => {
  try {
    const {
      event,
      totalBudget,
      venue,
      catering,
      photography,
      decoration,
      music,
      other,
      allocations
    } = req.body;

    const existingEvent = await Event.findOne({
      _id: event,
      user: req.user._id
    });

    if (!existingEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    const existingBudget = await Budget.findOne({ event });

    if (existingBudget) {
      return res.status(400).json({
        success: false,
        message: "Budget already exists for this event"
      });
    }

    const budget = await Budget.create({
      event,
      totalBudget,
      venue,
      catering,
      photography,
      decoration,
      music,
      other,
      allocations
    });

    res.status(201).json({
      success: true,
      message: "Budget created successfully",
      budget
    });
  } catch (error) {
    console.error("Create Budget Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create budget"
    });
  }
};

export const getBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      event: req.params.eventId
    }).populate("event");

    if (!budget || budget.event.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Budget not found"
      });
    }

    res.json({
      success: true,
      budget
    });
  } catch (error) {
    console.error("Get Budget Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch budget"
    });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id).populate("event");

    if (!budget || budget.event.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Budget not found"
      });
    }

    Object.assign(budget, req.body);

    await budget.save();

    res.json({
      success: true,
      message: "Budget updated successfully",
      budget
    });
  } catch (error) {
    console.error("Update Budget Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update budget"
    });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id).populate("event");

    if (!budget || budget.event.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Budget not found"
      });
    }

    await budget.deleteOne();

    res.json({
      success: true,
      message: "Budget deleted successfully"
    });
  } catch (error) {
    console.error("Delete Budget Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete budget"
    });
  }
};