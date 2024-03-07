"use client"

import { Helmet } from "react-helmet";
import Navbar from "../Shared/Navbar/Navbar";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import AllExchangeBooks from "./ExchangeAllBooks/AllExchangeBooks";
import Footer from "../Shared/Footer/Footer";

const ExchangeBooks = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Exchange Books || Boi Binimoy</title>
                <link rel="canonical" href="/buyBooks" />
            </Helmet>
            <Navbar />
            <SectionTitle heading={"Exchange Books"}></SectionTitle>
            <AllExchangeBooks />
            <Footer />
        </div>
    );
};

export default ExchangeBooks;