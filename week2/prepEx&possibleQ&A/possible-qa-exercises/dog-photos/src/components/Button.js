import React from 'react'

function Button({getDogPhoto}) {
  return (
    <button onClick={getDogPhoto}> Get a dog pic!</button>
  )
}

export default Button