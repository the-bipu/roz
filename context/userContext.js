"use client";
import { useSession } from "next-auth/react";
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { data: session } = useSession();
  const [admin, setAdmin] = useState(false);

  const userEmail = session?.user?.email || null;
  const userName = session?.user?.username || null;

  useEffect(() => {
    if (userEmail === process.env.NEXT_PUBLIC_ADMIN_MAIL) {
      setAdmin(true);
    }
  }, [userEmail]);

  return (
    <UserContext.Provider
      value={{
        userEmail,
        userName,
        admin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
