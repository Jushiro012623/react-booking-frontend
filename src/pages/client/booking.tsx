import { addToast } from "@heroui/toast";
import { Api as SendApiRequest } from '@/service/axios';
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

const Booking = () => {

    const { state, dispatch, bookingValue, stepDetails } = useBookingContext()

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
            addToast({
                shouldShowTimeoutProgress: true,
                timeout: 3000,
                title: "Booking Error",
                description: stepDetails(state).errorMessage,
                variant: 'flat',
                color: "danger",
            })
            return dispatch({type: "NONE"})
        }
        if(state.step === 7){
            try {
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
                    console.log(await response.data)
                    dispatch({type: "RESET"})
                }
            } catch (error) {
                return
                
            }
        }
        return dispatch({type: "NEXT"})
    }

    console.log(bookingValue)

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
                    <Progress aria-label="Loading..." size="sm" className="max-w-full" value={state.value} />
                </div>

                <Typography variant='h3'>{stepDetails(state).title}</Typography>
                <Typography variant='body2' className='italic'>{stepDetails(state).subtitle}</Typography>
                
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
                {state.step === 6 && <FillupInfo />}
                {state.step === 7 && <ConfirmBooking />}

                <div className='flex gap-4 items-center mt-6'>
                    <Button onPress={() => dispatch({type: "BACK"})}>Back</Button>
                    <Button onPress={handleOnNext} color='primary'>{state.step !== 7 ? "NEXT" : "SUBMIT"}</Button>
                </div>
            </div>  
        </div>
    )
}

export default Booking