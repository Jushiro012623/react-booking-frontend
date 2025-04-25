import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import React from "react";
import { Tooltip } from "@heroui/tooltip";
import { Chip, ChipProps } from "@heroui/chip";
import { useApiRequest } from "@/hooks/useApiRequest";
import { ApiRequestBuilder } from "@/service/apiRequestBuilder";
import { Spinner } from "@heroui/spinner";
import { ChevronDownIcon, DeleteIcon, EditIcon, EyeIcon, SearchIcon } from "@/components/icons";
import { Spacer } from "@heroui/spacer";
import { Pagination } from "@heroui/pagination";
import LogoutModal from "@/components/logoutModal";
import ErrorFetchingBooking from "@/components/errorFetchingBooking";
import { Button } from "@heroui/button";
import Typography from "@/components/ui/Typography";
import { Input } from "@heroui/input";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";

const columns = [
  { name: "REFERENCE NUMBER", uid: "reference" },
  { name: "BOOKED BY", uid: "customer" },
  { name: "BOOKING DETAILS", uid: "booking" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  0: "default",
  1: "warning",
  2: "success",
  3: "danger",
};

const bookingType: any = {
  1: "Passenger",
  2: "Rolling Cargo",
  3: "Drop Cargo",
};

const statusValue: any = {
  0: "Pending",
  1: "On Board",
  2: "Success",
  3: "Canceled",
};

const voyage: any = {
  0: "Argo 1",
  1: "Argo 2",
  2: "SUDA",
};

const BottomContent = ({
  data,
  handlePageChange,
  page,
  setPage,
}: {
  setPage: (page: number) => void;
  page: number;
  data: { pagination: any; last_page: number };
  handlePageChange: (page: number) => void;
}) => {
  const onNextPage = React.useCallback(() => {
    if (page < data?.pagination.current_page) {
      setPage(page + 1);
    }
  }, [page, data?.pagination.current_page]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  return (
    <React.Fragment>
      {data?.pagination.last_page > 1  && (
        <React.Fragment>
          <Spacer y={'px'} />
          <div className="py-2 px-2 flex justify-between items-center">
            <Typography variant="small">
              Showing Result {data?.pagination.to} out of{" "}
              {data?.pagination.total}
            </Typography>
            <Pagination
              className="flex justify-center"
              showShadow
              isCompact
              variant="flat"
              showControls
              initialPage={1}
              total={data?.pagination.last_page}
              onChange={handlePageChange}
            />
            <div className="hidden sm:flex w-[30%] justify-end gap-2">
              <Button
                isDisabled={data?.pagination.current_page === 1}
                size="sm"
                variant="flat"
                onPress={onPreviousPage}>
                Previous
              </Button>
              <Button
                isDisabled={
                  data?.pagination.current_page === data?.pagination.last_page
                }
                size="sm"
                variant="flat"
                onPress={onNextPage}>
                Next
              </Button>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const TopContent = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <div className="w-full sm:w-96">
            <Input
            isClearable
            placeholder="Search by reference no..."
            startContent={<SearchIcon />}
            // value={filterValue}
            // onClear={() => onClear()}
            // onValueChange={onSearchChange}
            />
        </div>
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                variant="flat">
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              // selectedKeys={statusFilter}
              selectionMode="multiple"
              // onSelectionChange={setStatusFilter}
            >
              {Object.entries(statusValue).map(([key, value]: any) => (
                <DropdownItem key={key} className="capitalize">
                  {value}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                variant="flat">
                Booking
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              // selectedKeys={statusFilter}
              selectionMode="multiple"
              // onSelectionChange={setStatusFilter}
            >
              {Object.entries(bookingType).map(([key, value]: any) => (
                <DropdownItem key={key} className="capitalize">
                  {value}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                variant="flat">
                Voyage
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              // selectedKeys={statusFilter}
              selectionMode="multiple"
              // onSelectionChange={setStatusFilter}
            >
              {Object.entries(voyage).map(([key, value]: any) => (
                <DropdownItem key={key} className="capitalize">
                  {value}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          
        </div>
      </div> 
      <Spacer y={"px"} />
    </div>
  );
};

const GetAllBooking = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const getAllBookingRequest = React.useMemo(
    () =>
      new ApiRequestBuilder()
        .setUrl("/admin/tickets")
        .addParam("page", currentPage),
    [currentPage]
  );

  const { data, isLoading, error, refetch } =
    useApiRequest(getAllBookingRequest);

  const renderCell = React.useCallback((booking: any, columnKey: React.Key) => {
    switch (columnKey) {
      case "reference":
        return (
          <p className="text-bold text-sm capitalize">{booking.reference_no}</p>
        );
      case "customer":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {booking.client?.username}
            </p>
            <p className="text-bold text-sm capitalize text-default-400">
              {booking.client?.email}
            </p>
          </div>
        );
      case "booking":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {booking.voyage_name}
            </p>
            <p className="text-bold text-sm capitalize text-default-400">
              {bookingType[booking.booking_type].toUpperCase()}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            color={statusColorMap[booking.status] || "success"}
            size="sm"
            variant="flat">
            {statusValue[booking.status].toUpperCase()}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit ticket">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete ticket">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return booking[columnKey as keyof typeof booking];
    }
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
      <Table
        aria-label="Booking table"
        topContent={<TopContent />}
        bottomContent={
          <BottomContent
            page={currentPage}
            setPage={setCurrentPage}
            data={data}
            handlePageChange={handlePageChange}
          />
        }>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          items={Array.isArray(data?.data) ? data?.data : []}
          emptyContent="No rows to display.">
          {(booking: any) => (
            <TableRow key={booking.ticket_code || booking.id}>
              {(columnKey) => (
                <TableCell>{renderCell(booking, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default GetAllBooking;
