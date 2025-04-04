import React from 'react'
import { useAuthContext } from './authContextProvider';
import { TFare } from '@/models/fare';
import { TVoyage } from '@/models/voyages';
import { TRoute } from '@/models/routes';
import { TJourney } from '@/models/journey';
import { TBookingType } from '@/models/bookingType';
interface IBookingContext {
    bookingValue: any;
    setBookingValue: (bookingValue: any) => void;
    state: IStepState;
    dispatch: React.Dispatch<any>;
    stepDetails: (state: any) => any
}
export interface IStepState {
  step: number;
  value: number;
}
interface IStepDetails {
    errorMessage: string;
    title: string;
    subtitle: string;
    stepProgress: string;
}
export interface IBookingValue {
    fare: TFare;
    voyage: TVoyage;
    route: TRoute
    itineraries: TJourney
    info: any;
    booking_type: TBookingType
}

const initialState: IStepState = { step: 1, value: 0 };

const stepDetails = (state : { step: number }):  IStepDetails => {
    switch(state.step){
        case 1:
            return { errorMessage: "Please select a voyage.", title:"Where would you like to board with us?", subtitle: "Select your preferred voyage to begin.", stepProgress: "Let's Begin" }
        case 2:
            return { errorMessage: "Please select a route.", title:"Where would you like to go?", subtitle: "Select your preferred route for the journey.", stepProgress: "" }
        case 3:
            return { errorMessage: "Please select a booking type.", title:"What type of booking would you like?", subtitle: "Choose the booking type that suits your need.", stepProgress: "" }
        case 4:
            return { errorMessage: "Please select fares.", title:"Which fare option would you prefer", subtitle: "Select the fare that best suits your needs.", stepProgress: "" }
        case 5:
            return { errorMessage: "Please select initerary.", title:"Which itinerary  suits you?", subtitle: "Choose your preferred schedule for the trip.", stepProgress: "" }
        case 6:
            return { errorMessage: "Please fill up all fields.", title:"What information do we need from you?", subtitle: "Please fill in the details to complete your booking.", stepProgress: "" }
        case 7:
            return { errorMessage: "Please agree to terms and conditions.", title:"Ready to confirm your booking?", subtitle: "Take a moment to review your booking  summary.", stepProgress: "" }
        default:
            return { errorMessage: "An error occurred.", title:"Lorem ipsum dolor sit amet.", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing.", stepProgress: "" }
    }
}

const BookingContextReducer = (state: IStepState, action: any) => {
  switch(action.type){
    case "NEXT":
      return {step: Math.min(state.step + 1, 7), value: Math.min(state.value + 16.66666666666667, 100)}
    case "BACK":
      return {step: Math.max(state.step - initialState.step, initialState.step), value: Math.max(state.value - 16.66666666666667, initialState.value)}
    case "RESET":
      return initialState
    case "NONE":
      return {...state}
    default: 
      return state
  }
}

const BookingContext = React.createContext<IBookingContext | undefined>(undefined)

const BookingContextProvider  = ({children}: {children: React.ReactNode}) => {

    const {isLoggedIn, token} = useAuthContext()
    const [bookingValue, setBookingValue] = React.useState<IBookingValue | null>(null)
    const [state, dispatch] = React.useReducer(BookingContextReducer, initialState)

    React.useEffect(() => {
        if(isLoggedIn()){
            setBookingValue(null)
            dispatch({type: 'RESET'})
        }
    }, [token])

    const contextValue = React.useMemo(() => ({
        bookingValue, 
        setBookingValue,
        state,
        dispatch,
        stepDetails
    }),[bookingValue, setBookingValue, state, dispatch])
    
  return (
    <BookingContext.Provider value={contextValue}>
        { children }
    </BookingContext.Provider>
  )
}

export const useBookingContext = () : IBookingContext => {
  const context = React.useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingContextProvider");
  }
  return context;
};


export default BookingContextProvider 