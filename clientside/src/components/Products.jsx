import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
const LatestProducts = () => {

    const displayQuantity = 4
    // const products = useSelector(state => state.product.list)
    const navigate = useNavigate()

    const {products} = useContext(AppContext)

    const handleClick = (id) => {
        console.log("clicked")
        navigate(`/product/${id}`)
    }

    return (
        <div className='mt-10 px-6 my-2t 0 max-w-6xl mx-auto'>
            <Title title='LATEST PRODUCT' description={`Showing ${products.length < displayQuantity ? products.length : displayQuantity} of ${products.length} products`} href='/shop' />
            <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center'>
                {products.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, displayQuantity).map((product, index) => (
                    <ProductCard key={index} product={product} onClick = {() => {handleClick(product.id)}} />
                ))}
            </div>
        </div>
    )
}

export default LatestProducts