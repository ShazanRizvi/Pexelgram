import React from 'react'
import FollowersCard from '../followerscard/FollowersCard'
import SearchBar from '../Searchbar/Searchbar'
import InfoCard from '../InfoCard/InfoCard'

const ProfileSectionLeft = () => {
  return (
    <div className="profileSection">
      <SearchBar />
      <InfoCard/>
      <FollowersCard />
    </div>
  );

}

export default ProfileSectionLeft
