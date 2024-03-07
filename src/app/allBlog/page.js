

import AllBlog from '@/components/Blog/MyBlogs/MyBlogs';
import Footer from '@/components/Shared/Footer/Footer';
import Navbar from '@/components/Shared/Navbar/Navbar';

const page = () => {
    return (
        <div>
            <Navbar></Navbar>
            <AllBlog></AllBlog>
            <Footer></Footer>
        </div>
    );
};

export default page;