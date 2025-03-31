import { ApiRequestBuilder } from "@/service/apiRequestBuilder";
import React from "react";
import { Api as SendApiRequest } from "@/service/apiRequest";

const cache: Record<string, any> = {};

const CACHE_DURATION = import.meta.env.VITE_CACHE_DURATION;

export const useApiRequest = (builder: ApiRequestBuilder) => {
    const httpRequest = builder.build()
    const [responseData, setResponseData] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<any>(false);

    const requestFromApi = React.useCallback(async (abortController: AbortController) => {
        
        if(!httpRequest.url){
            setError('url is required');
            return;
        }
         
        const cacheKey = `${httpRequest.method}_${httpRequest.url}_${JSON.stringify(httpRequest.params)}_${JSON.stringify(responseData)}`;
        const cached = cache[cacheKey];

        if (httpRequest.method === 'GET' && cached && cached.expiry > Date.now() ) {
            setResponseData(cached.data);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const response = await SendApiRequest(builder.setSignal(abortController.signal).build())

            if (response.status >= 400) {
                throw new Error('Network response was not ok');
            }

            const result = response.data.data;

            if (httpRequest.method === 'GET') {
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
                setError(error);
            } else {
                setError(error.message);
            }
        }finally{
            setIsLoading(false);
        }

    },[httpRequest.url, httpRequest.method, httpRequest.params, httpRequest.data, httpRequest.headers, responseData])

    React.useEffect(() => {
        const abortController = new AbortController();
        requestFromApi(abortController);
        return () => abortController.abort();
    }, [httpRequest.url, httpRequest.method, httpRequest.params, httpRequest.data, httpRequest.headers])

    return { data : responseData, isLoading, error, refetch : requestFromApi };
}
