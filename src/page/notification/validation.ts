import { TFunction } from "i18next";
import { z } from "zod";

const formSchema = (t: TFunction) =>
  z.object({
    title: z.string().min(2, {
      message: t("required"),
    }),
    description: z.string().min(2, {
      message: t("required"),
    }),
    stores: z.array(z.string()),
  });

export { formSchema };
