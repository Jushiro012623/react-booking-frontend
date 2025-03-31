import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import React from "react";
import { Radio, RadioGroup } from "@heroui/radio";
import { cn } from "@heroui/theme";
import { NumberInput } from "@heroui/number-input";
import { Spacer } from "@heroui/spacer";
import { useBookingContext } from "@/context/bookingContextProvider";

import { IBookingValue } from '@/context/bookingContextProvider'

const contactNumberRegex = /^[0-9]{11}$/;

const AdditionalFeeRadio = (props: any) => {
  const { children, ...otherProps } = props;
  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
      }}>
      {children}
    </Radio>
  );
};
const Passenger = ({ handleOnInputChange, bookingValue }: any) => {
  const discounts = [
    { key: 1, label: "REGULAR", value: "REGULAR" },
    { key: 1, label: "PWD/SENIOR", value: "PWD_SENIOR" },
    { key: 1, label: "HALF FARE", value: "HALF_FARE" },
    { key: 1, label: "MINOR", value: "MINOR" },
    { key: 1, label: "STUDENT", value: "STUDENT" },
  ];
  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row w-full">
        <Input
          className="max-w-full"
          placeholder="Jonoh Nombeng"
          label="Full Name"
          type="text"
          value={bookingValue?.info?.passenger_name}
          onValueChange={(value) =>
            handleOnInputChange(value, "passenger_name")
          }
          validate={(value) => {
            if (!value) {
              return "This field is required";
            }
            if (value.length < 4) {
              return "Name must be atleast longer than 4 characters";
            }
            return null;
          }}
        />
        <Spacer x={5} y={5} />
        <Input
          className="max-w-full"
          placeholder="09XX-XXXX-XXX"
          label="Contact Number"
          type="text"
          name="contact_no"
          value={bookingValue?.info?.contact_no}
          onValueChange={(value: any) =>
            handleOnInputChange(value, "contact_no")
          }
          validate={(value) => {
            if (!value) {
              return "Contact Number is required";
            }
            if (value.length > 11 || value.length < 11) {
              return "Contact Number must be 11 digits long";
            }
            if (!contactNumberRegex.test(value)) {
              return "Contact Number must be a valid contact number";
            }

            return null;
          }}
        />
      </div>
      <Spacer y={5} />
      <div className="flex flex-col md:flex-row w-full">
        <Select
          className="grow"
          items={discounts}
          label="Discount"
          onChange={(event: any) =>
            handleOnInputChange(event.target.value, "discount")
          }
          defaultSelectedKeys={["REGULAR"]}
          placeholder="Select Discount">
          {(discount) => (
            <SelectItem key={discount.value}>{discount.label}</SelectItem>
          )}
        </Select>
        <Spacer x={5} y={5} />
        <NumberInput
          defaultValue={1}
          label="Passenger Quantity"
          placeholder="Enter Passenger Quantity"
          name="quantity"
          value={bookingValue?.info?.quantity}
          onValueChange={(value: any) => handleOnInputChange(value, "quantity")}
          validate={(value) => {
            if (value < 1) {
              return "Quantity must be atleast 1";
            }
            if (value > 100) {
              return "Quantity must be less than 100";
            }
            return null;
          }}
        />
      </div>

      <Spacer y={5} />
      <RadioGroup
        description="Select whether airconditioned or basic ride experience."
        defaultValue={bookingValue?.info?.add_ons}
        label="Add Ons"
        className="w-full"
        onValueChange={(value) => handleOnInputChange(value, "add_ons")}>
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
          className="max-w-full"
          placeholder="Jonoh Nombeng"
          label="Shipper Name"
          type="text"
          value={bookingValue?.info?.shipper_name}
          onValueChange={(value) => handleOnInputChange(value, "shipper_name")}
          validate={(value) => {
            if (!value) {
              return "This field is required";
            }
            if (value.length < 4) {
              return "Name must be atleast longer than 4 characters";
            }
            return null;
          }}
        />
        <Spacer x={5} y={5} />
        <Input
          className="max-w-full"
          placeholder="09XX-XXXX-XXX"
          label="Contact Number"
          type="text"
          name="contact_no"
          value={bookingValue?.info?.contact_no}
          onValueChange={(value: any) =>
            handleOnInputChange(value, "contact_no")
          }
          validate={(value) => {
            if (!value) {
              return "Contact Number is required";
            }
            if (value.length > 11 || value.length < 11) {
              return "Contact Number must be 11 digits long";
            }
            if (!contactNumberRegex.test(value)) {
              return "Contact Number must be a valid contact number";
            }

            return null;
          }}
        />
      </div>
      <Spacer y={5} />
      <div className="flex flex-col md:flex-row w-full">
        <Input
          className="max-w-full"
          placeholder="XXX-XXX-XXX"
          label="Plate Name"
          type="text"
          name="plate_number"
          value={bookingValue?.info?.plate_number}
          onValueChange={(value: any) =>
            handleOnInputChange(value, "plate_number")
          }
          validate={(value) => {
            if (!value) {
              return "This field is required";
            }
            if (value.length < 6) {
              return "Plate Number must be atleast 6 digits long";
            }

            return null;
          }}
        />
        <Spacer x={5} />
        <div className="w-full"> </div>
      </div>
      <Spacer x={5} y={5} />
      <Textarea
        className="max-w-ful"
        label="Description"
        placeholder="Enter your item description"
        name="description"
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
          className="max-w-full"
          placeholder="Jonoh Nombeng"
          label="Shipper Name"
          type="text"
          name="shipper_name"
          value={bookingValue?.info?.shipper_name}
          onValueChange={(value: any) =>
            handleOnInputChange(value, "shipper_name")
          }
          validate={(value) => {
            if (!value) {
              return "This field is required";
            }
            if (value.length < 4) {
              return "Name must be atleast longer than 4 characters";
            }
            return null;
          }}
        />
        <Spacer x={5} y={5} />
        <Input
          className="max-w-full"
          placeholder="09XX-XXXX-XXX"
          label="Shipper Contact Number"
          type="text"
          value={bookingValue?.info?.contact_no}
          onValueChange={(value: any) =>
            handleOnInputChange(value, "contact_no")
          }
          validate={(value) => {
            if (!value) {
              return "Contact Number is required";
            }
            if (value.length > 11 || value.length < 11) {
              return "Contact Number must be 11 digits long";
            }
            if (!contactNumberRegex.test(value)) {
              return "Contact Number must be a valid contact number";
            }

            return null;
          }}
        />
      </div>
      <Spacer y={5} />
      <div className="flex flex-col md:flex-row w-full">
        <Input
          className="max-w-full"
          placeholder="Gol Downey"
          label="Receiver Name"
          type="text"
          value={bookingValue?.info?.receiver_name}
          onValueChange={(value: any) =>
            handleOnInputChange(value, "receiver_name")
          }
          validate={(value) => {
            if (!value) {
              return "This field is required";
            }
            if (value.length < 4) {
              return "Name must be atleast longer than 4 characters";
            }
            return null;
          }}
        />
        <Spacer x={5} y={5} />
        <Input
          className="max-w-full"
          placeholder="09XX-XXXX-XXX"
          label="Receiver Contact Number"
          type="text"
          value={bookingValue?.info?.receiver_contact_no}
          onValueChange={(value: any) =>
            handleOnInputChange(value, "receiver_contact_no")
          }
          validate={(value) => {
            if (!value) {
              return "Contact Number is required";
            }
            if (value.length > 11 || value.length < 11) {
              return "Contact Number must be 11 digits long";
            }
            if (!contactNumberRegex.test(value)) {
              return "Contact Number must be a valid contact number";
            }

            return null;
          }}
        />
      </div>
      <Spacer x={5} y={5} />
      <NumberInput
        defaultValue={1}
        label="Passenger Quantity"
        placeholder="Enter Passenger Quantity"
        name="quantity"
        value={bookingValue?.info?.quantity}
        onValueChange={(value: any) => handleOnInputChange(value, "quantity")}
        validate={(value) => {
          if (value < 1) {
            return "Quantity must be atleast 1";
          }
          if (value > 100) {
            return "Quantity must be less than 100";
          }
          return null;
        }}
      />
      <Spacer x={5} y={5} />
      <Textarea
        className="max-w-ful"
        label="Description"
        placeholder="Enter your item description"
        name="description"
          value={bookingValue?.info?.description}
          onValueChange={(value: any) => handleOnInputChange(value, 'description')}
      />
    </React.Fragment>
  );
};
const FillupInfo = () => {
  const { bookingValue, setBookingValue } = useBookingContext();
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
            handleOnInputChange={handleOnInputChange}
            bookingValue={bookingValue}
          />
        )}
        {bookingValue?.booking_type?.id === 2 && (
          <RollingCargo
            handleOnInputChange={handleOnInputChange}
            bookingValue={bookingValue}
          />
        )}
        {bookingValue?.booking_type?.id === 3 && (
          <DropCargo
            handleOnInputChange={handleOnInputChange}
            bookingValue={bookingValue}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default FillupInfo;
