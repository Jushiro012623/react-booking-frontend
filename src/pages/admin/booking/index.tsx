import SEO from '@/components/helmet'
import BookingTable from '@/features/admin/booking/bookingTable'
import { BreadcrumbItem, Breadcrumbs } from '@heroui/breadcrumbs'
import { Spacer } from '@heroui/spacer'

const AllBooking = () => {
  return (
    <div className='w-full'>
        <SEO title="Admin | Booking" description="Booking Lists"/>
        <Breadcrumbs>
            <BreadcrumbItem>Dashboard</BreadcrumbItem>
            <BreadcrumbItem>Bookings</BreadcrumbItem>
            <BreadcrumbItem>Lists</BreadcrumbItem>
        </Breadcrumbs>
        <Spacer y={5} />
        <BookingTable />
    </div>
  )
}

export default AllBooking 