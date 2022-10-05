import React from 'react'
import PostSection from '../../components/postSection/PostSection';
import ProfileSection from '../../components/profileSection/ProfileSection';
import TrendingSection from '../../components/TrendingSection/TrendingSection';
import './Home.css'


const Home = () => {
  return (
    <div className="Home">
    <ProfileSection/>
      <PostSection/>
      <TrendingSection/>
    </div>
  );
}

export default Home
