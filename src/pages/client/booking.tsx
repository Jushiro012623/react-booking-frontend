import Typography from '@/components/ui/Typography'
import {Breadcrumbs, BreadcrumbItem} from "@heroui/breadcrumbs";
import Voyages from '@/features/client/booking/voyages';
import {Progress} from "@heroui/progress";
import Routes from '@/features/client/booking/routes';
import { Button } from '@heroui/button';
const Booking = () => {
  return (
    <div className="min-h-screen w-full place-items-center pt-16">
        <div className='relative w-full px-10 lg:w-[900px] 2xl:w-[1000px] '>
            <Breadcrumbs className='mb-10'>
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>Booking</BreadcrumbItem>
            </Breadcrumbs>
            <div className='space-y-2 mb-5'>
                <Typography variant='info2' className='mt-10'>Step Progress</Typography>
                <Progress aria-label="Loading..." size="sm" className="max-w-full" value={10} />
            </div>
            <Typography variant='h3'>Lorem ipsum dolor sit amet.</Typography>
            <Typography variant='info2'>Lorem ipsum dolor sit amet consectetur adipisicing.</Typography>
            <Voyages />
            {/* <Routes /> */}
            <div className='flex gap-4 items-center mt-6'>
                <Button>Back</Button>
                <Button color='primary'>Next</Button>
            </div>
        </div>  
    </div>
  )
}

export default Booking