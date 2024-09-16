"use client";
import React, { useEffect, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useInView } from "framer-motion";
import { INotification } from "@/types/notification.types";
import { handleViewNotification } from "@/services/notifications";
interface NotificationProps {
  avatarSrc: string;
  avatarFallback: string;
  icon?: React.ReactNode;
  hasShadow: boolean;
  notification: INotification;
}

const NotificationComponent: React.FC<NotificationProps> = ({
  avatarSrc,
  avatarFallback,
  icon,
  hasShadow = true,
  notification,
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
      <Avatar>
        <AvatarImage src={avatarSrc} alt={avatarFallback} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">{notification.title}</p>
        <p className="text-sm line-clamp-2 text-muted-foreground">
          {notification.message}
        </p>
      </div>
      <div>
        <Button
          className="w-10 h-10 rounded-full"
          variant={"destructive"}
          size={"sm"}
        >
          {icon ? icon : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default NotificationComponent;
