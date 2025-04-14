import { Button } from "@heroui/button";

const ErrorFetchingBooking = ({
  refetch,
  isLoading,
}: {
  refetch: (abortController: AbortController) => void;
  isLoading: boolean;
}) => (
  <div className="flex w-full items-center justify-center">
    <Button
      isLoading={isLoading}
      variant="bordered"
      onPress={() => refetch(new AbortController())}
    >
      Refresh List
    </Button>
  </div>
);

export default ErrorFetchingBooking;
