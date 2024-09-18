"use client";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";
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
            You need to be logged in to book an appointment
          </h1>

          <a href="/sign-in">
            <Button className="min-w-32">Sign in</Button>
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
          <Card>
            <CardHeader>
              <CardTitle>Service Details:</CardTitle>
              <CardDescription>
                Details of the service you selected.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {data?.map((service, index) => {
                if (service._id === selectedServiceId) {
                  return (
                    <div key={index}>
                      <h1 className="text-xl font-semibold">
                        {service.serviceType}
                      </h1>
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  );
                }
              }
              )}
            </CardContent>
          </Card>

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
              <CardTitle>
                If you have any special request, please let us know.
              </CardTitle>
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
