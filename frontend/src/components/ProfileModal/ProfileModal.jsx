import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  Input,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/UploadActions";
import { updateUser } from "../../actions/UserAction";

const ProfileModal = ({ modalOpen, setModalOpen, data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const { user } = useSelector((state) => state.authReducer.authData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setModalOpen(false);
  };

  const OverlayOne = () => <ModalOverlay backdropFilter="blur(10px)" />;
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <>
      <Button
        style={{ display: "none" }}
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        Open Modal
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        size="4xl"
      >
        {overlay}
        <ModalContent>
          <ModalHeader>Your Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
                value={formData.firstname}
                onChange={handleChange}
                name="firstname"
                ref={initialRef}
                placeholder="First name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input
                value={formData.lastname}
                onChange={handleChange}
                name="lastname"
                placeholder="Last name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Works at </FormLabel>
              <Input
                value={formData.worksAt}
                onChange={handleChange}
                name="worksAt"
                placeholder="Occupation"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Lives in </FormLabel>
              <HStack>
                <Input
                  value={formData.livesIn}
                  onChange={handleChange}
                  name="livesIn"
                  placeholder="City"
                />
                <Input
                  value={formData.country}
                  onChange={handleChange}
                  name="country"
                  type="text"
                  placeholder="Country"
                />
              </HStack>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Status </FormLabel>
              <Input
                value={formData.relationship}
                onChange={handleChange}
                name="relationship"
                placeholder="Married/single/In a relationship"
              />
            </FormControl>

            <HStack>
              <FormControl mt={4}>
                <FormLabel>Profile Image</FormLabel>
                <Input
                  type="file"
                  variant="unstyled"
                  name="profileImage"
                  onChange={onImageChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Cover Image</FormLabel>
                <Input
                  variant="unstyled"
                  type="file"
                  name="coverImage"
                  onChange={onImageChange}
                />
              </FormControl>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="telegram" mr={3} onClick={handleSubmit}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
