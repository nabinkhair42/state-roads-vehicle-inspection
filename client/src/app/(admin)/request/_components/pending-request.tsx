import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IAppointment } from "@/types/admin";

interface PendingRequestsProps {
  requests: IAppointment[];
  onOpenDialog: (id: string) => void;
}

export function PendingRequests({
  requests = [],
  onOpenDialog,
}: PendingRequestsProps) {
  return (
    <div className="container mx-auto py-10">
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Mechanic</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Appointment Date</TableHead>
              <TableHead>Appointment Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No pending requests
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow key={request._id}>
                  <TableCell>{request.bookedBy.name}</TableCell>
                  <TableCell>{request.bookedFor.name}</TableCell>
                  <TableCell>{request.service.serviceType}</TableCell>
                  <TableCell>{new Date(request.appointmentDate).toLocaleDateString()}</TableCell>
                  <TableCell>{request.appointmentTime}</TableCell>
                  <TableCell>
                    <Button onClick={() => onOpenDialog(request._id)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

