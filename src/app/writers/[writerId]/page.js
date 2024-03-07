
import WriterDetails from "@/components/Home/Writer/WriterDetails/WriterDetails";
import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";

const page = () => {

    return (
        <div className="bg-teal-50">
            <Navbar></Navbar>
            <WriterDetails></WriterDetails>
            <Footer></Footer>
        </div>
    );
};

export default page;