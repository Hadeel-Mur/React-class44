import React, { useState, useEffect } from 'react'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { NavLink } from 'react-router-dom';

function Favourites() {
  const favProducts = localStorage.getItem('FavProducts')
  const convertProducts = JSON.parse(favProducts);
  const [newFilteredData , setNewFilteredData] = useState(convertProducts)

  const toggleLiked = (product) => {


    convertProducts.forEach(p => {
      if (Number(p.id) === Number(product.id)) {
        let filterProduct = convertProducts.filter((id) => id.id !== product.id)
        console.log(filterProduct)
        setNewFilteredData(filterProduct);
       
      }
    });     
  };

  useEffect(()=>{
    localStorage.setItem('FavProducts', JSON.stringify(newFilteredData))

  },[newFilteredData])

  
  return (
    <div>
      <div className='links'>
            <NavLink exact to={'/'} >Products</NavLink>
            <NavLink to={'/favourites/'}>Favourites</NavLink>
            </div>
        <h1>Favourites</h1>
        {newFilteredData.length === 0 ? (
            <p>You haven't chosen any favourites yet!</p>
        ) : (
            <ul>
                {newFilteredData.map((productId)  => {
                 return(

                  <div key={productId.id} className="card h-100 text-center p-4 col-md-3 mb-4">
                    <FavoriteOutlinedIcon onClick={() => toggleLiked(productId)} className='icon'/>
                   <img
                   src={productId.image}
                   alt={productId.title}
                   height="250px"
                   width="250px"
                   /> {productId.title}{' '}
                  </div>
                 ) 
                 })}
            </ul>
            
        )}
    </div>
  )
}

export default Favourites