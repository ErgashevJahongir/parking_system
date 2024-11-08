import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import NotificationForm from "./form";
import { Form } from "@/components/ui/form";
import { useCreate } from "./services";
import { ICreateSheetForm } from "./index.type";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { formSchema } from "./validation";
import dayjs from "dayjs";

const ParkingCreate: React.FC<ICreateSheetForm> = ({ sheetOpen, setSheetOpen, refetch }) => {
  const { t } = useTranslation();
  const formSchemaNotification = formSchema();
  const [errors, setErrors] = useState<Error>();
  const form = useForm<z.infer<typeof formSchemaNotification>>({
    resolver: zodResolver(formSchemaNotification),
  });
  const { mutate: mutateCreate, isPending } = useCreate();

  const handleSubmit = (values: z.infer<typeof formSchemaNotification>) => {
    mutateCreate({
      ...values,
      start_time: dayjs().format("YYYY-MM-DD HH:mm:ss")
    }, {
      onSuccess: () => {
        toast(t("Muvaffaqiyatli qo'shildi!"));
        form.reset();
        setSheetOpen(false);
        refetch();
      },
      onError: (err) => {
        setErrors(err);
      },
    });
  };

  return (
    <Sheet
      open={sheetOpen}
      onOpenChange={(open) => {
        setSheetOpen(open);
        !open && form.reset();
      }}
    >
      <SheetContent
        className="md:max-w-[500px] lg:max-w-[700px]"
        side="right"
      >
        <SheetDescription className="hidden">hide</SheetDescription>
        <SheetHeader>
          <SheetTitle className="text-left">Parkovka ma'lumotlari</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <NotificationForm
            isLoading={isPending}
            errors={errors}
            form={form}
            handleSubmit={handleSubmit}
            buttonText="Qo'shish"
          />
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default ParkingCreate;
