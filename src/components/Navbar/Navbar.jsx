import React from 'react'
import { Link } from 'react-router-dom'
import { CiHome } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className=' bg-slate-300 p-5 rounded-xl '>
        <div className=' flex flex-row gap-5 justify-between'>
<Link to={"/"}><CiHome className=' text-xl' /></Link>
<Link to={"/turnOn"}>turnOn</Link>
<Link to={"/map"}>Map</Link>
<Link to={"/wakeup"}>WakeUp</Link>
        </div>
    </div>
  )
}

export default Navbar