import { Button } from "@heroui/button";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/drawer";
import { useDisclosure } from "@heroui/modal";
import { Divider } from "@heroui/divider";

import Typography from "./ui/Typography";

import { useBookingContext } from "@/context/bookingContextProvider";
import { formatToPeso } from "@/helpers/formatToPeso";
import { percentageValue, totalAmout } from "@/utils/bookingValidations";
const BookingDrawer = () => {
  /*
   *
   * HERO UI HOOKS
   *
   */
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  /*
   *
   * CUSTOM CONTEXT
   *
   */
  const { bookingValue } = useBookingContext();

  return (
    <div className="absolute top-0 right-10">
      <Button color="primary" onPress={onOpen}>
        View Summary
      </Button>
      <Drawer isOpen={isOpen} size="xs" onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                <Typography>Booking Summary</Typography>
                <Divider className="my-4" />
              </DrawerHeader>
              <DrawerBody>
                <div className="w-full flex items-center justify-between">
                  <Typography variant="small">VOYAGE</Typography>
                  <Typography variant="small">
                    {bookingValue?.voyage?.label || "----"}
                  </Typography>
                </div>
                <Divider className="my-1" />
                <div className="w-full flex items-center justify-between">
                  <Typography variant="small">ROUTE</Typography>
                  {bookingValue?.route ? (
                    <div className="flex gap-2">
                      <Typography
                        className="uppercase"
                        color={
                          bookingValue?.route?.transportation_type == "in"
                            ? "secondary"
                            : "danger"
                        }
                        variant="small"
                      >
                        {bookingValue?.route?.transportation_type}
                      </Typography>
                      <Typography className="uppercase" variant="small">
                        {bookingValue?.route?.label || "----"}
                      </Typography>
                    </div>
                  ) : (
                    <Typography variant="small">----</Typography>
                  )}
                </div>
                <Divider className="my-1" />
                <div className="w-full flex items-center justify-between">
                  <Typography variant="small">BOOKING TYPE</Typography>
                  <Typography variant="small">
                    {bookingValue?.booking_type?.name || "----"}
                  </Typography>
                </div>
                <Divider className="my-1" />
                <div className="w-full flex items-center justify-between">
                  <Typography variant="small">DEPARTURE DATE</Typography>
                  {bookingValue?.itineraries ? (
                    <div className="flex gap-2">
                      <Typography className="uppercase" variant="small">
                        {bookingValue?.itineraries?.arrival_date}
                      </Typography>
                      <Typography className="uppercase" variant="small">
                        {bookingValue?.itineraries?.arrival_time}
                      </Typography>
                    </div>
                  ) : (
                    <Typography variant="small">----</Typography>
                  )}
                </div>
                <Divider className="my-1" />
                <div className="w-full flex items-center justify-between">
                  <Typography variant="small">ARRIVAL DATE</Typography>
                  {bookingValue?.itineraries ? (
                    <div className="flex gap-2">
                      <Typography className="uppercase" variant="small">
                        {bookingValue?.itineraries?.departure_date}
                      </Typography>
                      <Typography className="uppercase" variant="small">
                        {bookingValue?.itineraries?.departure_time}
                      </Typography>
                    </div>
                  ) : (
                    <Typography variant="small">----</Typography>
                  )}
                </div>
                <Divider className="my-1" />
                <div className="w-full flex items-center justify-between">
                  <Typography variant="small">DECLARED AMOUNT</Typography>
                  <Typography variant="small">
                    {bookingValue?.fare?.fare
                      ? formatToPeso(bookingValue?.fare?.fare)
                      : "----"}
                  </Typography>
                </div>
                <Divider className="my-1" />
                <div className="w-full flex items-center justify-between">
                  <Typography variant="small">ADDITIONAL FEE</Typography>
                  <Typography variant="small">
                    {bookingValue?.info?.add_ons === 2
                      ? formatToPeso(bookingValue?.fare?.additional_fee)
                      : formatToPeso(0)}
                  </Typography>
                </div>
                <Divider className="my-1" />
                <div className="w-full flex items-center justify-between">
                  <Typography variant="small">DISCOUNT</Typography>
                  <Typography variant="small">
                    {percentageValue(bookingValue) || "----"}
                  </Typography>
                </div>
                <Divider className="my-1" />
                <div className="w-full flex items-center justify-between">
                  <Typography variant="small">QUANTITY</Typography>
                  <Typography variant="small">
                    {bookingValue?.info?.quantity || "----"}
                  </Typography>
                </div>
                <Divider className="my-1" />
                <div className="w-full flex items-center justify-between mt-10">
                  <Typography color="primary" variant="h6">
                    TOTAL AMOUNT
                  </Typography>
                  <Typography variant="small">
                    {totalAmout(bookingValue) || "----"}
                  </Typography>
                </div>
                <Divider className="my-1" />
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default BookingDrawer;
