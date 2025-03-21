import Typography from '@/components/ui/Typography'
import React from 'react'
import {Breadcrumbs, BreadcrumbItem} from "@heroui/breadcrumbs";

const Booking = () => {
  return (
    <React.Fragment>
        <div className="min-h-screen w-full place-items-center pt-32">
            <div className='relative w-full px-10 lg:w-[900px] 2xl:w-[1000px] '>
                <Breadcrumbs className='mb-10'>
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Booking</BreadcrumbItem>
                </Breadcrumbs>

                <Typography variant='h3'>Lorem ipsum dolor sit amet.</Typography>
                <Typography variant='info2'>Lorem ipsum dolor sit amet consectetur adipisicing.</Typography>

            </div>
        </div>
    </React.Fragment>
  )
}

export default Booking