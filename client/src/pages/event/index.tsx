import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store";
import AddEvent from "./AddEvent";
import EditEvent from "./EditEvent";
import EventList from "./EventList";
import { handleEventModal } from "@/store/eventReducer";

const EventPostPage: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-4 px-8 py-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-500 inline-block ">
          events
        </h4>
        <div className={` md:flex md:space-x-4 md:justify-end items-center `}>
          <Button
            variant={"ghost"}
            className="btn-dark dark:bg-slate-800 bg-slate-600 text-white font-semibold h-min text-sm "
            onClick={() => dispatch(handleEventModal(true))}
          >
            Add Event
          </Button>
        </div>
      </div>

      <div>

<EventList  />

      </div>
      <AddEvent />
      <EditEvent />
    </div>
  );
};

export default EventPostPage;
