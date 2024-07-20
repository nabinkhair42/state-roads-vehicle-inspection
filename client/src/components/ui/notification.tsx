import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
interface NotificationProps {
    title: string;
    description: string;
    avatarSrc: string;
    avatarFallback: string;
    icon?: React.ReactNode;
    hasShadow?: boolean;
}

const NotificationComponent: React.FC<NotificationProps> = ({
    title,
    description,
    avatarSrc,
    avatarFallback,
    icon,
    hasShadow = true
}) => {
    return (
        <div className={`flex border ${hasShadow ? 'shadow-md' : 'shadow-none'} w-[350px] rounded-md px-2 py-4 gap-3 justify-center items-center`}>
            <Avatar>
                <AvatarImage src={avatarSrc} alt={avatarFallback} />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm line-clamp-2 text-muted-foreground">{description}</p>
            </div>
            <div>
                <Button className="w-10 h-10 rounded-full" variant={'destructive'} size={'sm'}>
                    {icon ? icon : <Trash />}
                </Button>
            </div>
        </div>
    );
};

export default NotificationComponent;
