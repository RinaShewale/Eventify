import Vendor from "../models/Vendor.js";
import Event from "../models/Event.js";

export const createVendor = async (req, res) => {
  try {
    const {
      event,
      category,
      name,
      contact,
      quote,
      paymentStatus,
      notes
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

    const vendor = await Vendor.create({
      event,
      category,
      name,
      contact,
      quote,
      paymentStatus,
      notes
    });

    res.status(201).json({
      success: true,
      message: "Vendor created successfully",
      vendor
    });
  } catch (error) {
    console.error("Create Vendor Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create vendor"
    });
  }
};

export const getVendors = async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.eventId,
      user: req.user._id
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    const vendors = await Vendor.find({
      event: req.params.eventId
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: vendors.length,
      vendors
    });
  } catch (error) {
    console.error("Get Vendors Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch vendors"
    });
  }
};

export const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate("event");

    if (!vendor || vendor.event.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found"
      });
    }

    res.json({
      success: true,
      vendor
    });
  } catch (error) {
    console.error("Get Vendor Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch vendor"
    });
  }
};

export const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate("event");

    if (!vendor || vendor.event.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found"
      });
    }

    Object.assign(vendor, req.body);

    await vendor.save();

    res.json({
      success: true,
      message: "Vendor updated successfully",
      vendor
    });
  } catch (error) {
    console.error("Update Vendor Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update vendor"
    });
  }
};

export const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate("event");

    if (!vendor || vendor.event.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found"
      });
    }

    await vendor.deleteOne();

    res.json({
      success: true,
      message: "Vendor deleted successfully"
    });
  } catch (error) {
    console.error("Delete Vendor Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete vendor"
    });
  }
};