import { z } from "zod";

const formSchema = () =>
  z.object({
    car_number: z.string().min(2, {
      message: "Bu maydonni to'ldirish majburiy...",
    }),
    parking_rate_id: z.string().min(2, {
      message: "Bu maydonni to'ldirish majburiy...",
    }),
    user_id: z.string().nullable().optional(),
  });

export { formSchema };
