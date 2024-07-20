import React from 'react';
import Image from "next/image";
import Car1 from "@/assets/products/car1.jpg";
import Car2 from "@/assets/products/car2.jpg";
import Car3 from "@/assets/products/car3.jpg";
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { Notebook, ShoppingCart, Star, Timer } from 'lucide-react';

const CardDetails = [
    {
        image: Car1,
        title: 'Title Goes Here',
        price: '$599'
    },
    {
        image: Car2,
        title: 'Title Goes Here',
        price: '$599'
    },
    {
        image: Car3,
        title: 'Title Goes Here',
        price: '$599'
    },


]
const CarShowcase = () => {
    return (
        <main className='container flex flex-col gap-4 mt-14'>
            <h1 className="text-center md:text-4xl text-3xl font-Semibold ">Recently Added Cars</h1>
        <div className='w-full h-fit gap-2 lg:gap-6 mb-8 justify-center items-center grid md:grid-cols-2 xl:grid-cols-3'>
            {CardDetails.map((card, index) => (
                <div className="w-fit px-2 py-6 bg-background border  rounded-lg shadow flex flex-col justify-center items-center gap-4">
                    <div className='flex gap-4 flex-col rounded-lg w-fit'>
                        <div className='rounded-lg border shadow'>
                            <Image className="rounded-lg h-64 object-cover" src={card.image} alt="product image" />
                        </div>
                        <div className="px-5 pb-5 flex flex-col gap-3">
                            <h1 className='text-xl'>{card.title}</h1>
                            <div className="flex gap-2 justify-between items-center">
                                <span className="text-2xl font-bold">{card.price}</span>

                            </div>

                            <div className='flex justify-between'>

                                <Link href="#">
                                    <Button variant={"outline"} className='flex gap-2 py-2 justify-center items-center '><Notebook className="w-4" /> View Report</Button>
                                </Link>
                                <Link href="/book-appointment">
                                    <Button className='flex gap-2 py-2 justify-center items-center'><Timer className="w-4" /> Book Appointment</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
        </main>
    )
}

export default CarShowcase


