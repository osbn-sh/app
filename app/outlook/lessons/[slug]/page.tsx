import React from 'react';
import ClientLesson from './ClientLesson';
import { IBackLesson } from '../entity';
import { AxiosResponse } from 'axios';
import { api } from '@/utils/api/base';
export const metadata = {
  title: " ریاضیات مهندسی",
}
const Page = async ({ params }: { params: { slug: string } }) => {
  const Back_data: AxiosResponse<IBackLesson> = await api.get(`/academic/lesson/${(await params).slug}`)

  return (
    <div>
      <ClientLesson data={Back_data.data} />
    </div>
  );
}

export default Page;
