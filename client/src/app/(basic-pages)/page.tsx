import CarShowcase from '@/app/(basic-pages)/components/CarShowcase'
import FeaturesSectionDemo from '@/app/(basic-pages)/components/Features'

import Hero from '@/app/(basic-pages)/components/Hero'
import Inquiry from '@/app/(basic-pages)/components/Inquiry'

import React from 'react'

const page = () => {
  return (
    <main className='h-full w-full overflow-x-clip'>
    
    <Hero/>
    <CarShowcase/>
    <FeaturesSectionDemo/>
    <Inquiry/>
    
    </main>
  )
}

export default page