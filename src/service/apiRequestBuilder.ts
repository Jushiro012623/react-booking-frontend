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

    /**
        * 
        * @default false
        * @example
        * new ApiRequestBuilder.setWithCredentials(true)
        * 
    */
    setWithCredentials(withCredentials: boolean){
        this.withCredentials = withCredentials;
        return this;
    }
    /**
        * 
        * @description set the base url
        * @default ''
        * @example
        * new ApiRequestBuilder.setBaseUrl('localhost')
        * 
    */
    setBaseUrl(baseURL: string){
        this.baseURL = baseURL;
        return this;
    }
    /**
        * 
        * @description set the url endpoint
        * @default ''
        * @example
        * new ApiRequestBuilder.setUrl('endpoint/showall')
        * 
    */
    setUrl(url: string) {
        this.url =  url;
        return this;
    }
    /**
        *
        * @description set request timeout
        * @default ''
        * @example
        * new ApiRequestBuilder.setTimeout(5000)
        * 
    */
    setTimeout(timeout: number) {
        this.timeout = timeout;
        return this;
    }
    /**
        *
        * @description set request retries
        * @default 0
        * @example
        * new ApiRequestBuilder.setRetries(2)
        * 
    */
    setRetries(retries: number) {
        this.retries = retries;
        return this;
    }
    /**
        *
        * @description set follow redirects
        * @default true
        * @example
        * new ApiRequestBuilder.followRedirects(false)
        * 
    */
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

    /**
        *
        * @description set the bearer authorization
        * @default ''
        * @example
        * const token = localStorate.getItem("token")
        * new ApiRequestBuilder.setBearer(token)
        * 
    */
    setBearer(token: string) {
        this.headers.Authorization  = `Bearer ${token}`;
        return this;
    }
    /**
        *
        * @description set the request method
        * @default 'GET'
        * @example
        * new ApiRequestBuilder.setMethod("POST")
        * 
    */
    setMethod(method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
        this.method = method;
        return this;
    }

    /**
        *
        * @description set the request parameters
        * @default null
        * @example
        * const name = "john"
        * const age = "21"
        * new ApiRequestBuilder.setParams({name: name, age: age})
        * 
    */
    setParams(params: Record<string, any>) {
        this.params = params;
        return this;
    }
    /**
        *
        * @description add in the request parameter
        * @default null
        * @example
        * const name = "john"
        * const age = "21"
        * new ApiRequestBuilder.addParam({name: name})
        * new ApiRequestBuilder.addParam({age: age})
        * 
    */
    addParam(key: string, value: any) {
        if (!this.params) this.params = {};
        this.params[key] = value;
        return this;
    }

    /**
        *
        * @description set the request data/body
        * @default null
        * @example
        * const username = "johndoe"
        * const password = "access123"
        * new ApiRequestBuilder.setData({username: username, password: password})
        * 
    */
    setData(data: any) {
        this.data = data;
        return this;
    }

    /**
        *
        * @description set the request headers
        * @default null
        * @example
        * new ApiRequestBuilder.setData({"Accept", "application/json"})
        * 
    */
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

