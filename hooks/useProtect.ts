"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getCookie } from "@/utils/cookie/get";
import useUserAuthontication from "@/store/useUserAuthontication";
import { IUser } from "@/entity/user";
import { api } from "@/utils/api/base";

const IsProduction = process.env.NEXT_PUBLIC_ENVIROMENT === "1";

export function useProtect() {
  const router = useRouter();
  const auth = useUserAuthontication();

  useEffect(() => {
    if (!IsProduction) return;

    // const username = getCookie("username");
    const username = "hello"

    if (!auth.isLogin) {
      if (!username) {
        // router.replace("https://ostadbun.tech/");
        return;
      }

      const userData: IUser = {
        username,
        isAdmin: false,
      };

      auth.Login(userData);
    }

    const checkPermission = async () => {
      try {
        const { data, status } = await api.get("/manipulation/permission");

        if (status === 200 && data) {
          auth.SetIsAdmin(true);
        } else {
          auth.SetIsAdmin(false);
        //   router.replace("/404"); // یا notFound اگر خواستی
        }
      } catch (err) {
        console.error(err);
        auth.SetIsAdmin(false);
        // router.replace("/404");
      }
    };

    checkPermission();
  }, []);
}