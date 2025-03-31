export interface IVoyage{
    voyage_code: string;
    description: string;
    name: string;
    label: string;
}

export interface IRoute{
    booking_route_code: string;
    origin: string;
    destination: string;
    transportation: string;
    label: string;
}

export interface IBookingType{
    id: number;
    name: string;
}
export interface IFare{
    fare: number;
    cargo_fare_matrices_code: string;
    additional_fee: number;
    booking_route_code: string;
    details: string;
}
export interface IJourney{
    available_slots: number;
    voyage_code: string;
    booking_route_code: string;
    booking_type: number;
    departure_date: string;
    departure_time: string;
    arrival_time: string;
    arrival_date: string;
    max_slots: number;
    itinerary_code: string
}