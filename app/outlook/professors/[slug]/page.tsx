import React from 'react';
import ClientProfessor from './ClientProfessor';
import { IBackUniversity } from '../../universities/entity';
import { AxiosResponse } from 'axios';
import { api } from '@/utils/api/base';
import { IBackProfessor } from '../entity';
export const metadata = {
  title: "استاد شهشانی",
}
const Page = async ({ params }: { params: { slug: string } }) => {
  const Back_data: AxiosResponse<IBackProfessor> = await api.get(`/academic/professor/${(await params).slug}`)



  const { data } = Back_data
  return (
    <div>
      <ClientProfessor  data={Back_data.data}/>
    </div>
  );
}

export default Page;
