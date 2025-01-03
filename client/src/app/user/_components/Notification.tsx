"use client";
import { Bell, Check, CheckCheck } from "lucide-react";
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
import {
  useHideNotifications,
  useUserNotifications,
} from "@/services/notifications";
import { INotification } from "@/types/notification.types";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const NotificationPopOut = () => {
  const { isLoading, data, isError } = useUserNotifications();
  const [hidingNotification, setHidingNotification] = useState<string | null>(
    null
  );
  const router = useRouter();
  const [notifications, setNotifications] = useState<{
    read: INotification[];
    unread: INotification[];
  }>({
    read: [],
    unread: [],
  });

  useEffect(() => {
    if (isLoading || isError) return;
    const nonHidden =
      data?.filter((notification) => !notification.isHidden) ?? [];
    const read =
      nonHidden?.filter((notification) => notification.isViewed) ?? [];
    const unread =
      nonHidden?.filter((notification) => !notification.isViewed) ?? [];

    setNotifications({ read, unread });
  }, [isLoading, isError, data]);

  const { mutate, isPending } = useHideNotifications("user");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={isLoading}
          variant="secondary"
          size="icon"
          className="rounded-full"
        >
          {notifications?.unread?.length > 0 && (
            <Badge className="absolute top-0 right-[5%] p-1 text-xs">
              {notifications?.unread?.length}
            </Badge>
          )}
          <Bell className="h-5 w-5" />
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
                  hasShadow={true}
                  notification={notification}
                  onDeleted={() => {
                    setHidingNotification(notification._id);
                    mutate(notification._id);
                  }}
                  isDeleting={
                    isPending && hidingNotification === notification._id
                  }
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
                  hasShadow={false}
                  notification={notification}
                  onDeleted={() => {
                    setHidingNotification(notification._id);
                    mutate(notification._id);
                  }}
                  isDeleting={
                    isPending && hidingNotification === notification._id
                  }
                />
              ))}
            </DropdownMenuGroup>
          </>
        )}

        {!(
          notifications?.read?.length === 0 &&
          notifications?.unread?.length === 0
        ) && (
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Button
                onClick={() => {
                  router.push("/user/notifications");
                }}
                className="w-full"
                variant={"ghost"}
                size={"sm"}
              >
                View All
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default NotificationPopOut;
