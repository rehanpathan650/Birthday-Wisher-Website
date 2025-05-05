import React from 'react'

function WishCards({name ,wishText ,imgUrl ,onSelect}) {
  return (
    <div onClick={onSelect} 
    className=' w-[300px] h-[200px] bg-cover bg-center rounded-[16px] 
    p-5 m-2 text-black cursor-pointer shadow-md 
    flex flex-col justify-end text-shadow' style={{backgroundImage: `url(${imgUrl})`}}>
     <h1>{name}</h1>
     <p>{wishText}</p>
    </div>
  )
}

export default WishCards;
