"use client";
import React, { useState } from "react";
import { PendingRequests } from "./_components/pending-request";
import { RequestActionDialog } from "./_components/request-action-dialog";

interface Request {
  id: string;
  user: string;
  mechanic: string;
  requestedDate: string;
  appointmentDate: string;
  status: "Pending" | "Accepted" | "Rejected";
}

const Page: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([
    {
      id: "1",
      user: "John Doe",
      mechanic: "Mike Smith",
      requestedDate: "2023-05-15",
      appointmentDate: "2023-05-20",
      status: "Pending",
    },
    {
      id: "2",
      user: "Jane Smith",
      mechanic: "Sarah Johnson",
      requestedDate: "2023-05-16",
      appointmentDate: "2023-05-22",
      status: "Pending",
    },
    {
      id: "3",
      user: "Bob Johnson",
      mechanic: "Tom Brown",
      requestedDate: "2023-05-17",
      appointmentDate: "2023-05-23",
      status: "Pending",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const handleOpenDialog = (requestId: string) => {
    const request =
      requests.find((request) => request.id === requestId.toString()) || null;
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedRequest(null);
  };

  const handleAcceptRequest = () => {
    if (selectedRequest) {
      setRequests(
        requests.map((request) =>
          request.id === selectedRequest.id
            ? { ...request, status: "Accepted" }
            : request
        )
      );
    }
    handleCloseDialog();
  };

  const handleDeclineRequest = () => {
    if (selectedRequest) {
      setRequests(
        requests.map((request) =>
          request.id === selectedRequest.id
            ? { ...request, status: "Rejected" }
            : request
        )
      );
    }
    handleCloseDialog();
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Request Management</h1>
      <PendingRequests requests={requests} onOpenDialog={handleOpenDialog} />
      <RequestActionDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onAccept={handleAcceptRequest}
        onDecline={handleDeclineRequest}
        request={selectedRequest}
      />
    </div>
  );
};

export default Page;
