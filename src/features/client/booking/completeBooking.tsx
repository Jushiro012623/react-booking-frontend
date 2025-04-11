import React from 'react'
import { Button } from '@heroui/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal'
import checkIcon from "@/assets/svg/checkIcon.svg"
import { Image } from '@heroui/image'
import { Divider } from '@heroui/divider'
import { Spacer } from '@heroui/spacer'
import Typography from '@/components/ui/Typography'
import { Link } from '@heroui/link'
import { formatToPeso } from '@/helpers/formatToPeso'
import { useBookingContext } from '@/context/bookingContextProvider'
const CompleteBooking = ({isOpen, onOpenChange, data}: any) => {
    /*
        * 
        * REACT CONTEXT 
        * 
    */
    const {dispatch, setBookingValue} = useBookingContext()

    /*
        * 
        * HANDLERS 
        * 
    */
    const handleOnPress = (onClose: any) => {
        dispatch({ type: 'RESET' });
        onClose()
        setBookingValue(null)
    }

  return (
    <React.Fragment>
        <Modal
            placement="center"
            backdrop="blur"
            hideCloseButton
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior='inside'
        >
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1 items-center">
                    <Image
                        alt="heroui logo"
                        height={40}
                        radius="sm"
                        src={checkIcon}
                        width={40}
                    />
                    <p className="text-md">Booking Success!</p>
                    <p className="text-small text-default-500">Your booking has been successfully done.</p>
                    <Spacer y={4} />
                    <Divider />
                </ModalHeader>
                <ModalBody>
                    <div className='flex w-full flex-col items-center'>
                        <Typography variant='h2'>{formatToPeso(data.data.fare.total_amount)}</Typography>
                        <Spacer y={2}/>
                        <Typography variant='small'>AMOUNT PAYABLE</Typography>
                    </div>
                    <Spacer />
                    <Divider />
                    <Spacer />
                    <div className='w-full'>
                        <div className='flex w-full justify-between'>
                            <Typography variant='small'>REFERENCE NUMBER</Typography>
                            <Typography variant='small'>{data.data.reference_no}</Typography>
                        </div>
                        <Spacer y={4}/>
                        <div className='flex w-full justify-between'>
                            <Typography variant='small'>BOOKING ROUTE</Typography>
                            <Typography variant='small' className='uppercase'>{data.data.booking_route.label}</Typography>
                        </div>
                        <Spacer y={4}/>
                        {data.data.passenger && <PassengerInfo passenger={data.data.passenger} />}
                        {data.data.drop_cargo && <DropCargoInfo dropCargo={data.data.drop_cargo} />}
                        {data.data.rolling_cargo && <RollingCargoInfo rollingCargo={data.data.rolling_cargo} />}
                        <div className='flex w-full justify-between'>
                            <Typography variant='small'>TIMESTAMP</Typography>
                            <Typography variant='small'>{data.data.created_at || '----'}</Typography>
                        </div>
                        <Spacer y={5} />
                        <Divider />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className='w-full'>
                        <Button as={Link} className="w-full" color="primary" variant="flat" onPress={() => handleOnPress(onClose)} href='/booking' >
                        Create Another Booking
                        </Button>
                        <Spacer y={4} />
                        <Button as={Link} className="w-full" color="default" variant="faded" onPress={() => handleOnPress(onClose)} href='/'>
                        Back to Dashboard
                        </Button>
                    </div>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    </React.Fragment>
  )
}


const PassengerInfo = ({passenger}: any) => {

    const components = [
        {key: "1", title: "PASSENGER NAME", value: passenger?.passenger_name},
        {key: "2", title: "DISCOUNT", value: passenger?.discount},
        {key: "3", title: "ADD ONS", value: passenger?.addons === 1? 'NONE' : 'AIRCONDITIONED'},
        {key: "4", title: "QUANTITY", value: passenger?.quantity},
    ]

    return (
        <React.Fragment>
            {components.map((passenger: any) => (
                <React.Fragment key={passenger.key}>
                    <div className='flex w-full justify-between'>
                        <Typography variant='small'>{passenger.title}</Typography>
                        <Typography variant='small'>{passenger.value}</Typography>
                    </div>
                    <Spacer y={4}/>
                </React.Fragment>
                
            ))}
        </React.Fragment>
    )
}

const DropCargoInfo = ({dropCargo}: any) => {
    const components = [
        {key: "1", title: "SHIPPER NAME", value: dropCargo?.shipper_name  || 'NONE'},
        {key: "2", title: "QUANTITY", value: dropCargo?.quantity},
        {key: "3", title: "RECEIVER NAME", value: dropCargo?.receiver_name},
        {key: "4", title: "RECEIVER CONTACT NO", value: dropCargo?.receiver_contact_no},
    ]

    return (
        <React.Fragment>
            {components.map((drop_cargo: any) => (
                <React.Fragment key={drop_cargo.key}>
                    <div className='flex w-full justify-between'>
                        <Typography variant='small'>{drop_cargo.title}</Typography>
                        <Typography variant='small'>{drop_cargo.value}</Typography>
                    </div>
                    <Spacer y={4}/>
                </React.Fragment>
                
            ))}
        </React.Fragment>
    )
}

const RollingCargoInfo = ({rollingCargo}: any) => {
    const components = [
        {key: "1", title: "SHIPPER NAME", value: rollingCargo?.shipper_name},
        {key: "2", title: "PLATE NUMBER", value: rollingCargo?.plate_number},
    ]

    return (
        <React.Fragment>
            {components.map((rolling_cargo: any) => (
                <React.Fragment key={rolling_cargo.key}>
                    <div className='flex w-full justify-between'>
                        <Typography variant='small' className='uppercase'>{rolling_cargo.title}</Typography>
                        <Typography variant='small' className='uppercase'>{rolling_cargo.value}</Typography>
                    </div>
                    <Spacer y={4}/>
                </React.Fragment>
                
            ))}
        </React.Fragment>
    )
}
export default CompleteBooking