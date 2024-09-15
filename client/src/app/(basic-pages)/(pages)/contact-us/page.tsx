import React from 'react';

import { Phone, Mail, PinIcon } from "lucide-react"
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';


const ContactUS = () => {
  return (
    <main className='overflow-x-clip'>
    
      <section className="py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">Contact us</h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-muted-foreground"> </p>
          </div>

          <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
            <div className="grid grid-cols-1 gap-6 px-8 text-center md:px-0 md:grid-cols-3">
              <div className="overflow-hidden border shadow-sm rounded-xl">
                <div className="p-6 flex flex-col justify-center items-center">
                  <Phone className='h-10 w-10 text-muted-foreground' />
                  <p className="mt-6 text-lg font-medium">Melbourne</p>
                  <a className="mt-1 text-lg font-medium" href="tel:(03) 9850 8000">(03) 98508000</a>
                </div>
              </div>

              <div className="overflow-hidden border shadow-sm rounded-xl">
                <div className="p-6 flex flex-col justify-center items-center">
                  <Mail className='h-10 w-10 text-muted-foreground' />
                  <p className="mt-6 text-lg font-medium">contact@example.com</p>
                  <p className="mt-1 text-lg font-medium">hr@example.com</p>
                </div>
              </div>

              <div className="overflow-hidden border shadow-sm rounded-xl">
                <div className="p-6 flex flex-col justify-center items-center">
                  <PinIcon className='h-10 w-10 text-muted-foreground' />
                  <p className="mt-6 text-lg font-medium leading-relaxed">8502 Preston Rd. Ingle, Maine 98380, USA</p>
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-hidden border shadow-sm rounded-xl">
              <div className="px-6 py-12 sm:p-12">
                <h3 className="text-3xl font-semibold text-center">Send us a message</h3>

                <form action="#" method="POST" className="mt-14">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                    <div>
                      <Label htmlFor="name" className="text-base font-medium"> Your name </Label>
                      <div className="mt-2.5 relative">
                        <Input type="text" name="" id="" placeholder="Enter your full name" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-base font-medium"> Email address </Label>
                      <div className="mt-2.5 relative">
                        <Input type="email" name="" id="" placeholder="Enter your full name" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="Phone Number" className="text-base font-medium"> Phone number </Label>
                      <div className="mt-2.5 relative">
                        <Input type="tel" name="" id="" placeholder="Enter your full name" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="Company Name" className="text-base font-medium"> Company name </Label>
                      <div className="mt-2.5 relative">
                        <Input type="text" name="" id="" placeholder="Enter your full name" />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="Message" className="text-base font-medium"> Message </Label>
                      <div className="mt-2.5 relative">
                        <Textarea placeholder='Type your message here.'></Textarea>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <Button className='w-full '>
                        Send
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div>
            <iframe className="w-full h-96 mt-16" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.154320165223!2d144.9619503152587!3d-37.79910597975403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad643d6e1e6a1f7%3A0x9e4b1c6d2c1b4f4c!2sUniversity%20of%20Melbourne!5e0!3m2!1sen!2sau!4v1631862946487!5m2!1sen!2sau" width="600" height="450" style={{border:0}} loading="lazy"></iframe>
          </div>
        </div>
        
      </section>
    </main>
  )
}

export default ContactUS;