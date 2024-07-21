"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  handleApproveAppointment,
  handleGetAllMechanicsAppointment,
  handleRejectAppointment,
} from "@/services/appointments";
import Loading from "@/components/reusable/loading";
import { EllipsisIcon, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import MarkAsCompleted from "./_components/mark-as-completed";

const MechanicAppointments = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [idThatIsBeingModified, setIdThatIsBeingModified] = useState("");
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryFn: handleGetAllMechanicsAppointment,
    queryKey: ["appointments"],
  });

  const { mutate: approve, isPending: isApproving } = useMutation({
    mutationFn: handleApproveAppointment,
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
    onError: (err: string) => {
      toast.error(err);
    },
    onSettled: () => {
      setIdThatIsBeingModified("");
    },
  });

  const { mutate: reject, isPending: isRejecting } = useMutation({
    mutationFn: handleRejectAppointment,
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
    onError: (err: string) => {
      toast.error(err);
    },
    onSettled: () => {
      setIdThatIsBeingModified("");
    },
  });

  return (
    <>
      <MarkAsCompleted
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id={idThatIsBeingModified}
      />
      <Table className="mt-4 border">
        <TableCaption>A list of your recent Appointments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Booked By</TableHead>
            <TableHead>Service Title</TableHead>
            <TableHead>Appointment Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
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
            data?.map((data) => (
              <TableRow>
                <TableCell>{data.bookedBy.name}</TableCell>
                <TableCell>{data.service.title}</TableCell>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      disabled={
                        (isApproving || isRejecting) &&
                        idThatIsBeingModified === data._id
                      }
                    >
                      {(isApproving || isRejecting) &&
                      idThatIsBeingModified === data._id ? (
                        <LoaderCircle className="w-5 h-5 text-gray-500 animate-spin" />
                      ) : (
                        <EllipsisIcon className="w-5 h-5 text-gray-500" />
                      )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      {data.status === "PENDING" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              approve(data._id);
                              setIdThatIsBeingModified(data._id);
                            }}
                          >
                            Accept Request
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              reject(data._id);
                              setIdThatIsBeingModified(data._id);
                            }}
                            className="text-destructive"
                          >
                            Reject Request
                          </DropdownMenuItem>
                        </>
                      )}
                      {data.status === "APPROVED" && (
                        <DropdownMenuItem
                          onClick={() => {
                            setIsOpen(true);
                            setIdThatIsBeingModified(data._id);
                          }}
                        >
                          Mark as Completed
                        </DropdownMenuItem>
                      )}
                      {data.status === "COMPLETED" && (
                        <DropdownMenuItem
                          onClick={() => {
                            const a = document.createElement("a");
                            if (data.report) {
                              a.href = data.report.url;
                              a.download = data.report.name;
                              a.target = "_blank";
                              a.click();
                            }
                          }}
                        >
                          View Report
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default MechanicAppointments;
