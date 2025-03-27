import React from 'react'
import { useApiRequest } from '@/hooks/useApiRequest'
import { ApiRequestBuilder } from '@/service/apiRequestBuilder'
import { Skeleton } from "@heroui/skeleton";
import { Card } from "@heroui/card";
import Typography from '@/components/ui/Typography';
import { useBookingContext } from '@/context/bookingContextProvider';

const VoyageCard = ({ data, isLoading, beforeData, handleOnVoyageChoose, bookingValue} : any) => {
    if(isLoading){
        return(
            <React.Fragment>
                {[...Array(beforeData)].map((_, idx) => (
                    <Card key={idx} className="h-full w-full" radius="lg">
                        <Skeleton className="rounded-lg h-40">
                            <div className="h-24 rounded-lg bg-default-300" />
                        </Skeleton>
                    </Card>
                ))}
            </React.Fragment>
        )
    }
    else{
        return(
            <React.Fragment>
                {data?.map((voyage : any , index : number) => (
                    <Card 
                        key={index} 
                        className={`h-full w-full ${bookingValue?.voyage.voyage_code === voyage.voyage_code ? 'ring ring-blue-100' : null}`} 
                        isHoverable 
                        isPressable
                    >
                        <label className='h-full w-full p-2 text-center flex flex-col justify-center gap-2  cursor-pointer'>
                            <Typography variant='h1' className='tracking-wider '>{voyage.label}</Typography>
                            <Typography variant='small'>{voyage.description}</Typography>
                            <input type="radio" value={JSON.stringify(voyage)} name='voyage_code' className='hidden' onChange={handleOnVoyageChoose}/>
                        </label>
                    </Card>
                ))}
            </React.Fragment>
        )
    }
}

const Voyages = () => {

    const { bookingValue, setBookingValue, dispatch } = useBookingContext()

    const fetchVoyagesFromAPI = React.useMemo(() => new ApiRequestBuilder()
        .setUrl('/client/bookingProcess/getVoyagesList')
    ,[])
    
    const { data , error, isLoading } = useApiRequest(fetchVoyagesFromAPI);

    const beforeData = isLoading ? 3 : data?.length || 3;

    if(error) return <div>Error: {error.message}</div>
    const handleOnVoyageChoose = (event: any) => {
        const voyage : any = JSON.parse(event.target.value);

        setBookingValue((prev: any) => ({
            ...prev,
            itineraries: null,
            voyage
        }))
        
        dispatch({ type: "NEXT" })
    }

    return (
            <VoyageCard beforeData={beforeData} data={data} isLoading={isLoading} handleOnVoyageChoose={handleOnVoyageChoose} bookingValue={bookingValue}/>
    )
}

export default Voyages