import React from "react";

type Props = {
  message?: string | null;
};

const ErrorLine = (props: Props) => {
  if (!props.message) return null;
  return <span className="text-destructive text-xs">{props.message}</span>;
};

export default ErrorLine;
