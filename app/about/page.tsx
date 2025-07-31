"use client";
import { useSession } from "next-auth/react";
import React from "react";

export default function about() {
  const { data } = useSession();
  return <div>{data?.user?.email}</div>;
}
