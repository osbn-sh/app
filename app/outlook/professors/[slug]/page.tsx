import React from "react";
import ClientProfessor from "./ClientProfessor";
import { api } from "@/utils/api/base";
import { IProfessor } from "@/entity/professor";
import { AxiosResponse } from "axios";
import { IBackProfessor } from "../entity";
import { IVote } from "@/entity/vote";
import { Metadata } from "next";


const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  let data: IBackProfessor = {} as IBackProfessor;
  try {
    console.log(api.defaults.baseURL);
    console.log(`/academic/professor/${slug}`);
  
    const result: AxiosResponse<IBackProfessor> = await api.get(
      `/academic/professor/${slug}`,
    );

    console.log(result.data.name);

    data = result.data;
  } catch (err) {
    console.log(err);
  }



   const VoteData: AxiosResponse<IVote> = await api.get(`/vote/professor/${slug}`)
  

  return (
    <div>
      <ClientProfessor data={data} vote={VoteData.data} />
    </div>
  );
};



export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {

  const { slug } = await params;

  const { data } = await api.get(`/academic/professor/${slug}`);

  return {
    title: data.name,
    description: data.description,
  };
}

export default Page;
