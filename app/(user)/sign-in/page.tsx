import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='py-20 flex justify-center'>
      <SignIn/>
    </div>
  )
}

export default page
