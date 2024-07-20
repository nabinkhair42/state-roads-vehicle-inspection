"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, ClockIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Datetime from 'react-datetime'
import moment from 'moment'
import "react-datetime/css/react-datetime.css"
import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const FormSchema = z.object({
    serviceType: z.string().min(1, "Service type is required"),
    date: z.date({
        required_error: "A date is required.",
    }),
    time: z.string().min(1, "Time is required"),
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(10, "Phone number is required"),
    email: z.string().email("Invalid email address"),
})

export function CalendarForm() {
    const [serviceType, setServiceType] = React.useState("")
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            serviceType: ""
        }
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        alert(`Selected Service: ${data.serviceType}\nSelected Date: ${data.date}\nSelected Time: ${data.time}\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}`)
    }

    return (
        <main className="flex flex-col lg:flex-row justify-around mt-8 gap-8 mb-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Service Type:
                            </CardTitle>
                            <CardDescription>
                                Select a service type below.
                            </CardDescription></CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="serviceType"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <FormControl>
                                                    <Button variant="outline" className="w-[240px] text-left">
                                                        {serviceType || "Select Your Service"}
                                                    </Button>
                                                </FormControl>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56">
                                                <DropdownMenuRadioGroup
                                                    value={serviceType}
                                                    onValueChange={(value) => {
                                                        setServiceType(value)
                                                        field.onChange(value)
                                                    }}
                                                >
                                                    <DropdownMenuRadioItem value="Comprehensive">Comprehensive</DropdownMenuRadioItem>
                                                    <DropdownMenuRadioItem value="Mechanical">Mechanical</DropdownMenuRadioItem>
                                                    <DropdownMenuRadioItem value="Body And Chassis">Body and Chassis</DropdownMenuRadioItem>
                                                </DropdownMenuRadioGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Select Date and Time:
                            </CardTitle>
                            <CardDescription>
                                Select a date and time below.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-between items-center gap-4">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(new Date(field.value), "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Datetime
                                                    value={field.value ? moment(field.value) : undefined}
                                                    onChange={(date) => field.onChange(moment(date).toDate())}
                                                    input={false}
                                                    timeFormat={false}
                                                    isValidDate={(date) =>
                                                        date.isBefore(new Date()) || date.isAfter(new Date("1900-01-01"))
                                                    }
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Your selected date.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Time</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    {...field}
                                                    type="time"
                                                    step="1"
                                                    required
                                                    className="pl-10"
                                                />
                                                <ClockIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            Your selected time.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Fill Your Details:
                            </CardTitle>
                            <CardDescription>
                                Fill in your details below.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="name">Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="Your Name" required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="phone">Phone Number</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="tel" placeholder="Your Phone Number" required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="email" placeholder="Your Email" required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </main>
    )
}

export default CalendarForm
