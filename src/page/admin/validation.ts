import { TFunction } from "i18next";
import * as z from "zod";

const formSchema = (t: TFunction) =>
  z.object({
    first_name: z.string().min(1, t("required")),
    last_name: z.string().min(1, t("required")),
    admin_type: z.string().min(1, t("required")),
    password: z.string().min(1, t("required")),
    username: z.string().min(1, t("required")),
    phone_number: z.string().min(1, t("required")),
  });

export { formSchema };
