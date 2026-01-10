import { StarIcon } from 'lucide-react'

const ProductCard = ({ product, onClick }) => {
  const currency = '₹'
  const rating = 5

  return (
    <div
      onClick={onClick}
      className="
        group cursor-pointer
        border-2 border-black rounded-2xl
        p-4 sm:p-5
        w-full max-w-[280px]
        flex flex-col
      "
    >
      {/* Image wrapper */}
      <div
        className="
          bg-[#F5F5F5]
          rounded-xl
          overflow-hidden
          aspect-square
          flex items-center justify-center
        "
      >
        <img
          src={product.images[0].imageUrl}
          alt={product.name}
          className="
            w-full h-full
            object-cover
            transition-transform duration-300
            group-hover:scale-110
          "
        />
      </div>

      {/* Content */}
      <div className="mt-4 flex justify-between gap-3 text-slate-800">
        <div className="min-w-0">
          <p className="text-base sm:text-lg font-medium truncate">
            {product.name}
          </p>

          <div className="flex mt-1">
            {Array(5).fill('').map((_, index) => (
              <StarIcon
                key={index}
                size={14}
                className="mt-0.5"
                fill={rating >= index + 1 ? "#00C950" : "#D1D5DB"}
                stroke="none"
              />
            ))}
          </div>
        </div>

        <p className="text-base sm:text-lg font-semibold whitespace-nowrap">
          {currency}{product.price}
        </p>
      </div>
    </div>
  )
}

export default ProductCard
