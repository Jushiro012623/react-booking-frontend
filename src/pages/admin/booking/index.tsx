import GetAllBooking from '@/features/admin/booking/getAllBooking'
import { BreadcrumbItem, Breadcrumbs } from '@heroui/breadcrumbs'
import { Spacer } from '@heroui/spacer'

const AllBooking = () => {
  return (
    <div className='w-full'>
        <Breadcrumbs>
            <BreadcrumbItem>Dashboard</BreadcrumbItem>
            <BreadcrumbItem>Bookings</BreadcrumbItem>
            <BreadcrumbItem>Lists</BreadcrumbItem>
        </Breadcrumbs>
        <Spacer y={5} />
        <GetAllBooking />
    </div>
  )
}

export default AllBooking 