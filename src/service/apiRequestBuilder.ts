
export class ApiRequestBuilder {
    private url?: string;
    private token?: string;
    private params?: Record<string, any>;
    private data?: any;
    private headers?: Record<string, string>;
    private method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET';

    setUrl(url: string) {
        this.url =  url;
        return this;
    }

    setToken(token: string) {
        this.token = token;
        return this;
    }

    setMethod(method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
        this.method = method;
        return this;
    }

    setParams(params: Record<string, any>) {
        this.params = params;
        return this;
    }

    addParam(key: string, value: any) {
        if (!this.params) this.params = {};
        this.params[key] = value;
        return this;
    }

    setData(data: any) {
        this.data = data;
        return this;
    }

    setHeaders(headers: Record<string, string>) {
        this.headers = headers;
        return this;
    }
    build() {
        const config: Record<string, any> = { method: this.method };

        if (this.url) config.url = this.url;
        if (this.token) {
            if (!this.headers) this.headers = {};
            this.headers.Authorization = `Bearer ${this.token}`;
        }
        if (this.params) config.params = this.params;
        if (this.data) config.data = this.data;
        if (this.headers) config.headers = this.headers;

        return config;
        
    }
}

