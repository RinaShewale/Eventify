import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      eventType,
      date,
      location,
      guestCount,
      description
    } = req.body;

    if (!title || !eventType || !date || !guestCount) {
      return res.status(400).json({
        success: false,
        message: "Title, event type, date and guest count are required"
      });
    }

    const event = await Event.create({
      user: req.user._id,
      title,
      eventType,
      date,
      location,
      guestCount,
      description
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event
    });
  } catch (error) {
    console.error("Create Event Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create event"
    });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    console.error("Get Events Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch events"
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.json({
      success: true,
      event
    });
  } catch (error) {
    console.error("Get Event Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch event"
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.json({
      success: true,
      message: "Event updated successfully",
      event
    });
  } catch (error) {
    console.error("Update Event Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update event"
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.json({
      success: true,
      message: "Event deleted successfully"
    });
  } catch (error) {
    console.error("Delete Event Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete event"
    });
  }
};