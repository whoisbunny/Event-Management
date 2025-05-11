import API from "@/configs/API";
import type { IEvent } from "@/utils/types";

export const getEvents = async (query: string) => {
  try {
    const response = await API.get(`events/?${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
export const createEvent = async (eventData: object) => {
  try {
    const response = await API.post("events/", eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const updateEventData = async (eventData: IEvent) => {
  try {
    const response = await API.put(`events/${eventData?._id}/`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const response = await API.delete(`events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};
