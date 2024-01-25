"use client";
import { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";

async function getUserName() {
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    return username;
  } catch (err) {
    console.log(err);
    // Handle the error, you might want to return a default value or throw the error again
    throw err;
  }
}

export default function Greet() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const name = await getUserName();
        setUsername(name);
      } catch (error) {
        // Handle the error if needed
        console.error(error);
      }
    }

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  if (!username) {
    // You can render a loading state or return null if the data is not yet available
    return null;
  }

  // Render the component with the fetched username
  return <div>Hello, {username}!</div>;
}
