import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    eventType: {
      type: String,
      required: true,
      trim: true
    },

    date: {
      type: Date,
      required: true
    },

    location: {
      type: String,
      trim: true,
      default: ""
    },

    guestCount: {
      type: Number,
      required: true,
      min: 1
    },

    description: {
      type: String,
      trim: true,
      default: ""
    },

    cover: {
      type: String,
      trim: true,
      default: ""
    },

    aiPlan: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },

    checklist: {
      type: [{
        title: { type: String, required: true, trim: true },
        category: { type: String, default: "General", trim: true },
        priority: { type: String, default: "Medium", trim: true },
        timing: { type: String, default: "As scheduled", trim: true },
        completed: { type: Boolean, default: false }
      }],
      default: []
    },

    status: {
      type: String,
      enum: ["planning", "completed", "cancelled"],
      default: "planning"
    }
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;