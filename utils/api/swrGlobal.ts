import { api } from "./base"

const GlobalFetcher = <T>(url: string) => {
    return api.get<T>(url).then((res) => res.data)
}

export default GlobalFetcher