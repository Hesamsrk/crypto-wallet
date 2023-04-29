import {QueryKey, useQuery, UseQueryOptions} from "react-query";
import { AxiosInstance, AxiosRequestConfig} from "axios";
import {logger} from "../utils/logger";

export function generateQuery<IT = undefined, OT = undefined>(args: { queryKey: string, axios: { config?: AxiosRequestConfig<IT>, path: string, method: "GET" | "POST" }, queryOptions?: Omit<UseQueryOptions<OT, undefined, OT, QueryKey>, "queryKey" | "queryFn"> }) {
    return (options:{instance: AxiosInstance, variables?: IT, queryOptions?: typeof args.queryOptions}) => useQuery<OT, undefined, OT>
    (
        args.queryKey,
        async () => {
            let data: OT = undefined
            try {
                data = (await options.instance(args.axios.path, {
                    data: options.variables,
                    method: args.axios.method,
                    ...(args.axios.config || {}),
                })).data
            } catch (e) {
                logger.error(`Network error: ${args.axios.method} ${args.axios.path}`)
            }
            return data
        }, {
            ...args.queryOptions,
            ...options.queryOptions
        })
}