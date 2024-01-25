"use client";
import NavBar from "@/components/NavBar";
import Greet from "@/components/greet";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";

function Page() {
  const { fetchUsername } = useUserStore();

  useEffect(() => {
    fetchUsername();
  }, []);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <NavBar />
    </div>
  );
}

export default Page;
