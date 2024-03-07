import Logo from "../Logo/Logo";
import Navend from "./Navend/Navend";
import Navlinks from "./Navlinks/Navlinks";
import Search from "./Search/Search";
import { CiMenuKebab } from "react-icons/ci";
import Link from "next/link";

const Navbar = () => {
  // bg-[#016961]

  return (
    <nav className="bg text-white sticky top-0 right-0 z-50 py-5">
      {/* nav for md and lg screen */}
      <div className="max-w-7xl mx-auto  hidden md:block">
        {/* upper side nav */}
        <div className="flex justify-between items-center py-2 px-5">
          {/* logo */}
          <Link href="/" className="text-2xl">
            <Logo />
          </Link>

          {/* search */}
          <div className="flex-1 px-8">
            <Search />
          </div>

          {/* navend */}
          <div className="text-2xl">
            <Navend />
          </div>
        </div>

        {/* lower side nav */}
        <div className="mt-2">
          {/* nav links */}
          <Navlinks />
        </div>
      </div>

      {/* nav for sm screen */}
      <div className="md:hidden flex justify-between items-center py-2 px-3 w-full">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-xs text-2xl lg:hidden"
          >
            <CiMenuKebab />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black"
          >
            <Navlinks />
          </ul>
        </div>

        <div className="text-xl">
          <Logo />
        </div>
        <div className="flex-1 ml-3">
          <Search />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
