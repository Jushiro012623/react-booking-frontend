import React from "react";
import { useApiRequest } from "@/hooks/useApiRequest";
import { ApiRequestBuilder } from "@/service/apiRequestBuilder";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";

import { useBookingContext } from "@/context/bookingContextProvider";
import { Spinner } from "@heroui/spinner";
import { formatToPeso } from "@/helpers/formatToPeso";
import { IBookingValue } from '@/context/bookingContextProvider'
import { TFare } from "@/models/fare";
import ErrorFetchingBooking from "@/components/errorFetchingBooking";

const columns = [
  { key: "details", label: "DETAILS" },
  { key: "additional_fee", label: "ADDITIONAL_FEE" },
  { key: "fare", label: "FARE" },
];

const Fares = () => {
  const { bookingValue, setBookingValue } = useBookingContext();

  const fetchFareMatrice = React.useMemo(
    () =>
      new ApiRequestBuilder()
        .setUrl(`/client/bookingProcess/getFareMatrices`)
        .addParam("booking_route_code", bookingValue?.route?.booking_route_code)
        .addParam("booking_type", bookingValue?.booking_type.id),
    []
  );

  const { data, error, isLoading, refetch} = useApiRequest(fetchFareMatrice);

  if(error) return <ErrorFetchingBooking refetch={refetch} isLoading={isLoading} />;

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
          color="primary"
          aria-label="Fare Matrices Table"
          selectionMode="multiple"
          selectionBehavior="replace"
          defaultSelectedKeys={[
            bookingValue?.fare?.cargo_fare_matrices_code ?? "",
          ]}
          maxTableHeight={300}>
          <TableHeader columns={columns}>
            {(column: {key: string, label: string}) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={data ?? []}
            isLoading={isLoading}
            emptyContent={"No fair to display."}
            loadingContent={<Spinner label="Loading..." />}>
            {(fare: TFare) => (
              <TableRow
                key={fare.cargo_fare_matrices_code}
                onClick={() => handleFareChoose(JSON.stringify(fare))}>
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
