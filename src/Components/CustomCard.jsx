import React, { useState ,useEffect, useRef} from 'react'
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';

function CustomCard() {

   const location = useLocation();
   const {name, card} = location.state || {};
   const [message, setMessage] = useState(card.text);
   const [namePos, setNamePos] = useState({x: 30, y: 30});
   const [msgPos, setMsgPos] = useState({x: 30, y: 60});
   const [dragging, setDragging] = useState(false);

   const cardRef = useRef()
   const captureRef = useRef();

   const handleMouseDown = (e, target) => {
     setDragging({
       target,
       offsetX: e.clientX - (target === 'name' ? namePos.x : msgPos.x),
       offsetY: e.clientY - (target === 'name' ? namePos.y : msgPos.y),
     });
   };

   const handleMouseMove = (e) => {
     if (!dragging) return;
     if (!cardRef.current) return;
 
     // Get card size
     const cardRect = cardRef.current.getBoundingClientRect();
 
     // Calculate new positions
     let newX = e.clientX - dragging.offsetX;
     let newY = e.clientY - dragging.offsetY;
 
     // Prevent overflow (keep inside card)
     newX = Math.max(0, Math.min(newX, cardRect.width - 100)); // 100 is an estimated text width
     newY = Math.max(0, Math.min(newY, cardRect.height - 40)); // 40 is estimated text height
 
     if (dragging.target === 'name') {
       setNamePos({ x: newX, y: newY });
     } else if (dragging.target === 'message') {
       setMsgPos({ x: newX, y: newY });
     }
   };

   const handleMouseUp = () => setDragging(null);

   useEffect(() => {
     window.addEventListener('mousemove', handleMouseMove);
     window.addEventListener('mouseup', handleMouseUp);
     return () => {
       window.removeEventListener('mousemove', handleMouseMove);
       window.removeEventListener('mouseup', handleMouseUp);
     };
   }, [dragging]);

   const handleDownload = async() => {
     if (!cardRef.current) return;

     // Wait a bit to ensure styles are applied (optional but helps sometimes)
     await new Promise((res) => setTimeout(res, 100));
   
     const canvas = await html2canvas(cardRef.current, {
       useCORS: true, // helpful if images are from external sources
     });
   
     const dataURL = canvas.toDataURL('image/png');
     const link = document.createElement('a');
     link.href = dataURL;
     link.download = 'greeting_card.png';
     link.click();
   }
 

  return (
     <div className='bg-purple-200 h-screen'>
     <div className='flex justify-center'>
        <div className='relative h-[300px] w-[420px] mt-20 bg-cover bg-center rounded-[16px] overflow-hidden' ref={cardRef} style={{backgroundImage:`url(${card.image})`}}>
          <div className='absolute textlg text-white font-bold cursor-move'
               style={{ top: namePos.y, left: namePos.x }}
               onMouseDown={(e) => handleMouseDown(e, 'name')}>
               Dear {name}
          </div>
          <div className='absolute text-sm text-white  font-semibold cursor-move w-80 '
               style={{ top: msgPos.y, left: msgPos.x }}
               onMouseDown={(e) => handleMouseDown(e, 'message')}>
               {message}
          </div>
        </div>
     </div>
     <div className='flex justify-center mt-20'>
          <input type="text" value={message} onChange={(e)=> setMessage(e.target.value)} 
                 className='bg-white w-[350px] text-center rounded-lg py-4.5' placeholder='Enter the Message' />
     </div>
     <div className="flex justify-center mt-6">
        <button
          onClick={handleDownload}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg"
        >
          Download Card as Image
        </button>
      </div>
     </div>
  )
}

export default CustomCard;
