"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
const tableData = [
    {
        name: "ABC Store",
        service: "Comprehensive Service",
        date: "20 June",
        status: "Pending",
    },
    {
        name: "XYZ Store",
        service: "Oil Change",
        date: "20 June",
        status: "Completed",
    },
    {
        name: "PQR Store",
        service: "Comprehensive Service",
        date: "20 June",
        status: "Canceled",
    }
]

export function MechanicAppointments() {
    return (
        <Table className="mt-4 border">
            <TableCaption>A list of your recent Appointments.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Store Name</TableHead>
                    <TableHead>Service Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead >Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tableData.map((data) => (
                    <TableRow>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.service}</TableCell>
                        <TableCell>{data.date}</TableCell>
                        <TableCell>
                            <Badge
                                variant={
                                    data.status === "Pending" ? "pending" :
                                        data.status === "Completed" ? "success" :
                                            data.status === "Canceled" ? "destructive" : "default"
                                }
                            >
                                {data.status}
                            </Badge>

                        </TableCell>
                        <TableCell>
                            <DropdownMenu >
                                <DropdownMenuTrigger>
                                    <Button variant={"outline"} className="btn btn-primary">Action</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Pending</DropdownMenuItem>
                                    <DropdownMenuItem>Canceled</DropdownMenuItem>
                                    <DropdownMenuItem>Accepted</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default MechanicAppointments;