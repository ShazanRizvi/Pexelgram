import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from "@chakra-ui/react";
import FollowersCard from "../followerscard/FollowersCard";

const FollowersModal = ({ modalOpened, setModalOpened }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal size ="full" isOpen={modalOpened} onClose={() => setModalOpened(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>People You may Know</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FollowersCard location="modal" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FollowersModal;
