import { Button } from "@heroui/button";

const ErrorFetchingBooking = ({ refetch, isLoading }: { refetch: (abortController: AbortController) => void; isLoading: boolean }) => (
  <div className="flex w-full items-center justify-center">
    <Button
      onPress={() => refetch(new AbortController())}
      variant="bordered"
      isLoading={isLoading}>
      Refresh List
    </Button>
  </div>
);

export default ErrorFetchingBooking;
