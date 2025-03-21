import Typography from '@/components/ui/Typography'
import { useApiRequest } from '@/hooks/useApiRequest'
import { ApiRequestBuilder } from '@/service/apiRequestBuilder'
import { Card } from '@heroui/card'
import React from 'react'
import {Select, SelectItem} from "@heroui/select";
import { Button } from '@heroui/button'

const Routes = () => {
    const fetchVoyagesFromAPI = React.useMemo(() => new ApiRequestBuilder().setUrl(`/client/bookingProcess/getRoutesList`),[])
    const { data , error, isLoading } = useApiRequest(fetchVoyagesFromAPI);

    React.useEffect(() => {
        console.log(fetchVoyagesFromAPI)
    },[])

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {error.message}</div>
    return (
        <React.Fragment>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-10">
                <Select className="max-w-xs" label="Transportation Type">
                    <SelectItem>IN</SelectItem>
                    <SelectItem>OUT</SelectItem>
                </Select>
                <Select label="Origin">
                    {[...new Set(data.map((route: any) => route.origin))].map((origin : any, index) => (
                        <SelectItem key={index}>{origin}</SelectItem>
                    ))}
                </Select>
                <Select label="Destination">
                    {[...new Set(data.map((route: any) => route.destination))].map((destination : any, index) => (
                        <SelectItem key={index}>{destination}</SelectItem>
                    ))}
                </Select>
                
            </div>
        </React.Fragment>
    )
}

export default Routes