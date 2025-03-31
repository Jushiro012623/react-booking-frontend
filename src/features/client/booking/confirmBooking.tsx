import Typography from '@/components/ui/Typography'
import { useBookingContext } from '@/context/bookingContextProvider'
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card'
import { Divider } from '@heroui/divider'
import { Image } from '@heroui/image'
import { Spacer } from '@heroui/spacer'
const ConfirmBooking = () => {
    const { bookingValue} = useBookingContext()
  return (
    <div className="w-full flex flex-col mt-10">
        <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="heroui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{bookingValue?.voyage?.label} - {bookingValue?.booking_type?.name}</p>
          <p className="text-small text-default-500 uppercase">{bookingValue?.route?.transportation_type} - {bookingValue?.route?.label}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='flex w-full '>
            <div className='w-full'>
                <div className='flex w-full justify-between'>
                    <Typography variant='small' color='primary'>Departure Date</Typography>
                    <Typography variant='small'>{bookingValue?.itineraries?.departure_date}</Typography>
                </div>
                <Spacer y={2}/>
                <div className='flex  w-full justify-between'>
                    <Typography variant='small' color='primary'>Departure Time</Typography>
                    <Typography variant='small'>{bookingValue?.itineraries?.departure_time}</Typography>
                </div>
            </div>
            <Spacer x={5}/>
            <div className='w-full'>
                <div className='flex w-full justify-between'>
                    <Typography variant='small' color='primary'>Arrival Date</Typography>
                    <Typography variant='small'>{bookingValue?.itineraries?.arrival_date}</Typography>
                </div>
                <Spacer y={2}/>
                <div className='flex  w-full justify-between'>
                    <Typography variant='small' color='primary'>Arrival Time</Typography>
                    <Typography variant='small'>{bookingValue?.itineraries?.arrival_time}</Typography>
                </div>
            </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className='w-full'>
            <div className='w-full flex justify-between '>
                <Typography variant='small'>Discount</Typography>
                <Typography variant='small'>{bookingValue?.info?.discount || "REGULAR"}</Typography>
            </div>
            <Spacer y={2}/>
            <div className='w-full flex justify-between'>
                <Typography variant='small'>Quantity</Typography>
                <Typography variant='small'>{bookingValue?.info?.quantity || 1}</Typography>
            </div>
            <Spacer y={2}/>
            <div className='w-full flex justify-between'>
                <Typography variant='small'>Additional Fee</Typography>
                <Typography variant='small'>{bookingValue?.fare?.additional_fee || '00.0'}</Typography>
            </div>
            <Spacer y={2}/>
            <Divider />
            <Spacer y={1}/>
            <div className='w-full flex justify-between'>
                <Typography  color='primary'>Total Amount</Typography>
                <Typography>{bookingValue?.fare?.fare}</Typography>
            </div>
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}

export default ConfirmBooking