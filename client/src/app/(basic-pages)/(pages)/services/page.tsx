import React from 'react'
import ServiceTypes from '@/app/(basic-pages)/(pages)/services/components/ServiceTypes';
import Testimonial from '@/app/(basic-pages)/(pages)/services/components/Testimonial';
const BookAppointment = () => {
  return (
    <div className='container min-h-screen overflow-x-clip'>
      <ServiceTypes />
      <Testimonial/>
    </div>
  )
}

export default BookAppointment