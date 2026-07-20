import { api } from "./base"

const GlobalFetcher = <T>(url: string): Promise<T> => {
    return api.get<T>(url).then((res) => res.data)
}

export default GlobalFetcher    