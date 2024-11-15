// "use client";

// import React, { useEffect, useState } from "react";
// import Autoplay from "embla-carousel-autoplay";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Link from "next/link";
// import Hero1 from "@/assets/hero/hero1.jpg";
// import Hero2 from "@/assets/hero/hero2.jpg";
// import Hero3 from "@/assets/hero/hero3.jpg";
// import Hero4 from "@/assets/hero/hero4.jpg";

// const heroContent = [
//   {
//     image: Hero1,
//     title: "Expert Car Inspections",
//     description: "Trust our certified mechanics for thorough vehicle checks",
//     cta: "Book Now",
//     link: "/book-inspection",
//   },
//   {
//     image: Hero2,
//     title: "Comprehensive Reports",
//     description: "Detailed analysis of 250+ points for informed decisions",
//     cta: "Learn More",
//     link: "/our-process",
//   },
//   {
//     image: Hero3,
//     title: "30-Day Protection",
//     description: "Peace of mind with our post-inspection guarantee",
//     cta: "See Coverage",
//     link: "/protection-plan",
//   },
//   {
//     image: Hero4,
//     title: "Nationwide Service",
//     description: "Available in major cities across Australia",
//     cta: "Find Locations",
//     link: "/locations",
//   },
// ];

// const Hero = () => {
//   const [api, setApi] = useState<any>();
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     if (!api) return;

//     api.on("select", () => {
//       setCurrent(api.selectedScrollSnap());
//     });
//   }, [api]);

//   return (
//     <section className="relative overflow-hidden">
//       <Carousel
//         setApi={setApi}
//         opts={{
//           align: "start",
//           loop: true,
//         }}
//         plugins={[
//           Autoplay({
//             delay: 5000,
//           }),
//         ]}
//         className="w-full"
//       >
//         <CarouselContent>
//           {heroContent.map((item, index) => (
//             <CarouselItem key={index}>
//               <div className="relative h-[60vh] md:h-[80vh]">
//                 <Image
//                   src={item.image}
//                   alt={item.title}
//                   fill
//                   className="object-cover"
//                   priority={index === 0}
//                 />
//                 <div className="absolute inset-0 bg-black/50" />
//                 <Card className="absolute inset-0 flex items-center justify-center bg-transparent border-0 shadow-none">
//                   <CardContent className="text-center text-white p-6 max-w-2xl">
//                     <h2 className="text-3xl md:text-5xl font-bold mb-4">
//                       {item.title}
//                     </h2>
//                     <p className="text-lg md:text-xl mb-6">
//                       {item.description}
//                     </p>
//                     <Button asChild size="lg">
//                       <Link href={item.link}>{item.cta}</Link>
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {heroContent.map((_, index) => (
//             <Button
//               key={index}
//               variant="outline"
//               size="icon"
//               className={`w-3 h-3 rounded-full ${
//                 index === current ? "bg-white" : "bg-white/50"
//               }`}
//               onClick={() => api?.scrollTo(index)}
//             >
//               <span className="sr-only">Go to slide {index + 1}</span>
//             </Button>
//           ))}
//         </div>
//         <CarouselPrevious className="absolute left-4 top-1/2" />
//         <CarouselNext className="absolute right-4 top-1/2" />
//       </Carousel>
//     </section>
//   );
// };

// export default Hero;
