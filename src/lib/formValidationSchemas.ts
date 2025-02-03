import { z } from "zod";

export const reportSchema = z.object({
    id: z.coerce.number().optional(), 
    title: z.string().min(3, { message: "Report Title is required!" }),
    description:z.string().min(10,{message: "Description is required!"}), //psychologist ids 
    psychologistId:z.coerce.string().min(1, {message: "Psychologist is required!"}), 
    studentId: z.coerce.string().min(1, {message: "Student name is required!"}), 
    disorderId:z.coerce.number().min(1, {message: "Disorder name is required!"})
  });

  export type ReportSchema = z.infer<typeof reportSchema>;

  export const psychologistSchema = z.object({
    id:z.string().optional(),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long!" })
      .max(20, { message: "Username must be at most 20 characters long!" }),
      password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long!" }).optional().or(z.literal("")),
      name: z.string().min(1, { message: "First name is required!" }),
      surname: z.string().min(1, { message: "Last name is required!" }),
      email: z.string().email({ message: "Invalid email address!" }).optional().or(z.literal("")),
    phone: z.string().optional(),
    address: z.string(),
    img: z.string().optional(),
    bloodType: z.string().min(1, { message: "Blood Type is required!" }),
    birthday: z.coerce.date({ message: "Birthday is required!" }),
    sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  });

   
  export type PsychologistSchema = z.infer<typeof psychologistSchema>;

  export const teacherSchema = z.object({
    id:z.string().optional(),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long!" })
      .max(20, { message: "Username must be at most 20 characters long!" }),
      password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long!" }).optional().or(z.literal("")),
      name: z.string().min(1, { message: "First name is required!" }),
      surname: z.string().min(1, { message: "Last name is required!" }),
      email: z.string().email({ message: "Invalid email address!" }).optional().or(z.literal("")),
    phone: z.string().optional(),
    address: z.string(),
    img: z.string().optional(),
    bloodType: z.string().min(1, { message: "Blood Type is required!" }),
    birthday: z.coerce.date({ message: "Birthday is required!" }),
    sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
    subjects: z.array(z.string()).optional(), //subject ids
  });

   
  export type TeacherSchema = z.infer<typeof teacherSchema>;

  export const subjectSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, { message: "Subject name is required!" }),
    teachers: z.array(z.string()), //teacher ids
  });
  
  export type SubjectSchema = z.infer<typeof subjectSchema>;

  export const examSchema = z.object({
    id: z.coerce.number().optional(),
    title: z.string().min(1, { message: "Title name is required!" }),
    startTime: z.coerce.date({ message: "Start time is required!" }),
    endTime: z.coerce.date({ message: "End time is required!" }),
    lessonId: z.coerce.number({ message: "Lesson is required!" }),
  });
  
  export type ExamSchema = z.infer<typeof examSchema>;
  