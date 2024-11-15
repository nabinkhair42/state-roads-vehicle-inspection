import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Request {
  id: string;
  user: string;
  mechanic: string;
  requestedDate: string;
  appointmentDate: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

interface PendingRequestsProps {
  requests: Request[];
  onOpenDialog: (id: string) => void;
}

export function PendingRequests({ requests, onOpenDialog }: PendingRequestsProps) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Mechanic</TableHead>
            <TableHead>Requested Date</TableHead>
            <TableHead>Appointment Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.user}</TableCell>
              <TableCell>{request.mechanic}</TableCell>
              <TableCell>{request.requestedDate}</TableCell>
              <TableCell>{request.appointmentDate}</TableCell>
              <TableCell>
                <Badge 
                  variant={request.status === 'Pending' ? 'outline' : 
                           request.status === 'Accepted' ? 'success' : 'destructive'}
                >
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell>
                {request.status === 'Pending' && (
                  <Button onClick={() => onOpenDialog(request.id)}>View Details</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}