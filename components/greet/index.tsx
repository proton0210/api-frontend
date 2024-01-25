"use client";
import { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { useUserStore } from "@/store/userStore";

export default function Greet() {
  const { username } = useUserStore();

  // Render the component with the fetched username
  return <div>Hello, {username}!</div>;
}
