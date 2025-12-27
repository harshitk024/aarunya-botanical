import { StarIcon } from 'lucide-react'

const ProductCard = ({ product,onClick }) => {

    const currency = '$'

    const rating = Math.round(product.rating.reduce((acc, curr) => acc + curr, 0) / product.rating.length);
    console.log(product.rating.reduce((acc,curr) => acc + curr,0))

    return (
        <div className=' group max-xl:mx-auto' onClick={onClick}>
            <div className='bg-[#F5F5F5] h-40  sm:w-60 sm:h-68 rounded-lg flex items-center justify-center'>
                <img width={500} height={500} className='max-h-30 sm:max-h-40 w-auto group-hover:scale-115 transition duration-300' src={product.images[0]} alt="" />
            </div>
            <div className='flex justify-between gap-3 text-sm text-slate-800 pt-2 max-w-60'>
                <div>
                    <p>{product.name}</p>
                    <div className='flex'>
                        {Array(5).fill('').map((_, index) => (
                            <StarIcon key={index} size={14} className='text-transparent mt-0.5' fill={rating >= index + 1 ? "#00C950" : "#D1D5DB"} />
                        ))}
                    </div>
                </div>
                <p>{currency}{product.price}</p>
            </div>
        </div>
    )
}

export default ProductCard