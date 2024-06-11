import React from 'react'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'

const TurnOn = () => {
  return (
    <div className=" font-poppins flex flex-col text-center items-center justify-center md:px-20 mt-20">
        <div >
            <img src="/Turn On Location Logo.png" alt="" />
        </div>
        <div>
            <h2 className='nt-poppins text-2xl text-white mt- md:text-3xl mt-10'>
            Please turn on location is essential
            </h2>
        </div>
        <div className=' mt-10'>
        <Link to={"/map"}><Button className=" text-2xl md:text-3xl"
            text={"Turn On Location"}
            />
            </Link>
        </div>
    </div>
  )
}

export default TurnOn