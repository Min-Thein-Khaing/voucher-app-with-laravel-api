import React from 'react'
import { Link } from 'react-router-dom'

const ModuleBtn = ({name,icon,url}) => {
  return (
    <div>
        <Link to={url} className='flex flex-col gap-2 items-center w-full h-full p-5  bg-blue-600 rounded-md text-white'>
            {icon}
            {name}
        </Link>
    </div>
  )
}

export default ModuleBtn