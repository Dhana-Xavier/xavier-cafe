import React from 'react'
import { useEffect,useState } from 'react'
export default function Body() {

  const [img,setImg]=useState("body");
  var images=['body','banner1st','banner5','Banner3'];

  useEffect(() => {
        const interval = setInterval(() => {
          setImg((prevImg) => {
            const currentIndex = images.indexOf(prevImg);
            const nextIndex = (currentIndex + 1) % images.length;
            return images[nextIndex];
          });
        }, 6000);
      
        return () => clearInterval(interval);
      }, [images]);
  return (
    <div className='body' >
         <img src={`./assets/${img}.png`} />
            </div>
  )
}
