import { z } from 'zod';

export const taskSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
    })
    .min(5, { message: 'Title must be at least 5 characters' }),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .min(10, { message: 'Description must be at least 10 characters' }),
  date: z.string().refine(
    (val) => {
      const inputDate = new Date(val);
      return !isNaN(inputDate.getTime());
    },
    {
      message: 'Date must not be in the future',
    }
  ),
});

export type TaskType = z.infer<typeof taskSchema>;
