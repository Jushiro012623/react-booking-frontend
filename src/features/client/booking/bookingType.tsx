import { Card } from "@heroui/card";
import React from "react";

import Typography from "@/components/ui/Typography";
import { useBookingContext } from "@/context/bookingContextProvider";
import { IBookingValue } from "@/context/bookingContextProvider";
import { TBookingType } from "@/models/bookingType";

/*
 *
 * MOCK BOOKING TYPE VALUES
 *
 */
const BOOKING_TYPE = [
  { id: 1, name: "PASSENGER" },
  { id: 2, name: "ROLLING CARGO" },
  { id: 3, name: "DROP CARGO" },
];

const BookingType = () => {
  /*
   *
   * CUSTOM CONTEXT
   *
   */
  const { setBookingValue, dispatch, bookingValue } = useBookingContext();

  /*
   *
   * HANDLERS
   *
   */
  const handleOnBookingTypeChoose = (event: any) => {
    const booking_type: any = JSON.parse(event.target.value);

    setBookingValue((prev: IBookingValue) => ({
      ...prev,
      fare: null,
      itineraries: null,
      info: { discount: "REGULAR", quantity: 1 },
      booking_type,
    }));

    dispatch({ type: "NEXT" });
  };

  return (
    <React.Fragment>
      {BOOKING_TYPE.map((bookingType: TBookingType) => (
        <Card
          key={bookingType.id}
          isHoverable
          isPressable
          className={`h-full w-full ${bookingValue?.booking_type?.name === bookingType.name ? "ring ring-blue-100" : null}`}
        >
          <label className="h-full w-full p-2 text-center flex flex-col justify-center gap-2  cursor-pointer">
            <Typography className="tracking-wider uppercase" variant="h2">
              {bookingType.name}
            </Typography>
            <input
              className="hidden"
              name="voyage_code"
              type="radio"
              value={JSON.stringify(bookingType)}
              onChange={handleOnBookingTypeChoose}
            />
          </label>
        </Card>
      ))}
    </React.Fragment>
  );
};

export default BookingType;
