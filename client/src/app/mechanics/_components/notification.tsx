"use client";
import { Bell, Check, CheckCheck, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import NotificationComponent from "@/components/ui/notification";
import { useMechanicsNotifications } from "@/services/notifications";
import { INotification } from "@/types/notification.types";
import { useEffect, useState } from "react";

const NotificationPopOut = () => {
  const { isLoading, data, isError } = useMechanicsNotifications();

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full w-fit h-fit p-1"
          variant={"outline"}
          size={"icon"}
          disabled={isLoading}
        >
          <Bell className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit mr-4 mt-3">
        {notifications?.read?.length === 0 &&
          notifications?.unread?.length === 0 && (
            <DropdownMenuLabel className="flex gap-2 items-center">
              <CheckCheck />
              No Notifications
            </DropdownMenuLabel>
          )}

        {notifications?.unread?.length > 0 && (
          <>
            <DropdownMenuLabel className="flex gap-2 items-center">
              <Check /> Unread
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {notifications?.unread?.map((notification) => (
                <NotificationComponent
                  key={notification._id}
                  avatarSrc="https://github.com/shadcn.png"
                  avatarFallback="N"
                  hasShadow={true}
                  notification={notification}
                />
              ))}
            </DropdownMenuGroup>
          </>
        )}

        {notifications?.read?.length > 0 && (
          <>
            <DropdownMenuLabel className="flex gap-2 items-center">
              <CheckCheck />
              Read
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {notifications?.read?.map((notification) => (
                <NotificationComponent
                  key={notification._id}
                  avatarSrc="https://github.com/shadcn.png"
                  avatarFallback="R"
                  hasShadow={false}
                  notification={notification}
                />
              ))}
            </DropdownMenuGroup>
          </>
        )}

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Button className="w-full" variant={"ghost"} size={"sm"}>
              View All
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default NotificationPopOut;
