"use client";
import React, { useEffect, useState } from "react";
import { PendingRequests } from "./_components/pending-request";
import { RequestActionDialog } from "./_components/request-action-dialog";
import {
  handleGetAppointmentRequests,
  handleApproveAppointmentRequest,
  handleRejectAppointmentRequest,
} from "@/services/admin";
import { IAppointmentRequest } from "@/types/admin";

const Page: React.FC = () => {
  const [requests, setRequests] = useState<IAppointmentRequest[]>([]); // Ensure this is initialized as an empty array
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] =
    useState<IAppointmentRequest | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await handleGetAppointmentRequests();
        setRequests(data.results);
      } catch (error) {
        console.error("Error fetching appointment requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleOpenDialog = (requestId: string) => {
    const request =
      requests.find((request) => request.id === requestId) || null;
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedRequest(null);
  };

  const handleAcceptRequest = async () => {
    if (selectedRequest) {
      await handleApproveAppointmentRequest(selectedRequest.id);
      setRequests((prev) =>
        prev.map((request) =>
          request.id === selectedRequest.id
            ? { ...request, status: "Accepted" }
            : request
        )
      );
    }
    handleCloseDialog();
  };

  const handleDeclineRequest = async () => {
    if (selectedRequest) {
      await handleRejectAppointmentRequest(selectedRequest.id);
      setRequests((prev) =>
        prev.filter((request) => request.id !== selectedRequest.id)
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
