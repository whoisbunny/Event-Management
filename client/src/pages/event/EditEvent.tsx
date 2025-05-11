import Modal from "@/components/Modal"; // Update the path to the correct location of the Modal component
import { useAppDispatch, useAppSelector } from "@/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { editEvent, handleEditEventModal } from "@/store/eventReducer";
import { EventSchema } from "@/utils/schema";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import type { IAddEvent } from "@/utils/types";
import dayjs from "dayjs";

const EditEvent = () => {
  const { editEventModal, editItem } = useAppSelector((state) => state.event);

  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(EventSchema),
  });

  useEffect(() => {
    if (editItem) {
      form.reset({
        name: editItem.name || "",
        description: editItem.description || "",
        date: dayjs(editItem.date).format("YYYY-MM-DD") || "",
      });
    }
  }, [editItem, form]);
  const onSubmit = (data: IAddEvent) => {
    const finalData = {
      ...data,
      _id :editItem?._id
    }
    dispatch(editEvent(finalData)).then((action) => {
      if (editEvent.fulfilled.match(action)) {
        handleClose();
      }
    });
  };

  const handleClose = () => {
    dispatch(handleEditEventModal(false));
    form.reset();
  };

  return (
    <>
      <div>
        <Modal
          open={editEventModal}
          setOpen={handleClose}
          title="Edit Event"
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

export default EditEvent;
