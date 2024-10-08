import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = {
  className?: string;
};

const Loading = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "h-full w-full flex items-center justify-center",
        className
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
};

export default Loading;
