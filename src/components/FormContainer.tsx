import prisma from "@/lib/prisma";
import FormModal from "./FormModal";
import { auth } from "@clerk/nextjs/server";

export type FormContainerProps = {
    table:
      | "teacher"
      | "student"
      | "psychologist"
      | "parent"
      | "subject"
      | "class"
      | "lesson"
      | "exam"
      | "assignment"
      | "result"
      | "attendance"
      | "event"
      | "report"
      | "disorder"
      | "announcement";
    type: "create" | "update" | "delete";
    data?: any;
    id?: number | string;
  }

const FormContainer = async ({
    table,
    type,
    data,
    id,
  }: FormContainerProps) => {

    let relatedData = {}
    
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    const currentUserId = userId;

if(type !=="delete"){
    switch (table) {
        case "report":
            
        const reportPsychologist= await prisma.psychologist.findMany({
            select:{id:true, name: true, surname: true},
        });
        const reportStudent= await prisma.student.findMany({
            select:{id:true, name:true, surname: true},
        });
        const reportDisorder = await prisma.disorder.findMany({
            select:{ id: true, name: true}
        });
        relatedData = {psychologists: reportPsychologist, students: reportStudent, disorders: reportDisorder};
            break;
        case "teacher":
        const teacherSubjects = await prisma.subject.findMany({
            select: {id: true, name: true},
        });
        relatedData = {subjects:teacherSubjects};
        break;
        case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectTeachers };
        break;
        case "exam":
        const examLessons = await prisma.lesson.findMany({
          where: {
            ...(role === "teacher" ? { teacherId: currentUserId! } : {}),
          },
          select: { id: true, name: true },
        });
        relatedData = { lessons: examLessons };
        break;
        default:
            break;
    }
}

return (
    <div className=''><FormModal table={table} type={type} data={data} id={id} relatedData={relatedData}/></div>
)
}

export default FormContainer 