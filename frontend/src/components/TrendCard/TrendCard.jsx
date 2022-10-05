import React,{useState} from 'react'
import './TrendCard.css'
import { TrendData } from '../../data/TrendData';
import { Button, ButtonGroup } from "@chakra-ui/react";
import ShareModal from "../shareModal/ShareModal";

const TrendCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="TrendCard">
      <h3>
        <b>Trending</b>
      </h3>
      {TrendData.map((trend) => {
        return (
          <div className="trend">
            <span>#{trend.name}</span>
            <span>{trend.shares}k shares</span>
          </div>
        );
      })}
      <Button
        colorScheme="telegram"
        variant="outline"
        size="sm"
        onClick={() => setModalOpened(true)}
      >
        Share
      </Button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
}

export default TrendCard
