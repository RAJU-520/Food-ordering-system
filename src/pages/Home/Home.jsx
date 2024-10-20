import React, { useState } from 'react' // Import useState
import './Home.css' // Ensure this file exists and has your styles
import Header from '../../components/Header/Header' // Import Header component
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu' // Import ExploreMenu component
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import Restaurants from '../../components/Restaurants/Restaurants'

const Home = () => {
  const [category, setCategory] = useState("All"); // Initialize state for category

  return (
    <div>
      <Header /> {/* Render Header */}
      <ExploreMenu category={category} setCategory={setCategory} /> 
      <FoodDisplay category={category}/>
      <Restaurants/>
      <AppDownload/> {/* Pass props to ExploreMenu */}
      
    </div>
  )
}

export default Home; // Export Home component
