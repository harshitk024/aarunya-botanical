import { useEffect } from 'react'
import BrandIntroduction from '../components/BrandIntroduction'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Products from "../components/Products"
import Carousel from '../components/SlideShow'
import { useDispatch } from 'react-redux'
import { fetchCart } from '../lib/features/cart/cartSlice'

const Home = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCart())
  },[dispatch])

  
  return (
    <div>
      <BrandIntroduction />
      <Products />
      <TopDoctors />
      <Carousel />
      <Banner />
    </div>
  )
}

export default Home
