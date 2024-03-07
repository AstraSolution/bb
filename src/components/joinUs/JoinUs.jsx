"use client";

import React, { useContext, useEffect, useState } from "react";
import "./joinUs.css";
import Image from "next/image";
import { FaFacebookF, FaGoogle, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import logImg from "./img/log.svg";
import regImg from "./img/register.svg";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useAxiosPublic from "@/Hooks/Axios/useAxiosPublic";
import Swal from "sweetalert2";
import { AuthContext } from "@/providers/AuthProvider";
import SocialLogin from "./SocialLogin";
import Link from "next/link";
// import SocialLogin from './SocialLogin/SocialLogin';

const JoinUs = () => {
  const { register, handleSubmit, reset } = useForm();
  // const { createUser, signin, googleLogin } = useAuth();
  const { createUser, signin, googleLogin, updateUserProfiole } =
    useContext(AuthContext);

  const router = useRouter();
  const axiosPublic = useAxiosPublic();
  const [componentsMounted, setComponentMounted] = useState(false);

  const isUser = true;

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  useEffect(() => {
    if (componentsMounted) {
      initialize();
    }
  }, [componentsMounted]);

  function initialize() {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  }

  // user sign up function
  const signUp = (data) => {
    const name = data.userName;
    const email = data.email;
    const password = data.password;

    const userInfo = { name, email, password, isFirstLogin: true };

    createUser(email, password).then(async (res) => {
      const updateName = await updateUserProfiole(name);
      if (res.user) {
        reset();
        const res = await axiosPublic.post("/api/v1/users", userInfo);
        Swal.fire("Sign up successfull");
        router.push("/");
      }
    });
  };

  // user login function
  const logIn = (data) => {
    const email = data.loginEmail;
    const password = data.loginPassword;
    signin(email, password).then((res) => {
      reset();
      router.push("/");
      Swal.fire("Login successfull");
    });
  };

  const handleSocialLogin = (user) => {
    user()
      .then((res) => {
        if (res.user) {
          toast.success("User logged in successfully", {
            position: "top-center",
          });
        }

        const userInfo = {
          email: res.user?.email,
          name: res.user?.displayName,
        };

        axiosPublic.post("/users", userInfo).then((res) => {
          router.push("/");
        });
      })
      .catch((error) => {
        Swal.fire(error);
      });
  };

  return (
    <>
      <div className="container w-full flex justify-between">
        <div className="forms-container">
          <div className="signin-signup">
            <form
              onSubmit={handleSubmit(logIn)}
              action="#"
              className="sign-in-form"
            >
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="email"
                  {...register("loginEmail")}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  {...register("loginPassword")}
                  placeholder="Password"
                  required
                />
              </div>
              <input type="submit" value="Login" className="btn solid" />
              <p className="social-text">Or Sign in with social platforms</p>
            </form>

            <SocialLogin></SocialLogin>

            <form
              onSubmit={handleSubmit(signUp)}
              action="#"
              className="sign-up-form"
            >
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  {...register("userName")}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Password"
                  required
                />
              </div>
              <input type="submit" className="btn" value="Sign up" />
              <p className="social-text">Or Sign up with social platforms</p>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                WellCome To Our Book Exchange Web site Please sing Up Now
              </p>
              <button className="btn transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>
            <Image
              src={logImg}
              className="image"
              alt=""
              height={1000}
              width={1000}
            />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                WellCome To Our Book Exchange Web site Please sing In Now
              </p>
              <button className="btn transparent" id="sign-in-btn">
                Sign in
              </button>
            </div>
            <Image
              src={regImg}
              className="image"
              alt=""
              height={1000}
              width={1000}
            />
          </div>
        </div>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>open modal</button> */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Link href="/">
                <button className="btn"> Update </button>
              </Link>
            </form>
          </div>
          <Image
            src={logImg}
            className="image"
            alt=""
            height={1000}
            width={1000}
          />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              WellCome To Our Book Exchange Web site . And Enjoy Now
            </p>
            <button className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <Image
            src={regImg}
            className="image"
            alt=""
            height={1000}
            width={1000}
          />
        </div>
      </dialog>
    </>
  );
};

export default JoinUs;
