import React from 'react'
import Loader from './Loader.gif'

export default function Spinner(){
    return (
      <div className='container loader text-center'>
        <img src={Loader} alt="" />
      </div>
    )
  }
