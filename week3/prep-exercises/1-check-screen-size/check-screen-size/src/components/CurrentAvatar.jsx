import React , {useState, useEffect, useWindowSize} from 'react'
import ScreenSize from './CurrentAvatar/ScreenSize'
import Bighead from 'react-bigheads'

function CurrentAvatar(){
  const isBigScreen = useWindowSize(1000, Infinity)
  const isSmallScreen = useWindowSize(0, 700)

  const [avatarProps, setAvatarProps] = useState({})

  useEffect(() => {
      const generateRandomAvatar =() => {
        const avatars = {
          big:{
            name: 'Mithi',
          hat: 'beanie',
          hatColor: 'blue',
          accessory: 'roundGlasses',
          clothing: 'shirt',
          clothingColor: 'white',
          graphic: 'react',
          }, 
          medium: {
            name: 'Diana',
            hat: 'cap',
            hatColor: 'green',
            accessory: 'sunglasses',
            clothing: 'hoodie',
            clothingColor: 'gray',
            graphic: 'vue',
          },
          small: {
            name: 'Mikong',
            hat: 'partyHat',
            hatColor: 'red',
            accessory: 'none',
            clothing: 'dress',
            clothingColor: 'pink',
            graphic: 'angular',
          },
        }
        if( isBigScreen){
          return avatars.big
        } else if (isSmallScreen){
          return avatars.small
        }else {
          return avatars.medium
        }
      }
      setAvatarProps(generateRandomAvatar())
  }, [isBigScreen, isSmallScreen])

  return (
    <div>
      <Bighead {...avatarProps}/>
    </div>
  )
}

export default CurrentAvatar