import Modal from "@/components/Modal"; // Update the path to the correct location of the Modal component

import { useAppDispatch, useAppSelector } from "@/store";
import { useSelector } from "react-redux";
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

const AddEvent = () => {
  const { openEventModal } = useAppSelector((state) => state.event);

  const dispatch = useAppDispatch();

  const form = useForm({
    resolver: zodResolver(addClientSchema),
    defaultValues: {
      name: "",
     
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    // dispatch(addClient(data));
    // dispatch(handleClientModal(false));
    form.reset();
  };

  return (
    <>
      <div>
        <Modal
          open={openEventModal}
          setOpen={(open) => dispatch(handleClientModal(open))}
          title="Add Event"
          className="lg:max-w-7xl md:max-w-5xl overflow-y-auto max-h-screen"
          footer={<></>}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("clientName")}</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
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
