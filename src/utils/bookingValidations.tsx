import { IStepState, IBookingValue } from "@/context/bookingContextProvider"

const GENERATE_TRANSACTION_ID = `RFN-${Math.random().toString(36).substring(2, 10000000000).toUpperCase()}`

export const canProceedToNextStep = (state: IStepState, bookingValue: IBookingValue) => {
    
    const info = bookingValue?.info;

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

export const valueToSubmit = (bookingValue: IBookingValue) => {
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