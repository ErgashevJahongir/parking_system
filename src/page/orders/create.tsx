import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PageLayout from "@/components/page-layout";
import ShopForm from "./form";
import { Form } from "@/components/ui/form";
import { useTranslation } from "react-i18next";
import { formSchema } from "./validation";

const ShopCreate = () => {
  const { t } = useTranslation();

  const formSchemaShop = formSchema(t);
  const form = useForm<z.infer<typeof formSchemaShop>>({
    resolver: zodResolver(formSchemaShop),
    defaultValues: {
      password: "",
      title: "",
      boss: "",
      manager: "",
      responsible_person: "",
      username: "",
      additional_phone_number: "",
      phone_number: "",
      location: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchemaShop>) => {
    console.log({ values });
  };

  return (
    <div className="pageSreenHeight">
      <Form {...form}>
        <ShopForm form={form} handleSubmit={handleSubmit}>
          <PageLayout title="Admin qo'shish" buttonText="Qo'shish" />
        </ShopForm>
      </Form>
    </div>
  );
};

export default ShopCreate;
