import { createEvent, getEvents, updateEventData } from "@/services/event.service";
import type { IEvent, IEventList } from "@/utils/types";
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
interface EventState {
  events: IEventList | null;
  loading: boolean;
  error: string | null;
  editEventModal: boolean;
  editItem: IEvent | null;
  openEventModal: boolean;
}

const initialState: EventState = {
  events: null,
  loading: false,
  editEventModal: false,
  error: null,
  editItem: null,
  openEventModal: false,
};

export const fetchEvents = createAsyncThunk(
  "event/fetchEvents",
  async (qry: string, { rejectWithValue }) => {
    try {
      return await getEvents(qry);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//   export const fetchClientById = createAsyncThunk(
//     "event/fetchEventById",
//     async (id: string, { rejectWithValue }) => {
//       try {
//         return await getClientById(id);
//       } catch (error) {
//         return rejectWithValue(error);
//       }
//     }
//   );

export const addEvent = createAsyncThunk(
  "event/addEvent",
  async (data:IEvent, { rejectWithValue }) => {
    try {
      return await createEvent(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editEvent = createAsyncThunk(
  "event/editEvent",
  async (data:IEvent, { rejectWithValue }) => {
    try {
      return await updateEventData(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeEvent = createAsyncThunk(
  "event/removeEvent",
  async (id: string, { rejectWithValue }) => {
    try {
      return await deleteEvent(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    updateEvent: (state, action) => {
      state.editItem = action.payload;
      state.editEventModal = !state.editEventModal;
    },
    handleEventModal: (state, action) => {
      state.openEventModal = action.payload;
    },
    handleEditEventModal: (state, action) => {
      state.editEventModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEvents.fulfilled,
        (state, action: PayloadAction<IEventList>) => {
          state.loading = false;
          state.events = action.payload;
        }
      )
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        state.editItem = null;
        // state.editClientModal = false;
        state.events.data =
          state.events?.data?.map((event) =>
            event._id === action.payload.event?._id
              ? action.payload.client
              : event
          ) || null;
        toast.success(action.payload.message);
      })
      .addCase(editEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(removeEvent.fulfilled, (state, action) => {
        toast.success(action.payload.message);
      })
      .addCase(removeEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      });
  },
});

export const { updateEvent, handleEventModal, handleEditEventModal } =
  eventSlice.actions;

export default eventSlice.reducer;
