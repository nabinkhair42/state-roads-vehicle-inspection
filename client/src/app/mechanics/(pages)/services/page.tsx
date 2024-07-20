"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Page = () => {
  const [features, setFeatures] = useState(['']); // suru ko state ma empty hunxa hai

  const addFeature = () => {
    setFeatures([...features, '']); // Naya Feature add garna ko lagi
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Create Your Own Services</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            You can start selling as soon as you add a product.
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className='flex gap-2'><Plus />Add Service</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-h-[800px] overflow-y-auto">
              <AlertDialogHeader>
                <AlertDialogTitle>Add new service to your store</AlertDialogTitle>
                <AlertDialogDescription>
                  A basic structure of the service card is provided below. You can edit all the details as per your needs.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogDescription className='w-full flex justify-center items-center'>
                <Card className={`flex flex-col gap-6 w-80 md:w-96 border border-gray-300 shadow-lg`}>
                  <CardHeader className="flex flex-col items-center p-6 bg-card rounded-lg">
                    <CardTitle className="text-xl font-semibold text-center">
                      <Input type='text' placeholder='Title of Your Service' />
                    </CardTitle>
                    <CardTitle className="text-3xl font-bold text-center mt-2 text-primary">
                      <Input type="number" placeholder='$ Price' />
                    </CardTitle>
                    <CardDescription className="text-center mt-2">
                      <Textarea placeholder='Place Short Description here' />
                    </CardDescription>
                  </CardHeader>
                  <Separator />
                  <CardContent className="flex-grow p-6">
                    <CardTitle className="text-lg font-semibold mb-4">Service Included:</CardTitle>
                    <div className='flex flex-col justify-center items-center'>
                      <ul className="ml-4">
                        {features.map((feature, index) => (
                          <li key={index} className="flex items-center mb-2 text-sm">
                            <CircleCheck className="mr-2 w-4 h-4 text-primary" />
                            <Input
                              type='text'
                              value={feature}
                              onChange={(e) => handleFeatureChange(index, e.target.value)}
                              placeholder={`Service ${index + 1}`}
                            />
                          </li>
                        ))}
                      </ul>
                      <Button
                        onClick={addFeature}
                        className='mt-2 flex gap-2'
                      >
                        <Plus /> Add Another Feature
                      </Button>
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="flex justify-center p-6 mt-auto">
                    <Button className='flex gap-2'>Book Appointment</Button>
                  </CardFooter>
                </Card>
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Discard</AlertDialogCancel>
                <AlertDialogAction>Create Service</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </main>
  );
};

export default Page;