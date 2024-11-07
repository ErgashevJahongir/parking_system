import { z } from "zod";

const formSchema = () =>
  z.object({
    type: z.string().min(2, {
      message: "Bu maydonni to'ldirish majburiy...",
    }),
    last_one_hour: z.number().min(2, {
      message: "Bu maydonni to'ldirish majburiy...",
    }),
    last_six_hour: z.number().min(2, {
      message: "Bu maydonni to'ldirish majburiy...",
    }),
    over_six_hour: z.number().min(2, {
      message: "Bu maydonni to'ldirish majburiy...",
    }),
  });

export { formSchema };
