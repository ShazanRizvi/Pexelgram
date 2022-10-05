import React from 'react'
import FollowersCard from '../followerscard/FollowersCard'
import ProfileCard from '../profileCard/ProfileCard'
import Searchbar from '../Searchbar/Searchbar'
import './profileSection.css'

const ProfileSection = () => {
  return (
    <div className="profileSection">
    <Searchbar/>
    <ProfileCard/>
    <FollowersCard/>
    </div>
  )
}

export default ProfileSection
