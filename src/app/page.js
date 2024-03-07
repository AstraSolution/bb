
import Banner from "../components/Home/Banner/Banner";
import Home from "@/components/Home/Home";

const HomePage = () => {
  return (
    <div className="bg-teal-50">
      <div>
        <div className="parallax hidden md:block">
          <Banner />
        </div>
        <div className="md:mt-[100vh]">
          <Home></Home>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
