import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import { CircleCheck, TimerIcon } from 'lucide-react';

const services = [
  {
    title: 'Comprehensive Inspection',
    description: 'Complete Peace of Mind for Your Vehicle Purchase',
    price: '$45',
    included: [
      '250+ separate checks',
      '3-5 km road test',
      'Detailed five-page report',
      'Personal feedback from inspector',
      'Interior checks (Battery, AC, Fuel system, etc.)',
      'Body & chassis checks (Tyres, Suspension, etc.)',
    ],
  },
  {
    title: 'Mechanical Inspection',
    description: 'Comprehensive Assessment of Mechanical Condition',
    price: '$30',
    included: [
      'Checks on motor, gear box, differential, and drive line',
      'Detailed mechanical health assessment',
      'Battery, AC compressor, Fuel system operation',
      'Engine & transmission leaks, Suspension, Tyres',
    ],
  },
  {
    title: 'Body and Chassis Inspections',
    description: 'Protection from Collision and Structural Damage Risks',
    price: '$35',
    included: [
      'Structural integrity check',
      'Identifies repairs, scratches, cosmetic touch ups, rust, dents',
      'All panels including paint depth testing',
      'Turn signal lights, Fog lamps, Tail lights, etc.',
    ],
  },
];

const ServiceTypes = () => {
  return (
    <main className="flex flex-wrap justify-center gap-6 mt-20">
      {services.map((service, index) => (
        <Card key={index} className={`flex flex-col gap-6 w-80 md:w-96 border border-gray-300 shadow-lg`}>
          <CardHeader className="flex flex-col items-center p-6 bg-card rounded-lg">
            <CardTitle className="text-xl font-semibold text-center">{service.title}</CardTitle>
            <CardTitle className="text-3xl font-bold text-center mt-2 text-primary">{service.price}</CardTitle>
            <CardDescription className="text-center mt-2">{service.description}</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="flex-grow p-6">
            <CardTitle className="text-lg font-semibold mb-4">Service Included:</CardTitle>
            <ul className="ml-4">
              {service.included.map((item, i) => (
                <li key={i} className="flex items-center mb-2 text-sm">
                  <CircleCheck className="mr-2 w-4 h-4 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
          <Separator />
          <CardFooter className="flex justify-center p-6 mt-auto">
            <Button className='flex gap-2'>Book Appointment</Button>
          </CardFooter>
        </Card>
      ))}
    </main>
  );
};

export default ServiceTypes;
