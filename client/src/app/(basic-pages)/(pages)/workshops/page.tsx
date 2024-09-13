"use client";
import dynamic from "next/dynamic";
const Component = dynamic(
  () => import("@/app/(basic-pages)/(pages)/workshops/components/map"),
  { ssr: false }
);

export default Component;
