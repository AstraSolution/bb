"use client";

import axios from "axios";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

import { useRouter } from "next/navigation";

export const axiosSecure = axios.create({
  baseURL: "https://boi-binimoy-server.vercel.app",
  // baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  // const navigate = useNavigate();
  const navigate = useRouter();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log("error tracked in the interceptor", error);
        if (error.response.status === 401 || error.response.status === 403) {
          logOut()
            .then(() => {
              navigate.push("/joinUs");
            })
            .catch((error) => console.log(error));
        }
      }
    );
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
