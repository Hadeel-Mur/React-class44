import React from 'react'
import productData from '../fake-data/all-products'



function Buttons({menuItems, filterItems, setItems}) {
  return (
    <div className='d-flex justify-content-center mb-2'>
    { menuItems.map(val => (
        <button
        onClick={() => filterItems(val)}>
        {val}
        </button>
    ))}
    <button className='btn-dark text-white p-1 px-2 mx-5 btn fw-bold'
    onClick={() => setItems(productData)}>
        All
    </button>
    </div>
  )
}

export default Buttons