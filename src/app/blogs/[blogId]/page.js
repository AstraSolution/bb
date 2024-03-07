
import BlogDetails from '@/components/Blog/BlogDetails/BlogDetails';
import Footer from '@/components/Shared/Footer/Footer';
import Navbar from '@/components/Shared/Navbar/Navbar';

const page = () => {
    return (
        <div>
            <Navbar />
            <BlogDetails></BlogDetails>
            <Footer />
        </div>
    );
};

export default page;