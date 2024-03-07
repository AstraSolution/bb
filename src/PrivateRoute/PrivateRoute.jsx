"use client";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/joinUs");
    }
  }, [user, router]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

  return <>{children}</>;
};

export default PrivateRoute;
