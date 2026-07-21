
import { IUser } from '@/entity/user';
import { redirect, RedirectType } from 'next/navigation';
import { create } from 'zustand'

interface CounterState {
    isLogin: boolean;
    isAdmin: boolean;
    username: string;

    Login: (user: IUser) => void;
    Logout: () => void;
    SetIsAdmin: (value: boolean) => void;
}

const useUserAuthontication = create<CounterState>((set) => ({
    isLogin: false,
    username: '',
    isAdmin: false,

    Login(user: IUser) {
        set({
            username: user.username,
            isLogin: true,
            isAdmin: user.isAdmin,
        });
    },

    SetIsAdmin(value: boolean) {
        set({
            isAdmin: value,
        });
    },

    Logout() {
        set({
            username: '',
            isLogin: false,
            isAdmin: false,
        });

        redirect('/auth', RedirectType.replace);
    },
}));
export default useUserAuthontication
