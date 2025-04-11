import { IStepState, IBookingValue } from "@/context/bookingContextProvider";
import { formatToPeso } from "@/helpers/formatToPeso";

/*
    * 
    * GENERATE RANDOM STRINGS FOR REFERENCE NUMBER 
    * 
*/
const GENERATE_TRANSACTION_ID = `RFNS-${Math.random().toString(36).substring(2, 10000000000).toUpperCase()}`;

/**
    *
    * @description validate base on state and if the bookingValue is present in current state 
    * @param {strint} state -current state
    * @param {bookingValue} bookingValue -value to validate
    * @return boolean
    * 
*/
export const canProceedToNextStep = ( state: IStepState, bookingValue: IBookingValue ) => {
    /*
        * 
        * BOOKING VALUE ALIAS 
        * 
    */
    const info = bookingValue?.info;

    /*
        * 
        * HELPERS 
        * 
    */
    const handleStep6Validation = () => {
        if (bookingValue?.booking_type?.id === 1) {
            return (
              !!info?.contact_no &&
              !!info?.discount &&
              !!info?.passenger_name &&
              !!info?.add_ons &&
              !!info?.quantity
            );
        } else if (bookingValue?.booking_type?.id === 2) {
            return (
                !!info?.contact_no && !!info?.plate_number && !!info?.shipper_name
            );
        } else if (bookingValue?.booking_type?.id === 3) {
            return (
                !!info?.contact_no &&
                !!info?.receiver_contact_no &&
                !!info?.receiver_name &&
                !!info?.quantity &&
                !!info?.shipper_name
            );
        } else {
            return false;
        }
    }

    switch (state.step) {
        case 1:
            return !!bookingValue?.voyage;
        case 2:
            return !!bookingValue?.route;
        case 3:
            return !!bookingValue?.booking_type;
        case 4:
            return !!bookingValue?.fare;
        case 5:
            return !!bookingValue?.itineraries;
        case 6:
            return handleStep6Validation()
        case 7:
            return true;
        default:
            return false;
    }
};

/**
    * 
    * @description modified value to submit base on bookingType
    * @param {Object} bookingValue -value to submit
    * @return {value} value to return
    * 
*/
export const valueToSubmit = (bookingValue: IBookingValue) => {
    const values: any = {
        cargo_fare_matrices_code: bookingValue?.fare?.cargo_fare_matrices_code,
        itinerary_code: bookingValue?.itineraries?.itinerary_code,
        contact_no: bookingValue?.info?.contact_no,
        reference_no: GENERATE_TRANSACTION_ID,
        booking_type: bookingValue?.booking_type?.id,
    };
    if (bookingValue?.booking_type?.id === 1) {
        values.add_ons = bookingValue?.info?.add_ons;
        values.discount = bookingValue?.info?.discount;
        values.quantity = bookingValue?.info?.quantity;
        values.passenger_name = bookingValue?.info?.passenger_name;
    }
    if (bookingValue?.booking_type?.id === 2) {
        values.plate_number = bookingValue?.info?.plate_number;
        values.shipper_name = bookingValue?.info?.shipper_name;
    }
    if (bookingValue?.booking_type?.id === 3) {
        values.quantity = bookingValue?.info?.quantity;
        values.shipper_name = bookingValue?.info?.shipper_name;
        values.receiver_contact_no = bookingValue?.info?.receiver_contact_no;
        values.receiver_name = bookingValue?.info?.receiver_name;
    }
    return values;
};

/**
    * 
    * @param {any} bookingValue -booking stored values
    * @returns value formatted to PHP Currency
    * 
*/
export const totalAmout = (bookingValue: any) => {
    let baseFare = Number(bookingValue?.fare?.fare);

    /*
        * 
        * IF NOT PASSENGER RETURN VALUE IMMEDIATELY 
        * 
    */
    if(bookingValue?.booking_type?.id !== 1){
        return bookingValue?.fare?.fare ? formatToPeso(baseFare) : false;
    }


    baseFare = baseFare * (Number(bookingValue?.info?.quantity) || 1);

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

    if (bookingValue?.info?.add_ons === 2) {
        baseFare += Number(bookingValue?.fare?.additional_fee) ?? 0;
    }

    return bookingValue?.fare?.fare ? formatToPeso(baseFare) : false;
};
/**
    * 
    * @description calculate the discount percentage value
    * @param {any} bookingValue -booking stored values
    * @returns discount percentage
    * 
*/
export const percentageValue = (bookingValue: any) => {
    if (!bookingValue?.info?.discount) {
        return false;
    }
    if (
        bookingValue?.info?.discount === "PWD" ||
        bookingValue?.info?.discount === "MINOR" ||
        bookingValue?.info?.discount === "STUDENT"
    ) {
        return "20%";
    }
    if (bookingValue?.info?.discount === "HALF_FARE") {
        return "50%";
    }
    return "0%";
};
