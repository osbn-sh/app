import React from 'react';
import ClientLesson from './ClientLesson';
import { IBackLesson } from '../entity';
import { AxiosResponse } from 'axios';
import { api } from '@/utils/api/base';
import { Metadata } from 'next';

const Page = async ({ params }: { params: { slug: string } }) => {
  const Back_data: AxiosResponse<IBackLesson> = await api.get(`/academic/lesson/${(await params).slug}`)

  return (
    <div>
      <ClientLesson data={Back_data.data} />
    </div>
  );
}


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {

  const { slug } = await params;

  const { data } = await api.get(`/academic/lesson/${slug}`);

  return {
    title: data.name,
    description: data.description,
  };
}

export default Page;
