"use server";

import { revalidatePath } from "next/cache"
import { ExamSchema, PsychologistSchema, ReportSchema, SubjectSchema, TeacherSchema } from "./formValidationSchemas"
import prisma from "./prisma"
import { clerkClient } from "@clerk/nextjs/server"; 



type CurrentState = {success:boolean; error:boolean}

export const createReport = async (currentState: CurrentState,
    data: ReportSchema) => { 
    try {
        await prisma.report.create({
            data,
        });

        //revalidatePath("/list/reports");
        return { success: true, error: false}
    } catch (err) {
        console.log(err);
        return { success: false, error: true}
    }
    
}

export const updateReport = async (currentState: CurrentState,
    data: ReportSchema) => { 
    try {
        await prisma.report.update({
            where:{
                id:data.id
            },
            data: {
            title: data.title,
            },
        });

        //revalidatePath("/list/reports");
        return { success: true, error: false}
    } catch (err) {
        console.log(err);
        return { success: false, error: true}
    }
}

export const deleteReport = async (currentState: CurrentState,
    data: FormData) => { 
        const id=data.get("id") as string
    try {
        await prisma.report.delete({
            where:{
                id:parseInt(id),
            },
        });

        //revalidatePath("/list/reports");
        return { success: true, error: false}
    } catch (err) {
        console.log(err);
        return { success: false, error: true}
    }
    }

    export const createPsychologist = async (currentState: CurrentState,
        data: PsychologistSchema) => { 
       try {

        const client = await clerkClient();

                const user = await client.users.createUser({
                username: data.username,
                password: data.password,
                firstName: data.name,
                lastName: data.surname,
                publicMetadata:{role: "psychologist"}
                })

            await prisma.psychologist.create({
                data:
                {id:user.id,
                 username: data.username,
                 name: data.name,
                 surname: data.surname,
                 email: data.email,
                 phone: data.phone,
                 address: data.address,
                 img: data.img,
                 bloodType: data.bloodType,
                 sex: data.sex,
                 birthday: data.birthday,
                }

            });
    
            //revalidatePath("/list/reports");
            return { success: true, error: false}
        } catch (err) {
            console.log(err);
            return { success: false, error: true}
        }
        
    }
    
    export const updatePsychologist = async (currentState: CurrentState,
        data: PsychologistSchema) => { 

            if (!data.id){
                return {success: false, error:true}
            }
        try {
            const client = await clerkClient();

                const user = await client.users.updateUser(data.id,{
                username: data.username,
                ...(data.password !== "" && {password: data.password}),
                firstName: data.name,
                lastName: data.surname,
                publicMetadata:{role: "psychologist"}
                })

            await prisma.psychologist.update({
                where:{
                    id: data.id
                },
                data:
                {...(data.password !== "" && {password: data.password}),
                 username: data.username,
                 name: data.name,
                 surname: data.surname,
                 email: data.email,
                 phone: data.phone,
                 address: data.address,
                 img: data.img,
                 bloodType: data.bloodType,
                 sex: data.sex,
                 birthday: data.birthday,
                }

            });
    
            //revalidatePath("/list/reports");
            return { success: true, error: false}
        } catch (err) {
            console.log(err);
            return { success: false, error: true}
        }
    }
    
    export const deletePsychologist = async (currentState: CurrentState,
        data: FormData) => { 
            const id=data.get("id") as string
        try {
            await prisma.psychologist.delete({
                where:{
                    id:id,
                },
            });
    
            //revalidatePath("/list/reports");
            return { success: true, error: false}
        } catch (err) {
            console.log(err);
            return { success: false, error: true}
        }
        }

        export const createTeacher = async (currentState: CurrentState,
            data: TeacherSchema) => { 
           try {
    
            const client = await clerkClient();
    
                    const user = await client.users.createUser({
                    username: data.username,
                    password: data.password,
                    firstName: data.name,
                    lastName: data.surname,
                    publicMetadata:{role: "teacher"}
                    })
    
                await prisma.teacher.create({
                    data:
                    {id:user.id,
                     username: data.username,
                     name: data.name,
                     surname: data.surname,
                     email: data.email,
                     phone: data.phone,
                     address: data.address,
                     img: data.img,
                     bloodType: data.bloodType,
                     sex: data.sex,
                     birthday: data.birthday,
                     subjects: {
                        connect: data.subjects?.map((subjectId: string)=> ({
                            id: parseInt(subjectId),
                        })),
                     },
                    },
    
                });
        
                //revalidatePath("/list/reports");
                return { success: true, error: false}
            } catch (err) {
                console.log(err);
                return { success: false, error: true}
            }
            
        }
        
        export const updateTeacher = async (currentState: CurrentState,
            data: TeacherSchema) => { 
    
                if (!data.id){
                    return {success: false, error:true}
                }
            try {
                const client = await clerkClient();
    
                    const user = await client.users.updateUser(data.id,{
                    username: data.username,
                    ...(data.password !== "" && {password: data.password}),
                    firstName: data.name,
                    lastName: data.surname,
                    publicMetadata:{role: "teacher"}
                    })
    
                await prisma.teacher.update({
                    where:{
                        id: data.id
                    },
                    data:
                    {...(data.password !== "" && {password: data.password}),
                     username: data.username,
                     name: data.name,
                     surname: data.surname,
                     email: data.email,
                     phone: data.phone,
                     address: data.address,
                     img: data.img,
                     bloodType: data.bloodType,
                     sex: data.sex,
                     birthday: data.birthday,
                    }
    
                });
        
                //revalidatePath("/list/reports");
                return { success: true, error: false}
            } catch (err) {
                console.log(err);
                return { success: false, error: true}
            }
        }
        
        export const deleteTeacher = async (currentState: CurrentState,
            data: FormData) => { 
                const id=data.get("id") as string
            try {
                await prisma.teacher.delete({
                    where:{
                        id:id,
                    },
                });
        
                //revalidatePath("/list/reports");
                return { success: true, error: false}
            } catch (err) {
                console.log(err);
                return { success: false, error: true}
            }
            }

            export const createSubject = async (
                currentState: CurrentState,
                data: SubjectSchema
              ) => {
                try {
                  await prisma.subject.create({
                    data: {
                      name: data.name,
                      teachers: {
                        connect: data.teachers.map((teacherId) => ({ id: teacherId })),
                      },
                    },
                  });
              
                  // revalidatePath("/list/subjects");
                  return { success: true, error: false };
                } catch (err) {
                  console.log(err);
                  return { success: false, error: true };
                }
              };

              export const updateSubject = async (
                currentState: CurrentState,
                data: SubjectSchema
              ) => {
                try {
                  await prisma.subject.update({
                    where: {
                      id: data.id,
                    },
                    data: {
                      name: data.name,
                      teachers: {
                        set: data.teachers.map((teacherId) => ({ id: teacherId })),
                      },
                    },
                  });
              
                  // revalidatePath("/list/subjects");
                  return { success: true, error: false };
                } catch (err) {
                  console.log(err);
                  return { success: false, error: true };
                }
              };
        
              export const deleteSubject = async (
                currentState: CurrentState,
                data: FormData
              ) => {
                const id = data.get("id") as string;
                try {
                  await prisma.subject.delete({
                    where: {
                      id: parseInt(id),
                    },
                  });
              
                  // revalidatePath("/list/subjects");
                  return { success: true, error: false };
                } catch (err) {
                  console.log(err);
                  return { success: false, error: true };
                }
              };

              export const createExam = async (
                currentState: CurrentState,
                data: ExamSchema
              ) => {
                // const { userId, sessionClaims } = auth();
                // const role = (sessionClaims?.metadata as { role?: string })?.role;
              
                try {
                  // if (role === "teacher") {
                  //   const teacherLesson = await prisma.lesson.findFirst({
                  //     where: {
                  //       teacherId: userId!,
                  //       id: data.lessonId,
                  //     },
                  //   });
              
                  //   if (!teacherLesson) {
                  //     return { success: false, error: true };
                  //   }
                  // }
              
                  await prisma.exam.create({
                    data: {
                      title: data.title,
                      startTime: data.startTime,
                      endTime: data.endTime,
                      lessonId: data.lessonId,
                    },
                  });
              
                  // revalidatePath("/list/subjects");
                  return { success: true, error: false };
                } catch (err) {
                  console.log(err);
                  return { success: false, error: true };
                }
              };

              export const updateExam = async (
                currentState: CurrentState,
                data: ExamSchema
              ) => {
                // const { userId, sessionClaims } = auth();
                // const role = (sessionClaims?.metadata as { role?: string })?.role;
              
                try {
                  // if (role === "teacher") {
                  //   const teacherLesson = await prisma.lesson.findFirst({
                  //     where: {
                  //       teacherId: userId!,
                  //       id: data.lessonId,
                  //     },
                  //   });
              
                  //   if (!teacherLesson) {
                  //     return { success: false, error: true };
                  //   }
                  // }
              
                  await prisma.exam.update({
                    where: {
                      id: data.id,
                    },
                    data: {
                      title: data.title,
                      startTime: data.startTime,
                      endTime: data.endTime,
                      lessonId: data.lessonId,
                    },
                  });
              
                  // revalidatePath("/list/subjects");
                  return { success: true, error: false };
                } catch (err) {
                  console.log(err);
                  return { success: false, error: true };
                }
              };

              export const deleteExam = async (
                currentState: CurrentState,
                data: FormData
              ) => {
                const id = data.get("id") as string;
              
                // const { userId, sessionClaims } = auth();
                // const role = (sessionClaims?.metadata as { role?: string })?.role;
              
                try {
                  await prisma.exam.delete({
                    where: {
                      id: parseInt(id),
                      // ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
                    },
                  });
              
                  // revalidatePath("/list/subjects");
                  return { success: true, error: false };
                } catch (err) {
                  console.log(err);
                  return { success: false, error: true };
                }
              };