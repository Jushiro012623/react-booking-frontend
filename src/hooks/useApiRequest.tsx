import { ApiRequestBuilder } from "@/service/apiRequestBuilder";
import React from "react";
import axios from "axios";

const cache: Record<string, any> = {};

const CACHE_DURATION = 5 * 60 * 1000;

// const BASE_URL = import.meta.env.VITE_API_DEV_URL || 'http://192.168.123.137:8090/api/v1';
const BASE_URL = import.meta.env.VITE_API_DEV_URL || 'http://127.0.0.1:8000/api/v1';


export const useApiRequest = (builder: ApiRequestBuilder) => {
    const { url, method, params, data, headers } = builder.build();

    const [responseData, setResponseData] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<any>(false);

    const requestFromApi = React.useCallback(async (abortController: AbortController) => {
        
        if(!url){
            setError('url is required');
            return;
        }

        const cacheKey = `${method}_${url}_${JSON.stringify(params)}_${JSON.stringify(responseData)}`;
        const cached = cache[cacheKey];

        if (method === 'GET' && cached && cached.expiry > Date.now() ) {
            setResponseData(cached.data);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const api = axios.create({
                baseURL: BASE_URL,
                timeout: 5000,
                headers: {'Accept': 'application/json'}
            });

            
            const config: Record<string, any> = { 
                url, 
                method,
                signal: abortController.signal };
            
            if (params) config.params = params;
            if (data) config.data = data;
            if (headers) config.headers = headers;

            const response = await api.request(config)

            if (response.status >= 400) {
                throw new Error('Network response was not ok');
            }

            const result = response.data.data;

            if (method === 'GET') {
                cache[cacheKey] = {
                    data: result,
                    expiry: Date.now() + CACHE_DURATION,
                    cacheKey
                };
            }
            setResponseData(result);

        } catch (error : any) {
            if (error.name === 'AbortError') {
                console.log('Request was cancelled');
            } else {
                setError(error.message);
            }
        }finally{
            setIsLoading(false);
        }

    },[url, method, params, data, headers, responseData])

    React.useEffect(() => {
        const abortController = new AbortController();
        requestFromApi(abortController);
        return () => abortController.abort();
    }, [url, method, params, data, headers])

    return { data : responseData, isLoading, error, refetch : requestFromApi };
}
