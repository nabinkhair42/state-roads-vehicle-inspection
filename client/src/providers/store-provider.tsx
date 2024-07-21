"use client";
import { store } from "@/store";
import React, { FC } from "react";
import { Provider } from "react-redux";

type Props = {
  children: React.ReactNode;
};

const StoreProvider: FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
