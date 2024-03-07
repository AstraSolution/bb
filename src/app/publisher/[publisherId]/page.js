import PublisherDetails from "@/components/Home/Publisher/PublisherDetails/PublisherDetails";
import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";

const page = () => {
  return (
    <div className="bg-teal-50">
      <Navbar></Navbar>
      <PublisherDetails></PublisherDetails>
      <Footer></Footer>
    </div>
  );
};

export default page;
