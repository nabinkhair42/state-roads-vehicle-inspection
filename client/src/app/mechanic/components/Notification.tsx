import { Bell, Check, CheckCheck, Trash } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import NotificationComponent from "@/components/ui/notification";

const NotificationPopOut = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="rounded-full w-fit h-fit p-2" variant={'outline'} size={'icon'}><Bell className="h-[24px]  w-[24px]" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit mr-4 mt-3">
                <DropdownMenuLabel className="flex gap-2 items-center">< Check /> Unread</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <NotificationComponent
                        title="Title Goes Here"
                        description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate qui accusantium perferendis vitae deleniti sapiente. Nisi tempora, expedita placeat dolor architecto et eligendi voluptates."
                        avatarSrc="https://github.com/shadcn.png"
                        avatarFallback="CN"
                        hasShadow={true}
                    />

                </DropdownMenuGroup>
                <DropdownMenuLabel className="flex gap-2 items-center">< CheckCheck />Read</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="flex flex-col gap-2">
                    <NotificationComponent
                        title="Title Goes Here"
                        description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate qui accusantium perferendis vitae deleniti sapiente. Nisi tempora, expedita placeat dolor architecto et eligendi voluptates."
                        avatarSrc="https://github.com/shadcn.png"
                        avatarFallback="CN"
                        hasShadow={false}
                    />
                    <NotificationComponent
                        title="Title Goes Here"
                        description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate qui accusantium perferendis vitae deleniti sapiente. Nisi tempora, expedita placeat dolor architecto et eligendi voluptates."
                        avatarSrc="https://github.com/shadcn.png"
                        avatarFallback="CN"
                        hasShadow={false}
                    />
                </DropdownMenuGroup>

                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Button className="w-full" variant={'ghost'} size={'sm'}>View All</Button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}
export default NotificationPopOut;