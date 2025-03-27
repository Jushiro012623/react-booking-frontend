import Typography from '@/components/ui/Typography'
import {Breadcrumbs, BreadcrumbItem} from "@heroui/breadcrumbs";
import Voyages from '@/features/client/booking/voyages';
import {Progress} from "@heroui/progress";
import Routes from '@/features/client/booking/routes';
import { Button } from '@heroui/button';
import Fares from '@/features/client/booking/fares';
import { useBookingContext } from '@/context/bookingContextProvider';
import BookingType from '@/features/client/booking/bookingType';
import { addToast } from "@heroui/toast";
import Itineraries from '@/features/client/booking/iteniraries';
import BookingDrawer from '@/components/bookingDrawer';
const Booking = () => {

    const { state, dispatch, bookingValue, stepDetails } = useBookingContext()

    const canProceedToNextStep = () => {
        switch(state.step){
            case 1:
                return bookingValue?.voyage ? true : false
            case 2:
                return bookingValue?.route ? true : false
            case 3:
                return bookingValue?.booking_type ? true : false
            case 4:
                return bookingValue?.fare ? true : false
            case 5:
                return true
            case 6:
                return true
            default:
                return false
        }
    }

    console.log(bookingValue)

    const handleOnNext = () => {
        if(canProceedToNextStep()){
            dispatch({type: "NEXT"})

        }else{
            
            dispatch({type: "NONE"})
            addToast({
                shouldShowTimeoutProgress: true,
                timeout: 3000,
                title: "Booking Error",
                description: stepDetails(state).errorMessage,
                variant: 'flat',
                color: "danger",
            })
        }
    }
    return (
        <div className="min-h-screen w-full place-items-center pt-16">
            <div className='relative w-full px-10 lg:w-[900px] 2xl:w-[1000px]'>
                <Breadcrumbs className='mb-10'>
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Booking</BreadcrumbItem>
                </Breadcrumbs>
                
                <BookingDrawer />
                
                <div className='space-y-2 mb-5'>
                    <Typography variant='info2' className='mt-10'>Step Progress</Typography>
                    <Progress aria-label="Loading..." size="sm" className="max-w-full" value={state.value} />
                </div>
                <Typography variant='h3'>{stepDetails(state).title}</Typography>
                <Typography variant='info2' className='italic'>{stepDetails(state).subtitle}</Typography>
                {state.step === 1 &&  
                <div className="voyages h-[500px] mt-10 w-full flex flex-col gap-y-7 md:flex-row md:h-40 md:gap-x-7">
                     <Voyages />
                </div>}
                {state.step === 2 && <Routes /> }
                {state.step === 3 &&  
                <div className="booking-type h-[500px] mt-10 w-full flex flex-col gap-y-7 md:flex-row md:h-40 md:gap-x-7">
                     <BookingType />
                </div>}
                {state.step === 4 && <Fares /> }
                {state.step === 5 && <Itineraries />}
                {state.step === 6 && <Itineraries />}

                <div className='flex gap-4 items-center mt-6'>
                    <Button onPress={() => dispatch({type: "BACK"})}>Back</Button>
                    <Button onPress={handleOnNext} color='primary'>Next</Button>
                </div>
            </div>  
        </div>
    )
}

export default Booking