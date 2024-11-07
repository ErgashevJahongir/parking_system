import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PageLayout from "@/components/page-layout";
import ShopForm from "./form";
import { Form } from "@/components/ui/form";
import { useDetails } from "./services";
import { useParams } from "react-router-dom";
import PageLoading from "@/components/pageLoading";
import { formSchema } from "./validation";
import { useTranslation } from "react-i18next";

const ShopUpdate = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const formSchemaShop = formSchema(t);
  const { 
    // data, 
    isLoading } = useDetails(Number(id) as number, !!id);
  const form = useForm<z.infer<typeof formSchemaShop>>({
    resolver: zodResolver(formSchemaShop),
  });

  const handleSubmit = (values: z.infer<typeof formSchemaShop>) => {
    console.log({ values });
  };

  return (
    <div className="pageSreenHeight">
      {isLoading ? (
        <PageLoading />
      ) : (
        <Form {...form}>
          <ShopForm form={form} handleSubmit={handleSubmit}>
            <PageLayout title={`Adminni taxrirlash #${id}`} buttonText="Saqlash" />
          </ShopForm>
        </Form>
      )}
    </div>
  );
};

export default ShopUpdate;
