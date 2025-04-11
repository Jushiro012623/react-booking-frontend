import React from "react";
/*
    * 
    * HERO UI'S 
    * 
*/
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import { useDisclosure } from "@heroui/modal";

/*
    * 
    * SERVICES 
    * 
*/
import { Api as SendApiRequest } from "@/service/apiRequest";
import { ApiRequestBuilder } from "@/service/apiRequestBuilder";

/*
    * 
    * CUSTOM COMPONENTS 
    * 
*/
import Typography from "@/components/ui/Typography";
import BookingDrawer from "@/components/bookingDrawer";

/*
    * 
    * FEATURES 
    * 
*/
import BookingType from "@/features/client/booking/bookingType";
import CompleteBooking from "@/features/client/booking/completeBooking";
import ConfirmBooking from "@/features/client/booking/confirmBooking";
import Fares from "@/features/client/booking/fares";
import FillupInfo from "@/features/client/booking/fillupInfo";
import Itineraries from "@/features/client/booking/iteniraries";
import Routes from "@/features/client/booking/routes";
import Voyages from "@/features/client/booking/voyages";

/*
    * 
    * CONTEXT, HELPERS & UTILS
    * 
*/
import { canProceedToNextStep, valueToSubmit } from "@/utils/bookingValidations";
import { useBookingContext } from "@/context/bookingContextProvider";
import { useAuthContext } from "@/context/authContextProvider";
import { showToast } from "@/helpers/showToast";


const BookingStepContent = [
    {
        step: 1,
        content: (
            <div className="voyages h-[500px] mt-10 w-full flex flex-col gap-y-7 md:flex-row md:h-40 md:gap-x-7">
                {" "}
                <Voyages />{" "}
            </div>
        ),
    },
    {
        step: 2,
        content: <Routes />,
    },
    {
        step: 3,
        content: (
            <div className="booking-type h-[500px] mt-10 w-full flex flex-col gap-y-7 md:flex-row md:h-40 md:gap-x-7">
                {" "}
                <BookingType />{" "}
            </div>
        ),
    },
    {
        step: 4,
        content: <Fares />,
    },
    {
        step: 5,
        content: <Itineraries />,
    },
    {
        step: 6,
        content: <FillupInfo />,
    },
    {
        step: 7,
        content: <ConfirmBooking />,
    },
];
const Booking = () => {
    /*
        * 
        * REACT USE STATES 
        * 
    */
    const [isBookingLoading, setIsBookingLoading] = React.useState<boolean>(false);
    const [bookingResponse, setBookingResponse] = React.useState<any>(null);

    /*
        * 
        * REACT CUSTOM HOOKS 
        * 
    */
    const { onOpen, isOpen, onOpenChange } = useDisclosure();  
    
    /*
        * 
        * REACT USE CONTEXTS 
        * 
    */
    const { state, dispatch, bookingValue, stepDetails } = useBookingContext();
    const { logoutUser } = useAuthContext();

    /*
        * 
        * REACT USE MEMOS 
        * 
     */
    const submitBookingRequest = React.useMemo(() => {
        const payload = {
        ...valueToSubmit(bookingValue),
        };
        return new ApiRequestBuilder()
        .setData(payload)
        .setMethod("POST")
        .setUrl("client/bookingProcess/cargoBookingProcess");
    }, [bookingValue]);

    /*
        * 
        * REACT USE EFFECTS 
        * 
    */
    React.useEffect(() => {
        if (state.step === 1) {
        
        setBookingResponse(null);
        }
    }, [state.step]); 

    /*
        * 
        * HELPERS 
        * 
    */
    const canUserProceedToNextStep = () : void => {
        showToast(
            "Failed to next step",
            stepDetails(state).errorMessage,
            "danger"
        );
        dispatch({ type: "NONE" });
    }

    const submitBooking = async () => {
        const response: any = await SendApiRequest( submitBookingRequest.build() );
        
        if (response.status === 200) {
            showToast(
                "Booking Successful",
                "Your booking has been successfully processed.",
                "success"
            );
        }
        return response;
    }

    const catchSubmitBookingError = (error : any) => {
        showToast(
            "Booking Error",
            error?.response?.data?.message || "Network Error",
            "danger"
        );
        if (error?.response?.status === 401) {
            logoutUser();
        }
    }

    const submitButtonText = () => {
        if (isBookingLoading) {
            return "SUBMITTING";
        }
        if (state.step !== 7) {
            return "NEXT";
        }
            return "SUBMIT";
    };

    /*
        * 
        * BUTTON HANDLERS 
        * 
    */
    const handleOnNext = async () => {
        if (!canProceedToNextStep(state, bookingValue)) {
            return canUserProceedToNextStep()
        }
        if (state.step === 7) {
            try {
                setIsBookingLoading(true);
                const response: any = await submitBooking()
                setBookingResponse(await response.data);
                return onOpen();
            } catch (error: any) {
                return catchSubmitBookingError(error)
            } finally {
                setIsBookingLoading(false);
            }
        }
        return dispatch({ type: "NEXT" });
    };


  return (
    <div className="min-h-screen w-full place-items-center pt-16">
      <div className="relative w-full px-10 lg:w-[900px] 2xl:w-[1000px]">

        <Breadcrumbs className="mb-10">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Booking</BreadcrumbItem>
        </Breadcrumbs>

        <BookingDrawer />

        <div className="space-y-2 mb-5">
            <Typography variant="info2" className="mt-10">
                Booking Progress
            </Typography>
            <Progress
                aria-label="Progress"
                size="sm"
                className="max-w-full"
                value={state.value}
            />
        </div>

        <Typography variant="h3">{stepDetails(state).title}</Typography>
        <Typography variant="body2" color="primary" className="italic">{stepDetails(state).subtitle}</Typography>

        {BookingStepContent.map((content) => (
            <React.Fragment key={content.step}>
                {state.step === content.step && content.content}
            </React.Fragment>
        ))}

        <CompleteBooking
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          onOpen={onOpen}
          data={bookingResponse}
        />

        <div className="flex gap-4 items-center mt-6">
            {state.step !== 1 && (
                <Button
                isDisabled={isBookingLoading}
                onPress={() => dispatch({ type: "BACK" })}>
                Back
                </Button>
            )}
            <Button
                isDisabled={isBookingLoading}
                type={"submit"}
                isLoading={isBookingLoading}
                onPress={handleOnNext}
                color="primary">
                {submitButtonText()}
            </Button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
