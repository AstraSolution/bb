"use client"

import { Helmet } from "react-helmet";
import Navbar from '../Shared/Navbar/Navbar';
import SectionTitle from '../Shared/SectionTitle/SectionTitle';
import Footer from '../Shared/Footer/Footer';
import Contact from './Contact/Contact';

const ContactUs = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Contact Us || Boi Binimoy</title>
                <link rel="canonical" href="/contact" />
            </Helmet>
            <Navbar />
            <SectionTitle heading={"Contact Page"}></SectionTitle>
            <Contact />
            <Footer />
        </div>
    );
};

export default ContactUs;