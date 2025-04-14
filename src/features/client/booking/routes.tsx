import React from "react";
import { Select, SelectItem } from "@heroui/select";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Skeleton } from "@heroui/skeleton";

import { useApiRequest } from "@/hooks/useApiRequest";
import { ApiRequestBuilder } from "@/service/apiRequestBuilder";
import Typography from "@/components/ui/Typography";
import { useBookingContext } from "@/context/bookingContextProvider";
import { IBookingValue } from "@/context/bookingContextProvider";
import { TRoute } from "@/models/routes";
import ErrorFetchingBooking from "@/components/errorFetchingBooking";
import LogoutModal from "@/components/logoutModal";

const Routes = () => {
  /*
   *
   * REACT CONTEXT
   *
   */
  const { setBookingValue, bookingValue } = useBookingContext();

  /*
   *
   * REACT USE STATES
   *
   */
  const [transpoType, setTranspoType] = React.useState<any | null>(
    bookingValue?.route?.transportation_type || null,
  );

  /*
   *
   * REACT MEMOS
   *
   */
  const fetchVoyagesFromAPI = React.useMemo(
    () =>
      new ApiRequestBuilder().setUrl(`/client/bookingProcess/getRoutesList`),
    [],
  );

  /*
   *
   * CUSTOM HOOKS
   *
   */
  const { data, error, isLoading, refetch } =
    useApiRequest(fetchVoyagesFromAPI);

  /*
   *
   * HANDLERS
   *
   */
  const handleSelectingTranspoType = (event: any) => {
    setBookingValue((prev: IBookingValue) => ({
      ...prev,
      route: null,
    }));
    setTranspoType(event.target.value);
  };

  const handleSelectingRoute = async (event: any) => {
    const route = await data?.data?.find(
      (route: TRoute) => route.booking_route_code === event.target.value,
    );

    setBookingValue((prev: IBookingValue) => ({
      ...prev,
      fare: null,
      itineraries: null,
      route,
    }));
  };

  const isSelectionDisable =
    transpoType == "" || transpoType == null ? true : false;

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

  return (
    <React.Fragment>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-10">
        <Skeleton className="w-full rounded-lg" isLoaded={!isLoading}>
          <div className="w-xs rounded-lg">
            <Select
              isRequired
              className="max-w-xs"
              defaultSelectedKeys={[transpoType]}
              label="Transportation Type"
              onChange={handleSelectingTranspoType}
            >
              <SelectItem key="in">IN</SelectItem>
              <SelectItem key="out">OUT</SelectItem>
            </Select>
          </div>
        </Skeleton>
        <Skeleton className="w-full rounded-lg" isLoaded={!isLoading}>
          <div className="w-xs rounded-lg">
            <Select
              isRequired
              className="max-w-full"
              defaultSelectedKeys={[bookingValue?.route?.booking_route_code]}
              isDisabled={isSelectionDisable}
              items={
                data?.data
                  ? data?.data?.filter(
                      (route: any) => route.transportation_type === transpoType,
                    )
                  : []
              }
              label="Route"
              onChange={handleSelectingRoute}
            >
              {(route: TRoute) => (
                <SelectItem
                  key={route.booking_route_code}
                  textValue={route.label}
                >
                  <div className="flex justify-between">
                    <Typography>{route.origin}</Typography>
                    <FaLongArrowAltRight />
                    <Typography>{route.destination}</Typography>
                  </div>
                </SelectItem>
              )}
            </Select>
          </div>
        </Skeleton>
      </div>
    </React.Fragment>
  );
};

export default Routes;
