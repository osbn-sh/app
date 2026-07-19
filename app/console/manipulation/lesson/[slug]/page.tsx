import React from 'react';
import { LessonComponent1 } from './lessonForm';
import { AxiosResponse } from 'axios';
import { Lesson } from '@/entity/entity';
import { api } from '@/utils/api/base';
export const metadata = {
    title: "مبانی برنامه نویسی"
}
export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await params


    console.log(slug, "🫟")
    const data: AxiosResponse<Lesson> = await api.get(`/academic/lesson/${slug}`)

    return (
        <div>
            <LessonComponent1 lesson={data.data} slug={slug} />
        </div>
    );
}




