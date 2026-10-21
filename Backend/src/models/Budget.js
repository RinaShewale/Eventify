import mongoose from "mongoose";

const allocationSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true
    },
    allocated: {
      type: Number,
      default: 0,
      min: 0
    },
    spent: {
      type: Number,
      default: 0,
      min: 0
    },
    notes: {
      type: String,
      trim: true,
      default: ""
    }
  },
  { _id: true }
);

const budgetSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      unique: true
    },
    totalBudget: {
      type: Number,
      required: true,
      min: 0
    },
    venue: { type: Number, default: 0, min: 0 },
    catering: { type: Number, default: 0, min: 0 },
    photography: { type: Number, default: 0, min: 0 },
    decoration: { type: Number, default: 0, min: 0 },
    music: { type: Number, default: 0, min: 0 },
    other: { type: Number, default: 0, min: 0 },
    allocations: {
      type: [allocationSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;
