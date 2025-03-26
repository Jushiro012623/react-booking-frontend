import React from 'react'

interface IBookingContext {
    bookingValue: any;
    setBookingValue: (bookingValue: any) => void;
    state: StepState;
    dispatch: React.Dispatch<any>;
    stepDetails: (state: any) => any
}

interface StepState {
  step: number;
  value: number;
}

const BookingContext = React.createContext<IBookingContext | undefined>(undefined)

const initialState: any = { step: 1, value: 19 };

const BookingContextReducer = (state: any, action: any) => {
  switch(action.type){
    case "NEXT":
      return {step: Math.min(state.step + 1, 10), value: Math.min(state.value + 15, 100)}
    case "BACK":
      return {step: Math.max(state.step - initialState.step, initialState.step), value: Math.max(state.value - initialState.value, initialState.value)}
    case "NONE":
      return {...state}
    default:
      return state
  }
}

const stepDetails = (state : any) => {
    switch(state.step){
        case 1:
            return { errorMessage: "Please select a voyage.", title:"Where would you like to board with us?", subtitle: "Hop on and let's make your ride unforgettable!" }
        case 2:
            return { errorMessage: "Please select a route.", title:"Lorem ipsum dolor sit amet.", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing." }
        case 3:
            return { errorMessage: "Please select a booking type.", title:"Lorem ipsum dolor sit amet.", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing." }
        case 4:
            return { errorMessage: "Please select fares.", title:"Lorem ipsum dolor sit amet.", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing." }
        case 5:
            return { errorMessage: "Please select initerary.", title:"Lorem ipsum dolor sit amet.", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing." }
        default:
            return { errorMessage: "An error occurred.", title:"Lorem ipsum dolor sit amet.", subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing." }
    }
}

const BookingContextProvider  = ({children}: {children: React.ReactNode}) => {

    const [bookingValue, setBookingValue] = React.useState<any>(null)
    const [state, dispatch] = React.useReducer(BookingContextReducer, initialState)

    const contextValue = React.useMemo(() => ({
        bookingValue, 
        setBookingValue,
        state,
        dispatch,
        stepDetails
    }),[bookingValue, setBookingValue, state, dispatch])
    
  return (
    <BookingContext.Provider value={contextValue}>
        {children}
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