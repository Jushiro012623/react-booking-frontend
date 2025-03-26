import React from 'react'
import { useApiRequest } from '@/hooks/useApiRequest'
import { ApiRequestBuilder } from '@/service/apiRequestBuilder'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";

import { useBookingContext } from '@/context/bookingContextProvider';
import { Skeleton } from '@heroui/skeleton';

const columns = [
    { key: "details", label: "DETAILS"},
    { key: "additional_fee", label: "ADDITIONAL_FEE"},
    { key: "fare", label: "FARE"},
];

const formatToPeso = (value : number) =>{
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(value);
}
const Fares = () => {

    const { bookingValue, setBookingValue } = useBookingContext()

    const fetchFareMatrice = React.useMemo(() => new ApiRequestBuilder()
        .setUrl(`/client/bookingProcess/getFareMatrices`)
        .addParam('booking_route_code', bookingValue?.route?.booking_route_code)
        .addParam('booking_type', bookingValue?.booking_type.id)
    ,[])

    const {data, error, isLoading } = useApiRequest(fetchFareMatrice);


    if(error) return <div>Error: {error.message}</div>

    const renderCell = (fare: any, columnKey: any) => {
        const cellValue = fare[columnKey];
        switch(columnKey){
            case "additional_fee":
                return ( <React.Fragment>{`${fare.additional_fee == 0 ? '-----' : `${formatToPeso(fare.additional_fee)}`}` }</React.Fragment>
                )
            case "fare":
                return ( <React.Fragment>{formatToPeso(fare.fare)}</React.Fragment>
                )
            default:
                return cellValue;
        }
    }
    const handleFareChoose = (key: any) => {
        const fare = JSON.parse(key);
        setBookingValue((prev: any) => ({
            ...prev,
            fare
        }))
    }
    return (
        <div className='mt-10'>
            <Table  
                color="primary"
                aria-label="Fare Matrices Table" 
                selectionMode="multiple" 
                selectionBehavior='replace'
                defaultSelectedKeys={[bookingValue?.fare?.cargo_fare_matrices_code ?? '']}
            >
                <TableHeader columns={columns}>
                    {(column : any) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                    <TableBody items={data ?? []}>
                        {(fare : any) => (
                            <TableRow 
                                key={fare.cargo_fare_matrices_code} 
                                onClick={() => handleFareChoose(JSON.stringify(fare))}
                            >
                                {(columnKey) => (
                                    <TableCell className='cursor-pointer'>
                                        {isLoading ? (
                                            <Skeleton className='w-full h-3'>
                                                <div className='h-3 rounded-lg bg-default-200' />
                                            </Skeleton>
                                        ) :  (
                                            renderCell(fare, columnKey) 
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
            </Table>
        </div>
    )
}

export default Fares