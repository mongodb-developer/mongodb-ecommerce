import { useState } from 'react'
import Image from "next/image";

const Products = ({product}) => {
  const [name, setName] = useState(product.name)
  const [price, setPrice] = useState(product.price)

  const handleNameUpdate = (e) => {
    setName(e.target.value)
  }

  const handlePriceUpdate = (e) => {
    setPrice(e.target.value)
  }

  return (
    <div className="grid gap-6 pr-8 grid-cols-5 w-full items-center bg-white rounded-md shadow-md overflow-hidden">
      <div className="flex items-end justify-end h-16 w-16 w-full bg-cover relative">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="absolute z-0"
        />
      </div>
      <input type="text" className="col-span-2 text-gray-800 text-lg uppercase border border-green-500 px-4 py-2" value={name} onChange={handleNameUpdate} />
      <input type="number" className="col-span-2 text-gray-800 text-lg border border-green-500 px-4 py-2" value={price} onChange={handlePriceUpdate} />
    </div>
  )
}

export default Products
