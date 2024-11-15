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
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { handleGetAllUserAppointments } from "@/services/appointments";
import Loading from "@/components/reusable/loading";
import Link from "next/link";

export function UserAppointments() {
  const { data, isLoading } = useQuery({
    queryFn: handleGetAllUserAppointments,
    queryKey: ["appointments", "user"],
    staleTime: 0,
    refetchInterval: 1000 * 30, // every
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });

  return (
    <Table className="mt-4 border">
      <TableCaption>A list of your recent Appointments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Store Name</TableHead>
          <TableHead>Service Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              <Loading />
            </TableCell>
          </TableRow>
        ) : (
          data?.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{data.bookedFor.storeName}</TableCell>
              <TableCell>{data.service.serviceType}</TableCell>
              <TableCell>
                {new Date(data.appointmentDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                - {data.appointmentTime}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    data.status === "PENDING"
                      ? "pending"
                      : data.status === "APPROVED"
                      ? "success"
                      : data.status === "REJECTED"
                      ? "destructive"
                      : "outline"
                  }
                >
                  {data.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  size={"sm"}
                  variant={"secondary"}
                  disabled={data.status !== "COMPLETED"}
                >
                  <Link href={data?.report?.url ?? "#"}>View Report</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export default UserAppointments;
