import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import SectionTitle from "@/components/Shared/SectionTitle/SectionTitle";
import WishLIst from '@/components/WishList/WishLIst';
import React from 'react';

const page = () => {
    return (
        <div>
            <Navbar />
            <SectionTitle heading={"Wish List Page "}></SectionTitle>
            <WishLIst></WishLIst>
            <Footer />
        </div>
    );
};

export default page;