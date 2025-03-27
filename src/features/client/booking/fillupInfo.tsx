import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import React from "react";
import { Radio, RadioGroup } from "@heroui/radio";
import { cn } from "@heroui/theme";
import { NumberInput } from "@heroui/number-input";
import { Spacer } from "@heroui/spacer";
import { useBookingContext } from "@/context/bookingContextProvider";
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

const Passenger = () => {
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
        />
        <Spacer x={5} y={5} />
        <Input
          className="max-w-full"
          placeholder="09123456789"
          label="Contact Number"
          type="text"
        />
      </div>
      <Spacer y={5} />
      <div className="flex flex-col md:flex-row w-full">
        <Select
          className="grow"
          items={discounts}
          label="Discount"
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
        />
      </div>

      <Spacer y={5} />
      <RadioGroup
        description="Select whether airconditioned or basic ride experience."
        label="Add Ons"
        className="w-full">
        <AdditionalFeeRadio description="Airconditioned Voyages" value="true">
          Airconditioned
        </AdditionalFeeRadio>
        <Spacer y={1} />
        <AdditionalFeeRadio description="Basic Voyages" value="false">
          Basic
        </AdditionalFeeRadio>
      </RadioGroup>
    </React.Fragment>
  );
};

const RollingCargo = () => {
  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row w-full">
        <Input
          className="max-w-full"
          placeholder="Jonoh Nombeng"
          label="Shipper Name"
          type="text"
        />
        <Spacer x={5} y={5} />
        <Input
          className="max-w-full"
          placeholder="09123456789"
          label="Contact Number"
          type="text"
        />
      </div>
      <Spacer y={5} />
      <div className="flex flex-col md:flex-row w-full">
        <Input
          className="max-w-full"
          placeholder="ZXY-CVW-903"
          label="Plate Name"
          type="text"
        />
        <Spacer x={5} />
        <div className="w-full"> </div>
      </div>
      <Spacer x={5} y={5} />
      <Textarea
        className="max-w-ful"
        label="Description"
        placeholder="Enter your item description"
      />
    </React.Fragment>
  );
};
const DropCargo = () => {
  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row w-full">
        <Input
          className="max-w-full"
          placeholder="Jonoh Nombeng"
          label="Shipper Name"
          type="text"
        />
        <Spacer x={5} y={5} />
        <Input
          className="max-w-full"
          placeholder="09123456789"
          label="Shipper Contact Number"
          type="text"
        />
      </div>
      <Spacer y={5} />
      <div className="flex flex-col md:flex-row w-full">
        <Input
          className="max-w-full"
          placeholder="Gol Downey"
          label="Receiver Name"
          type="text"
        />
        <Spacer x={5} y={5} />
        <Input
          className="max-w-full"
          placeholder="09198765432"
          label="Receiver Contact Number"
          type="text"
        />
      </div>
      <Spacer x={5} y={5} />
      <NumberInput
        defaultValue={1}
        label="Passenger Quantity"
        placeholder="Enter Passenger Quantity"
      />
      <Spacer x={5} y={5} />
      <Textarea
        className="max-w-ful"
        label="Description"
        placeholder="Enter your item description"
      />
    </React.Fragment>
  );
};
const FillupInfo = () => {
  const { bookingValue } = useBookingContext();
  return (
    <React.Fragment>
      <div className="w-full flex flex-col mt-10">
        {bookingValue?.booking_type?.id === 1 && <Passenger />}
        {bookingValue?.booking_type?.id === 2 && <RollingCargo />}
        {bookingValue?.booking_type?.id === 3 && <DropCargo />}
      </div>
    </React.Fragment>
  );
};

export default FillupInfo;
