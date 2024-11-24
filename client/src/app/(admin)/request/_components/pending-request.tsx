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

interface Request {
  id: string;
  user: string;
  mechanic: string;
  requestedDate: string;
  appointmentDate: string;
  status: "Pending" | "Accepted" | "Rejected";
}

interface PendingRequestsProps {
  requests: Request[];
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
              <TableHead>Requested Date</TableHead>
              <TableHead>Appointment Date</TableHead>
              <TableHead>Status</TableHead>
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
                <TableRow key={request.id}>
                  <TableCell>{request.user}</TableCell>
                  <TableCell>{request.mechanic}</TableCell>
                  <TableCell>{request.requestedDate}</TableCell>
                  <TableCell>{request.appointmentDate}</TableCell>
                  <TableCell>
                    <Badge>{request.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => onOpenDialog(request.id)}>
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