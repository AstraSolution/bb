"use client"

import Navbar from '../Shared/Navbar/Navbar';
import Header from './Header/Header';
import Category from './Category/Category';
import Exchange from './Exchange/Exchange';
import Stats from './Stats/Stats';
import Writer from './Writer/Writer';
import ForYou from './ForYou/ForYou';
import Publisher from './Publisher/Publisher';
import BuyNow from './BuyNow/BuyNow';
import Footer from '../Shared/Footer/Footer';
import { Helmet } from "react-helmet";

const Home = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home || Boi Binimoy</title>
                <link rel="canonical" href="/" />
            </Helmet>
            <Navbar />
            <Header />
            <Category />
            <Stats />
            <Exchange />
            <Writer />
            <ForYou />
            <Publisher />
            <BuyNow />
            <Footer />
        </div>
    );
};

export default Home;