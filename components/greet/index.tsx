"use client";
import { useUserStore } from "@/store/userStore";

export default function Greet() {
  const { username} = useUserStore();

  // Render the component with the fetched username
  return <div>Hello, {username}!</div>;
}
