"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { reportSchema, ReportSchema } from "@/lib/formValidationSchemas";
import { createReport, updateReport } from "@/lib/actions";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";
  
  const ReportForm = ({
    type,
    data,
    setOpen, 
    relatedData,
  }: {
    type: "create" | "update";
    data?: any;
    setOpen:Dispatch<SetStateAction<boolean>>;
    relatedData?:any;
  }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ReportSchema>({
      resolver: zodResolver(reportSchema),
    });

    const [state, formAction] = useFormState(type==="create" ? createReport: updateReport, 
         {success:false, error:false}
    )
    const onSubmit = handleSubmit((data) => {
        console.log(data);
        formAction(data);
      });

      const router = useRouter()

      useEffect(()=>{
        if(state.success){
            toast(`Report has been ${type==="create" ? "created" : "updated"}!`)
            setOpen(false);
            router.refresh();
        }
      }, [state]);

      const {psychologists, students, disorders} = relatedData;
     
      return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
          <h1 className="text-xl font-semibold">{type==="create" ? "Create a new Report": "Update the Report"}</h1>
          
          <div className="flex justify-between flex-wrap gap-4">
            <InputField
              label="Report Title"
              name="title"
              defaultValue={data?.title}
              register={register}
              error={errors?.title}
            />

            <InputField
              label="Description"
              name="description"
              defaultValue={data?.description}
              register={register}
              error={errors?.description}
            />
             
             {data && (
            <InputField
              label="Id"
              name="id"
              defaultValue={data?.id}
              register={register}
              error={errors?.id}
              hidden
            />
             )}
             <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Psychologist</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("psychologistId")}
            defaultValue={data?.psychologists}
          >
            {psychologists.map(
              (psychologist:{id:string; name:string; surname:string})=>( 
                
                <option value={psychologist.id} key={psychologist.id} selected={data && psychologist.id=== data.psychologistId}>
                  {psychologist.name + " " + psychologist.surname}
                  </option>
              )
            )}
              
          </select>
          {errors.psychologistId?.message && (
            <p className="text-xs text-red-400">
              {errors.psychologistId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Student</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("studentId")}
            defaultValue={data?.students}
          >
            {students.map(
              (student:{id:string; name:string; surname:string})=>( 
                
                <option value={student.id} key={student.id} selected={data && student.id=== data.studentId}>
                  {student.name + " " + student.surname}
                </option>
              )
            )}
              
          </select>
          {errors.studentId?.message && (
            <p className="text-xs text-red-400">
              {errors.studentId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Disorder</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("disorderId")}
            defaultValue={data?.disorders}
          >
            {disorders.map(
              (disorder:{id:number; name:string;})=>( 
                
                <option value={disorder.id} key={disorder.id} selected={data && disorder.id=== data.disorderId}>
                  {disorder.name}
                </option>
              )
            )}
              
          </select>
          {errors.disorderId?.message && (
            <p className="text-xs text-red-400">
              {errors.disorderId.message.toString()}
            </p>
          )}
        </div>
        </div>
{state.error && (<span className="text-red-500">Algo salio mal!</span>)}

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
    
  );
};

export default ReportForm;
