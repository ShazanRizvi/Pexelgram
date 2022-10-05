import React, { useState,useEffect } from "react";
import "./InfoCard.css";
import { BiPencil } from "react-icons/bi";
import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequests.js";
import { logout } from "../../actions/AuthActions";
import ProfileModal from "../ProfileModal/ProfileModal";

const InfoCard = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [modalOpen, setModalOpen] = useState(false);
   const profileUserId = params.id;
   const [profileUser, setProfileUser] = useState({});
   const { user } = useSelector((state) => state.authReducer.authData);

   const handleLogOut = () => {
     dispatch(logout());
   };
    useEffect(() => {
      const fetchProfileUser = async () => {
        if (profileUserId === user._id) {
          setProfileUser(user);
        } else {
          console.log("fetching");
          const profileUser = await UserApi.getUser(profileUserId);
          setProfileUser(profileUser);
          console.log(profileUser);
        }
      };
      fetchProfileUser();
    }, [user]);


  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>
          <b>My Profile</b>
        </h4>
        {user._id === profileUserId ? (
          <div>
            <BiPencil onClick={() => setModalOpen(true)} />
            <ProfileModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="info">
        <span>
          <b>Status</b>
        </span>
        <span> {profileUser.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>
          {profileUser.livesIn}, {profileUser.country}
        </span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>
      <Button colorScheme="telegram" size="sm" onClick={handleLogOut}>
        Logout
      </Button>
    </div>
  );
};

export default InfoCard;
