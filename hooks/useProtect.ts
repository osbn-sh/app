'use client';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/utils/cookie/get';
import useUserAuthontication from '@/store/useUserAuthontication';
import { IUser } from '@/entity/user';
import { useAdmin } from './useAdmin';

const IsProduction = process.env.NEXT_PUBLIC_ENVIROMENT == "1"

function EngineIslogin(): boolean {
    const t = useUserAuthontication()

    const { isAdmin } = useAdmin()

    if (!t.isLogin) {
        const username = getCookie('username');
        const isLoggedIn = !!(username);

        console.log(isAdmin,"🔋")
        // TODO fake login for test
        if (!isLoggedIn) {
            return false
        } else {
            const userData: IUser = { username: username, isAdmin: isAdmin }
            t.Login(userData)
            return true
        }
    }
    return true
}


export const useProtect = {
    fn: () => {
        const r = useRouter()
        if (IsProduction) {
            if (!EngineIslogin()) {
                r.replace("https://ostadbun.tech/")
            }
        }
    },
    boolean: (): boolean => EngineIslogin(),
}