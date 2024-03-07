import { GiSandsOfTime } from "react-icons/gi";
import { IoWalletOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdOutlineReceiptLong } from "react-icons/md";
import { PiPackage } from "react-icons/pi";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const TrackOrder = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="p-6 bg text-white rounded-lg">
          <div className="grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-black/50">
              <div className="flex justify-center p-2 rounded-lg sm:p-4 bg-[#016961]">
                <h1 className="text-4xl">
                  <GiSandsOfTime />
                </h1>
              </div>
              <div>
                <p className="capitalize">In Process</p>
                <p className="text-3xl font-semibold leadi">200</p>
              </div>
            </div>

            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-black/50">
              <div className="flex justify-center p-2 rounded-lg sm:p-4 bg-[#016961]">
                <h1 className="text-4xl">
                  <IoWalletOutline />
                </h1>
              </div>
              <div>
                <p className="capitalize">Unpaid</p>
                <p className="text-3xl font-semibold leadi">7500</p>
              </div>
            </div>

            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-black/50">
              <div className="flex justify-center p-2 rounded-lg sm:p-4 bg-[#016961]">
                <h1 className="text-4xl">
                  <TbTruckDelivery />
                </h1>
              </div>
              <div>
                <p className="capitalize">On The Way</p>
                <p className="text-3xl font-semibold leadi">172</p>
              </div>
            </div>

            <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-black/50">
              <div className="flex justify-center p-2 rounded-lg sm:p-4 bg-[#016961]">
                <h1 className="text-4xl">
                  <AiOutlineFileDone />
                </h1>
              </div>
              <div>
                <p className="capitalize">Completed</p>
                <p className="text-3xl font-semibold leadi">17</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-10">
        <div className="space-y-6">
          {/* track you order section start */}
          <div className="border-2 p-5 rounded-lg bg-50-50">
            <h1 className="text-2xl font-bold pb-1">Track you order</h1>
            <hr />
            <p className="text-sm font-semibold py-2">
              Order code: 02i09j01945u1jlaslj
            </p>

            {/* ------ */}
            <div className="flex justify-center py-10">
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="bg-[#016916] p-2 rounded-full">
                    <span className="text-3xl text-white">
                      <MdOutlineReceiptLong />
                    </span>
                  </div>
                  <div className="hidden md:block w-32 h-1 bg-[#016916]" />
                  <div className="md:hidden w-1 h-20 bg-[#016916]" />
                </div>

                <div className="flex flex-col md:flex-row items-center">
                  <div className="bg-[#016916] p-2 rounded-full">
                    <span className="text-3xl text-white">
                      <PiPackage />
                    </span>
                  </div>
                  <div className="hidden md:block w-32 h-1 bg-[#016916]" />
                  <div className="md:hidden w-1 h-20 bg-[#016916]" />
                </div>

                <div className="flex flex-col md:flex-row items-center">
                  <div className="bg-[#016916] p-2 rounded-full">
                    <span className="text-3xl text-white">
                      <TbTruckDelivery />
                    </span>
                  </div>
                  <div className="hidden md:block w-32 h-1 bg-[#016916]" />
                  <div className="md:hidden w-1 h-20 bg-[#016916]" />
                </div>

                <div>
                  <div className="bg-[#016916] p-2 rounded-full">
                    <span className="text-3xl text-white">
                      <IoCheckmarkDoneCircleOutline />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* ------ */}

            {/* ------ */}
            {/* <div className="flex justify-center">
              <div className="flex py-10 ">
                <div className="">
                  <div className="flex items-center mb-1">
                    <div className="text-lg p-2 border rounded-full">
                      <FaCheck />
                    </div>
                    <div className="w-full h-1 bg-gray-300" />
                  </div>
                  <div className="pt-1 pl-3 pr-8 max-w-44">
                    <p className="text-xs">03/12/2020</p>
                    <p className="text-gray-700 font-bold">Lorem, ipsum</p>
                  </div>
                </div>

                <div className="">
                  <div className="flex items-center mb-1">
                    <div className="text-lg p-2 border rounded-full">
                      <FaCheck />
                    </div>
                    <div className="w-full h-1 bg-gray-300" />
                  </div>
                  <div className="pt-1  pl-3 pr-8 max-w-44">
                    <p className="text-xs">03/12/2020</p>
                    <p className="text-gray-700 font-bold">Lorem, ipsum</p>
                  </div>
                </div>

                <div className="">
                  <div className="flex items-center mb-1">
                    <div className="text-lg p-2 border rounded-full">
                      <FaCheck />
                    </div>
                    <div className="w-full h-1 bg-gray-300" />
                  </div>
                  <div className="pt-1  pl-3 pr-8 max-w-44">
                    <p className="text-xs">03/12/2020</p>
                    <p className="text-gray-700 font-bold">Lorem, ipsum</p>
                  </div>
                </div>

                <div className="">
                  <div className="flex items-center mb-1">
                    <div className="text-lg p-2 border rounded-full">
                      <FaCheck />
                    </div>
                    <div className="w-full h-1 bg-gray-300" />
                  </div>
                  <div className="pt-1  pl-3 pr-8 max-w-44">
                    <p className="text-xs">03/12/2020</p>
                    <p className="text-gray-700 font-bold">Lorem, ipsum</p>
                  </div>
                </div>

                <div className="">
                  <div className="flex items-center mb-1">
                    <div className="text-lg p-2 border rounded-full">
                      <FaCheck />
                    </div>
                  </div>
                  <div className="pt-1  pl-3 pr-8 max-w-44">
                    <p className="text-xs">03/12/2020</p>
                    <p className="text-gray-700 font-bold">Lorem, ipsum</p>
                  </div>
                </div>
              </div>
            </div> */}
            {/* ------ */}

            {/* traking start */}
            {/* <div className="py-6">
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <FaCheck />
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300" />
                </div>
                <div className="pt-1 pb-8">
                  <p className="text-xs">03/12/2020</p>
                  <p className="text-gray-700 font-bold">Lorem, ipsum.</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <FaCheck />
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300" />
                </div>
                <div className="pt-1 pb-8">
                  <p className="text-xs">03/12/2020</p>
                  <p className="text-gray-700 font-bold">Lorem, ipsum.</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <FaCheck />
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300" />
                </div>
                <div className="pt-1 pb-8">
                  <p className="text-xs">03/12/2020</p>
                  <p className="text-gray-700 font-bold">Lorem, ipsum.</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <FaCheck />
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300" />
                </div>
                <div className="pt-1 pb-8">
                  <p className="text-xs">03/12/2020</p>
                  <p className="text-gray-700 font-bold">Lorem, ipsum.</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <FaCheck />
                    </div>
                  </div>
                </div>
                <div className="pt-1">
                  <p className="text-xs">03/12/2020</p>
                  <p className="text-gray-700 font-bold">Lorem, ipsum.</p>
                </div>
              </div>
            </div> */}
            {/* traking end */}

            <h5 className="text-lg font-bold">You orde has been delivader</h5>
            <p className="text-xs">
              Lorem ipsum dolor sit. You orde has been delivader
            </p>
          </div>
          {/* track you order section end */}

          {/* all order section start */}
          <div className="border-2 p-5 rounded-lg bg-50-50">
            <h1 className="text-2xl font-bold pb-1">All order</h1>
            {/* <div>
              <div className="flex justify-between py-3">
                <h1 className="text-lg font-bold">Book Name</h1>
                <h1 className="text-lg font-bold">Qun</h1>
              </div>
              <div className="flex justify-between py-3">
                <div>
                  <h6 className="text-base font-bold">book name</h6>
                  <p className="text-xs">witer name</p>
                </div>
                <p className="text-lg font-bold">1 p</p>
              </div>
              <div className="flex justify-between py-3">
                <div>
                  <h6 className="text-base font-bold">book name</h6>
                  <p className="text-xs">witer name</p>
                </div>
                <p className="text-lg font-bold">1 p</p>
              </div>
              <div className="flex justify-between py-3">
                <div>
                  <h6 className="text-base font-bold">book name</h6>
                  <p className="text-xs">witer name</p>
                </div>
                <p className="text-lg font-bold">1 p</p>
              </div>
              <div className="flex justify-between py-3">
                <div>
                  <h6 className="text-base font-bold">book name</h6>
                  <p className="text-xs">witer name</p>
                </div>
                <p className="text-lg font-bold">1 p</p>
              </div>
            </div> */}

            <div className="overflow-x-auto">
              <table className="w-full mt-2">
                <tr>
                  <th className="border border-black p-2">#</th>
                  <th className="border border-black p-2">Order Code</th>
                  <th className="border border-black p-2">Product Nme</th>
                  <th className="border border-black p-2">Qty</th>
                  <th className="border border-black p-2">Price</th>
                  <th className="border border-black p-2">Delivery Status</th>
                  <th className="border border-black p-2">Order Status</th>
                  <th className="border border-black p-2">Payout</th>
                </tr>
                <tr>
                  <td className="border border-black p-2">1</td>
                  <td className="border border-black p-2">
                    02i09j01945u1jlaslj
                  </td>
                  <td className="border border-black p-2">A nice book name</td>
                  <td className="border border-black p-2">3</td>
                  <td className="border border-black p-2">320</td>
                  <td className="border border-black p-2">
                    <span className="p-1 w-fit bg-gray-400 text-white text-sm rounded-md">
                      Painding
                    </span>
                  </td>
                  <td className="border border-black p-2">
                    <span className="p-1 w-fit bg-blue-400 text-white text-sm rounded-md">
                      Done
                    </span>
                  </td>
                  <td className="border border-black p-2">
                    <span className="p-1 w-fit bg-green-400 text-white text-sm rounded-md">
                      Active
                    </span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          {/* all order section end */}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
