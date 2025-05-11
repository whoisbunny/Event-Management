import express from 'express';
const router = express.Router();
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controllers/event.controller.js';
import { authMiddleware } from '../middleware/authMiddleWare.js';


// Create a new event
router.post('/',authMiddleware, createEvent);
// Get all events with pagination
router.get('/',authMiddleware, getAllEvents);
// Get a single event by ID
router.get('/:id',authMiddleware, getEventById);   
// Update an event by ID
router.put('/:id',authMiddleware, updateEvent);
// Delete an event by ID
router.delete('/:id',authMiddleware, deleteEvent);
export default router;