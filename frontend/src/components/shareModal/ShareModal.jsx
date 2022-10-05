import React,{useState} from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import PostShare from '../PostShare/PostShare';


const ShareModal = ({ modalOpened, setModalOpened }) => {
     const { isOpen, onOpen, onClose } = useDisclosure();
      const OverlayOne = () => (
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
      );
     const [overlay, setOverlay] = React.useState(<OverlayOne />);
 
  return (
    <>
      
      <Modal
        isCentered
        size="4xl"
        isOpen={modalOpened}
        onClose={() => setModalOpened(false)}
      >
        {overlay}
        <ModalContent>
          <PostShare />
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShareModal
