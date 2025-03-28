export class ApiRequestBuilder {
    private url: string = '';
    private method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET';
    private headers: Record<string, string> = {};
    private baseURL: string = '';
    private withCredentials: boolean = false;
    private params: Record<string, string> = {};
    private data: any = null;
    private signal: any = null;
    private token?: string;
    private timeout: number = 5000;
    private retries: number = 0;
    private followRedirects: boolean = true;
    private proxyUrl?: string = undefined;
    private disableSslVerification: boolean = false;

    setWithCredentials(withCredentials: boolean){
        this.withCredentials = withCredentials;
        return this;
    }
    setBaseUrl(baseURL: string){
        this.baseURL = baseURL;
        return this;
    }
    setUrl(url: string) {
        this.url =  url;
        return this;
    }
    setTimeout(timeout: number) {
        this.timeout = timeout;
        return this;
    }
    setRetries(retries: number) {
        this.retries = retries;
        return this;
    }
    setFollowRedirects(followRedirects: boolean) {
        this.followRedirects = followRedirects;
        return this;
    }
    setDisableSslVerification(disableSslVerification: boolean) {
        this.disableSslVerification = disableSslVerification;
        return this;
    }
    setProxy(proxyUrl?: string) {
        this.proxyUrl = proxyUrl;
        return this;
    }
    setSignal(signal?: any) {
        this.signal = signal;
        return this;
    }

    setBearer(token: string) {
        this.headers.Authorization  = `Bearer ${token}`;
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

        this.url && (config.url = this.url);
        this.baseURL && (config.baseURL = this.baseURL);
        this.withCredentials !== undefined && (config.withCredentials = this.withCredentials);
        this.token && (config.headers = { ...this.headers, Authorization: `Bearer ${this.token}` });
        this.params && Object.keys(this.params).length && (config.params = this.params);
        this.data !== null && (config.data = this.data);
        Object.keys(this.headers).length && (config.headers = this.headers);
        this.signal && (config.signal = this.signal);
        this.timeout !== 5000 && (config.timeout = this.timeout);
        this.retries > 0 && (config.retries = this.retries);
        this.followRedirects !== true && (config.followRedirects = this.followRedirects);
        this.proxyUrl && (config.proxyUrl = this.proxyUrl);
        this.disableSslVerification !== false && (config.disableSslVerification = this.disableSslVerification);
        return config
    }
}

