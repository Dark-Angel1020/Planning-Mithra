import React from 'react'
import { Link } from 'react-router-dom'

function Placecard({ place, placeDetails }) {
  var pl=placeDetails
  return (
    <Link className='text-black no-underline'
                  to={
                    'https://www.google.com/maps/search/?api=1&query=' +
                    encodeURIComponent(place)
                  }
                  target="_blank" 
                  rel="noopener noreferrer"
                >
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img src='/lock.svg'
        className='w-[100px] h-[130px] rounded-xl'
        />
        <div>
            <h2 className='font-bold text-lg text-black no-underline'>{place}</h2>
            <p className="text-md text-gray-500 mt-2">{pl}</p>
        </div>
    </div>
    </Link>
  )
}

export default Placecard