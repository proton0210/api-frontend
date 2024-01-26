"use client";
import NavBar from "@/components/NavBar";
import Todos from "@/components/Todos";
import Greet from "@/components/greet";

function Page() {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <NavBar />
      <Todos />
    </div>
  );
}

export default Page;
