import { Card } from "@heroui/card";
import Typography from '@/components/ui/Typography';
import { useBookingContext } from '@/context/bookingContextProvider';

const bookingTypes = [
    {id : 1, name : 'PASSENGER'},
    {id : 2, name : 'ROLLING CARGO'},
    {id : 3, name : 'DROP CARGO'}
]

const BookingType = () => {
    const { setBookingValue, dispatch } = useBookingContext()

    const handleOnBookingTypeChoose = (event: any) => {
        const booking_type : any = JSON.parse(event.target.value);

        setBookingValue((prev: any) => ({
            ...prev,
            booking_type
        }))
        
        dispatch({ type: "NEXT" })
    }

    return (
        <div className="voyages h-[500px] mt-10 w-full flex flex-col gap-y-7 md:flex-row md:h-40 md:gap-x-7">   
            {bookingTypes?.map((bookingType : any) => (
                <Card key={bookingType.id} className='h-full w-full' isHoverable isPressable>
                    <label className='h-full w-full p-2 text-center flex flex-col justify-center gap-2  cursor-pointer'>
                        <Typography variant='h2' className='tracking-wider uppercase'>{bookingType.name}</Typography>
                        <input type="radio" value={JSON.stringify(bookingType)} name='voyage_code' className='hidden' onChange={handleOnBookingTypeChoose}/>
                    </label>
                </Card>
            ))}
        </div>
    )
}

export default BookingType