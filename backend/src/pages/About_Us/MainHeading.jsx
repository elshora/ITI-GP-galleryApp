import React from 'react'

export default function MainHeading({title}) {
    return (
        <>
        <div className="my-3">   
        <h1 className='text-center display-5 text-capitalize'>{title}</h1>
        <div className='line'>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
        </div>
      </div>
      </>
  )
}
