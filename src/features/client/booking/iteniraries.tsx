import { Card, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Pagination } from "@heroui/pagination";
import { Skeleton } from "@heroui/skeleton";
import { Spacer } from "@heroui/spacer";
import React from "react";

import { ApiRequestBuilder } from "@/service/apiRequestBuilder";
import { useApiRequest } from "@/hooks/useApiRequest";
import { useBookingContext } from "@/context/bookingContextProvider";
import { IBookingValue } from "@/context/bookingContextProvider";
import { TJourney } from "@/models/journey";
import ErrorFetchingBooking from "@/components/errorFetchingBooking";
import LogoutModal from "@/components/logoutModal";

const Itineraries = () => {
  /*
   *
   * REACT CONTEXT
   *
   */
  const { bookingValue, setBookingValue, dispatch } = useBookingContext();

  /*
   *
   * REACT USE STATES
   *
   */
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  /*
   *
   * REACT USE MEMO
   *
   */
  const fetchItenirariesFromAPI = React.useMemo(
    () =>
      new ApiRequestBuilder("/client/bookingProcess/getJourneySchedules")
        .setMethod("POST")
        .setData({
          voyage_code: bookingValue?.voyage?.voyage_code,
          booking_route_code: bookingValue?.route?.booking_route_code,
          booking_type: bookingValue?.booking_type?.id,
        })
        .addParam("page", currentPage),
    [currentPage],
  );

  /*
   *
   * CUSTOM HOOKS
   *
   */
  const { data, error, isLoading, refetch } = useApiRequest(
    fetchItenirariesFromAPI,
  );

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
   * HANDLERS
   *
   */
  const handleOnPress = (value: any) => {
    const itineraries: any = JSON.parse(value);

    setBookingValue((prev: IBookingValue) => ({
      ...prev,
      itineraries,
    }));

    dispatch({ type: "NEXT" });
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full flex flex-wrap gap-2 mt-10">
      {isLoading
        ? [...Array(1)].map((_, idx) => (
            <React.Fragment key={idx}>
              <Card key={idx} className="h-full w-full" radius="lg">
                <Skeleton className="rounded-lg h-40">
                  <div className="h-24 rounded-lg bg-default-300" />
                </Skeleton>
              </Card>
              <Spacer y={4} />
            </React.Fragment>
          ))
        : data.data.map((itinerary: TJourney) => (
            <React.Fragment key={itinerary.itinerary_code}>
              <Card
                fullWidth
                isHoverable
                isPressable
                className={`max-w-[900px] py-3 md:h-40 ${bookingValue?.itineraries?.itinerary_code === itinerary.itinerary_code ? "ring ring-blue-100" : null}`}
                onPress={() => handleOnPress(JSON.stringify(itinerary))}
              >
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md">{bookingValue?.route?.label}</p>
                    <p className="text-small text-left text-default-500">
                      Slots: {itinerary.available_slots}/{itinerary.max_slots}
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <div className="px-3 py-3">
                  <div className="flex flex-col md:flex-row justify-between w-full ">
                    <div className="flex gap-x-2  justify-between text-xs">
                      <p>Departure Date:</p>{" "}
                      <p>
                        {new Date(
                          itinerary.departure_date,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-x-2 justify-between text-xs">
                      <p>Departure Time:</p> <p>{itinerary.departure_time}</p>
                    </div>
                  </div>
                  <Spacer y={2} />
                  <div className="flex flex-col md:flex-row justify-between w-full mt-2">
                    <div className="flex gap-x-2 justify-between text-xs">
                      <p>Arrival Date:</p>{" "}
                      <p>
                        {new Date(itinerary.arrival_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-x-2 justify-between text-xs">
                      <p>Arrival Time:</p> <p>{itinerary.arrival_time}</p>
                    </div>
                  </div>
                </div>
              </Card>
              <Spacer y={4} />
            </React.Fragment>
          ))}

      {!isLoading && (!data?.data || data?.data?.length === 0) && (
        <div className="w-full h-40 flex justify-center items-center">
          No Itinerary Available
        </div>
      )}

      {(data?.data || data?.data?.length > 0) && (
        <div className="w-full flex justify-center">
          <Skeleton className="rounded-lg" isLoaded={!isLoading}>
            <Pagination
              loop
              showControls
              color="primary"
              initialPage={data?.pagination?.current_page}
              total={data?.pagination?.last_page}
              onChange={handlePageChange}
            />
          </Skeleton>
        </div>
      )}
    </div>
  );
};

export default Itineraries;
