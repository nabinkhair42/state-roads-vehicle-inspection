"use client";

import React, { useEffect, useState } from "react";
import {
  handleGetAppointmentRequests,
  handleApproveAppointmentRequest,
  handleRejectAppointmentRequest,
} from "@/services/admin";
import { IAppointment } from "@/types/admin";
import { RequestActionDialog } from "./_components/request-action-dialog";
import { PendingRequests } from "./_components/pending-request";
import { toast } from "sonner";

export default function AppointmentRequestsPage() {
  const [requests, setRequests] = useState<IAppointment[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] = useState<IAppointment | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        const data = await handleGetAppointmentRequests();
        setRequests(data.data);
      } catch (error) {
        toast.error("Failed to fetch appointment requests. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleOpenDialog = (requestId: string) => {
    const request = requests.find((request) => request._id === requestId) || null;
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedRequest(null);
  };

  const handleAcceptRequest = async () => {
    if (selectedRequest) {
      try {
        await handleApproveAppointmentRequest(selectedRequest._id);
        setRequests((prev) => prev.filter((request) => request._id !== selectedRequest._id));
       toast.success("Appointment request approved successfully.");
      } catch (error) {
        toast.error("Failed to approve appointment request. Please try again.");
      }
    }
    handleCloseDialog();
  };

  const handleDeclineRequest = async () => {
    if (selectedRequest) {
      try {
        await handleRejectAppointmentRequest(selectedRequest._id);
        setRequests((prev) => prev.filter((request) => request._id !== selectedRequest._id));
        toast.success("Appointment request rejected successfully.");
      } catch (error) {
        toast.error("Failed to reject appointment request. Please try again.");
      }
    }
    handleCloseDialog();
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Appointment Request Management</h1>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <PendingRequests requests={requests} onOpenDialog={handleOpenDialog} />
      )}
      <RequestActionDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onAccept={handleAcceptRequest}
        onDecline={handleDeclineRequest}
        request={selectedRequest}
      />
    </div>
  );
}

