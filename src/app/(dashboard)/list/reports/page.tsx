import FormContainer from "@/components/FormContainer";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";

import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { role } from "@/lib/utils";

import { Disorder, Prisma, Psychologist, Report, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type ReportList = Report & {psychologist: Psychologist} & {student: Student} & {disorder: Disorder};

const columns = [
  
  {
    header: "Report Title",
    accessor: "title",
    className: "hidden md:table-cell",
  },
  {
    header: "Description",
    accessor: "description",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Psychologist",
    accessor: "psychologist",
    className: "hidden lg:table-cell",
  },
  {
    header: "Student",
    accessor: "student",
    className: "hidden lg:table-cell",
  },
    {
    header: "Disorder",
    accessor: "disorder",
    className: "hidden lg:table-cell"
    },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: ReportList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.title}</h3>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.description}</td>
    <td className="hidden md:table-cell">{new Intl.DateTimeFormat("es-CO").format(item.createdAt)}</td>
    <td className="hidden md:table-cell">{item.psychologist.name + " " + item.psychologist.surname}</td>
    <td className="hidden md:table-cell">{item.student.name + " " + item.student.surname}</td>
    <td className="hidden md:table-cell">{item.disorder.name}</td>
    <td>
       <div className="flex items-center gap-2">
        {role==="admin" || role==="psychologist" && (
          <>
          <FormContainer table="report" type="update" data={item} />
          <FormContainer table="report" type="delete" id={item.id}/>
         </> 
        )}
      </div>
    </td>
  </tr>
);
const ReportListPage = async({searchParams}:{searchParams:{[key:string]:string | undefined}
}) => {
const {page, ...queryParams} = searchParams;

const p = page ? parseInt(page): 1;

//URL PARAMS CONDITION

const query: Prisma.ReportWhereInput = {};

if(queryParams){
for (const [key, value] of Object.entries(queryParams)){
  if (value !== undefined){ 
  switch(key){
    case "title":
        query.title = {contains:value};
        break;
    case "search":
        query.OR = [
        {psychologist: {name:{contains:value}}},
        {student: {name: {contains: value}}},
        {disorder: {name:{contains:value}}}
        ]
        break;
        default:
            break;
    
    }
  }
 }
}


  const [data, count] = await prisma.$transaction([
    prisma.report.findMany({
      where:query,
    include: {
      student: {select: {name: true, surname: true}},

      psychologist: {
         select: {name: true, surname: true}
      },
      disorder: {select: {name: true}}
    },
    take:ITEM_PER_PAGE,
    skip: ITEM_PER_PAGE * (p-1),
  }),
  prisma.report.count({where:query}),
])

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Reports</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" || role ==="psychologist" && (
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              //   <Image src="/plus.png" alt="" width={14} height={14} />
              // </button>
              <FormContainer table="report" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count}/>
    </div>
  );
};

export default ReportListPage;
