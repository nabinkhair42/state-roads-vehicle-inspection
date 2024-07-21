"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleCompleteAppointment } from "@/services/appointments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const MarkAsCompleted: FC<Props> = ({ isOpen, setIsOpen, id }) => {
  const queryClient = useQueryClient();
  const [pdf, setPdf] = useState<File | null>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: handleCompleteAppointment,
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
      setIsOpen(false);
      setPdf(null);
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Report</DialogTitle>
          <DialogDescription>
            Upload the service report for this appointment.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="file" className="sr-only">
              Link
            </Label>
            <Input
              id="file"
              type="file"
              //pdf
              accept=".pdf"
              onChange={(e) => setPdf(e.target.files![0])}
            />
          </div>
        </div>
        <DialogFooter className="">
          <Button
            disabled={!pdf}
            isLoading={isPending}
            onClick={() => {
              mutate({ id, report: pdf! });
            }}
            type="button"
            variant="default"
          >
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MarkAsCompleted;
