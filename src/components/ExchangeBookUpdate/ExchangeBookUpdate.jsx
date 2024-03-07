"use client"

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { BsUpload } from "react-icons/bs";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import PageLoading from "../Shared/loadingPageBook/PageLoading";
import useAxiosSecure from "@/Hooks/Axios/useAxiosSecure";
import Swal from "sweetalert2";
import useGetOneExchangeBook from "@/Hooks/exchangeBooks/useGetOneExchangeBook";



const ExchangeBookUpdate = () => {

  const axiosSecure = useAxiosSecure();
  const router = useRouter();

  const { exchange_update_book_id } = useParams()


  const { getOneExchangeBook, isLoading } = useGetOneExchangeBook(exchange_update_book_id)


  if (isLoading) {
    return <PageLoading></PageLoading>
  }

  const { _id,
    description,
    title,
    edition,
    bookType,
    condition,
    pages,
    price,
    whatYouWant,
    owner,
    publisher,
    writer,
    bookCategory,
    language,
    publication_year, } = getOneExchangeBook || {};



  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const writer = form.writer.value;
    const publisher = form.publisher.value;
    const owner = form.owner.value;
    const whatYouWant = form.whatYouWant.value;
    const publication_year = form.publication_year.value;
    const language = form.language.value;
    const bookCategory = form.bookCategory.value;
    const edition = form.edition.value;
    const pages = form.pages.value;
    const
      condition = form.
        condition.value;
    const price = form.price.value;
    const description = form.description.value;

    const currentDate = new Date().toISOString();
    const updateExchangeBook = {
      title,
      uploadTime: currentDate,
      description,
      edition, bookType, condition,
      pages, price, whatYouWant, owner,
      publisher, writer, bookCategory, language, publication_year,

    };




    axiosSecure.put(`/api/v1/exchange-books/${_id}`, updateExchangeBook)
      .then(res => {
        const updatedBook = res.data;
        if (updatedBook) {
          Swal.fire(' Book Update successfully');
          router.push('/dashboard/exchange-books')
        } else {
          Swal.fire('Update failed. Please try again.');
        }
      })
      .catch(error => {
        console.error("Error occurred during update:", error);
        Swal.fire('Update failed. Please try again.');
      });


  };



  return (
    <div className="bg-teal-50 text-gray-500 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 md:px-5 lg:px-0 py-10">
        <div className="border-2 border-gray-300 rounded-lg px-3">
          <h1 className="text-lg  font-bold py-2">
            Update book name here Book
          </h1>

          <form onSubmit={handleSubmit}>
            {/* basic information div */}
            <div className=" border-2 border-gray-300 rounded-lg px-3 pb-3">
              {/* title */}
              <h3 className="text-sm font-light py-2">Basic Information:</h3>
              {/* information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* product type */}
                <select
                  className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                  name="bookType"
                  defaultValue={bookType}
                  id=""
                >
                  <option selected value="">
                    Book type
                  </option>
                  <option value="nwePhysicalBook">Nwe Physical Book</option>
                  <option value="oldPhysicalBook">Old Physical Book</option>
                  <option value="pdfFormatBook">PDF Format Book</option>
                  <option value="audioFormatBook">Audio Format Book</option>
                </select>

                {/* product conditions */}
                <select
                  className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                  name="bookCondition"
                  defaultValue={condition}
                  id=""
                >
                  <option selected value="">
                    Book Conditon
                  </option>
                  <option value="good">Good</option>
                  <option value="veryGood">Very Good</option>
                  <option value="notSoGoodorBad">Not So Good or Bad</option>
                  <option value="bad">Bad</option>
                  <option value="veryBad">Very Bad</option>
                </select>

                {/* what you wants */}
                <select
                  className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                  name="whatYouWant"
                  defaultValue={whatYouWant}
                  id=""
                >
                  <option selected value="">
                    What you want?
                  </option>
                  <option value="exchange">Exchange</option>
                  <option value="sale">Sale</option>
                  <option value="exchangeOrSale">Exchange or Sale</option>
                </select>

                {/* book categorys */}
                <select
                  className="h-10 w-full text-xs px-2 bg-transparent border rounded-lg focus:outline-none"
                  name="bookCategory"
                  defaultValue={bookCategory}
                  id=""
                >
                  <option selected value="">
                    Book Category
                  </option>
                  <option value="self-help">Self-Help</option>
                  <option value="biography/memoir">Biography/Memoir</option>
                  <option value="history">History</option>
                  <option value="science">Science</option>
                  <option value="trueCrime">True Crime</option>
                  <option value="travel">Travel</option>
                  <option value="food&cooking">Food & Cooking</option>
                  <option value="health&wellness">Health & Wellness</option>
                  <option value="business&economics" >
                    Business & Economics
                  </option>
                  <option value="humor">Humor</option>
                  <option value="crimeFiction">Crime Fiction</option>
                  <option value="graphicNovels">Graphic Novels</option>
                  <option value="literaryFiction">Literary Fiction</option>
                  <option value="horror">Horror</option>
                  <option value="historicalFiction">Historical Fiction</option>
                  <option value="youngAdult(YA)">Young Adult (YA)</option>
                  <option value="scienceFiction">Science Fiction</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="mystery/thriller">Mystery/Thriller</option>
                </select>
              </div>
            </div>

            {/* book information and image div */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-3 gap-3">
              {/* book information div */}
              <div className="border-2 col-span-1 lg:col-span-2 border-gray-300 rounded-lg h-full w-full px-2 pb-3">
                {/* title */}
                <h3 className="text-sm font-light py-2">Book Information:</h3>
                {/* information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {/* book title  */}
                  <input
                    className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                    name="title"
                    placeholder="Book Title"
                    defaultValue={title}
                    type="text"
                    required
                  />

                  {/* book auhtor  */}
                  <input
                    className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                    name="writer"
                    placeholder="Book Auhtor"
                    defaultValue={writer}
                    type="text"
                    required
                  />

                  {/* book language  */}
                  <select
                    className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                    name="language"
                    defaultValue={language}
                  >
                    <option selected value="">
                      Book Language
                    </option>
                    <option value="english">Snglish</option>
                    <option value="bangla">Bangla</option>
                    <option value="arabic">Arabic</option>
                  </select>

                  {/* book page count  */}
                  <input
                    className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                    name="pages"
                    placeholder="Book Page Count"
                    defaultValue={pages}
                    type="number"
                    required
                  />

                  {/* book publisher */}
                  <input
                    className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                    name="publisher"
                    defaultValue={publisher}
                    placeholder="Book Publisher"
                    type="text"
                    required
                  />

                  {/* book publication year */}
                  <input
                    className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                    name="publication_year"
                    defaultValue={publication_year}
                    placeholder="Book Publication Year"
                    type="number"
                    required
                  />

                  {/* book edition */}
                  <input
                    className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                    name="edition"
                    defaultValue={edition}
                    placeholder="Book Edition"
                    type="text"
                    required
                  />

                  {/* book price */}
                  <input
                    className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                    name="price"
                    defaultValue={price}
                    placeholder="Book Price"
                    type="number"
                    required
                  />
                </div>
              </div>

              {/* image div */}
              <div className="border-2 col-span-1 border-gray-300 rounded-lg h-full w-full px-2 pb-3">
                {/* title */}
                <h3 className="text-sm font-light py-2">
                  Uploade book cover Image:
                </h3>
                {/* image */}
                <div className="w-full h-32 border flex justify-center items-center border-gray-300 rounded-lg"
                >
                  <label htmlFor="imageFile"
                    className="border px-3 py-1 flex justify-center items-center gap-3 rounded-lg text-center text-sm  cursor-pointer"
                  >
                    <BsUpload /> <span> Upload Here</span>
                  </label>
                  <input
                    className="h-5 w-full"
                    type="file"
                    // defaultValue={cover_image}
                    id="imageFile"
                    hidden
                  />
                </div>

                {/* 3 image uploade feilds */}
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {/* 1 */}
                  <div className="w-full h-16 border flex justify-center items-center border-gray-300 rounded-lg"
                  >
                    <label htmlFor="imageFile"
                      className="border px-3 py-1 gap-3 rounded-lg text-center text-sm  cursor-pointer"
                    >
                      <BsUpload />
                    </label>
                    <input
                      className="h-5 w-full"
                      type="file"
                      // defaultValue={cover_image}
                      id="imageFile"
                      hidden
                    />
                  </div>
                  {/* 2 */}
                  <div className="w-full h-16 border flex justify-center items-center border-gray-300 rounded-lg"
                  >
                    <label htmlFor="imageFile"
                      className="border px-3 py-1 gap-3 rounded-lg text-center text-sm  cursor-pointer"
                    >
                      <BsUpload />
                    </label>
                    <input
                      className="h-5 w-full"
                      type="file"
                      // defaultValue={cover_image}
                      id="imageFile"
                      hidden
                    />
                  </div>
                  {/* 3 */}
                  <div className="w-full h-16 border flex justify-center items-center border-gray-300 rounded-lg"
                  >
                    <label htmlFor="imageFile"
                      className="border px-3 py-1 gap-3 rounded-lg text-center text-sm  cursor-pointer"
                    >
                      <BsUpload />
                    </label>
                    <input
                      className="h-5 w-full"
                      type="file"
                      // defaultValue={cover_image}
                      id="imageFile"
                      hidden
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-3 gap-3">
              {/* owner information  div*/}
              <div className="border-2 border-gray-300 rounded-lg h-full w-full px-2 pb-3">
                {/* title */}
                <h3 className="text-sm font-light py-2">Owner Information:</h3>

                {/* information div */}
                <div className="grid grid-cols-1 gap-3">
                  {/* owner name */}
                  <input
                    className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                    name="owner"
                    defaultValue={owner}
                    placeholder="Book Owner Name"
                    type="text"
                    required
                  />

                  {/* owner location */}
                  <input
                    className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                    name="location"
                    // defaultValue={location}
                    placeholder="Book Owner location"
                    type="text"
                    required
                  />
                </div>
              </div>

              {/* other information */}
              <div className="border-2 border-gray-300 rounded-lg h-full w-full px-2 pb-3">
                {/* title */}
                <h3 className="text-sm font-light py-2">Other Information:</h3>

                {/* information */}
                <div className="grid grid-cols-1 gap-3">
                  {/* book Stock Limit */}
                  <input
                    className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                    name="stock_limit"
                    // defaultValue={stock_limit}
                    placeholder="Book Stock"
                    type="number"
                    required
                  />
                </div>
              </div>

              {/* optional information */}
              <div className="border-2 border-gray-300 rounded-lg h-full w-full px-2 pb-3">
                {/* title */}
                <h3 className="text-sm font-light py-2">
                  Optional Information:
                </h3>

                {/* information */}
                <div className="grid grid-cols-1 gap-3">
                  {/* book Tags */}
                  <input
                    className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                    name="tags"
                    // defaultValue={}
                    placeholder="Book Tags"
                    type="text"
                  />

                  {/* book awards */}
                  <input
                    className="h-10 w-full px-2 text-xs bg-transparent border rounded-lg focus:outline-none"
                    name="awards"
                    // defaultValue={}  

                    placeholder="Book Awards"
                    type="text"
                  />
                </div>
              </div>
            </div>

            {/* book description div */}
            <div className="my-3">
              <textarea
                className="w-full p-2 text-xs bg-transparent border-2 border-gray-300 rounded-lg focus:outline-none"
                name="description"
                id=""
                defaultValue={description}
                placeholder="Book Description"
                cols="30"
                rows="10"
                required
              ></textarea>
            </div>

            {/* go to home and submit buttons */}
            <div className="flex justify-center md:justify-end text-xs items-center mb-4 gap-3">
              <Link href="/">
                <button className="px-3 py-2 border-2 border-gray-300 rounded-lg uppercase">
                  <span className="flex items-center gap-1">
                    <SlArrowLeft /> <span>Go to home</span>
                  </span>
                </button>
              </Link>
              <button
                type="submit"
                className="px-3 py-2 border-2 border-gray-300 rounded-lg uppercase"
              >
                <span className="flex items-center gap-1">
                  <span>Submit</span> <SlArrowRight />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExchangeBookUpdate;
