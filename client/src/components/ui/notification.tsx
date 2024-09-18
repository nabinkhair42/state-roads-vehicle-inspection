"use client";
import React, { useEffect, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useInView } from "framer-motion";
import { INotification } from "@/types/notification.types";
import { handleViewNotification } from "@/services/notifications";
import Loading from "../reusable/loading";
interface NotificationProps {
  icon?: React.ReactNode;
  hasShadow: boolean;
  notification: INotification;
  hideDeleteButton?: boolean;
  onDeleted?: () => void;
  isDeleting?: boolean;
}

const NotificationComponent: React.FC<NotificationProps> = ({
  icon,
  hasShadow = true,
  notification,
  hideDeleteButton = false,
  isDeleting,
  onDeleted,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (notification.isViewed) return;
    handleViewNotification(notification._id);
  }, [isInView, notification]);

  return (
    <div
      id={notification._id}
      ref={ref}
      className={`flex border ${
        hasShadow ? "shadow-md" : "shadow-none"
      } w-[350px] rounded-md px-2 py-4 gap-3 justify-center items-center`}
    >
      {/* <Avatar>
        <AvatarImage src={avatarSrc} alt={avatarFallback} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar> */}
      <div className=" flex flex-col gap-2">
        <p className="font-semibold">{notification.title}</p>
        <p className="text-sm line-clamp-2 text-muted-foreground">
          {notification.message}
        </p>
      </div>
      <div>
        {!hideDeleteButton && (
          <>
            {isDeleting ? (
              <Loading className="w-10 h-10 rounded-full" />
            ) : (
              <Button
                className="w-10 h-10 rounded-full"
                variant={"destructive"}
                size={"sm"}
                onClick={onDeleted}
              >
                {icon ? icon : <Trash />}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationComponent;
