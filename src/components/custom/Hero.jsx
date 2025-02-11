import React from 'react'
import {Button} from '../ui/button'
import { Link } from 'react-router-dom'
function Hero() {
  return (
    <div className='flex flex-col items-center mt-20 mx-auto justify-center gap-7 '>
      <h1 className='font-extrabold text-[50px] text-center mt-10'>
        <span className='text-[#f56458]'>Unleash the Explorer in You with AI:</span><br/>Your Ultimate Personalized Travel Guide!
        </h1>
        <p className='text-xl text-gray-500 text-center'>Your Ultimate Travel Buddy: Designing Dream Itineraries Tailored to Your Interests and Budget!</p>
        <Link to={'/create-trip'}>
        <Button>Search For Free!</Button>
        </Link>

      </div>
  )
}

export default Hero