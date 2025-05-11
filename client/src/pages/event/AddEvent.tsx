import Modal from "@/components/Modal"; // Update the path to the correct location of the Modal component

import { useAppDispatch, useAppSelector } from "@/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { addEvent, handleEventModal } from "@/store/eventReducer";
import { EventSchema } from "@/utils/schema";
import { Textarea } from "@/components/ui/textarea";
import type { IAddEvent } from "@/utils/types";

const AddEvent = () => {
  const { openEventModal } = useAppSelector((state) => state.event);

  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      name: "",
      description: "",
      date: "",
    },
  });

  const onSubmit = (data: IAddEvent) => {
    dispatch(addEvent(data)).then((action) => {
      if (addEvent.fulfilled.match(action)) {
        handleClose();
      }
    });
    form.reset();
  };

  const handleClose = () => {
    dispatch(handleEventModal(false));
    form.reset();
  };
  return (
    <>
      <div>
        <Modal
          open={openEventModal}
          setOpen={handleClose}
          title="Add Event"
          className=""
          footer={<></>}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 flex flex-col"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter event description ..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Date</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="Enter date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-full flex justify-end">
                <Button type="submit" className="">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default AddEvent;
