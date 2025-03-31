import { Button } from '@heroui/button'
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from '@heroui/drawer'
import { useDisclosure } from '@heroui/modal';
import { useBookingContext } from '@/context/bookingContextProvider';
import Typography from './ui/Typography';
import { Divider } from '@heroui/divider';
import { formatToPeso } from '@/helpers/formatToPeso'
const BookingDrawer = () => {
    
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { bookingValue } = useBookingContext()

  const totalAmout = () => {
    let baseFare = Number(bookingValue?.fare?.fare)

    if(bookingValue?.booking_type?.id === 1){
        baseFare = baseFare * (Number(bookingValue?.info?.quantity) || 1);
    }

    switch (bookingValue?.info?.discount) {
        case "REGULAR":
          break;
        case "PWD_SENIOR":
        case "MINOR":
        case "STUDENT":
          baseFare -= baseFare * 0.2;
          break;
        case "HALF_FARE":
          baseFare -= baseFare * 0.5;
          break;
        default:
          break;
      }

    if(bookingValue?.info?.add_ons === 2){

        baseFare += Number(bookingValue?.fare?.additional_fee) ?? 0
    }

    return bookingValue?.fare?.fare ? formatToPeso(baseFare) : false

  }

  const percentageValue = () => {
    if(!bookingValue?.info?.discount){
        return false
    }
    if(bookingValue?.info?.discount === "PWD" || bookingValue?.info?.discount === 'MINOR' || bookingValue?.info?.discount === 'STUDENT'){
        return "20%"
    }
    if(bookingValue?.info?.discount === "HALF_FARE" ){
        return "50%"
    }
    return "0%"
  }
  return (
    <div className='absolute top-0 right-10'>
        <Button onPress={onOpen}>View Summary</Button>
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size='xs'>
            <DrawerContent>
            {(onClose) => (
                <>
                <DrawerHeader className="flex flex-col gap-1">
                        <Typography>Booking Summary</Typography>
                        <Divider className="my-4" />
                </DrawerHeader>
                <DrawerBody>
                    <div className='w-full flex items-center justify-between'>
                        <Typography variant='small'>VOYAGE</Typography>
                        <Typography variant='small'>{bookingValue?.voyage?.label || '----'}</Typography>
                    </div>
                    <Divider className="my-1" />
                    <div className='w-full flex items-center justify-between'>
                        <Typography variant='small'>ROUTE</Typography>
                        {bookingValue?.route ? 
                        <div className='flex gap-2'>
                            <Typography variant='small' color={bookingValue?.route?.transportation_type == 'in' ? 'secondary' : 'danger'} className='uppercase'>{bookingValue?.route?.transportation_type}</Typography>
                            <Typography variant='small' className='uppercase'>{bookingValue?.route?.label || '----'}</Typography>
                        </div>
                        :
                        <Typography variant='small'>----</Typography>
                        }
                    </div>
                    <Divider className="my-1" />
                    <div className='w-full flex items-center justify-between'>
                        <Typography variant='small'>BOOKING TYPE</Typography>
                        <Typography variant='small'>{bookingValue?.booking_type?.name || '----'}</Typography>
                    </div>
                    <Divider className="my-1" />
                    <div className='w-full flex items-center justify-between'>
                        <Typography variant='small'>DEPARTURE DATE</Typography>
                        {bookingValue?.itineraries ? 
                        <div className='flex gap-2'>
                            <Typography variant='small' className='uppercase'>{bookingValue?.itineraries?.arrival_date}</Typography>
                            <Typography variant='small' className='uppercase'>{bookingValue?.itineraries?.arrival_time}</Typography>
                        </div>
                        :
                        <Typography variant='small'>----</Typography>
                        }
                    </div>
                    <Divider className="my-1" />
                    <div className='w-full flex items-center justify-between'>
                        <Typography variant='small'>ARRIVAL DATE</Typography>
                        {bookingValue?.itineraries ? 
                        <div className='flex gap-2'>
                            <Typography variant='small' className='uppercase'>{bookingValue?.itineraries?.departure_date}</Typography>
                            <Typography variant='small' className='uppercase'>{bookingValue?.itineraries?.departure_time}</Typography>
                        </div>
                        :
                        <Typography variant='small'>----</Typography>
                        }
                    </div>
                    <Divider className="my-1" />
                    <div className='w-full flex items-center justify-between'>
                        <Typography variant='small'>DECLARED AMOUNT</Typography>
                        <Typography variant='small'>{bookingValue?.fare?.fare ? formatToPeso(bookingValue?.fare?.fare) : '----'}</Typography>
                    </div>
                    <Divider className="my-1" />
                    <div className='w-full flex items-center justify-between'>
                        <Typography variant='small'>ADDITIONAL FEE</Typography>
                        <Typography variant='small'>{bookingValue?.info?.add_ons ? formatToPeso(bookingValue?.fare?.additional_fee) : '----' }</Typography>
                    </div>
                    <Divider className="my-1" />
                    <div className='w-full flex items-center justify-between'>
                        <Typography variant='small'>DISCOUNT</Typography>
                        <Typography variant='small'>{percentageValue() || '----'}</Typography>
                    </div>
                    <Divider className="my-1" />
                    <div className='w-full flex items-center justify-between'>
                        <Typography variant='small'>QUANTITY</Typography>
                        <Typography variant='small'>{bookingValue?.info?.quantity || '----'}</Typography>
                    </div>
                    <Divider className="my-1" />
                    <div className='w-full flex items-center justify-between mt-10'>
                        <Typography variant='h6' color='primary'>TOTAL AMOUNT</Typography>
                        <Typography variant='small'>{totalAmout() || '----'}</Typography>
                    </div>
                    <Divider className="my-1" />
                </DrawerBody>
                <DrawerFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                    </Button>
                </DrawerFooter>
                </>
            )}
            </DrawerContent>
        </Drawer>
    </div>
  )
}

export default BookingDrawer