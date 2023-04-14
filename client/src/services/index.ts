import {QueryKey, useQuery, UseQueryOptions} from "react-query";
import {AxiosError, AxiosInstance} from "axios";

export function generateQuery<IT = undefined, OT = undefined>(args: { queryKey: string, axios: { instance: AxiosInstance, path: string, method: "GET" | "POST"}, queryOptions?: Omit<UseQueryOptions<OT, undefined, IT, QueryKey>, "queryKey" | "queryFn"> }) {
    return (variables: IT,queryOptions?:Omit<UseQueryOptions<OT, undefined, IT, QueryKey>, "queryKey" | "queryFn">) => useQuery<OT, undefined, typeof variables>
    (
        args.queryKey,
        async () => {
            let data:OT = undefined
            try{
                data = (await args.axios.instance(args.axios.path, {
                    data: variables,
                    method: args.axios.method
                })).data
            }catch (e){
                const error = e as AxiosError
                console.error("Network error status:",error.status)
            }
            return data
        },{
            ...args.queryOptions,
            ...queryOptions
        })
}