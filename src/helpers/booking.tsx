import { ChipProps } from "@heroui/chip";

export const columns = [
  { name: "REFERENCE NUMBER", uid: "reference" },
  { name: "BOOKED BY", uid: "customer" },
  { name: "BOOKING DETAILS", uid: "booking" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export const statusColorMap: Record<string, ChipProps["color"]> = {
  0: "default",
  1: "warning",
  2: "success",
  3: "danger",
};

export const bookingType: any = {
  1: "Passenger",
  2: "Rolling Cargo",
  3: "Drop Cargo",
};

export const statusValue: any = {
  0: "Pending",
  1: "On Board",
  2: "Success",
  3: "Canceled",
};

export const voyage: any = {
  0: "Argo 1",
  1: "Argo 2",
  2: "SUDA",
};
