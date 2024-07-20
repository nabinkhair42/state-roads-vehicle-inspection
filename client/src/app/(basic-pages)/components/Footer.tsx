"use client";
import React from 'react'
import Logo from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '../../../components/ui/separator';

const ContactUs = [
  {
    place: 'Melbourne',
    contact: '03 98508000',
  },

  {
    place: 'NSW',
    contact: '02 96551411',
  },
  {
    place: 'Bris/Gold Coast',
    contact: '07 33678000',
  },
  {
    place: 'Perth',
    contact: '08 63232069',
  },
]


const CarInspections = [

  {
    name: 'Body & Chassis Car Inspections',
    url: '#',
  },
  {
    name: 'Comprehensive Vehicle Inspections',
    url: '#',
  },
  {
    name: 'Mechanical Inspections',
    url: '#',
  },
  {
    name: 'Testimonials - customers love us!',
    url: "#",
  },
]

const Links = [

  {
    name: 'Car Checks Melbourne',
    url: '#',
  },
  {
    name: 'Mobile Vehicle Inspections Melbourne',
    url: '#',
  },
  {
    name: 'Car Inspections Melbourne',
    url: '#',
  },
  {
    name: 'Vehicle Inspections Australia Wide',
    url: '#',
  },
]

const Footer = () => {
  return (
    <footer className="p-4 container border-t">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            
              <Image src={Logo} className="mr-3 h-16 width-12 object-contain" alt="Logo of Company" />
              <span className="self-center text-sm  ">Just Car Inspections operates in several states
              around Australia</span>
            
          </div>
          <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold ">Contact Us</h2>
              <ul className="text-muted-foreground">
                {ContactUs.map((contact, index) => (
                  <li key={index} className="mb-4 flex flex-col gap-1 text-nowrap justify-start items-start">
                    <span>{contact.place}</span>
                    <span className="block text-sm text-primary">{contact.contact}</span>
                  </li>
                ))}
              </ul>
              
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-wrap">Links</h2>
              <ul className="text-muted-foreground">
                {Links.map((link, index) => (
                  <li key={index} className="mb-4 flex flex-col gap-1 text-nowrap justify-start items-start">
                    <span></span>
                    <Link href={link.url} className="block text-sm text-primary">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link href="/" className="hover:underline">Vehicle Testing Pty Ltd T/A Stateroads Inspections ABN 86123807447</Link>. All Rights Reserved.
          </span>
          {/* <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a href="#" className="text-gray-500 hover: dark:hover:text-white">

            </a>
            <a href="#" className="text-gray-500 hover: dark:hover:text-white">

            </a>
            <a href="#" className="text-gray-500 hover: dark:hover:text-white">

            </a>
            <a href="#" className="text-gray-500 hover: dark:hover:text-white">

            </a>
            <a href="#" className="text-gray-500 hover: dark:hover:text-white">

            </a>
          </div> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer

