import { Card } from "@heroui/card";
import Typography from '@/components/ui/Typography';
import { useBookingContext } from '@/context/bookingContextProvider';
import React from "react";

const bookingTypes = [
    {id : 1, name : 'PASSENGER'},
    {id : 2, name : 'ROLLING CARGO'},
    {id : 3, name : 'DROP CARGO'}
]

const BookingType = () => {
    const { setBookingValue, dispatch, bookingValue } = useBookingContext()

    const handleOnBookingTypeChoose = (event: any) => {
        const booking_type : any = JSON.parse(event.target.value);

        setBookingValue((prev: any) => ({
            ...prev,
            fare: null,
            itineraries: null,
            booking_type
        }))
        
        dispatch({ type: "NEXT" })
    }

    return (
        <React.Fragment>   
            {bookingTypes?.map((bookingType : any) => (
                <Card key={bookingType.id} className={`h-full w-full ${bookingValue?.booking_type?.name === bookingType.name ? 'ring ring-blue-100' : null}`} isHoverable isPressable>
                    <label className='h-full w-full p-2 text-center flex flex-col justify-center gap-2  cursor-pointer'>
                        <Typography variant='h2' className='tracking-wider uppercase'>{bookingType.name}</Typography>
                        <input type="radio" value={JSON.stringify(bookingType)} name='voyage_code' className='hidden' onChange={handleOnBookingTypeChoose}/>
                    </label>
                </Card>
            ))}
        </React.Fragment>
    )
}

export default BookingType