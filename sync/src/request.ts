import axios from 'axios';

export default class Request {
    private defaultOptions;

    constructor(baseURL) {
        this.defaultOptions = {
            baseURL,
            headers : {
               "Cache-Control": "no-cache",
               "Content-Type" : "application/json",
            }
        };
    }

    setToken(token) {
        this.defaultOptions.headers = Object.assign(this.defaultOptions.headers, { "PRIVATE-TOKEN" : token });
        return this;
    }

    async get(endpoint) {
        const res = await axios.create(this.defaultOptions).get(endpoint);
        return res.data;
    }

    async post(endpoint, data = null) {
        const res = await axios.create(this.defaultOptions).post(endpoint, data);
        return res.data;
    }

    async put(endpoint, data = null) {
        const res = await axios.create(this.defaultOptions).put(endpoint, data);
        return res.data;
    }

    async delete(endpoint) {
        const res = await axios.create(this.defaultOptions).delete(endpoint);
        return res.data;
    }
}

