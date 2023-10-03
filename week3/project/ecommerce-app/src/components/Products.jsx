import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';



function Products() {


const storedFavProduct = localStorage.getItem('FavProducts');
const convertJson = JSON.parse(storedFavProduct);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedProducts, setLikedProducts] = useState(convertJson);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok!');
        }
        const jsonData = await response.clone().json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    if (loading) {
      fetchData();
    }
  }, [loading]);

  const toggleLiked = (product) => {
    
    let status = true
    likedProducts.forEach(p => {
      if (Number(p.id) === Number(product.id)) {
        let filterProduct = likedProducts.filter((id) => id.id !== product.id)        
        setLikedProducts(filterProduct);
        status = false
      }
    });
    if (status) {
      setLikedProducts([...likedProducts, product]);
    }    
  };

  useEffect(()=>{
    localStorage.setItem('FavProducts', JSON.stringify(likedProducts))

  },[likedProducts])
  


  const Loading = () => {
    if (loading) {
      return <div>Loading... </div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }
  };

  const menuItems = [...new Set(data.map((val) => val.category))];
  const filterItems = (cat) => {
    const newItems = data.filter((x) => x.category === cat);
    setFilter(newItems);
  };

  const ShowProducts = () => {
    const [selectedCat, setSelectedCat] = useState(null);

    const handleClicking = (val) => {
      setSelectedCat(val);
      filterItems(val);
    };
    const itemsToDisplay = filter || data || [];

    return (
      <>
        <div className="buttons d-flex justify-content-center mb-2 pb-2">
          {menuItems.map((val) => (
            <button
              key={val}
              className={`btn btn-outline-dark me-2 ${
                selectedCat === val ? 'selected-category' : ''
              }`}
              onClick={() => handleClicking(val)}
            >
              {val}
            </button>
          ))}
         
        </div>
        {itemsToDisplay.map((product) => {
          const foundProduct = likedProducts.find(pro => pro.id === product.id);
          return (
            <div className="col-md-3 mb-4" key={product.id}>
              <div className="card h-100 text-center p-4">
                <div className="item" onClick={() => toggleLiked(product)}>
                  {
                  foundProduct ?  <FavoriteOutlinedIcon />  :  <FavoriteBorderOutlinedIcon />}
                  
                </div>
                <img
                  src={product.image}
                  alt={product.title}
                  height="70%"
                />
                <div className="card-body">
                  <NavLink to={`/products/${product.id}`}>{product.title}</NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-2 py-2">
        <div className="row">
          <div className="col-12 mb-2">
            <div className='links'>
            <NavLink exact to={'/'} >Products</NavLink>
            <NavLink to={'/favourites/'}>Favourites</NavLink>
            </div>
            <h1 className="display-6 fw-bolder text-center">Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
}

export default Products;
