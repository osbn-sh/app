import { AxiosResponse } from 'axios';
import { ProfessorComponent1 } from './professorForm1';
import { Professor } from '@/entity/entity';
import { api } from '@/utils/api/base';
export const metadata = {
    title: "استاد شهشهانی"
}
export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await params


    console.log(slug, "🫟")
    const data: AxiosResponse<Professor> = await api.get(`/academic/professor/${slug}`)
    return (

        < div >

            <ProfessorComponent1 professor={data.data} slug={slug} />
        </div >
    );
}

