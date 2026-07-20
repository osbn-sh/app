
import { IUser } from '@/entity/user';
import { redirect, RedirectType } from 'next/navigation';
import { create } from 'zustand'

interface CounterState {
    [x: string]: any;
    isLogin: boolean,
    isAdmin: boolean,
    username: string,
    Login: (user: IUser) => void;
    Logout: () => void;
}



const useUserAuthontication = create<CounterState>((set, get) => ({
    isLogin: false,

    username: '',
    isAdmin: false,

    Login(user: IUser) {
        set(() => {
            return { username: user.username, isLogin: true, isAdmin: user.isAdmin }
        })
    },

    Logout() {
        set(() => {
            return { username: '', isLogin: false }
        })


        redirect('/auth', RedirectType.replace)
    },
}));

export default useUserAuthontication;
