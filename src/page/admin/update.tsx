import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import NotificationForm from "./form";
import { Form } from "@/components/ui/form";
import { useDetails, useUpdate } from "./services";
import { IEditSheetForm } from "./index.type";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import LoadingComp from "@/components/loadingComp";
import { toast } from "sonner";
import { formSchema } from "./validation";

const AdminUpdate: React.FC<IEditSheetForm> = ({
  sheetOpen,
  setSheetOpen,
  refetch,
  id,
  setEditId,
}) => {
  const { t } = useTranslation();
  const formSchemaNotification = formSchema();
  const [errors, setErrors] = useState<Error>();
  const { data, isLoading: singleLoading } = useDetails(Number(id) as number, !!id);
  const form = useForm<z.infer<typeof formSchemaNotification>>({
    resolver: zodResolver(formSchemaNotification),
  });
  const { mutate: mutateUpdate, isPending } = useUpdate(id as number);

  useEffect(() => {
    // if (data) {
    //   form.reset({
    //     ...data.results,
    //     stores: data.results.stores.map((item) => String(item.id)),
    //   });
    // }
  }, [data, form]);

  const handleSubmit = (values: z.infer<typeof formSchemaNotification>) => {
    mutateUpdate(values, {
      onSuccess: () => {
        toast(t("Muvaffaqiyatli o'zgartirildi!"));
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
        !open && setEditId(null);
      }}
    >
      <SheetContent
        className="md:max-w-[700px] lg:max-w-[900px]"
        side="right"
      >
        <SheetDescription className="hidden">hide</SheetDescription>
        <SheetHeader>
          <SheetTitle className="text-left">Mijoz ma'lumotlari</SheetTitle>
        </SheetHeader>
        {singleLoading ? (
          <div className="h-[200px]">
            <LoadingComp />
          </div>
        ) : (
          <Form {...form}>
            <NotificationForm
              isLoading={isPending}
              errors={errors}
              form={form}
              handleSubmit={handleSubmit}
              isUpdate
              buttonText="Saqlash"
            />
          </Form>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AdminUpdate;
