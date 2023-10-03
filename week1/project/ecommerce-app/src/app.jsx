import { useState } from 'preact/hooks'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import productData from './fake-data/all-products'
import List from './components/List'
import Buttons from './components/Buttons'

export function App() {
const [item, setItems] = useState(productData)
const menuItems = [...new Set(productData.map((val)=> val.category))]

const filterItems = (cat) => {
  const newItems = productData.filter((newVal) => newVal.category === cat)
  setItems(newItems)
}
return (
    <div className='container-fluid'>
      <div className='row'>
        <h1 className='text-center col-12 fw-bold mt-3 mb-5'>Products</h1>
        <Buttons menuItems={menuItems}
                 filterItems={filterItems}
                 setItems={setItems}/>
        <List item={item}/>
      </div>
    </div>
  )
}  
