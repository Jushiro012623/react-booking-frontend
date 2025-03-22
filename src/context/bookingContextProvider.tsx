import React from 'react'

interface IBookingContext {
    bookingValue: any;
    setBookingValue: (bookingValue: any) => void;
}

const BookingContext = React.createContext<IBookingContext | undefined>(undefined)

const BookingContextProvider  = ({children}: {children: React.ReactNode}) => {
    const [bookingValue, setBookingValue] = React.useState<any>(null)
    const contextValue = React.useMemo(() => ({
        bookingValue, 
        setBookingValue
    }),[bookingValue, setBookingValue])
    
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