"use client"

import { useParams } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import BookCard from "../../Shared/BookCard";
import { AuthContext } from "@/providers/AuthProvider";
import PageLoading from "@/components/Shared/loadingPageBook/PageLoading";
import useOneUser from "@/Hooks/Users/useOneUser";

const CategoryByName = () => {

    const { user } = useContext(AuthContext);
    const { interest } = useOneUser()
    const param = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://boi-binimoy-server-ashy.vercel.app/api/v1/category/${param?.categoryName}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setBooks(result);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [param?.categoryName]);


    const updateUserInterest = useCallback(async (email, category) => {
        try {
            // Check if the category already exists in user's interest
            if (!interest.category.includes(category)) {
                const updatedInterest = {
                    ...interest,
                    category: [...interest.category, category] // Merge the new category with existing categories
                };

                const response = await fetch(`https://boi-binimoy-server-ashy.vercel.app/api/v1/users-interest/${email}`, {
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
        if (user) {
            const formattedCategoryName = decodeURIComponent(param?.categoryName).replace("%20", " ");

            // Update user interest in the database
            updateUserInterest(user.email, formattedCategoryName);
        }
    }, [user, param?.categoryName, updateUserInterest]);

    if (loading) {
        return <div className='bg-50-50'><PageLoading /></div>;
    }


    return (
        <div className="min-h-screen container mx-auto px-3">
            <div className="py-12">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-5">
                    {books?.map((book) => (
                        <BookCard key={book?._id} item={book}></BookCard>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryByName;
