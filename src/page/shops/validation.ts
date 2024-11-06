import { TFunction } from "i18next";
import * as z from "zod";

const formSchema = (t: TFunction) =>
  z.object({
    title: z.string().min(1, t("required")),
    boss: z.string().min(1, t("required")),
    manager: z.string().min(1, t("required")),
    responsible_person: z.string().min(1, t("required")),
    password: z.string().min(1, t("required")),
    username: z.string().min(1, t("required")),
    additional_phone_number: z.string().min(1, t("required")),
    phone_number: z.string().min(1, t("required")),
    location: z.string().min(1, t("required")),
    amount: z.number({ required_error: t("required") }).min(0, t("required")),
    payed_date: z.date({
      required_error: t("required"),
    }),
  });

export { formSchema };
