"use client";
import { useContext, useEffect, useState } from "react";
import "./style.css";
import Link from "next/link";
import { AuthContext } from "@/providers/AuthProvider";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import useOneUser from "@/Hooks/Users/useOneUser";
import useAdmin from "@/Hooks/useAdmin";
import { Helmet } from "react-helmet";

const profilePlaceholder = "/userPicPlaceholder.png";

const Dashboard = ({ children }) => {
  const { logOut } = useContext(AuthContext);
  const { currentUser } = useOneUser();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const { isAdmin, isModerator, isSeller, isPublisher, isUser } = useOneUser();

  const toggleNotification = () => {
    setIsOpen(!isOpen);
  };

  const [componentsMounted, setComponentMounted] = useState(false);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  useEffect(() => {
    if (componentsMounted) {
      initializeDashboard();
    }
  }, [componentsMounted]);

  function initializeDashboard() {
    const allSideMenu = document.querySelectorAll(
      "#sidebar .side-menu.top li a"
    );

    allSideMenu.forEach((item) => {
      const li = item.parentElement;
      if (li) {
        // Check if li exists
        item.addEventListener("click", function () {
          allSideMenu.forEach((i) => {
            const parentLi = i.parentElement;
            if (parentLi) {
              // Check if parentLi exists
              parentLi.classList.remove("active");
            }
          });
          li.classList.add("active");
        });
      }
    });

    // TOGGLE SIDEBAR
    const menuBar = document.querySelector("#content nav .bx.bx-menu");
    const sidebar = document.getElementById("sidebar");

    menuBar.addEventListener("click", function () {
      sidebar.classList.toggle("hide");
    });

    const searchButton = document.querySelector(
      "#content nav form .form-input button"
    );
    const searchButtonIcon = document.querySelector(
      "#content nav form .form-input button .bx"
    );
    const searchForm = document.querySelector("#content nav form");

    searchButton.addEventListener("click", function (e) {
      if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle("show");
        if (searchForm.classList.contains("show")) {
          searchButtonIcon.classList.replace("bx-search", "bx-x");
        } else {
          searchButtonIcon.classList.replace("bx-x", "bx-search");
        }
      }
    });

    if (window.innerWidth < 768) {
      sidebar.classList.add("hide");
    } else if (window.innerWidth > 576) {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
      searchForm.classList.remove("show");
    }

    window.addEventListener("resize", function () {
      if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace("bx-x", "bx-search");
        searchForm.classList.remove("show");
      }
    });

    const switchMode = document.getElementById("switch-mode");

    switchMode.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    });
  }

  const cardsInfo = [
    {
      id: 1,
      img: "https://images-na.ssl-images-amazon.com/images/I/81WcnNQ-TBL.jpg",
      title: "BIG MAGIC",
      auther: "Elizabeth Gilbert",
    },
    {
      id: 2,
      img: "https://images-na.ssl-images-amazon.com/images/I/A1kNdYXw0GL.jpg",
      title: "Ten Thousand Skies Above",
      auther: "Claudia Gray",
    },
    {
      id: 3,
      img: "https://images-na.ssl-images-amazon.com/images/I/81eI0ExR+VL.jpg",
      title: "A Tale For The Time Being",
      auther: "Ruth Ozeki",
    },
    {
      id: 4,
      img: "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg",
      title: "The Great Gatsby",
      auther: "F.Scott Fitzgerald",
    },
    {
      id: 5,
      img: "https://images-na.ssl-images-amazon.com/images/I/81UWB7oUZ0L.jpg",
      title: "After You",
      auther: "Jojo Moyes",
    },
  ];

  return (
    <div className="bg-teal-50">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard || Boi Binimoy</title>
        <link rel="canonical" href="/dashboard" />
      </Helmet>
      <section id="sidebar" className="">
        <Link href="/" className="brand">
          <i className="bx bxs-smile"></i>
          <span className="text">BoiBinimoy</span>
        </Link>

        <>
          <ul className="side-menu top">
            <li className={pathname == "/dashboard" ? "active" : ""}>
              <Link href="/dashboard">
                <i className="bx bxs-dashboard"></i>
                <span className="text">Dashboard</span>
              </Link>
            </li>
            <li className={pathname == "/dashboard/add-blog" ? "active" : ""}>
              <Link href="/dashboard/add-blog">
                <i className="bx bxs-book-add"></i>
                <span className="text">Add Blog</span>
              </Link>
            </li>
            <li className={pathname == "/dashboard/add-book" ? "active" : ""}>
              <Link href="/dashboard/add-book">
                <i className="bx bxs-book-add"></i>
                <span className="text">Add Book</span>
              </Link>
            </li>
            <li className={pathname == "/dashboard/orders" ? "active" : ""}>
              <Link href="/dashboard/orders">
                <i className="bx bxs-book-add"></i>
                <span className="text">Orders</span>
              </Link>
            </li>
            <li
              className={pathname == "/dashboard/track-order" ? "active" : ""}
            >
              <Link href="/dashboard/track-order">
                <i className="bx bxs-book-add"></i>
                <span className="text">Track Orders</span>
              </Link>
            </li>
            <li className={pathname == "/dashboard/my-orders" ? "active" : ""}>
              <Link href="/dashboard/my-orders">
                <i className="bx bxs-book-add"></i>
                <span className="text">My Orders</span>
              </Link>
            </li>
            <li className={pathname == "/dashboard/add-banner" ? "active" : ""}>
              <Link href="/dashboard/add-banner">
                <i className="bx bxs-image-add"></i>
                <span className="text">Add Banner</span>
              </Link>
            </li>
            <li
              className={pathname == "/dashboard/list-exchange" ? "active" : ""}
            >
              <Link href="/dashboard/list-exchange">
                <i className="bx bxs-book-add"></i>
                <span className="text">List Book</span>
              </Link>
            </li>
            <li className={pathname == "/dashboard/all-books" ? "active" : ""}>
              <Link href="/dashboard/all-books">
                <i className="bx bxs-group"></i>
                <span className="text"> My Books </span>
              </Link>
            </li>
            <li className={pathname == "/dashboard/my-blogs" ? "active" : ""}>
              <Link href="/dashboard/my-blogs">
                <i className="bx bxs-group"></i>
                <span className="text">My Blogs</span>
              </Link>
            </li>
            <li
              className={
                pathname == "/dashboard/exchange-books" ? "active" : ""
              }
            >
              <Link href="/dashboard/exchange-books">
                <i className="bx bxs-group"></i>
                <span className="text">Exchange Books </span>
              </Link>
            </li>
            <li className={pathname == "/dashboard/profile" ? "active" : ""}>
              <Link href="/dashboard/profile">
                <i className="bx bxs-group"></i>
                <span className="text">Profile</span>
              </Link>
            </li>
            <li className={pathname == "/dashboard/users" ? "active" : ""}>
              <Link href="/dashboard/users">
                <i className="bx bxs-group"></i>
                <span className="text">Users</span>
              </Link>
            </li>
            <li className={pathname == "/dashboard/analytics" ? "active" : ""}>
              <Link href="#">
                <i className="bx bxs-doughnut-chart"></i>
                <span className="text">Analytics</span>
              </Link>
            </li>
            <li
              className={pathname == "/dashboard/notification" ? "active" : ""}
            >
              <Link href="/dashboard/notification">
                <i className="bx bxs-message-dots"></i>
                <span className="text">Notification</span>
              </Link>
            </li>
            <li className={pathname == "/dashboard/categories" ? "active" : ""}>
              <Link href="/dashboard/categories">
                <i className="bx bxs-category"></i>
                <span className="text">Categories</span>
              </Link>
            </li>
            <li className={pathname == "/dashboard/writers" ? "active" : ""}>
              <Link href="/dashboard/writers">
                <i className="bx bxs-credit-card-front"></i>
                <span className="text">Writers</span>
              </Link>
            </li>
            <li className={pathname == "/dashboard/publishers" ? "active" : ""}>
              <Link href="/dashboard/publishers">
                <i className="bx bxs-store"></i>
                <span className="text">Publisher</span>
              </Link>
            </li>
          </ul>
        </>

        {isUser && (
          <>
            <ul className="side-menu top">
              <li className={pathname == "/dashboard" ? "active" : ""}>
                <Link href="/dashboard">
                  <i className="bx bxs-dashboard"></i>
                  <span className="text">Dashboard</span>
                </Link>
              </li>

              <li className={pathname == "/dashboard/orders" ? "active" : ""}>
                <Link href="/dashboard/orders">
                  <i className="bx bxs-book-add"></i>
                  <span className="text">Orders</span>
                </Link>
              </li>
              <li
                className={pathname == "/dashboard/track-order" ? "active" : ""}
              >
                <Link href="/dashboard/track-order">
                  <i className="bx bxs-book-add"></i>
                  <span className="text">Track Orders</span>
                </Link>
              </li>
              <li
                className={pathname == "/dashboard/my-orders" ? "active" : ""}
              >
                <Link href="/dashboard/my-orders">
                  <i className="bx bxs-book-add"></i>
                  <span className="text">My Orders</span>
                </Link>
              </li>

              <li
                className={
                  pathname == "/dashboard/list-exchange" ? "active" : ""
                }
              >
                <Link href="/dashboard/list-exchange">
                  <i className="bx bxs-book-add"></i>
                  <span className="text">List Book</span>
                </Link>
              </li>
              <li
                className={pathname == "/dashboard/all-books" ? "active" : ""}
              >
                <Link href="/dashboard/all-books">
                  <i className="bx bxs-group"></i>
                  <span className="text"> My Books </span>
                </Link>
              </li>

              <li
                className={
                  pathname == "/dashboard/exchange-books" ? "active" : ""
                }
              >
                <Link href="/dashboard/exchange-books">
                  <i className="bx bxs-group"></i>
                  <span className="text">Exchange Books </span>
                </Link>
              </li>
              <li className={pathname == "/dashboard/profile" ? "active" : ""}>
                <Link href="/dashboard/profile">
                  <i className="bx bxs-group"></i>
                  <span className="text">Profile</span>
                </Link>
              </li>

              <li
                className={pathname == "/dashboard/analytics" ? "active" : ""}
              >
                <Link href="#">
                  <i className="bx bxs-doughnut-chart"></i>
                  <span className="text">Analytics</span>
                </Link>
              </li>
              <li className={pathname == "/dashboard/message" ? "active" : ""}>
                <Link href="/dashboard/message">
                  <i className="bx bxs-message-dots"></i>
                  <span className="text">Message</span>
                </Link>
              </li>
              <li
                className={
                  pathname == "/dashboard/notification" ? "active" : ""
                }
              >
                <Link href="/dashboard/notification">
                  <i className="bx bxs-message-dots"></i>
                  <span className="text">Notification</span>
                </Link>
              </li>
            </ul>
          </>
        )}

        {isSeller && (
          <>
            <ul className="side-menu top">
              <li className={pathname == "/dashboard" ? "active" : ""}>
                <Link href="/dashboard">
                  <i className="bx bxs-dashboard"></i>
                  <span className="text">Dashboard</span>
                </Link>
              </li>

              <li className={pathname == "/dashboard/add-book" ? "active" : ""}>
                <Link href="/dashboard/add-book">
                  <i className="bx bxs-book-add"></i>
                  <span className="text">Add Book</span>
                </Link>
              </li>

              <li
                className={pathname == "/dashboard/add-banner" ? "active" : ""}
              >
                <Link href="/dashboard/add-banner">
                  <i class="bx bxs-image-add"></i>
                  <span className="text">Add Banner</span>
                </Link>
              </li>

              <li
                className={
                  pathname == "/dashboard/list-exchange" ? "active" : ""
                }
              >
                <Link href="/dashboard/list-exchange">
                  <i className="bx bxs-book-add"></i>
                  <span className="text">List Book</span>
                </Link>
              </li>
              <li
                className={pathname == "/dashboard/all-books" ? "active" : ""}
              >
                <Link href="/dashboard/all-books">
                  <i className="bx bxs-group"></i>
                  <span className="text"> My Books </span>
                </Link>
              </li>

              <li
                className={
                  pathname == "/dashboard/exchange-books" ? "active" : ""
                }
              >
                <Link href="/dashboard/exchange-books">
                  <i className="bx bxs-group"></i>
                  <span className="text">Exchange Books </span>
                </Link>
              </li>
              <li className={pathname == "/dashboard/profile" ? "active" : ""}>
                <Link href="/dashboard/profile">
                  <i className="bx bxs-group"></i>
                  <span className="text">Profile</span>
                </Link>
              </li>

              <li
                className={pathname == "/dashboard/analytics" ? "active" : ""}
              >
                <Link href="#">
                  <i className="bx bxs-doughnut-chart"></i>
                  <span className="text">Analytics</span>
                </Link>
              </li>
              <li className={pathname == "/dashboard/message" ? "active" : ""}>
                <Link href="/dashboard/message">
                  <i className="bx bxs-message-dots"></i>
                  <span className="text">Message</span>
                </Link>
              </li>
              <li
                className={
                  pathname == "/dashboard/notification" ? "active" : ""
                }
              >
                <Link href="/dashboard/notification">
                  <i className="bx bxs-message-dots"></i>
                  <span className="text">Notification</span>
                </Link>
              </li>
            </ul>
          </>
        )}

        <ul className="side-menu">
          <li>
            <Link href="#">
              <i className="bx bxs-cog"></i>
              <span className="text">Settings</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="logout">
              <i className="bx bxs-log-out-circle"></i>
              <button onClick={logOut}>
                <span className="text">Logout</span>
              </button>
            </Link>
          </li>
        </ul>
      </section>

      {/*TOP  CONTENT */}
      <section id="content">
        {/*  NAVBAR */}
        <div>
          <nav>
            <i className="bx bx-menu"></i>
            <a href="#" className="nav-link">
              Categories
            </a>
            <form action="#">
              <div className="form-input">
                <input type="search" placeholder="Search..." />
                <button type="submit" className="search-btn">
                  <i className="bx bx-search"></i>
                </button>
              </div>
            </form>
            <input type="checkbox" id="switch-mode" hidden />
            <label htmlFor="switch-mode" className="switch-mode"></label>
            {/* notification start*/}
            <div className="relative">
              {/* notification button start */}
              <button onClick={toggleNotification} className="notification">
                <i className="bx bxs-bell"></i>
                <span className="num">8</span>
              </button>
              {/* notification button end */}

              {/* notification information start */}
              {isOpen && (
                <div className="absolute top-10 -right-1 rounded-lg bg-50 w-72 h-96 p-2 overflow-y-scroll shadow-lg border border-gray-300">
                  {/* notification card start */}
                  {cardsInfo.map((cardInfo) => (
                    <div key={cardInfo.id}>
                      <div className="flex justify-center gap-3 hover:bg-teal-100 p-2 rounded-lg cursor-pointer">
                        {/* image */}
                        <div className="w-16 flex justify-center">
                          <Image
                            className="w-6 h-6 rounded-full"
                            src={cardInfo.img}
                            width={500}
                            height={500}
                            alt=""
                          />
                        </div>
                        {/* text and button */}
                        <div className="space-y-1">
                          {/* text */}
                          <h4 className="text-[10px] md:text-xs font-light text-[#016961]">
                            <span className="font-semibold">
                              {cardInfo.auther}
                            </span>{" "}
                            want to exchange{" "}
                            <span className="font-semibold">
                              {cardInfo.title}
                            </span>{" "}
                            whit you.
                          </h4>
                          {/* buttons */}
                          <div className="flex items-center gap-2">
                            {/* button 1 */}
                            <button className="py-1 bg-green-200 text-green-600 text-xs rounded-md w-full flex justify-center hover:bg-green-300">
                              <FaCheck />
                              {/* button 2 */}
                            </button>
                            <button className="py-1 bg-red-200 text-red-600 text-xs rounded-md w-full flex justify-center hover:bg-red-300">
                              <RxCross2 />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* notification card end */}
                </div>
              )}
              {/* notification information end */}
            </div>
            {/* notification end */}
            <a href="#" className="profile">
              {currentUser.image ? (
                <Image
                  src={currentUser.image}
                  alt="user"
                  priority
                  width={36}
                  height={36}
                  style={{
                    width: "36px",
                    height: "36px",
                  }}
                />
              ) : (
                <Image
                  src={profilePlaceholder}
                  alt="placeholder"
                  priority
                  width={36}
                  height={36}
                  style={{
                    width: "36px",
                    height: "36px",
                  }}
                />
              )}
            </a>
          </nav>
        </div>
        {/*  NAVBAR */}

        {/* CONTENT */}
        <div className="content-wrapper">{children}</div>
        {/* CONTENT */}
      </section>
    </div>
  );
};

export default Dashboard;
