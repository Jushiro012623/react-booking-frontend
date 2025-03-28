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
import FillupInfo from '@/features/client/booking/fillupInfo';
import ConfirmBooking from '@/features/client/booking/confirmBooking';
import { Api } from '@/service/axios';
import { ApiRequestBuilder } from '@/service/apiRequestBuilder';
import React from 'react';

const Booking = () => {

    const { state, dispatch, bookingValue, stepDetails } = useBookingContext()

    const GENERATE_TRANSACTION_ID = `RFN-${Math.random().toString(36).substring(2, 10000000000).toUpperCase()} `

    const valueToSubmit = () => {
        const values: any = {
            cargo_fare_matrices_code: bookingValue?.fare?.cargo_fare_matrices_code,
            itinerary_code: bookingValue?.itineraries?.itinerary_code,
            contact_no: bookingValue?.info?.contact_no,
            reference_no: GENERATE_TRANSACTION_ID,
            booking_type: bookingValue?.booking_type?.id,
        }
        if( bookingValue?.booking_type?.id === 1 ){
            values.add_ons = bookingValue?.info?.add_ons
            values.discount = bookingValue?.info?.discount
            values.quantity = bookingValue?.info?.quantity
            values.passenger_name = bookingValue?.info?.passenger_name
        }
        if( bookingValue?.booking_type?.id === 2 ){
            values.plate_number = bookingValue?.info?.plate_number
            values.shipper_name = bookingValue?.info?.shipper_name
        }
        if( bookingValue?.booking_type?.id === 3 ){
            values.quantity = bookingValue?.info?.quantity
            values.shipper_name = bookingValue?.info?.shipper_name
            values.receiver_contact_no = bookingValue?.info?.receiver_contact_no
            values.receiver_name = bookingValue?.info?.receiver_name
        }
        return values
    }
    const info = bookingValue?.info;
    const submitBookingRequest = React.useMemo(() =>{
        const payload = {
            ...valueToSubmit()
        };
        console.log(payload)
        return new ApiRequestBuilder()
        .setData(payload)
        .setMethod("POST")
        .setUrl('client/bookingProcess/cargoBookingProcess')
    },[bookingValue])

    const canProceedToNextStep = () => {
        switch(state.step){
            case 1:
                return !!bookingValue?.voyage
            case 2:
                return !!bookingValue?.route
            case 3:
                return !!bookingValue?.booking_type
            case 4:
                return !!bookingValue?.fare
            case 5:
                return !!bookingValue?.itineraries
            case 6:
                if(bookingValue?.booking_type?.id === 1){
                    return !!info?.contact_no && !!info?.discount && !!info?.passenger_name && !!info?.add_ons && !!info?.quantity
                }else if(bookingValue?.booking_type?.id === 2){
                    return !!info?.contact_no && !!info?.plate_number && !!info?.shipper_name
                }else if(bookingValue?.booking_type?.id === 3){
                    return !!info?.contact_no && !!info?.receiver_contact_no && !!info?.receiver_name && !!info?.quantity && !!info?.shipper_name
                }else{
                    return false
                }
            case 7:
                return true
            default:
                return false
        }

    }
    const handleOnNext = async () => {
        if(canProceedToNextStep()){
            if(state.step === 7){
                try {
                    const response: any = await Api(submitBookingRequest.build())
                    if(response.status === 200){
                        addToast({
                            shouldShowTimeoutProgress: true,
                            timeout: 3000,
                            title: "Booking Successful",
                            description: "Your booking has been successfully processed. You will receive a confirmation email shortly.",
                            variant: 'flat',
                            color: "success",
                        })
                        console.log(await response.data)
                        dispatch({type: "RESET"})
                    }
                } catch (error) {
                    
                }
                return
            }
            return dispatch({type: "NEXT"})

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