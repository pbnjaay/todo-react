import { z } from "zod";
import ApiClient from "./api-client";

export const todoSchema = z.object({
    id: z.number().default(0),
    title: z.string().min(3),
    completed: z.boolean().default(false),
    userid: z.number().default(1),
  });
  
export type Todo = z.infer<typeof todoSchema>;

export default new ApiClient<Todo>("/todos"); 
