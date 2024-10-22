import React from 'react'

const Container = ({children,className}) => {
  return (
    <div className={`w-full  ${className}`}>{children}</div>
  )
}

export default Container