import React, { useState, useRef } from "react";
import { Image, Input } from "@chakra-ui/react";
import ProfileImage from "../../img/profileImg.jpg";
import {
  faImage,
  faLocationDot,
  faCirclePlay,
  faCalendar,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PostShare.css";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadActions";

const PostShare = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //post data
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(uploadPost(newPost));
    resetShare();
  };
  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };

  return (
    <div className="PostShare">
      <Image
        borderRadius="full"
        boxSize="50px"
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt="Profile Image"
      />
      <div>
        <Input placeholder="What's Happening" size="md" ref={desc} />

        <div className="postOptions">
          <div
            required
            className="option"
            onClick={() => imageRef.current.click()}
          >
            <Button
              leftIcon={<FontAwesomeIcon icon={faImage} size="2x" />}
              colorScheme="#25316D"
              variant="ghost"
              size="sm"
            >
              Photo
            </Button>
          </div>
          <div className="option">
            <Button
              leftIcon={<FontAwesomeIcon icon={faCirclePlay} size="2x" />}
              colorScheme="#25316D"
              variant="ghost"
              size="sm"
            >
              Video
            </Button>
          </div>
          <div className="option">
            <Button
              leftIcon={<FontAwesomeIcon icon={faLocationDot} size="2x" />}
              colorScheme="#25316D"
              variant="ghost"
              size="sm"
            >
              Location
            </Button>
          </div>
          <div className="option">
            <Button
              leftIcon={<FontAwesomeIcon icon={faCalendar} size="2x" />}
              colorScheme="#25316D"
              variant="ghost"
              size="sm"
            >
              Schedule
            </Button>
          </div>
          <Button colorScheme="telegram" size="md" onClick={handleSubmit}>
            Share
          </Button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myimage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <FontAwesomeIcon icon={faXmark} onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="selected image" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
