import {Axios, Method} from "axios";


export class Endpoint<OT> {
    private readonly url: string
    private readonly params: { [key: string]: string }
    private readonly method: Method
    private AX: Axios

    constructor(config: { url: string, params?: { [p: string]: string }, method: Method, axios: Axios }) {
        this.url = config.url;
        this.params = config.params;
        this.method = config.method;
        this.AX = config.axios
    }

    fetch = () => {
        return this.AX.request<OT>({url: this.url, params: this.params, method: this.method})
    }
}