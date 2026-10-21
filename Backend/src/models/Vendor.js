import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },

    category: {
      type: String,
      required: true,
      enum: [
        "catering",
        "photography",
        "decoration",
        "music",
        "venue",
        "other"
      ]
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    contact: {
      type: String,
      trim: true,
      default: ""
    },

    quote: {
      type: Number,
      default: 0,
      min: 0
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "partial", "paid"],
      default: "pending"
    },

    notes: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;