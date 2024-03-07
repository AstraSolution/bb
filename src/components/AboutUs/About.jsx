"use client"

import { Helmet } from "react-helmet";
import Navbar from "../Shared/Navbar/Navbar";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import OurStory from "./OurStories/OurStory";
import Teams from "./Teams/Teams";
import Footer from "../Shared/Footer/Footer";

const About = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>About Us || Boi Binimoy</title>
                <link rel="canonical" href="/aboutus" />
            </Helmet>
            <Navbar />
            <SectionTitle heading={"About Us"}></SectionTitle>
            <OurStory />
            <Teams />
            <Footer />
        </div>
    );
};

export default About;