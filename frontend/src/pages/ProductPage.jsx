import React, { useState } from 'react'
import DiscountedProducts from '../components/DiscountedProducts'
import EcommerceSidebar from '../components/EcommerceSidebar'

const ProductPage = () => {
    const [filters, setFilters] = useState({
        priceRanges: [],
        authors: [],
      });

  return (
    <div className='flex'>
        <div className="w-1/4 bg-gray-100 p-10">
        <EcommerceSidebar filters={filters} setFilters={setFilters}/>
      </div>
      
      {/* Main Product Area */}
      <div className="w-3/4 bg-white p-10">
        <DiscountedProducts filters={filters}/>
      </div>
    </div>    
  )
}

export default ProductPage