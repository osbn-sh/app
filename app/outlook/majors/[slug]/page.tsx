import { AxiosResponse } from "axios"
import ClientPage from "./ClientPage"
import { IBackMajor } from "../entity"
import { api } from "@/utils/api/base"
import { Metadata } from "next"

export default async function Page({ params }: { params: { slug: string } }) {
  const Back_data: AxiosResponse<IBackMajor> = await api.get(`/academic/major/${(await params).slug}`)

  return <ClientPage data={Back_data.data} />
}


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {

  const { slug } = await params;

  const { data } = await api.get(`/academic/major/${slug}`);

  return {
    title: data.name,
    description: data.description,
  };
}