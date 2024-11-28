"use client";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon, CircleCheck } from "lucide-react";
import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAppSelector } from "@/hooks/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleGetAllServices } from "@/services/service";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { handleBookAppointment } from "@/services/appointments";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export function CalendarForm() {
  const [serviceType, setServiceType] = React.useState<string>();
  const [date, setDate] = React.useState<Date>(new Date());
  const [time, setTime] = React.useState<string>(
    new Date().toLocaleTimeString()
  );
  const [selectedServiceId, setSelectedServiceId] = React.useState<string>();
  const [message, setMessage] = React.useState<string>();
  const { isLoading, data } = useQuery({
    queryKey: ["services", serviceType],
    queryFn: () => handleGetAllServices(serviceType),
  });

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const queryClient = useQueryClient();

  const onSubmit = () => {
    mutate({
      appointmentDate: date?.toString()!,
      appointmentTime: time!,
      message: message!,
      serviceId: selectedServiceId!,
    });
  };

  useEffect(() => {
    setSelectedServiceId(undefined);
  }, [serviceType]);

  const { mutate, isPending } = useMutation({
    mutationFn: handleBookAppointment,
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient
        .invalidateQueries({
          queryKey: ["user", "appointments"],
        })
        .then(() => {
          router.push("/user");
        });
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <main className="flex flex-col lg:flex-row justify-around mt-8 gap-8 mb-8">
      {!isAuthenticated || !user ? (
        <div className="flex flex-col items-center justify-center gap-4 h-64">
          <h1 className="text-2xl font-semibold">
            You need to be logged in as user to book an appointment
          </h1>

          <a href="/sign-in">
            <Button className="min-w-32" size={"lg"} variant={"default"}>Sign in</Button>
          </a>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Type:</CardTitle>
                <CardDescription>Select a service type below.</CardDescription>
              </CardHeader>
              <CardContent>
                <Select onValueChange={(value) => setServiceType(value)}>
                  <SelectTrigger className="min-w-[180px] sm:w-72">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Service</SelectLabel>
                      {["Comprehensive", "Mechanical", "Body and Chassis"].map(
                        (service, index) => (
                          <SelectItem key={index} value={service}>
                            {service}
                          </SelectItem>
                        )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Store:</CardTitle>
                <CardDescription>
                  Select a store below to book an appointment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  disabled={!serviceType || isLoading}
                  onValueChange={(value) => setSelectedServiceId(value)}
                >
                  <SelectTrigger className="min-w-[180px] sm:w-72">
                    <SelectValue placeholder="Select a store" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Service</SelectLabel>
                      {data?.length === 0 && (
                        <p className="text-center text-sm text-muted-foreground">
                          No store available for this service!
                        </p>
                      )}
                      {data?.map((service, index) => (
                        <SelectItem key={index} value={service._id}>
                          {service?.postedBy?.storeName ?? "Unknown Store"}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* //TO show The Details of the selected service */}

          {data?.map((service, index) => {
            if (service._id === selectedServiceId) {
              return (
                <Card className={`flex flex-col border`} key={index}>
                  <CardHeader className="flex flex-col items-center">
                    <CardTitle className="text-center">
                      {service.serviceType}
                    </CardTitle>
                    <CardTitle className="text-3xl font-bold text-center mt-2 text-primary">
                      ${service.price}
                    </CardTitle>
                    <CardDescription className="text-center mt-2 flex flex-col gap-2">
                      <p>{service.description}</p>
                    </CardDescription>
                  </CardHeader>
                  <Separator />
                  <CardContent className="flex-grow mt-4">
                    <CardTitle className=" font-semibold mb-4">
                      Service Included:
                    </CardTitle>
                    <ul className="ml-4">
                      {service.features?.map((item, i) => (
                        <li key={i} className="flex items-center mb-2 text-sm">
                          <CircleCheck className="mr-2 w-4 h-4 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            }
          })}

          <Card>
            <CardHeader>
              <CardTitle>Select Date and Time:</CardTitle>
              <CardDescription>Select a date and time below.</CardDescription>
            </CardHeader>
            <CardContent className="flex  gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    ///REMOVE Selection of previous dates
                    disabled={{ before: today }}
                    // @ts-ignore
                    onSelect={(date) => setDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* time input */}
              <Button variant={"outline"}>
                <input
                  type="time"
                  name=""
                  id=""
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Message:</CardTitle>
              <CardDescription>
                Enter a short message for the store.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex  gap-4 flex-col">
              <Textarea
                placeholder="Enter a short message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <Button
                disabled={
                  !selectedServiceId ||
                  !date ||
                  !time ||
                  !serviceType ||
                  isLoading ||
                  !message
                }
                onClick={onSubmit}
                isLoading={isPending}
                className="min-w-32"
              >
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}

export default CalendarForm;
