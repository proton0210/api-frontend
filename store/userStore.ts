"use client";
import { getUserByID } from "@/actions/usersTable.actions";
import { getCurrentUser } from "aws-amplify/auth";

import { create } from "zustand";

interface UserState {
  username: string | null;
  sub: string | null;
  setUsername: (username: string | null, sub: string | null) => void;
  fetchUsername: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  username: null,
  sub: null,
  setUsername: (username, sub) => set({ username, sub }),
  fetchUsername: async () => {
    try {
      const { name, userID } = await getUserName();
      set({ username: name, sub: userID });
    } catch (error) {
      console.error(error);
    }
  },
}));

async function getUserName() {
  try {
    const { username } = await getCurrentUser();
    const userData = await getUserByID(username);

    return { name: userData.Name, userID: userData.UserID };
  } catch (err) {
    console.log(err);
    // Handle the error, you might want to return a default value or throw the error again
    throw err;
  }
}
