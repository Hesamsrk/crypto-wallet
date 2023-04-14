import {QueryKey, useQuery, UseQueryOptions} from "react-query";
import {AxiosInstance} from "axios";

export function generateQuery<IT = undefined, OT = undefined>(args: { queryKey: string, axios: { instance: AxiosInstance, path: string, method: "GET" | "POST"}, queryOptions?: Omit<UseQueryOptions<OT, undefined, IT, QueryKey>, "queryKey" | "queryFn"> }) {
    return (variables: IT) => useQuery<OT, undefined, typeof variables>
    (
        args.queryKey,
        async () => {
            const data = (await args.axios.instance(args.axios.path, {
                data: variables,
                method: args.axios.method
            })).data
            console.log({data})
            return data
        },
        args.queryOptions)
}