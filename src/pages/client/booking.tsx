import { addToast } from "@heroui/toast";
import { Api as SendApiRequest } from '@/service/apiRequest';
import { ApiRequestBuilder } from '@/service/apiRequestBuilder';
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { Button } from '@heroui/button';
import { canProceedToNextStep, valueToSubmit } from "@/utils/bookingValidations"
import { Progress } from "@heroui/progress";
import { useBookingContext } from '@/context/bookingContextProvider';
import Typography from '@/components/ui/Typography'
import Voyages from '@/features/client/booking/voyages';
import Routes from '@/features/client/booking/routes';
import Fares from '@/features/client/booking/fares';
import BookingType from '@/features/client/booking/bookingType';
import Itineraries from '@/features/client/booking/iteniraries';
import BookingDrawer from '@/components/bookingDrawer';
import FillupInfo from '@/features/client/booking/fillupInfo';
import ConfirmBooking from '@/features/client/booking/confirmBooking';
import React from 'react';
import { Spinner } from "@heroui/spinner";
import { Skeleton } from "@heroui/skeleton";



const BookingStepContent = [
    {
        step: 1, 
        content:    <div className="voyages h-[500px] mt-10 w-full flex flex-col gap-y-7 md:flex-row md:h-40 md:gap-x-7"> <Voyages /> </div>
   },
   {
        step: 2,
        content:    <Routes />
   },
   {
        step: 3,
        content:    <div className="booking-type h-[500px] mt-10 w-full flex flex-col gap-y-7 md:flex-row md:h-40 md:gap-x-7"> <BookingType /> </div>
   },
   {
        step: 4,
        content:    <Fares />
   },
   {
        step: 5,
        content:    <Itineraries />
   },
   {
        step: 6,
        content:    <FillupInfo />
   },
   {
        step: 7,
        content:    <ConfirmBooking />
   },

]
const Booking = () => {

    const { state, dispatch, bookingValue, stepDetails } = useBookingContext()
    const [ isBookingLoading, setIsBookingLoading ] = React.useState<boolean>(false)


    const submitBookingRequest = React.useMemo(() =>{
        const payload = {
            ...valueToSubmit(bookingValue)
        };
        return new ApiRequestBuilder()
        .setData(payload)
        .setMethod("POST")
        .setUrl('client/bookingProcess/cargoBookingProcess')
    },[bookingValue])

    const handleOnNext = async () => {
        if(!canProceedToNextStep(state, bookingValue)){
            return dispatch({type: "NONE"})
        }
        if(state.step === 7){
            try {
                setIsBookingLoading(true)
                const response: any = await SendApiRequest(submitBookingRequest.build())
                if(response.status === 200){
                    addToast({
                        shouldShowTimeoutProgress: true,
                        timeout: 3000,
                        title: "Booking Successful",
                        description: "Your booking has been successfully processed.",
                        variant: 'flat',
                        color: "success",
                    })
                    dispatch({type: "RESET"})
                }
                return dispatch({type: "RESET"})
            } catch (error) {
                return 
            }finally{
                setIsBookingLoading(false)
            }
        }
        return dispatch({type: "NEXT"})
    }

    console.log(bookingValue)

    const submitButtonContent = () => {

        if(isBookingLoading){
            return "SUBMITTING"
        }
        if(state.step !== 7){
            return 'NEXT'
        }
        return "SUBMIT"
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
                    <Typography variant='info2' className='mt-10'>Booking Progress</Typography>
                    <Progress aria-label="Progress" size="sm" className="max-w-full" value={state.value} />
                </div>

                <Typography variant='h3'>{stepDetails(state).title}</Typography>
                <Typography variant='body2' className='italic'>{stepDetails(state).subtitle}</Typography>

                {BookingStepContent.map((content) => (
                    <React.Fragment key={content.step}>
                        {state.step === content.step && content.content}
                    </React.Fragment>                         
                ))}
                
                <div className='flex gap-4 items-center mt-6'>
                    <Button isDisabled={isBookingLoading} onPress={() => dispatch({type: "BACK"})}>Back</Button>
                    <Button isDisabled={isBookingLoading} isLoading={isBookingLoading} onPress={handleOnNext} color='primary'>{submitButtonContent()}</Button>
                </div>
            </div>  
        </div>
    )
}

export default Booking