import { useBookingContext } from "@/context/bookingContextProvider";
import { useApiRequest } from "@/hooks/useApiRequest";
import { ApiRequestBuilder } from "@/service/apiRequestBuilder";
import { Card, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Pagination } from "@heroui/pagination";
import { Skeleton } from "@heroui/skeleton";
import { Spacer } from "@heroui/spacer";
import React from "react";

const Itineraries = () => {
  const { bookingValue, setBookingValue, dispatch } = useBookingContext();
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const fetchItenirariesFromAPI = React.useMemo(
    () =>
      new ApiRequestBuilder()
        .setUrl("/client/bookingProcess/getJourneySchedules")
        .setMethod("POST")
        .setData({
          voyage_code: bookingValue?.voyage?.voyage_code,
          booking_route_code: bookingValue?.route?.booking_route_code,
          booking_type: bookingValue?.booking_type?.id,
        })
        .addParam("page", currentPage),
    [currentPage]
  );

  const { data, error, isLoading } = useApiRequest(fetchItenirariesFromAPI);
  if (error) return <div>Error: {error.message}</div>;
  const handleOnPress = (value: any) => {
    const itineraries: any = JSON.parse(value);

    setBookingValue((prev: any) => ({
      ...prev,
      itineraries
    }));

    dispatch({ type: "NEXT" });
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full flex flex-wrap gap-2 mt-10">
      {isLoading
        ? ([...Array(1)].map((_, idx) => (
            <React.Fragment key={idx}>
              <Card key={idx} className="h-full w-full" radius="lg">
                <Skeleton className="rounded-lg h-40">
                  <div className="h-24 rounded-lg bg-default-300" />
                </Skeleton>
              </Card>
              <Spacer y={4} />
            </React.Fragment>
          )))
        : (data.data.map((itinerary: any) => (
            <React.Fragment key={itinerary.itinerary_code}>
              <Card
                className={`max-w-[900px] py-3 h-40 ${bookingValue?.itineraries?.itinerary_code === itinerary.itinerary_code ? 'ring ring-blue-100' : null}`}
                fullWidth
                isPressable
                isHoverable
                onPress={() => handleOnPress(JSON.stringify(itinerary))}>
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
                  <div className="flex justify-between w-full ">
                    <div className="flex gap-x-2 text-xs">
                      <p>Departure Date:</p>{" "}
                      <p>
                        {new Date(
                          itinerary.departure_date
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-x-2 text-xs">
                      <p>Departure Time:</p> <p>{itinerary.departure_time}</p>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-2">
                    <div className="flex gap-x-2 text-xs">
                      <p>Arrival Date:</p>{" "}
                      <p>
                        {new Date(itinerary.arrival_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-x-2 text-xs">
                      <p>Arrival Time:</p> <p>{itinerary.arrival_time}</p>
                    </div>
                  </div>
                </div>
              </Card>
              <Spacer y={4} />
            </React.Fragment>)
        ))}

      {((!isLoading) && (!data?.data || data?.data?.length === 0)) && <div className="w-full h-40 flex justify-center items-center">No Itinerary Available</div>}

      {(data?.data || (data?.data?.length > 0)) && <div className="w-full flex justify-center">
        <Skeleton isLoaded={!isLoading} className="rounded-lg">
          <Pagination
            loop
            showControls
            color="primary"
            initialPage={data?.current_page}
            total={data?.last_page}
            onChange={handlePageChange}
          />
        </Skeleton>
      </div>}

    </div>
  );
};

export default Itineraries;
