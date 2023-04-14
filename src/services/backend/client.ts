import axios, { AxiosInstance } from 'axios';
import {Configs} from "../../config";

// Create a new Axios instance with specific configurations
export const backendClient: AxiosInstance = axios.create({
    baseURL: Configs.SERVICES.backend.baseURL,
    headers: {
        common: {
            'Authorization': Configs.SERVICES.backend.authToken
        },
        post: {
            'Content-Type': 'application/json'
        }
    }
});