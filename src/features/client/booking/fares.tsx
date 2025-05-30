import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";

import { useApiRequest } from "@/hooks/useApiRequest";
import { ApiRequestBuilder } from "@/service/apiRequestBuilder";
import { useBookingContext } from "@/context/bookingContextProvider";
import { formatToPeso } from "@/helpers/formatToPeso";
import { IBookingValue } from "@/context/bookingContextProvider";
import { TFare } from "@/models/fare";
import ErrorFetchingBooking from "@/components/errorFetchingBooking";
import LogoutModal from "@/components/logoutModal";

/*
 *
 * CONSTANTS
 *
 */
const COLUMNS = [
  { key: "details", label: "DETAILS" },
  { key: "additional_fee", label: "ADDITIONAL_FEE" },
  { key: "fare", label: "FARE" },
];

const Fares = () => {
  /*
   *
   * REACT CONTEXT
   *
   */
  const { bookingValue, setBookingValue } = useBookingContext();

  /*
   *
   * REACT USE MEMO
   *
   */
  const fetchFareMatrice = React.useMemo(
    () =>
      new ApiRequestBuilder("/client/bookingProcess/getFareMatrices")
        .addParam("booking_route_code", bookingValue?.route?.booking_route_code)
        .addParam("booking_type", bookingValue?.booking_type.id),
    [],
  );

  /*
   *
   * CUSTOM HOOKS
   *
   */
  const { data, error, isLoading, refetch } = useApiRequest(fetchFareMatrice);

  /*
   *
   * FETCHING HANDLERS
   *
   */
  if (error?.response?.status === 401) {
    return (
      <LogoutModal
        body={error?.response?.data.message}
        className="px-10"
        title="You've Been Logged Out"
      />
    );
  }
  if (error)
    return <ErrorFetchingBooking isLoading={isLoading} refetch={refetch} />;

  /*
   *
   * HELPERS
   *
   */
  const renderCell = (fare: any, columnKey: any) => {
    const cellValue = fare[columnKey];

    switch (columnKey) {
      case "additional_fee":
        return (
          <React.Fragment>{`${fare.additional_fee == 0 ? "-----" : `${formatToPeso(fare.additional_fee)}`}`}</React.Fragment>
        );
      case "fare":
        return <React.Fragment>{formatToPeso(fare.fare)}</React.Fragment>;
      default:
        return cellValue;
    }
  };

  /*
   *
   * BUTTON HANDLERS
   *
   */
  const handleFareChoose = (key: any) => {
    const fare = JSON.parse(key);

    setBookingValue((prev: IBookingValue) => ({
      ...prev,
      fare,
    }));
  };

  return (
    <div className="mt-10">
      <Table
        isVirtualized
        aria-label="Fare Matrices Table"
        color="primary"
        defaultSelectedKeys={[
          bookingValue?.fare?.cargo_fare_matrices_code ?? "",
        ]}
        maxTableHeight={300}
        selectionBehavior="replace"
        selectionMode="multiple"
      >
        <TableHeader columns={COLUMNS}>
          {(column: { key: string; label: string }) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No fair to display."}
          isLoading={isLoading}
          items={data?.data ?? []}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(fare: TFare) => (
            <TableRow
              key={fare.cargo_fare_matrices_code}
              onClick={() => handleFareChoose(JSON.stringify(fare))}
            >
              {(columnKey) => (
                <TableCell className="cursor-pointer">
                  {renderCell(fare, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Fares;
