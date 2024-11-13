import React from 'react'
import ProjectStatics from '../components/ProjectStatics'
import MyRoom from '../components/MyRoom'
import PLatforms from '../components/PLatforms'
import DeviceCard from '../components/DeviceCard'

import { CgSmartHomeRefrigerator } from "react-icons/cg"
import { PiPlugCharging } from "react-icons/pi"
import { PiLightbulbFilament } from "react-icons/pi"
import { ImSwitch } from "react-icons/im";
import { MdOutlineSensorDoor } from "react-icons/md";



const Home = () => {
  const devices = [
    {
      name: "Relay 1",
      status: 1,
      icon: CgSmartHomeRefrigerator,
      description: "Refrigerator"
    },
    {
      name: "Relay 2",
      status: 1,
      icon: PiPlugCharging,
      description: "Smart..."
    },
    {
      name: "Relay 3",
      status: 0,
      icon: MdOutlineSensorDoor,
      description: "Door"
    },
    {
      name: "Relay 4",
      status: 1,
      icon: PiLightbulbFilament,
      description: "Lightbulb"
    },
    {
      name: "Relay 5",
      status: 0,
      icon: ImSwitch,
      description: "Smart..."
    }
  ]
  return (
    <div className='p-5'>
      <div className='grid grid-cols-2 gap-4 pb-5'>
        <div className='grid grid-cols-2 gap-4'>
          <PLatforms />
          <PLatforms />
        </div>
        <ProjectStatics className="col-span-2" />
      </div>

      <div className='pb-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-lg font-semibold'>Device</h1>
          <p className='tex-sm underline text-indigo-600'></p>
        </div>

        <div className='grid md:grid-cols-2 xl:grid-cols-5 gap-10'>
          {
            devices && devices.map((device)=> <DeviceCard device={device}/> )
          }
        </div>
      </div>

      <MyRoom />
      
    </div>
  )
}

export default Home