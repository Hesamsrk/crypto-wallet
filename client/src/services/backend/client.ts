import axios, {AxiosInstance} from 'axios';
import {Configs} from "../../config";

// Create a new Axios instance with specific configurations
export const backendClient: (options?: { authToken: string, baseURL: string }) => AxiosInstance = (options) => axios.create({
    baseURL: options && options.baseURL && options.baseURL.length>1 ? options.baseURL : Configs.SERVICES.backend.baseURL,
    headers: {
        common: {
            'Authorization': options && options.authToken && options.authToken.length>1 ? options.authToken : Configs.SERVICES.backend.authToken
        },
        post: {
            'Content-Type': 'application/json'
        }
    }
});