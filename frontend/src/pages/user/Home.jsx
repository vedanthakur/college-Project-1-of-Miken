import React, { useState } from 'react'
import Hero from '../../components/user/Hero'
import ExploreMenu from '../../components/user/ExploreMenu'
import FoodDisplay from '../../components/user/FoodDisplay'

const Home = () => {
  const [category,setCategory] = useState("All")
  return (
    <div>
      <Hero/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} />
    </div>
  )
}

export default Home
