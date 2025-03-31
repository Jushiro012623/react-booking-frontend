import { useApiRequest } from '@/hooks/useApiRequest'
import { ApiRequestBuilder } from '@/service/apiRequestBuilder'
import React from 'react'
import {Select, SelectItem} from "@heroui/select";
import { FaLongArrowAltRight } from "react-icons/fa";
import Typography from '@/components/ui/Typography';
import { useBookingContext } from '@/context/bookingContextProvider';
import { Skeleton } from '@heroui/skeleton';
import { IRoute } from "@/types/bookingTypes"
import { IBookingValue } from '@/context/bookingContextProvider'

const Routes = () => {
    
    const { setBookingValue, bookingValue } = useBookingContext()

    const [transpoType, setTranspoType] = React.useState<any | null>(bookingValue?.route?.transportation_type || null);

    const fetchVoyagesFromAPI = React.useMemo(() => new ApiRequestBuilder().setUrl(`/client/bookingProcess/getRoutesList`),[])
    
    const { data , error, isLoading } = useApiRequest(fetchVoyagesFromAPI);
    
    const handleSelectingTranspoType = (event : any) => {
        setBookingValue((prev: IBookingValue) => ({
            ...prev,
            route: null
        }))
        setTranspoType(event.target.value)
    }
    const handleSelectingRoute = async (event : any) => {
        const route = await data.find((route: IRoute) => route.booking_route_code === event.target.value )
        setBookingValue((prev: IBookingValue) => ({
            ...prev,
            fare: null,
            itineraries: null,
            route
        }))
    }

    const isSelectionDisable = transpoType == "" || transpoType == null ? true : false

    if(error) return <div>Error: {error.message}</div>

    return (
        <React.Fragment>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-10">
            <Skeleton isLoaded={!isLoading} className='w-full rounded-lg'>
                <div className='w-xs rounded-lg'>
                    <Select 
                        isRequired
                        onChange={handleSelectingTranspoType}
                        className="max-w-xs" 
                        label="Transportation Type"
                        defaultSelectedKeys={[transpoType]}
                    >
                        <SelectItem key="in">IN</SelectItem>
                        <SelectItem key="out">OUT</SelectItem>
                    </Select>
                </div>
            </Skeleton>
            <Skeleton isLoaded={!isLoading} className='w-full rounded-lg'>
                <div className='w-xs rounded-lg'>
                    <Select 
                        isRequired
                        isDisabled={isSelectionDisable}
                        onChange={handleSelectingRoute}
                        label="Route" 
                        className="max-w-full"
                        items={data ? data.filter((route: any) => route.transportation_type === transpoType) : []}
                        defaultSelectedKeys={[bookingValue?.route?.booking_route_code]}
                    >
                        {(route : IRoute) => 
                        <SelectItem key={route.booking_route_code} textValue={route.label}>
                            <div className='flex justify-between'>
                                <Typography>{route.origin}</Typography>
                                <FaLongArrowAltRight />
                                <Typography>{route.destination}</Typography>
                            </div>
                        </SelectItem>}
                    </Select>
                </div>
            </Skeleton>
            </div>
        </React.Fragment>
    )
}

export default Routes