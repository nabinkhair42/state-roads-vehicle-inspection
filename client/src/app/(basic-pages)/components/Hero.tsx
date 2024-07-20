"use client";
import React from 'react';
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Hero1 from "@/assets/hero/hero1.jpg";
import Hero2 from "@/assets/hero/hero2.jpg";
import Hero3 from "@/assets/hero/hero3.jpg";
import Hero4 from "@/assets/hero/hero4.jpg";
const images = [Hero1, Hero2, Hero3, Hero4];

const Hero = () => {
    return (
        <section className="overflow-x-clip">
            <Carousel>
                <CarouselContent>
                    {images.map((src, index) => (
                        <CarouselItem key={index}>
                            <Image src={src} alt={`Hero Image ${index + 1}`} className='object-cover' />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    );
};

export default Hero;
