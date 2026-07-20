'use client';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/utils/cookie/get';
import useUserAuthontication from '@/store/useUserAuthontication';
import { IUser } from '@/entity/user';


function EngineIslogin(): boolean {
    const t = useUserAuthontication()

    if (!t.isLogin) {
        const username = getCookie('username');
        // const isLoggedIn = !!(username);
        const isLoggedIn = true;

        // TODO fake login for test
        if (!isLoggedIn) {
            return false
        } else {
            const userData: IUser = { username: "محمد مهدی الماسی نژاد", isAdmin: true }
            t.Login(userData)
            return true
        }
    }
    return true
}


export const useProtect = {
    fn: () => { 
        const r = useRouter()
        if(!EngineIslogin()){
            r.replace("/")
        }
    },
    boolean: (): boolean => EngineIslogin(),
}