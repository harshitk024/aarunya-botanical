import React from 'react'
import Headers from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Products from "../components/Products"

const Home = () => {
  return (
    <div>
      <Headers />
      <Products />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home
