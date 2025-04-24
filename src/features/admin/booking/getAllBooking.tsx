import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import React from "react";
import { Tooltip } from "@heroui/tooltip";
import {Chip, ChipProps} from "@heroui/chip";
import { useApiRequest } from "@/hooks/useApiRequest";
import { ApiRequestBuilder } from "@/service/apiRequestBuilder";
import { Spinner } from "@heroui/spinner";
import { DeleteIcon, EditIcon, EyeIcon } from "@/components/icons";
import { Spacer } from "@heroui/spacer";
import { Pagination } from "@heroui/pagination";
import Typography from "@/components/ui/Typography";
export type IconSvgProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export const columns = [
  {name: "REFERENCE NUMBER", uid: "reference"},
  {name: "BOOKING", uid: "role"},
  {name: "STATUS", uid: "status"},
  {name: "ACTIONS", uid: "actions"},
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const GetAllBooking = () => {
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    
    const getAllBookingRequest = React.useMemo(
      () => new ApiRequestBuilder().setUrl("/admin/tickets")
        .addParam("page", currentPage),
      [currentPage]
    );
    const { data, isLoading, error } = useApiRequest(getAllBookingRequest);
  
    const renderCell = React.useCallback((booking: any, columnKey: React.Key) => {
      switch (columnKey) {
        case "reference":
          return (
            <p className="text-bold text-sm capitalize">{booking.id} {booking.contact_no}</p>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{booking.client?.username || "Unknown"}</p>
              <p className="text-bold text-sm capitalize text-default-400">
                {booking.client?.email || "No email"}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[booking.status] || "success"}
              size="sm"
              variant="flat"
            >
              {booking.status || 'active'}
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
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
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

    if (error)
      return <div className="text-red-500 p-4">Failed to load bookings.</div>;
    
    return (
      <React.Fragment>
        <Table aria-label="Booking table" selectionMode="multiple">
            <TableHeader columns={columns}>
            {(column) => (
                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
                </TableColumn>
            )}
            </TableHeader>
            <TableBody
            isLoading={isLoading}
            loadingContent={<Spinner label="Loading..." />}
            items={Array.isArray(data?.data) ? data?.data : []}
            emptyContent="No rows to display."
            >
            {(booking: any) => (
                <TableRow key={booking.ticket_code || booking.id}>
                {(columnKey) => (
                    <TableCell>{renderCell(booking, columnKey)}</TableCell>
                )}
                </TableRow>
            )}
            </TableBody>
        </Table>
        
        <Spacer y={3} />
        { data?.pagination && 
            <div className="w-full items-center flex justify-between">
                <Typography variant="small">Showing Result {data?.pagination.to} out of {data?.pagination.total}</Typography>
                <Pagination variant="flat" showControls initialPage={1} total={data?.pagination.last_page} onChange={handlePageChange}/> 
            </div>
        }
      </React.Fragment>
    );
};

export default GetAllBooking;