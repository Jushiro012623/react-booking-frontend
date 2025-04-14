import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import React from "react";
import { Radio, RadioGroup } from "@heroui/radio";
import { cn } from "@heroui/theme";
import { NumberInput } from "@heroui/number-input";
import { Spacer } from "@heroui/spacer";

import { useBookingContext } from "@/context/bookingContextProvider";
import { IBookingValue } from "@/context/bookingContextProvider";

/*
 *
 * CONSTANTS
 *
 */
const CONTACT_NUMBER_REGEX = /^[0-9]{11}$/;

const DISCOUNTS = [
  { key: 1, label: "REGULAR", value: "REGULAR" },
  { key: 1, label: "PWD/SENIOR", value: "PWD_SENIOR" },
  { key: 1, label: "HALF FARE", value: "HALF_FARE" },
  { key: 1, label: "MINOR", value: "MINOR" },
  { key: 1, label: "STUDENT", value: "STUDENT" },
];

/*
 *
 * COMPONENTS JSX
 *
 */
const AdditionalFeeRadio = (props: any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary",
        ),
      }}
    >
      {children}
    </Radio>
  );
};
const Passenger = ({ handleOnInputChange, bookingValue }: any) => {
  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row w-full">
        <Input
          isRequired
          className="max-w-full"
          label="Full Name"
          placeholder="Jonoh Nombeng"
          type="text"
          validate={(value) => {
            if (!value) {
              return "This field is required";
            }
            if (value.length < 4) {
              return "Name must be atleast longer than 4 characters";
            }

            return null;
          }}
          value={bookingValue?.info?.passenger_name}
          onValueChange={(value) =>
            handleOnInputChange(value, "passenger_name")
          }
        />
        <Spacer x={5} y={5} />
        <Input
          isRequired
          className="max-w-full"
          label="Contact Number"
          name="contact_no"
          placeholder="09XX-XXXX-XXX"
          type="text"
          validate={(value) => {
            if (!value) {
              return "Contact Number is required";
            }
            if (value.length > 11 || value.length < 11) {
              return "Contact Number must be 11 digits long";
            }
            if (!CONTACT_NUMBER_REGEX.test(value)) {
              return "Contact Number must be a valid contact number";
            }

            return null;
          }}
          value={bookingValue?.info?.contact_no}
          onValueChange={(value: any) =>
            handleOnInputChange(value, "contact_no")
          }
        />
      </div>
      <Spacer y={5} />
      <div className="flex flex-col md:flex-row w-full">
        <Select
          isRequired
          className="grow"
          defaultSelectedKeys={["REGULAR"]}
          items={DISCOUNTS}
          label="Discount"
          placeholder="Select Discount"
          onChange={(event: any) =>
            handleOnInputChange(event.target.value, "discount")
          }
        >
          {(discount) => (
            <SelectItem key={discount.value}>{discount.label}</SelectItem>
          )}
        </Select>
        <Spacer x={5} y={5} />
        <NumberInput
          isRequired
          defaultValue={1}
          label="Passenger Quantity"
          name="quantity"
          placeholder="Enter Passenger Quantity"
          validate={(value) => {
            if (value < 1) {
              return "Quantity must be atleast 1";
            }
            if (value > 100) {
              return "Quantity must be less than 100";
            }

            return null;
          }}
          value={bookingValue?.info?.quantity}
          onValueChange={(value: any) => handleOnInputChange(value, "quantity")}
        />
      </div>

      <Spacer y={5} />
      <RadioGroup
        isRequired
        className="w-full"
        defaultValue={bookingValue?.info?.add_ons}
        description="Select whether airconditioned or basic ride experience."
        label="Add Ons"
        onValueChange={(value) => handleOnInputChange(value, "add_ons")}
      >
        <AdditionalFeeRadio description="Airconditioned Voyages" value={2}>
          Airconditioned
        </AdditionalFeeRadio>
        <Spacer y={1} />
        <AdditionalFeeRadio description="Basic Voyages" value={1}>
          Basic
        </AdditionalFeeRadio>
      </RadioGroup>
    </React.Fragment>
  );
};
const RollingCargo = ({ bookingValue, handleOnInputChange }: any) => {
  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row w-full">
        <Input
          isRequired
          className="max-w-full"
          label="Shipper Name"
          placeholder="Jonoh Nombeng"
          type="text"
          validate={(value) => {
            if (!value) {
              return "This field is required";
            }
            if (value.length < 4) {
              return "Name must be atleast longer than 4 characters";
            }

            return null;
          }}
          value={bookingValue?.info?.shipper_name}
          onValueChange={(value) => handleOnInputChange(value, "shipper_name")}
        />
        <Spacer x={5} y={5} />
        <Input
          isRequired
          className="max-w-full"
          label="Contact Number"
          name="contact_no"
          placeholder="09XX-XXXX-XXX"
          type="text"
          validate={(value) => {
            if (!value) {
              return "Contact Number is required";
            }
            if (value.length > 11 || value.length < 11) {
              return "Contact Number must be 11 digits long";
            }
            if (!CONTACT_NUMBER_REGEX.test(value)) {
              return "Contact Number must be a valid contact number";
            }

            return null;
          }}
          value={bookingValue?.info?.contact_no}
          onValueChange={(value: any) =>
            handleOnInputChange(value, "contact_no")
          }
        />
      </div>
      <Spacer y={5} />
      <div className="flex flex-col md:flex-row w-full">
        <Input
          isRequired
          className="max-w-full"
          label="Plate Name"
          name="plate_number"
          placeholder="XXX-XXX-XXX"
          type="text"
          validate={(value) => {
            if (!value) {
              return "This field is required";
            }
            if (value.length < 6) {
              return "Plate Number must be atleast 6 digits long";
            }

            return null;
          }}
          value={bookingValue?.info?.plate_number}
          onValueChange={(value: any) =>
            handleOnInputChange(value, "plate_number")
          }
        />
        <Spacer x={5} />
        <div className="w-full"> </div>
      </div>
      <Spacer x={5} y={5} />
      <Textarea
        className="max-w-ful"
        label="Description"
        name="description"
        placeholder="Enter your item description"
        value={bookingValue?.info?.description}
        onValueChange={(value: any) =>
          handleOnInputChange(value, "description")
        }
      />
    </React.Fragment>
  );
};
const DropCargo = ({ bookingValue, handleOnInputChange }: any) => {
  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row w-full">
        <Input
          isRequired
          className="max-w-full"
          label="Shipper Name"
          name="shipper_name"
          placeholder="Jonoh Nombeng"
          type="text"
          validate={(value) => {
            if (!value) {
              return "This field is required";
            }
            if (value.length < 4) {
              return "Name must be atleast longer than 4 characters";
            }

            return null;
          }}
          value={bookingValue?.info?.shipper_name}
          onValueChange={(value: any) =>
            handleOnInputChange(value, "shipper_name")
          }
        />
        <Spacer x={5} y={5} />
        <Input
          isRequired
          className="max-w-full"
          label="Shipper Contact Number"
          placeholder="09XX-XXXX-XXX"
          type="text"
          validate={(value) => {
            if (!value) {
              return "Contact Number is required";
            }
            if (value.length > 11 || value.length < 11) {
              return "Contact Number must be 11 digits long";
            }
            if (!CONTACT_NUMBER_REGEX.test(value)) {
              return "Contact Number must be a valid contact number";
            }

            return null;
          }}
          value={bookingValue?.info?.contact_no}
          onValueChange={(value: any) =>
            handleOnInputChange(value, "contact_no")
          }
        />
      </div>
      <Spacer y={5} />
      <div className="flex flex-col md:flex-row w-full">
        <Input
          isRequired
          className="max-w-full"
          label="Receiver Name"
          placeholder="Gol Downey"
          type="text"
          validate={(value) => {
            if (!value) {
              return "This field is required";
            }
            if (value.length < 4) {
              return "Name must be atleast longer than 4 characters";
            }

            return null;
          }}
          value={bookingValue?.info?.receiver_name}
          onValueChange={(value: any) =>
            handleOnInputChange(value, "receiver_name")
          }
        />
        <Spacer x={5} y={5} />
        <Input
          isRequired
          className="max-w-full"
          label="Receiver Contact Number"
          placeholder="09XX-XXXX-XXX"
          type="text"
          validate={(value) => {
            if (!value) {
              return "Contact Number is required";
            }
            if (value.length > 11 || value.length < 11) {
              return "Contact Number must be 11 digits long";
            }
            if (!CONTACT_NUMBER_REGEX.test(value)) {
              return "Contact Number must be a valid contact number";
            }

            return null;
          }}
          value={bookingValue?.info?.receiver_contact_no}
          onValueChange={(value: any) =>
            handleOnInputChange(value, "receiver_contact_no")
          }
        />
      </div>
      <Spacer x={5} y={5} />
      <NumberInput
        isRequired
        defaultValue={1}
        label="Item Quantity"
        name="quantity"
        placeholder="Enter Passenger Quantity"
        validate={(value) => {
          if (value < 1) {
            return "Quantity must be atleast 1";
          }
          if (value > 100) {
            return "Quantity must be less than 100";
          }

          return null;
        }}
        value={bookingValue?.info?.quantity}
        onValueChange={(value: any) => handleOnInputChange(value, "quantity")}
      />
      <Spacer x={5} y={5} />
      <Textarea
        className="max-w-ful"
        label="Description"
        name="description"
        placeholder="Enter your item description"
        value={bookingValue?.info?.description}
        onValueChange={(value: any) =>
          handleOnInputChange(value, "description")
        }
      />
    </React.Fragment>
  );
};

/*
 *
 * JSX PRESENTER
 *
 */
const FillupInfo = () => {
  /*
   *
   * REACT CONTEXT
   *
   */
  const { bookingValue, setBookingValue } = useBookingContext();

  /*
   *
   * HANDLERS
   *
   */
  const handleOnInputChange = (value: any, name: string) => {
    setBookingValue((prev: IBookingValue) => ({
      ...prev,
      info: { ...prev?.info, [name]: value },
    }));
  };

  return (
    <React.Fragment>
      <div className="w-full flex flex-col mt-10">
        {bookingValue?.booking_type?.id === 1 && (
          <Passenger
            bookingValue={bookingValue}
            handleOnInputChange={handleOnInputChange}
          />
        )}
        {bookingValue?.booking_type?.id === 2 && (
          <RollingCargo
            bookingValue={bookingValue}
            handleOnInputChange={handleOnInputChange}
          />
        )}
        {bookingValue?.booking_type?.id === 3 && (
          <DropCargo
            bookingValue={bookingValue}
            handleOnInputChange={handleOnInputChange}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default FillupInfo;
