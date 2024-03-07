"use client"

import { Helmet } from "react-helmet";
import Navbar from "../Shared/Navbar/Navbar";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import Blog from "./Blog";
import Footer from "../Shared/Footer/Footer";

const Blogs = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Blogs || Boi Binimoy</title>
                <link rel="canonical" href="/blogs" />
            </Helmet>
            <Navbar />
            <SectionTitle heading={"Blog Page"}></SectionTitle>
            <Blog />
            <Footer />
        </div>
    );
};

export default Blogs;