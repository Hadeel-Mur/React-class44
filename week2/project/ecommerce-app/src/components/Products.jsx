import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
// import {Button} from 'bootstrap'


function Products() {
    const [data, setData] = useState([])
    const [filter, setFilter] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products')
                if (!response.ok) {
                    throw new Error('Network response was not ok!')
                }
                const jsonData = await response.clone().json()
                // console.log("Fetched data:", jsonData);
                setData(jsonData)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }
        if (loading) {
            fetchData()
        }
    }, [loading])


    const Loading = () => {
        if (loading) {
            return <div>Loading... </div>
        }

        if (error) {
            return <div>Error: {error.message}</div>
        }
    }

    const menuItems = [...new Set(data.map((val) => val.category))]
    const filterItems = (cat) => {
        const newItems = data.filter((x) => x.category === cat)
        setFilter(newItems)
        // console.log("Filtered items:", newItems);
    }

    const ShowProducts = () => {
        const [selectedCat, setSelectedCat] = useState(null)

        const handleClicking =(val) => {
            setSelectedCat(val);
            filterItems(val)
        }
        const itemsToDisplay = filter || data || []
        // console.log("Items to display:", itemsToDisplay);
      
        return (
            <>
                <div className='buttons d-flex justify-content-center mb-2 pb-2'>
                    {menuItems.map((val) => (
                        <button 
                            key={val}
                            className={`btn btn-outline-dark me-2 ${
                                selectedCat === val ? 'selected-category' : ''
                            }`}
                            onClick={() => handleClicking(val)}>
                            {val}
                        </button>
                    ))}
                    <button className={`btn btn-outline-dark me-2 ${
                        selectedCat === null ? 'selected-category' : ''
                    }`}
                        onClick={() => {
                            setSelectedCat(null)
                            setFilter(data)
                        }} to='/products'>
                        All
                    </button>
                </div>
                {itemsToDisplay.map((product) => {
                    return (
                        <>
                            <div className='col-md-3 mb-4'>
                                <div className='card h-100 text-center p-4' key={product.id}>
                                    <img
                                        src={product.image} alt={product.title} height='70%'/>
                                    <div className='card-body'>
                                    <NavLink to={`/products/${product.id}`} >{product.title}</NavLink>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        )
    }


    return (
        <div>
            <div className='container my-2 py-2'>
                <div className='row'>
                    <div className='col-12 mb-2'>
                        <h1 className='dosplay-6 fw-bolder text-center'>
                            Products</h1>
                        <hr />
                    </div>
                </div>
                <div className='row justify-content-center'>
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    )
}

export default Products
