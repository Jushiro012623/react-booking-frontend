import { useApiRequest } from '@/hooks/useApiRequest'
import { ApiRequestBuilder } from '@/service/apiRequestBuilder'
import React from 'react'
import {Select, SelectItem} from "@heroui/select";
import { FaLongArrowAltRight } from "react-icons/fa";
import Typography from '@/components/ui/Typography';
import { useBookingContext } from '@/context/bookingContextProvider';
import { Skeleton } from '@heroui/skeleton';

const Routes = () => {
    
    const { setBookingValue, bookingValue } = useBookingContext()

    const [transpoType, setTranspoType] = React.useState(bookingValue?.route?.transportation_type || null);

    const fetchVoyagesFromAPI = React.useMemo(() => new ApiRequestBuilder().setUrl(`/client/bookingProcess/getRoutesList`),[])
    const { data , error, isLoading } = useApiRequest(fetchVoyagesFromAPI);
    

    const handleSelectingTranspoType = (event : any) => {
        setBookingValue((prev: any) => ({
            ...prev,
            route: null
        }))
        setTranspoType(event.target.value)
    }
    const handleSelectingRoute = async (event : any) => {
        const route = await data.find((route: any) => route.booking_route_code === event.target.value )
        setBookingValue((prev: any) => ({
            ...prev,
            fare: null,
            itineraries: null,
            route
        }))
    }
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
                        isDisabled={transpoType == "" || transpoType == null ? true : false}
                        onChange={handleSelectingRoute}
                        label="Route" 
                        className="max-w-full"
                        items={data ? data.filter((route: any) => route.transportation_type === transpoType) : []}
                        defaultSelectedKeys={[bookingValue?.route?.booking_route_code]}
                    >
                        {(route : any) => 
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