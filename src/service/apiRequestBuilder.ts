type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type ApiRequestConfig = {
  url?: string;
  method?: HttpMethod;
  headers?: Record<string, string>;
  baseURL?: string;
  withCredentials?: boolean;
  params?: Record<string, any>;
  data?: any;
  signal?: AbortSignal;
  timeout?: number;
  retries?: number;
  followRedirects?: boolean;
  proxyUrl?: string;
  disableSslVerification?: boolean;
}

interface ApiRequestBuilderInterface {
    build: () => ApiRequestConfig;
}

export class ApiRequestBuilder implements ApiRequestBuilderInterface {
  private config: ApiRequestConfig;

  constructor(url: string = "") {
    this.config = {
      url,
      method: "GET",
      withCredentials: false,
      timeout: 5000,
      followRedirects: true,
      disableSslVerification: false,
    };
  }

  setUrl(url: string) {
    this.config.url = url;
    return this;
  }

  setMethod(method: HttpMethod) {
    this.config.method = method;
    return this;
  }

  setBaseUrl(baseURL: string) {
    this.config.baseURL = baseURL;
    return this;
  }

  setTimeout(timeout: number) {
    this.config.timeout = timeout;
    return this;
  }

  setRetries(retries: number) {
    this.config.retries = retries;
    return this;
  }

  setWithCredentials(flag: boolean) {
    this.config.withCredentials = flag;
    return this;
  }

  setFollowRedirects(flag: boolean) {
    this.config.followRedirects = flag;
    return this;
  }

  setDisableSslVerification(flag: boolean) {
    this.config.disableSslVerification = flag;
    return this;
  }

  setProxy(proxyUrl: string) {
    this.config.proxyUrl = proxyUrl;
    return this;
  }

  setSignal(signal: AbortSignal) {
    this.config.signal = signal;
    return this;
  }

  setParams(params: Record<string, any>) {
    this.config.params = params;
    return this;
  }

  addParam(key: string, value: any) {
    this.config.params ??= {};
    this.config.params[key] = value;
    return this;
  }

  setData(data: any) {
    this.config.data = data;
    return this;
  }

  setHeaders(headers: Record<string, string>) {
    this.config.headers = headers;
    return this;
  }

  build(): ApiRequestConfig {
    return { ...this.config };
  }
}