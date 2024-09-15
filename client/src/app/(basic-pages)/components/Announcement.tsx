import Link from "next/link";
import React from "react";

const Announcement = () => {
  return (
    <>
      <div className="">
        <div className="bg-primary px-4 py-3 text-white">
          <p className="text-center text-sm font-medium">
            We offer 50% discount on your first appointment.{" "}
            <Link href="/book-appointment" className="inline-block underline">
              {" "}
              Book Now!{" "}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Announcement;
