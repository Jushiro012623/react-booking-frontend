import React from "react";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Image } from "@heroui/image";
import { Divider } from "@heroui/divider";
import { Spacer } from "@heroui/spacer";
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";

import Typography from "@/components/ui/Typography";
import checkIcon from "@/assets/svg/checkIcon.svg";
import { formatToPeso } from "@/helpers/formatToPeso";
import { useBookingContext } from "@/context/bookingContextProvider";
const CompleteBooking = ({ isOpen, onOpenChange, data }: any) => {
  /*
   *
   * REACT CONTEXT
   *
   */
  const { dispatch, setBookingValue } = useBookingContext();

  /*
   *
   * HANDLERS
   *
   */
  const handleOnPress = (onClose: any) => {
    dispatch({ type: "RESET" });
    onClose();
    setBookingValue(null);
  };

  return (
    <React.Fragment>
      <Modal
        hideCloseButton
        backdrop="blur"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        placement="center"
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                <Image
                  alt="check icon"
                  height={40}
                  radius="sm"
                  src={checkIcon}
                  width={40}
                />
                <p className="text-md">Booking Success!</p>
                <p className="text-small text-default-500">
                  Your booking has been successfully done.
                </p>
                <Spacer y={4} />
                <Divider />
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col items-center">
                  <Typography variant="h2">
                    {formatToPeso(data.data.fare.total_amount)}
                  </Typography>
                  <Spacer y={2} />
                  <Typography variant="small">AMOUNT PAYABLE</Typography>
                </div>
                <Divider />
                <Spacer />
                <div className="w-full">
                  <div className="flex w-full justify-between">
                    <Typography variant="small">BOOKING ROUTE</Typography>
                    <Typography className="uppercase" variant="small">
                      {data.data.booking_route.label}
                    </Typography>
                  </div>
                  <Spacer y={4} />
                  {data.data.passenger && (
                    <PassengerInfo passenger={data.data.passenger} />
                  )}
                  {data.data.drop_cargo && (
                    <DropCargoInfo dropCargo={data.data.drop_cargo} />
                  )}
                  {data.data.rolling_cargo && (
                    <RollingCargoInfo rollingCargo={data.data.rolling_cargo} />
                  )}
                  <div className="flex w-full justify-between">
                    <Typography variant="small">TIMESTAMP</Typography>
                    <Typography variant="small">
                      {data.data.created_at || "----"}
                    </Typography>
                  </div>
                  <Spacer y={5} />
                  <Divider />
                </div>
                <Spacer />
                <div className="flex w-full flex-col items-center">
                  <Snippet hideSymbol color="success">
                    {data.data.reference_no}
                  </Snippet>
                  <Spacer y={2} />
                  <Typography variant="small">REFERENCE NUMBER</Typography>
                </div>
                <Divider />
              </ModalBody>
              <ModalFooter>
                <div className="w-full">
                  <Button
                    as={Link}
                    className="w-full"
                    color="primary"
                    href="/booking"
                    variant="flat"
                    onPress={() => handleOnPress(onClose)}
                  >
                    Create Another Booking
                  </Button>
                  <Spacer y={4} />
                  <Button
                    as={Link}
                    className="w-full"
                    color="default"
                    href="/"
                    variant="faded"
                    onPress={() => handleOnPress(onClose)}
                  >
                    Back to Dashboard
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

const PassengerInfo = ({ passenger }: any) => {
  const components = [
    { key: "1", title: "PASSENGER NAME", value: passenger?.passenger_name.toUpperCase() },
    { key: "2", title: "DISCOUNT", value: passenger?.discount },
    {
      key: "3",
      title: "ADD ONS",
      value: passenger?.addons === 1 ? "NONE" : "AIRCONDITIONED",
    },
    { key: "4", title: "QUANTITY", value: passenger?.quantity },
  ];

  return (
    <React.Fragment>
      {components.map((passenger: any) => (
        <React.Fragment key={passenger.key}>
          <div className="flex w-full justify-between">
            <Typography variant="small">{passenger.title}</Typography>
            <Typography variant="small">{passenger.value}</Typography>
          </div>
          <Spacer y={4} />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

const DropCargoInfo = ({ dropCargo }: any) => {
  const components = [
    {
      key: "1",
      title: "SHIPPER NAME",
      value: dropCargo?.shipper_name || "NONE",
    },
    { key: "2", title: "QUANTITY", value: dropCargo?.quantity },
    { key: "3", title: "RECEIVER NAME", value: dropCargo?.receiver_name },
    {
      key: "4",
      title: "RECEIVER CONTACT NO",
      value: dropCargo?.receiver_contact_no,
    },
  ];

  return (
    <React.Fragment>
      {components.map((drop_cargo: any) => (
        <React.Fragment key={drop_cargo.key}>
          <div className="flex w-full justify-between">
            <Typography variant="small">{drop_cargo.title}</Typography>
            <Typography variant="small">{drop_cargo.value}</Typography>
          </div>
          <Spacer y={4} />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

const RollingCargoInfo = ({ rollingCargo }: any) => {
  const components = [
    { key: "1", title: "SHIPPER NAME", value: rollingCargo?.shipper_name },
    { key: "2", title: "PLATE NUMBER", value: rollingCargo?.plate_number },
  ];

  return (
    <React.Fragment>
      {components.map((rolling_cargo: any) => (
        <React.Fragment key={rolling_cargo.key}>
          <div className="flex w-full justify-between">
            <Typography className="uppercase" variant="small">
              {rolling_cargo.title}
            </Typography>
            <Typography className="uppercase" variant="small">
              {rolling_cargo.value}
            </Typography>
          </div>
          <Spacer y={4} />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default CompleteBooking;
