
import useSWR from "swr";
import { api } from "@/utils/api/base";

export function useAdmin() {
    const { data, isLoading, error } = useSWR(
        "/manipulation/permission",
        async () => {
            await api.get("/manipulation/permission");
            return true;
        }
    );

    return {
        isLoading,
        isAdmin: !!data,
    };
}