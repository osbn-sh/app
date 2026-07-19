import React from 'react';
import { UniversityComponent1 } from './universityForm1';
import { AxiosResponse } from 'axios';
import { University } from '@/entity/entity';
import { api } from '@/utils/api/base';
export const metadata = {
    title: "دانشگاه صنعتی شریف"
}
export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await params


    console.log(slug, "🫟")
    const data: AxiosResponse<University> = await api.get(`/academic/university/${slug}`)
    return (
        <div>

            <UniversityComponent1 university={data.data} slug={slug} />
        </div>
    );
}

