"use client";
import { getUserByID } from "@/actions/usersTable.actions";
import { getCurrentUser } from "aws-amplify/auth";
import { create } from "zustand";

interface UserState {
  username: string | null;
  setUsername: (username: string | null) => void;
  fetchUsername: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  username: null,
  setUsername: (username) => set({ username }),
  fetchUsername: async () => {
    try {
      const name = await getUserName();
      console.log(name);
      set({ username: name });
    } catch (error) {
      console.error(error);
    }
  },
}));

async function getUserName() {
  try {
    const { username } = await getCurrentUser();
    const userData = await getUserByID(username);
    return userData.Name;
  } catch (err) {
    console.log(err);
    // Handle the error, you might want to return a default value or throw the error again
    throw err;
  }
}
