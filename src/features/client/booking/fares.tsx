import { useApiRequest } from '@/hooks/useApiRequest'
import { ApiRequestBuilder } from '@/service/apiRequestBuilder'
import { Select, SelectItem } from '@heroui/select'
import React from 'react'

const Fares = () => {

    const fetchFareMatrice = React.useMemo(() => new ApiRequestBuilder()
        .setUrl(`/client/bookingProcess/getFareMatrices`)
        .setMethod('POST')
        .setData({
            "booking_route_code" : "BRC20250305140326VWWYU3TOC9I47VLJDOH7",
            "booking_type" : 1
        })
    ,[])

    const {data, error, isLoading } = useApiRequest(fetchFareMatrice);

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {error.message}</div>

    return (
        <React.Fragment>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-10">
            <Select 
                label="Transport Details" 
                className="max-w-full"
                items={data}
            >
                {(fare : any) => 
                <SelectItem key={fare.cargo_fare_matrices_code}>{fare.details}</SelectItem>}
            </Select>
                </div>
        </React.Fragment>
    )
}

export default Fares