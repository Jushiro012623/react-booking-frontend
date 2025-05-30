import React from "react";

import { ApiRequestBuilder } from "@/service/apiRequestBuilder";
import { Api as SendApiRequest } from "@/service/apiRequest";

/**
 *
 * @types {Record<string, any>}
 *
 */
const cache: Record<string, any> = {};

/**
 *
 * @types {number}
 * @example
 * 60000
 *
 */
const CACHE_DURATION = import.meta.env.VITE_CACHE_DURATION;

/**
 *
 * @param {ApiRequestBuilder} builder - axios config
 * @return data, isLoading, error, refetch
 * @example
 * const {data, isLoading, error, refetch} = useApiRequest('ApiRequestBuilder')
 *
 */
export const useApiRequest = (builder: ApiRequestBuilder) => {
  // REQUEST BUILDER
  const httpRequest = builder.build();
  /*
   *
   * REACT USE STATES
   *
   */
  const [responseData, setResponseData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<any>(false);

  /*
   *
   * REACT USE CALLBACKS
   *
   */
  /**
   *
   * @param {AbortController} abortController - abort if request is canceled
   *
   */
  const requestFromApi = React.useCallback(
    async (abortController: AbortController) => {
      if (!httpRequest.url) {
        setError("url is required");

        return;
      }

      /*
       *
       * SET HTTP REQUEST TO CACHE VARIABLE
       *
       */
      const cacheKey = `${httpRequest.method}_${httpRequest.url}_${JSON.stringify(httpRequest.params)}`;

      const cached = cache[cacheKey];

      /*
       *
       * RETURN IMMEDIATELY IF THE HTTP REQUEST IS IN CACHE AND IF THE METHOD IS GET
       *
       */
      if (
        httpRequest.method === "GET" &&
        cached &&
        cached.expiry > Date.now()
      ) {
        setResponseData(cached.data);
        console.log("refetch");
        setIsLoading(false);

        return;
      }

      setIsLoading(true);

      try {
        const response = await SendApiRequest(
          builder.setSignal(abortController.signal).build(),
        );

        const result = response.data;

        /*
         *
         * STORE THE HTTP TO MEMORY CACHE IF THE METHOD IS GET
         *
         */
        if (httpRequest.method === "GET") {
          cache[cacheKey] = {
            data: result,
            expiry: Date.now() + CACHE_DURATION,
            cacheKey,
          };
        }
        setResponseData(result);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [
      httpRequest.url,
      httpRequest.method,
      httpRequest.params,
      httpRequest.data,
      httpRequest.headers,
      responseData,
    ],
  );

  /*
   *
   * REACT USE EFFECTS
   *
   */
  React.useEffect(() => {
    const abortController = new AbortController();
    let isCurrent = true;
  
    const run = async () => {
        try {
          await requestFromApi(abortController);
          if (!isCurrent) return;
        } catch (err) {
        }
      };
  
    run();
  
    return () => {
      isCurrent = false;
      abortController.abort();
    };
  }, [
    httpRequest.url,
    httpRequest.method,
    httpRequest.params,
    httpRequest.data,
    httpRequest.headers,
  ]);

  return { data: responseData, isLoading, error, refetch: requestFromApi };
};
