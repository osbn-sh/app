"use client";
import { Lesson, Major, Professor, University } from "@/entity/entity";
import { api} from "@/utils/api/base";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import PendingCard from "./PendingCard";
interface IPending {
  lesson: Lesson[];
  major: Major[];
  professor: Professor[];
  university: University[];
}
const Page = () => {
  const [data, setData] = useState<IPending>({} as IPending);

useEffect(() => {
  const fetchPending = async () => {
    try {
      const result = await api.get<IPending>("/manipulation/get-all");
      setData(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchPending();
}, []);

  return (
    <>
    <PendingCard name="dfsdsf" added="sdfdf" hisTalent="dfg"/>
{/* {data.lesson?.map((lesson)=>(
  <div key={lesson.id}>
    {lesson.description_english}
  </div>
))} */}
</>
)};

export default Page;
