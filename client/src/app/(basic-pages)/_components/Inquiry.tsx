import { ArrowRight, PhoneCall } from 'lucide-react'
import React from 'react'

const Inquiry = () => {
    return (
        <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div
                    className="lg:py-14 lg:px-20 p-10 rounded-2xl bg-gradient-to-r from-primary to-orange-600 flex items-center justify-between flex-col lg:flex-row"
                >
                    <div className="block text-center mb-5 lg:text-left lg:mb-0">
                        <h2
                            className="font-manrope text-4xl text-white font-semibold mb-5 lg:mb-2"
                        >
                            Enquiries or Bookings
                        </h2>
                        <p className="text-sm text-white">
                            Call us today, we're ready to help
                        </p>
                    </div>
                    <a
                        href="tel:0398508000"
                        className="flex items-center gap-2 bg-background rounded-full shadow-sm text-primary font-semibold py-4 px-8 transition-all duration-500"
                    ><PhoneCall />(03) 9850 8000
                    </a>
                </div>
            </div>
        </section>

    )
}

export default Inquiry