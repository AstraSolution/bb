"use client";

import Image from "next/image";
import { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "next/navigation";
import BookCard from "../../../Shared/BookCard";
import { AuthContext } from '@/providers/AuthProvider';
import PageLoading from '@/components/Shared/loadingPageBook/PageLoading';
import useOneUser from "@/Hooks/Users/useOneUser";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/Axios/useAxiosPublic";

const PublisherDetails = () => {
  const { user } = useContext(AuthContext);
  const userEmail = localStorage?.email;
  const { interest } = useOneUser()
  const param = useParams();
  // const [publisher, setPublisher] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [books, setBooks] = useState([]);
  const axiosPublic = useAxiosPublic();

  const { data: publisher = [], isLoading} = useQuery({
       queryKey : ["publisher"],
       queryFn: async() => {
        const res = await axiosPublic.get(`api/v1/publishers/${param?.publisherId}`);
        return res.data
       }
  })

  const { data: books = []} = useQuery({
    queryKey: ["publisherBooks"],
    queryFn: async() => {
      const res = await axiosPublic.get(`/api/v1/publisher/${publisher?.publisher}`)
    }
  })

  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://boi-binimoy-server.vercel.app/api/v1/publishers/${param?.publisherId}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const result = await response.json();
  //       setPublisher(result);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [param?.publisherId]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://boi-binimoy-server.vercel.app/api/v1/publisher/${publisher?.publisher}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const result = await response.json();
  //       setBooks(result);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [publisher?.publisher]);


  const updateUserInterest = useCallback(async (email, publisherName) => {
    try {
      // Check if the publisherId already exists in user's interest
      if (!interest.publisher.includes(publisherName)) {
        const updatedInterest = {
          ...interest,
          publisher: [...interest.publisher, publisherName] // Merge the new publisherId with existing publisherIds
        };

        const response = await fetch(`https://boi-binimoy-server.vercel.app/api/v1/users-interest/${email}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ interest: updatedInterest })
        });
        if (!response.ok) {
          throw new Error('Failed to update user interest');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [interest]);

  useEffect(() => {
   
      // Update user interest in the database
      updateUserInterest(userEmail, publisher?.publisher);
   
  }, [ publisher?.publisher, updateUserInterest, userEmail]);


  if (isLoading) {
    return <div className='bg-50-50'><PageLoading /></div>;
  }


  return (
    <div className="min-h-screen container mx-auto px-3">
      <div className="flex items-start gap-3 my-10">
        {/* publisher profile start */}
        <div className="w-1/3 h-full bg-50-50 p-5 border border-[#016961] rounded-lg">
          <div className="flex justify-center">
            <Image 
              src={publisher?.logo}
              width={200}
              height={200}
              alt="Writer"
              style={{
                width: "200px",
                height: "200px",
              }}
              className="rounded-full object-cover"
            />
          </div>
          <div className="text-center text-teal-800 space-y-1 mt-3 mb-2">
            <h2 className="text-4xl font-bold">{publisher?.publisher}</h2>
          </div>
          <div>
            <p className="text-teal-800 indent-8 text-justify">
              {publisher?.description}
            </p>
          </div>
        </div>
        {/* publisher profile end */}

        {/* Books start */}
        <div className="w-full">
          <h1 className="text-3xl text-teal-800 font-semibold">
            All books from this publisher..
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {books?.map((book) => (
              <BookCard key={book?._id} item={book}></BookCard>
            ))}
          </div>
        </div>
        {/* books end */}
      </div>
    </div>
  );
};

export default PublisherDetails;
