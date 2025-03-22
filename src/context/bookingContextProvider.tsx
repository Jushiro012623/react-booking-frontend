import React from 'react'

interface IBookingContext {
    bookingValue: any;
    setBookingValue: (bookingValue: any) => void;
    state: StepState;
    dispatch: React.Dispatch<any>;
}

interface StepState {
  step: number;
  value: number;
}

const BookingContext = React.createContext<IBookingContext | undefined>(undefined)

const initialState: any = { step: 1, value: 10 };

const BookingContextReducer = (state: any, action: any) => {
  switch(action.type){
    case "NEXT":
      return {step: Math.min(state.step + 1, 5), value: Math.min(state.value + 10, 100)}
    case "BACK":
      return {step: Math.max(state.step - 1, 1), value: Math.max(state.value - 10, 10)}
    case "NONE":
      return {...state}
    default:
      return state
  }
}

const BookingContextProvider  = ({children}: {children: React.ReactNode}) => {

    const [bookingValue, setBookingValue] = React.useState<any>(null)
    const [state, dispatch] = React.useReducer(BookingContextReducer, initialState)

    const contextValue = React.useMemo(() => ({
        bookingValue, 
        setBookingValue,
        state,
        dispatch
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