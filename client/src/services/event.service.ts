import API from "@/configs/API";
import type { IAddEvent } from "@/utils/types";

export const getEvents = async (query: string) => {
  try {
    const response = await API.get(`event/?${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
export const createEvent = async (eventData:IAddEvent) => {
  try {
    const response = await API.post("event", eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const updateEventData = async (eventData: IAddEvent) => {
  try {
    const response = await API.put(`event/${eventData?._id}/`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const response = await API.delete(`event/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};
