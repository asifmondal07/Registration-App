import React from 'react'

function Buttons({
    ButtonsText,
    type = 'button',
    bgColor = 'bg-blue-500',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button className={`w-full px-6 py-5 rounded-lg ${bgColor} ${className} ${textColor}`}{...props}>{ButtonsText}</button>
  )
}

export default Buttons