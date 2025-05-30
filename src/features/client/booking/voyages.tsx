import React from "react";
import { Skeleton } from "@heroui/skeleton";
import { Card } from "@heroui/card";

import { useApiRequest } from "@/hooks/useApiRequest";
import { ApiRequestBuilder } from "@/service/apiRequestBuilder";
import Typography from "@/components/ui/Typography";
import { useBookingContext } from "@/context/bookingContextProvider";
import { IBookingValue } from "@/context/bookingContextProvider";
import { TVoyage } from "@/models/voyages";
import ErrorFetchingBooking from "@/components/errorFetchingBooking";
import LogoutModal from "@/components/logoutModal";
interface IVoyageCardProps {
  data: any;
  isLoading: boolean;
  beforeData: number;
  handleOnVoyageChoose: (event: React.ChangeEvent<HTMLInputElement>) => void;
  bookingValue: IBookingValue;
}
/*
 *
 * JSX COMPONENTS
 *
 */
const VoyageCard: React.FC<IVoyageCardProps> = ({
  data,
  handleOnVoyageChoose,
  bookingValue,
}) => {
  return (
    <React.Fragment>
      {data?.map((voyage: TVoyage, index: number) => (
        <Card
          key={index}
          isHoverable
          isPressable
          className={`h-full w-full relative ${bookingValue?.voyage.voyage_code === voyage.voyage_code ? "ring ring-blue-100" : null}`}
        >
          <label className="h-full w-full p-2 text-center flex flex-col justify-center gap-2  cursor-pointer absolute z-10">
            <Typography className="tracking-wider " variant="h1">
              {voyage.label}
            </Typography>
            <Typography variant="small">{voyage.description}</Typography>
            <input
              className="hidden"
              name="voyage_code"
              type="radio"
              value={JSON.stringify(voyage)}
              onChange={handleOnVoyageChoose}
            />
          </label>
        </Card>
      ))}
    </React.Fragment>
  );
};

const VoyageCardSkeleton: React.FC<{ beforeData: number }> = ({
  beforeData,
}) => {
  return (
    <React.Fragment>
      {[...Array(beforeData)].map((_, idx) => (
        <Card key={idx} className="h-full w-full" radius="lg">
          <Skeleton className="rounded-lg h-40">
            <div className="h-24 rounded-lg bg-default-300" />
          </Skeleton>
        </Card>
      ))}
    </React.Fragment>
  );
};
/*
 *
 * MAIN PRESENTER
 *
 */
const Voyages = () => {
  /*
   *
   * REACT CONTEXT
   *
   */
  const { bookingValue, setBookingValue, dispatch } = useBookingContext();

  /*
   *
   * REACT USE MEMOS
   *
   */
  const fetchVoyagesFromAPI = React.useMemo(
    () =>
      new ApiRequestBuilder("/client/bookingProcess/getVoyagesList"),
    [],
  );

  /*
   *
   * CUSTOM HOOKS
   *
   */
  const { data, error, isLoading, refetch } =
    useApiRequest(fetchVoyagesFromAPI);

  const beforeData = isLoading ? 3 : data?.data?.length || 3;

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
  if (isLoading) return <VoyageCardSkeleton beforeData={beforeData} />;
  /*
   *
   * HANDLERS
   *
   */
  const handleOnVoyageChoose = (event: any) => {
    const voyage: any = JSON.parse(event.target.value);

    setBookingValue((prev: IBookingValue) => ({
      ...prev,
      itineraries: null,
      voyage,
    }));

    dispatch({ type: "NEXT" });
  };

  return (
    <VoyageCard
      beforeData={beforeData}
      bookingValue={bookingValue}
      data={data?.data}
      handleOnVoyageChoose={handleOnVoyageChoose}
      isLoading={isLoading}
    />
  );
};

export default Voyages;
