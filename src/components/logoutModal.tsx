import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import React from "react";

import Typography from "./ui/Typography";

import { useAuthContext } from "@/context/authContextProvider";

const LogoutModal = ({
  title,
  body = "You've been logged out",
  className,
  canCancel = false,
}: any) => {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const { logoutUser } = useAuthContext();

  React.useEffect(() => {
    onOpen();
  }, []);

  return (
    <React.Fragment>
      <Modal
        hideCloseButton
        backdrop="blur"
        defaultOpen={true}
        isDismissable={false}
        isOpen={isOpen}
        size="sm"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className={`flex flex-col gap-1 ${className}`}>
                <Typography className="text-center" variant="h2">
                  {title}
                </Typography>
              </ModalHeader>
              <ModalBody>
                <Typography className="text-center">{body}</Typography>
              </ModalBody>
              <ModalFooter>
                {canCancel && (
                  <Button
                    className="w-full"
                    color="primary"
                    variant="flat"
                    onPress={onClose}
                  >
                    CANCEL
                  </Button>
                )}
                <Button
                  className="w-full"
                  color={canCancel ? "danger" : "primary"}
                  variant="flat"
                  onPress={logoutUser}
                >
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
