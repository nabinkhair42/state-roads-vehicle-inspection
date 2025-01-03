"use client";
import Loading from "@/components/reusable/loading";
import NotificationComponent from "@/components/ui/notification";
import { useUserNotifications } from "@/services/notifications";
import { INotification } from "@/types/notification.types";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { isLoading, data, isError } = useUserNotifications();

  const [notifications, setNotifications] = useState<{
    read: INotification[];
    unread: INotification[];
  }>({
    read: [],
    unread: [],
  });

  useEffect(() => {
    if (isLoading || isError) return;

    const read = data?.filter((notification) => notification.isViewed) ?? [];
    const unread = data?.filter((notification) => !notification.isViewed) ?? [];

    setNotifications({ read, unread });
  }, [isLoading, isError, data]);
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">Unread Notifications</h3>
        {isLoading && <Loading />}
        {notifications.unread.length === 0 && (
          <p className="text-muted-foreground">No unread notifications</p>
        )}
        {notifications.unread.map((notification) => (
          <NotificationComponent
            key={notification._id}
            notification={notification}
            hasShadow
            hideDeleteButton
          />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Read Notifications</h3>
        {isLoading && <Loading />}
        {notifications.read.length === 0 && (
          <p className="text-muted-foreground">No unread notifications</p>
        )}
        {notifications.read.map((notification) => (
          <NotificationComponent
            key={notification._id}
            notification={notification}
            hideDeleteButton
            hasShadow
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
