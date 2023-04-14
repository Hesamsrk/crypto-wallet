import {Configs} from "../config";

const emptyFunction = ()=>{}
export const logger: {log:typeof console.log,error:typeof console.error} = Configs.DEV_MODE?{log:console.log,error:console.error}:{log:emptyFunction,error:emptyFunction}