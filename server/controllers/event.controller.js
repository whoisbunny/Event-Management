import { populate } from "dotenv";
import Event from "../models/event.model.js";
import mongoose from "mongoose";

// Create a new event
export const createEvent = async (req, res) => {
  const { name, description, date } = req.body;

  try {
    const createdBy = req.user._id; //  user ID JWT token mathi aavse
    const event = await Event.create({ name, description, date, createdBy });
    res.status(201).json({ event, message: "Event created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating event", error: error.message });
  }
};

// Get all events with pagination
export const getAllEvents = async (req, res) => {
  try {
    const createdBy = req.user._id; //  user ID JWT token mathi aavse

    const {
      page = 1,
      limit = 10,
      sortField = "date",
      sortOrder = "desc",
      globalFilter = "",
    } = req.query;

    const query = { createdBy };

    if (globalFilter) {
      const regex = new RegExp(globalFilter, "i");
      query.$or = [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
      ];
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { [sortField]: sortOrder === "desc" ? -1 : 1 },
      select: "-createdAt -updatedAt -__v",
      populate: { path: "createdBy", select: "name" },
    };

    const result = await Event.paginate(query, options);

    res.json({
      data: result.docs,
      totalData: result.totalDocs,
      totalPages: result.totalPages,
      page: result.page,
      limit: result.limit,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching events", error: error.message });
  }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching event", error: error.message });
  }
};

// Update an event by ID

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const createdBy = req.user._id;

  const { name, description, date } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const event = await Event.findByIdAndUpdate(
      id,
      { name, description, date, createdBy },
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ event, message: "Event updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating event", error: error.message });
  }
};

// Delete an event by ID
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting event", error: error.message });
  }
};
