"use client";
import { useParams } from "next/navigation";

export default function page() {
  const params = useParams();

  return <div>Blog : {params.slug}</div>;
}
