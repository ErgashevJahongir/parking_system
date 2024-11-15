import { z } from "zod";

const formSchema = () =>
  z.object({
    name: z.string().min(2, {
      message: "Bu maydonni to'ldirish majburiy...",
    }),
    phone_number: z.string().min(2, {
      message: "Bu maydonni to'ldirish majburiy...",
    }),
  });

export { formSchema };
