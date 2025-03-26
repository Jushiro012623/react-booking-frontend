import { useBookingContext } from '@/context/bookingContextProvider'
import { useApiRequest } from '@/hooks/useApiRequest';
import { ApiRequestBuilder } from '@/service/apiRequestBuilder';
import { Card, CardHeader } from '@heroui/card'
import { Divider } from '@heroui/divider'
import { Pagination } from "@heroui/pagination";
import { Spacer } from "@heroui/spacer";
import React from 'react';

const Itineraries = () => {
    const {bookingValue,setBookingValue, dispatch } = useBookingContext()
    const [currentPage, setCurrentPage] = React.useState<number>(1)
    const fetchItenirariesFromAPI = React.useMemo(() => new ApiRequestBuilder()
            .setUrl('/client/bookingProcess/getJourneySchedules')
            .setMethod('POST')
            .setData({
                "voyage_code" : bookingValue?.voyage?.voyage_code,
                "booking_route_code" : bookingValue?.route?.booking_route_code,
                "booking_type" :  bookingValue?.booking_type?.id
            })
            .addParam('page', currentPage)
        ,[])
        
        const { data , error, isLoading } = useApiRequest(fetchItenirariesFromAPI);
        if(error) return <div>Error: {error.message}</div>
        if(isLoading) return <div>Loading</div>
        const handleOnPress = (value: any) => {
            const itenirary : any = JSON.parse(value);

            setBookingValue((prev: any) => ({
                ...prev,
                itenirary
            }))
        
            dispatch({ type: "NEXT" })
        }
    return (
        <div className='w-full flex flex-wrap gap-2 mt-10'>
            {data.data.map((itenirary: any)=> (
                <React.Fragment key={itenirary.itinerary_code} >
                    <Card className="max-w-[900px] py-3" fullWidth isPressable isHoverable onPress={() => handleOnPress(JSON.stringify(itenirary))}>
                        <CardHeader className="flex gap-3">
                            <div className="flex flex-col">
                                <p className="text-md">{bookingValue?.route?.label}</p>
                                <p className="text-small text-left text-default-500">Slots: {itenirary.available_slots}/{itenirary.max_slots}</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <div className='px-3 py-3'>
                            <div className="flex justify-between w-full ">
                                <div className='flex gap-x-2 text-xs'><p>Departure Date:</p> <p>{new Date(itenirary.departure_date).toLocaleDateString()}</p></div>
                                <div className='flex gap-x-2 text-xs'><p>Arrival Date:</p> <p>{new Date(itenirary.arrival_date).toLocaleDateString()}</p></div>
                            </div>
                            <div className="flex justify-between w-full mt-2">
                                <div className='flex gap-x-2 text-xs'><p>Departure Time:</p> <p>{itenirary.departure_time}</p></div>
                                <div className='flex gap-x-2 text-xs'><p>Arrival Time:</p> <p>{itenirary.arrival_time}</p></div>
                            </div>
                        </div>
                    </Card>
                    <Spacer y={4} />
                </React.Fragment>
            ))}
            
            <div className='w-full flex justify-center'>
                <Pagination loop showControls color="primary" initialPage={data.current_page} total={data.last_page} />
            </div>
        </div>
    )
}

export default Itineraries