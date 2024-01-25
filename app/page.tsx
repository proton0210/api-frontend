"use client";
import Greet from "@/components/greet";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";

function Page() {
  const { username, fetchUsername } = useUserStore();

  useEffect(() => {
    fetchUsername();
  }, []);
  
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl lg:mt-20">
        <Greet />
      </div>
    </div>
  );
}

export default Page;
