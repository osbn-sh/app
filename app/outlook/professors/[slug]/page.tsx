import React from "react";
import ClientProfessor from "./ClientProfessor";
import { api } from "@/utils/api/base";
import { IProfessor } from "@/entity/professor";
import { AxiosResponse } from "axios";

export const metadata = {
  title: "استاد شهشانی",
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  let data: IProfessor = {} as IProfessor;
  try {
    console.log(api.defaults.baseURL);
    console.log(`/academic/professor/${slug}`);
  
    const result: AxiosResponse<IProfessor> = await api.get(
      `/academic/professor/${slug}`,
    );

    console.log(result.data.name);

    data = result.data;
  } catch (err) {
    console.log(err);
  }

  return (
    <div>
      <ClientProfessor data={data} />
    </div>
  );
};

export default Page;
