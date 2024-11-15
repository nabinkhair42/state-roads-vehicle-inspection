import { ArrowRight, Calendar, KeyRound, Zap } from 'lucide-react'
import React from 'react'

const Steps = () => {
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">

                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight sm:text-4xl md:mx-auto">
                    We are Looking forward to serve you soon.
                </h2>
                <p className="text-base text-gray-700 md:text-lg">
                    Our professional and comprehensive car inspections in Melbourne will ensure your next used car is not full of nasty surprises.
                </p>
            </div>
            <div className="grid gap-8 row-gap-0 lg:grid-cols-3">
                <div className="relative text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 sm:w-20 sm:h-20">
                        <Zap className='w-12 h-12 text-primary' />
                    </div>
                    <h6 className="mb-2 text-2xl font-bold">Step 1</h6>
                    <p className="max-w-md mb-3 text-sm sm:mx-auto text-muted-foreground ">
                        Select the service of your choice.
                    </p>

                    <div className="top-0 right-0 flex items-center justify-center h-24 lg:-mr-8 lg:absolute">
                        <ArrowRight className=' text-muted-foreground transform rotate-90 lg:rotate-0' />
                    </div>
                </div>
                <div className="relative text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 sm:w-20 sm:h-20">
                        <Calendar className='w-12 h-12 text-primary' />
                    </div>
                    <h6 className="mb-2 text-2xl font-bold">Step 2</h6>
                    <p className="max-w-md mb-3 text-sm sm:mx-auto text-muted-foreground">
                        Select the date and time that suits you best.
                    </p>

                    <div className="top-0 right-0 flex items-center justify-center h-24 lg:-mr-8 lg:absolute">
                        <ArrowRight className=' text-muted-foreground transform rotate-90 lg:rotate-0' />
                    </div>
                </div>
                <div className="relative text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 sm:w-20 sm:h-20">
                        <KeyRound className='w-12 h-12 text-primary' />
                    </div>
                    <h6 className="mb-2 text-2xl font-bold">Step 3</h6>
                    <p className="max-w-md mb-3 text-sm sm:mx-auto text-muted-foreground">
                        Sign up and confirm your booking.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Steps