"use client"

import Navbar from '../Shared/Navbar/Navbar';
import SectionTitle from '../Shared/SectionTitle/SectionTitle';
import BuyAllBooks from './BuyAllBooks/BuyAllBooks';
import Footer from '../Shared/Footer/Footer';
import { Helmet } from "react-helmet";

const BuyBooks = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Buy Books || Boi Binimoy</title>
                <link rel="canonical" href="/buyBooks" />
            </Helmet>
            <Navbar />
            <SectionTitle heading={"All Books"}></SectionTitle>
            <BuyAllBooks />
            <Footer />
        </div>
    );
};

export default BuyBooks;