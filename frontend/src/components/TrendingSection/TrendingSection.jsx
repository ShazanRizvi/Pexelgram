import React,{useState} from 'react'
import "./TrendingSection.css"
import { RiHomeLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineSettings, MdOutlineModeComment } from "react-icons/md";
import TrendCard from '../TrendCard/TrendCard';
import { Link } from 'react-router-dom';



const TrendingSection = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="TrendingSection">
      <div className="navIcons">
        <Link to="../home">
          <RiHomeLine size={32} />
        </Link>

        <IoMdNotificationsOutline size={32} />
        <MdOutlineSettings size={32} />
        <MdOutlineModeComment size={32} />
      </div>

      <TrendCard />
    </div>
  );
}

export default TrendingSection
