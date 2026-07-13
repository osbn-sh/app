import { AxiosResponse } from "axios"
import ClientPage from "./ClientPage"
import { IBackMajor } from "../entity"
import { api } from "@/utils/api/base"

export const metadata = {
  title: "مهندسی کامپیوتر",
}

export default async function  Page({ params }: { params: { slug: string } })  {
  const Back_data: AxiosResponse<IBackMajor> = await api.get(`/academic/lesson/${(await params).slug}`)

  return <ClientPage data={Back_data.data} />
}