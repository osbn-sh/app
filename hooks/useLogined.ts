// // hooks/useIsLogin.ts
// 'use client';

// import { getCookie } from "@/utils/cookie/get";
// import { useEffect, useState } from "react";

// interface UseIsLoginReturn {
//   isLogin: boolean;
//   isLoading: boolean;
//   username: string | null;
// }

// const useIsLogin = (): UseIsLoginReturn => {
//   const [isLogin, setIsLogin] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [username, setUserName] = useState<string | null>(null);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const user = getCookie("username");
//       setUserName(user);
//       setIsLogin(!!user);
//       setIsLoading(false);
//     }
//   }, []);

//   return { isLogin, isLoading, username };
// };

// export default useIsLogin;


//تو کد بالایی کلن میگه اگه از استیت ها که در یوزافکت هست استفاده کنیم چون استیت ها قابل تغییرند واسه همین شاید باعث رندر اضافه بشن
'use client';

import { getCookie } from "@/utils/cookie/get";
import { useMemo } from "react";

interface UseIsLoginReturn {
  isLogin: boolean;
  isLoading: boolean;
  username: string | null;
}

const useIsLogin = (): UseIsLoginReturn => {
  const username = useMemo(() => {
    if (typeof window === "undefined") return null;

    return getCookie("username");
  }, []);

  return {
    username,
    isLogin: !!username,
    isLoading: false,
  };
};

export default useIsLogin;

