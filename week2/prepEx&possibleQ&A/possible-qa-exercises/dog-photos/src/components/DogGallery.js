import React, {useState} from 'react'
import Button from './Button'
import DogPhoto from './DogPhoto'

function DogGallery() {
  const [dogPhotos, setDogPhotos] = useState([])

const getDogPhoto = async () => {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random')
        if(!response.ok) {
            throw new Error('Network response was not ok!')
        }
        const data = await response.json()
        setDogPhotos([...dogPhotos, data.message])
    } catch (error) {
        console.error('Error fetching dog photo:', error)
    }
  }

  return (
    <div>
        <h1>Dog Gallery</h1>
        <Button getDogPhoto={getDogPhoto}/>
        {dogPhotos.length === 0 ? (<p>Get your first dog photo by clicking the button</p>)
         : (dogPhotos.map((dogPhoto, index) => (<DogPhoto key={index} url={dogPhoto}/>)))}
    </div>
  )
}

export default DogGallery