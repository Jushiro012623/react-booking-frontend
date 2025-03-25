import { useApiRequest } from '@/hooks/useApiRequest'
import { ApiRequestBuilder } from '@/service/apiRequestBuilder'
import React from 'react'
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
  } from "@heroui/table";
import { useBookingContext } from '@/context/bookingContextProvider';


const columns = [
    { key: "details", label: "DETAILS"},
    { key: "additional_fee", label: "ADDITIONAL_FEE"},
    { key: "fare", label: "FARE"},
];

export const formatToPeso = (value : number) =>{
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(value);
}
const Fares = () => {

    const { bookingValue } = useBookingContext()

    const fetchFareMatrice = React.useMemo(() => new ApiRequestBuilder()
        .setUrl(`/client/bookingProcess/getFareMatrices`)
        .setMethod('POST')
        .setData({
            "booking_route_code" : bookingValue?.route?.booking_route_code,
            "booking_type" : bookingValue?.booking_type.id
        })
    ,[])

    const {data, error, isLoading } = useApiRequest(fetchFareMatrice);

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {error.message}</div>

    const renderCell = (fare: any, columnKey: any) => {
        const cellValue = fare[columnKey];
        switch(columnKey){
            case "additional_fee":
                return ( <React.Fragment>{`${fare.additional_fee == 0 ? '-----' : `₱ ${fare.additional_fee}`}` }</React.Fragment>
                )
            case "fare":
                return ( <React.Fragment>{formatToPeso(fare.fare)}</React.Fragment>
                )
            default:
                return cellValue;
        }
    }
    return (
        <div className='mt-10'>
            <Table isStriped aria-label="Example table with dynamic content">
                <TableHeader columns={columns}>
                    {(column : any) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={data}>
                    {(fare : any) => (
                    <TableRow key={fare.cargo_fare_matrices_code}>
                        {(columnKey) => <TableCell>{renderCell(fare, columnKey)}</TableCell>}
                    </TableRow>
                    )}
                </TableBody>
                </Table>
        </div>
    )
}

export default Fares