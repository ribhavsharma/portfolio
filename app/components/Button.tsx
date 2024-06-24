"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  full: boolean;
};

export default function Button({ children, onClick, full = false }: Props) {
  return (
    <button
      className={`${full ? "w-full" : ""} p-3 rounded-lg custom-button outline outline-[#141414]`}
      onClick={onClick}
    >
      <p className="text-[#ffffff] font-rebond outline-none">{children}</p>
    </button>
  );
}
