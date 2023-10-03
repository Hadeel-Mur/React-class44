import React, {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'
import { NavLink} from 'react-router-dom';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

function Product() {
 
    
  const { id } = useParams();
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
        try { 
            setLoading(true)
            const response = await fetch(`https://fakestoreapi.com/products/${id}`)
            if (!response.ok) {
                throw new Error('Network response was not ok!')
            }
            const jsonData = await response.clone().json()
            console.log("Fetched data:", jsonData);
            setProduct(jsonData)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }
    if (loading) {
        fetchData()
    }
}, [id, loading])

const toggleLiked = () => {
    setLiked(!liked)
}
const Loading = () => {
    if (loading) {
        return <div>Loading... </div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }
}

const ShowProducts =() => {
   
    return (
        <>
        <div className='links'>
            <NavLink exact to={'/'} >Products</NavLink>
            <NavLink to={'/favourites/'}>Favourites</NavLink>
            </div>
        <div className='col-md-6'>
        <div className='item' onClick={toggleLiked}>
            {liked ? <FavoriteOutlinedIcon/> : <FavoriteBorderOutlinedIcon/>}
         </div>
            <img src={product.image} alt={product.title}
            height='auto' width='370px'/>
            
        </div>
        <div className='col-md-6'>
            <h4 className='text-uppercase text-black-50'>{product.category}</h4>
            <h1 className='display-5'>{product.title}</h1>
            <p className='lead fw-bolder'>Rating{product.rating && product.rating.rate}</p>
            <h3 className='display-6 fw-bold my-4'>${product.price}</h3>
            <p className='lead'>{product.description}</p>
        </div>
        </>
    )
}
  return (
    <div>
         <div className='container'>
                <div className='row'>
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
         </div>
    </div>
  )
}

export default Product