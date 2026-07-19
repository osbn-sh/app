import React from 'react';
import { MajorComponent1 } from './majorForm1';
import { api } from '@/utils/api/base';
import { AxiosResponse } from 'axios';
import { Major } from '@/entity/entity';
export const metadata = {
    title: "مهندسی کامپیوتر"
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await params


    console.log(slug, "🫟")
    const data: AxiosResponse<Major> = await api.get(`/academic/major/${slug}`)


    return (
        <div>
            <MajorComponent1 major={data.data} slug={slug} />
        </div>
    );
}


