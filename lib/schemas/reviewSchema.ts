import { z } from "zod";

export const reviewSchema = z.object({
  userDisplayName: z
    .string()
    .min(3, {
      message: "review must be at least 3 characters.",
    })
    .max(50, {
      message: "review must not be longer than 50 characters.",
    }),

  body: z
    .string()
    .min(3, {
      message: "review must be at least 3 characters.",
    })
    .max(500, {
      message: "review must not be longer than 500 characters.",
    }),
  
});
