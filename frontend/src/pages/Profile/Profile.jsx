import React from 'react'
import ProfileSectionLeft from '../../components/ProfileSectionLeft/ProfileSectionLeft'
import ProfileCard from '../../components/profileCard/ProfileCard'
import PostSection from '../../components/postSection/PostSection'
import TrendingSection from '../../components/TrendingSection/TrendingSection'
import './Profile.css'

const Profile = () => {
  return (
    <div className="Profile">
      <ProfileSectionLeft/>
      <div className="Profile-center">
        <ProfileCard location={"profilePage"}/>
        <PostSection/>
      </div>
      <TrendingSection/>

    </div>
  )
}

export default Profile
