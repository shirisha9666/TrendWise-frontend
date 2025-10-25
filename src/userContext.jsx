import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "./api/api";


const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading,fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);
