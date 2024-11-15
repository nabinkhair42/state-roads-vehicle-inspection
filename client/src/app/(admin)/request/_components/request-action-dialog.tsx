import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface RequestActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
  request: {
    user: string;
    mechanic: string;
    requestedDate: string;
    appointmentDate: string;
  } | null;
}

export function RequestActionDialog({ isOpen, onClose, onAccept, onDecline, request }: RequestActionDialogProps) {
  if (!request) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Inspection Request Details</DialogTitle>
          <DialogDescription>
            Review the request details and choose to accept or decline.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p><strong>User:</strong> {request.user}</p>
          <p><strong>Mechanic:</strong> {request.mechanic}</p>
          <p><strong>Requested Date:</strong> {request.requestedDate}</p>
          <p><strong>Appointment Date:</strong> {request.appointmentDate}</p>
        </div>
        <DialogFooter className="sm:justify-start flex flex-row justify-around w-full items-center">
          <Button onClick={onDecline} variant="destructive">Decline</Button>
          <Button onClick={onAccept} className="mr-2">Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}