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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const [viewDetailsDialogOpen, setViewDetailsDialogOpen] = useState(false);
  const [viewDetailsDialogId, setViewDetailsDialogId] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [idThatIsBeingModified, setIdThatIsBeingModified] = useState("");
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryFn: handleGetAllMechanicsAppointment,
    queryKey: ["appointments"],
    staleTime: 0,
    refetchInterval: 1000 * 30, // every
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
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
            <TableHead>Service</TableHead>
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
            data?.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.bookedBy.name}</TableCell>
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
                      <DropdownMenuItem
                        onClick={() => {
                          setViewDetailsDialogId(data._id);
                          setViewDetailsDialogOpen(true);
                        }}
                      >
                        View Details
                      </DropdownMenuItem>
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

      <Dialog
        open={viewDetailsDialogOpen}
        onOpenChange={setViewDetailsDialogOpen}
      >
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Appointment Details:</DialogTitle>
            {(() => {
              const appointment = data?.find(
                (d) => d._id === viewDetailsDialogId
              );
              if (!appointment) return null;
              return (
                <DialogDescription className="flex flex-col space-y-2">
                  <div>
                    <span className="font-semibold">Booked By:</span>{" "}
                    {appointment.bookedBy.name}
                  </div>
                  <div>
                    <span className="font-semibold">Contact No:</span>{" "}
                    {appointment.bookedBy.phone}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span>{" "}
                    {appointment.bookedBy.email}
                  </div>
                  <div>
                    <span className="font-semibold">Booked For:</span>{" "}
                    {appointment.bookedFor.name}
                  </div>
                  <div>
                    <span className="font-semibold">Service:</span>{" "}
                    {appointment.service.serviceType}
                  </div>
                  <div>
                    <span className="font-semibold">Appointment Date:</span>{" "}
                    {new Date(appointment.appointmentDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </div>
                  <div>
                    <span className="font-semibold">Appointment Time:</span>{" "}
                    {appointment.appointmentTime}
                  </div>
                  <div>
                    <span className="font-semibold">Message:</span>{" "}
                    {appointment.message}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span>{" "}
                    <Badge
                      variant={
                        appointment.status === "PENDING"
                          ? "pending"
                          : appointment.status === "APPROVED"
                          ? "success"
                          : appointment.status === "REJECTED"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                </DialogDescription>
              );
            })()}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MechanicAppointments;
