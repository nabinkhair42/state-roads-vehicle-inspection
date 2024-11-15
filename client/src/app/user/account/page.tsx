import React from "react";
import UserDetails from "@/app/user/account/_components/UserDetails";
import UserChangePassword from "@/app/user/account/_components/ChangePassword";

const page = () => {
  return (
    <div className="flex flex-col gap-6">
      <UserDetails />
      <UserChangePassword />
    </div>
  );
};

export default page;
