import Reac,{useState} from 'react'
import WishCards from './WishCards';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [name, setName] = useState("");
    const [showcards, setShowCards] = useState(false);

    const navigate = useNavigate();
  
    const cards = [
      {
        text: "Wishing you a joyful day!",
        image: "https://www.freshcutpaper.com/cdn/shop/files/Blooming-Roses_Less-Cropped.jpg?v=1745341757&width=1080",
      },
      {
        text: "Hope your birthday is full of love!",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHG9Gne0_RJhXp9meHbkgBhXsrSddR6NUs2g&s",
      },
      {
        text: "Cheers to another awesome year!",
        image: "https://static.vecteezy.com/system/resources/previews/022/769/837/non_2x/beautiful-pink-rose-flower-frame-with-watercolor-for-wedding-birthday-card-background-invitation-wallpaper-sticker-decoration-etc-vector.jpg",
      }
    ];
    
    function handleClick(card){
        navigate('/custom', {state: {name ,card}})
    }

    return (
      <div>
      {!showcards ? (
        <>
           <div className='text-5xl flex text-purple-900 flex-col items-center border-b-amber-200 rounded shadow py-5'>
           <h1>Birthday Wisher Site</h1>  
              </div>
           <div className='flex flex-col justify-center items-center my-20'>
            <div className='text-4xl mb-10 text-gray-600'>Enter Name</div>
            <input className='py-4 text-center w-[380px] rounded-lg' type="text" value={name} placeholder='Enter Name' onChange={(e)=> setName(e.target.value)}/>
            <button onClick={()=> setShowCards(true)} className=' text-gray-100 mt-10 py-4 rounded-lg w-[180px] hover:shadow-2xl bg-purple-400 hover:bg-purple-500'>Show Cards</button>
             </div>
        </> 
            ) : (<div className='flex justify-center items-center h-screen'>
                    {cards.map((card,i) => {
                      return  <WishCards 
                          key={i}
                          name={name}
                          wishText={card.text}
                          imgUrl={card.image}
                          onSelect={()=> handleClick(card)}
                        /> 
                    })}
                </div>
        )}
      </div>
    )
}

export default Home
