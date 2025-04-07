import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import React from "react";
import Typography from "./ui/Typography";
import { useAuthContext } from "@/context/authContextProvider";

const LogoutModal = ({title, body, className, canCancel = false}: any) => {
    
    const {onOpen, isOpen, onOpenChange} = useDisclosure();
    const { logoutUser } = useAuthContext();
    React.useEffect(() => {
        onOpen()
    },[]);
  return (
    <React.Fragment>
      <Modal isOpen={isOpen} defaultOpen={true} onOpenChange={onOpenChange} isDismissable={false} hideCloseButton size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className={`flex flex-col gap-1 ${className}`}>
                <Typography variant="h2" className="text-center">{title}</Typography>
              </ModalHeader>
              <ModalBody>
                <Typography className="text-center">{body}</Typography>
              </ModalBody>
              <ModalFooter>
                {canCancel && <Button color="primary" variant="flat" className="w-full" onPress={onClose}>
                    CANCEL
                </Button>}
                <Button color={canCancel ? "danger" : "primary"} variant="flat" className="w-full" onPress={logoutUser}>
                    OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default LogoutModal;
