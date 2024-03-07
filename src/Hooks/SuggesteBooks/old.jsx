
import { useCallback, useContext, useEffect, useState } from 'react';
import useOneUser from '../Users/useOneUser';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from '../Axios/useAxiosPublic';
import { AuthContext } from '@/providers/AuthProvider';

const useBookSuggestion = (CurrentlyViewing) => {
    const { isLoggedIn } = useContext(AuthContext);
    const { interest } = useOneUser();
    const axiosPublic = useAxiosPublic();
    const email = localStorage.getItem("email")
    const [booksFromCategory, setBooksFromCategory] = useState([]);
    const [booksFromWriters, setBooksFromWriters] = useState([]);
    const [booksFromPublishers, setBooksFromPublishers] = useState([]);
    const [interestedBooks, setInterestedBooks] = useState([]);
    const [relatedBooksLoading, setRelatedBooksLoading] = useState(false);
    const [interestedBooksRelatedBooks, setInterestedBooksRelatedBooks] = useState([]);
    const [interestedBooksRelatedBooksLoading, setInterestedBooksRelatedBooksLoading] = useState(true);
    const [currentlyViewingRelatedBooks, setCurrentlyViewingRelatedBooks] = useState([]);
    const [currentlyViewingRelatedLoading, setCurrentlyViewingRelatedLoading] = useState(true);
    const [topTearSuggestions, setTopTearSuggestions] = useState([]);
    const [topTearSuggestionsLoading, setTopTearSuggestionsLoading] = useState(true);
    const [suggetionsLoading, setSuggetionsLoading] = useState(true);
    const [relatedLoading, setRelatedLoading] = useState(true);



    console.log(email);



    // ---------Category Books----------

    const { data: categoryDetails = [], isLoading: categoryDetailsLoading } = useQuery({
        queryKey: ['categoryDetails', interest?.category],
        queryFn: async () => {
            // Check if currentUser and interest exist
            const categoryDetailsPromises = interest?.category?.map(async (categoryName) => {
                console.log("category");
                try {
                    const response = await axiosPublic.get(`/api/v1/category/${categoryName}`);
                    if (response.status !== 200) {
                        throw new Error('Failed to fetch category details');
                    }
                    return response.data;
                } catch (error) {
                    console.error(error);
                    return null;
                }
            });
            const categories = await Promise.all(categoryDetailsPromises);
            return categories.filter(category => category !== null).flatMap(category => category);

        },
    });


    useEffect(() => {
        if (!categoryDetailsLoading && interest) {
            setBooksFromCategory(categoryDetails);
        }
    }, [categoryDetails, categoryDetailsLoading, interest]);

    console.log("Books From Category", booksFromCategory);



    // ---------Writers Books----------



    const { data: writersBooks = [], isLoading: writersBooksLoading } = useQuery({
        queryKey: ['writersBooks', interest?.writer],
        queryFn: async () => {
            const writersBooksPromises = interest?.writer?.map(async (writerName) => {
                try {
                    const response = await axiosPublic.get(`/api/v1/writer/${writerName}`);
                    if (response.status !== 200) {
                        throw new Error('Failed to fetch writer details');
                    }
                    return response.data;
                } catch (error) {
                    console.error(error);
                    return null;
                }
            });
            const writers = await Promise.all(writersBooksPromises);
            return writers?.filter(writer => writer !== null).flatMap(writer => writer);
        },
    });

    useEffect(() => {
        if (!writersBooksLoading && interest) {
            setBooksFromWriters(writersBooks);
        }
    }, [writersBooks, writersBooksLoading, interest]);

    console.log("Books From Writers", booksFromWriters);



    // ---------Publishers Books----------



    const { data: publisherBooks = [], isLoading: publisherBooksLoading } = useQuery({
        queryKey: ['publisherBooks', interest?.publisher],
        queryFn: async () => {
            const publisherBooksPromises = interest?.publisher?.map(async (publisherName) => {
                try {
                    const response = await axiosPublic.get(`/api/v1/publisher/${publisherName}`);
                    if (response.status !== 200) {
                        throw new Error('Failed to fetch publisher details');
                    }
                    return response.data;
                } catch (error) {
                    console.error(error);
                    return null;
                }
            });
            const publishers = await Promise.all(publisherBooksPromises);
            return publishers?.filter(publisher => publisher !== null).flatMap(publisher => publisher);
        },
    });

    useEffect(() => {
        if (!publisherBooksLoading && interest) {
            setBooksFromPublishers(publisherBooks);
        }
    }, [publisherBooks, publisherBooksLoading, interest]);

    console.log("Books From Publishers", booksFromPublishers);



    // ---------Interested books------------


    const { data: bookDetails = [], isLoading: booksLaoding } = useQuery({
        queryKey: ["bookDetails", interest?.book],
        queryFn: async () => {
            const bookDetailsPromises = interest?.book?.map(async (_id) => {
                try {
                    const response = await axiosPublic.get(`/api/v1/buy-books/${_id}`);
                    if (response.status !== 200) {
                        throw new Error('Failed to fetch book details');
                    }
                    return response.data;
                } catch (error) {
                    console.error(error);
                    return null;
                }
            });
            const books = await Promise.all(bookDetailsPromises);
            return books?.filter(book => book !== null);
        },
    });

    useEffect(() => {
        if (!booksLaoding) {
            const filteredBooks = bookDetails.filter(book => book._id !== CurrentlyViewing);
            setInterestedBooks(filteredBooks);
        }
    }, [bookDetails, CurrentlyViewing, booksLaoding]);

    console.log("Interested Books", bookDetails);



    // ----------------Related books-----------------

    // ---------Fetch related books function-------




    const fetchRelatedBooks = useCallback(async (writer, publisher, category) => {
        try {
            setRelatedBooksLoading(true); // Set loading state to true
            const writerResponse = await axiosPublic.get(`/api/v1/writer/${writer}`);
            const publisherResponse = await axiosPublic.get(`/api/v1/publisher/${publisher}`);
            const categoryResponse = await axiosPublic.get(`/api/v1/category/${category}`);

            const writerBooks = writerResponse?.data || [];
            const publisherBooks = publisherResponse?.data || [];
            const categoryBooks = categoryResponse?.data || [];

            const relatedBooksData = [...writerBooks, ...publisherBooks, ...categoryBooks];

            // Remove duplicates
            const uniqueRelatedBooks = Array?.from(new Set(relatedBooksData?.map(book => book?._id))).map(_id => {
                return relatedBooksData?.find(book => book?._id === _id);
            });

            setRelatedBooksLoading(false); // Set loading state to false after data fetching
            return uniqueRelatedBooks;
        } catch (error) {
            console.error("Error fetching related books:", error);
            setRelatedBooksLoading(false); // Set loading state to false in case of error
            return [];
        }
    }, [axiosPublic]);



    // ---------- Related books of Interested books -----------


    // Effect to fetch related books for each interested book
    useEffect(() => {
        const fetchRelatedBooksForAllBooks = async () => {
            try {
                setInterestedBooksRelatedBooksLoading(true);
                const relatedBooksForAll = [];
                for (const book of interestedBooks) {
                    const { writer, publisher, category } = book;
                    const relatedBooksForBook = await fetchRelatedBooks(writer, publisher, category);
                    relatedBooksForAll.push(...relatedBooksForBook);
                }
                setInterestedBooksRelatedBooks(relatedBooksForAll);
            } catch (error) {
                console.error("Error fetching related books:", error);
            } finally {
                setInterestedBooksRelatedBooksLoading(false);
            }
        };

        fetchRelatedBooksForAllBooks();
    }, [interestedBooks, fetchRelatedBooks]);

    if (interestedBooksRelatedBooksLoading === false && interest) {
        console.log("Related Books", interestedBooksRelatedBooks);
    }

    console.log("Related Books Loading", interestedBooksRelatedBooksLoading);



    // --------- Related Books of Currently Viewing -----------



    const { data: currentlyViewingBookDetails = [], isLoading: currentlyViewingBookLoading } = useQuery({
        queryKey: ["currentlyViewingBookDetails"],
        queryFn: async () => {
            try {
                const response = await axiosPublic.get(`/api/v1/buy-books/${CurrentlyViewing}`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch book details');
                }
                return response?.data;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
    });

    useEffect(() => {
        if (currentlyViewingBookLoading) {
            setCurrentlyViewingRelatedLoading(true)
            return;
        }

        if (currentlyViewingBookDetails) {
            setCurrentlyViewingRelatedLoading(true)
            const { writer, publisher, category } = currentlyViewingBookDetails;
            const fetchRelatedBooksForCurrentlyViewing = async () => {
                try {
                    const relatedBooksForCurrentlyViewing = await fetchRelatedBooks(writer, publisher, category);
                    setCurrentlyViewingRelatedBooks(relatedBooksForCurrentlyViewing);
                } catch (error) {
                    console.error("Error fetching related books for currently viewing book:", error);
                    setCurrentlyViewingRelatedBooks([]);
                } finally {
                    // Set topTearSuggestionsLoading to false after fetching data
                    setCurrentlyViewingRelatedLoading(false);
                }
            };

            fetchRelatedBooksForCurrentlyViewing();
        }
    }, [currentlyViewingBookDetails, currentlyViewingBookLoading, fetchRelatedBooks])


    console.log("Currently Viewing Book Id", CurrentlyViewing);
    console.log("Currently Viewing Book Details", currentlyViewingBookDetails);
    console.log("Currently Viewing Related Books", currentlyViewingRelatedBooks);



    // ---------Top Tear Suggestions------------


    useEffect(() => {
        if (isLoggedIn === true && interest) {
            // Filter books based on user interests
            const filteredBooks = [];

            booksFromCategory?.forEach(book => {
                if (
                    interest?.writer?.includes(book?.writer) ||
                    interest?.publisher?.includes(book?.publisher) ||
                    interest?.book?.includes(book?._id)
                ) {
                    filteredBooks.push(book);
                }
            });

            booksFromWriters?.forEach(book => {
                if (
                    interest?.publisher?.includes(book?.publisher) ||
                    interest?.category?.includes(book?.category) ||
                    interest?.book?.includes(book?._id)
                ) {
                    filteredBooks.push(book);
                }
            });

            booksFromPublishers?.forEach(book => {
                if (
                    interest?.writer?.includes(book?.writer) ||
                    interest?.category?.includes(book?.category) ||
                    interest?.book?.includes(book?._id)
                ) {
                    filteredBooks.push(book);
                }
            });

            interestedBooks?.forEach(book => {
                if (
                    interest?.writer?.includes(book?.writer) ||
                    interest?.publisher?.includes(book?.publisher) ||
                    interest?.category?.includes(book?.category)
                ) {
                    filteredBooks.push(book);
                }
            });



            // Remove duplicate books
            const uniqueBooks = Array.from(new Set(filteredBooks?.map(book => book?._id))).map(_id => {
                return filteredBooks?.find(book => book?._id === _id);
            });

            // Shuffle the array using Fisher-Yates shuffle algorithm
            const shuffledBooks = uniqueBooks.slice();
            for (let i = shuffledBooks.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledBooks[i], shuffledBooks[j]] = [shuffledBooks[j], shuffledBooks[i]];
            }

            setTopTearSuggestionsLoading(false); // Moved outside the loop
            setTopTearSuggestions(shuffledBooks);

        }
    }, [isLoggedIn, booksFromCategory, booksFromWriters, booksFromPublishers, interestedBooks, interest]);


    console.log("Top Tier Suggestions", topTearSuggestions);



    // ---------If Top Tear Suggestions has no data------------
    useEffect(() => {
        if (
            booksLaoding === false &&
            categoryDetailsLoading === false &&
            writersBooksLoading === false &&
            publisherBooksLoading === false &&
            relatedBooksLoading === false &&
            currentlyViewingBookLoading === false &&
            isLoggedIn === true &&
            interest 
        ) {
            if (topTearSuggestions.length === 0 && topTearSuggestionsLoading === false) {
                // Set topTearSuggestionsLoading to true when fetching data
                setTopTearSuggestionsLoading(true);
                // Fetch books from the `buy-books` endpoint
                const fetchBuyBooks = async () => {
                    try {
                        const response = await axiosPublic.get(`/api/v1/buy-books`);
                        if (response?.status !== 200) {
                            throw new Error('Failed to fetch buy books');
                        }
                        let buyBooksData = response?.data?.buyBooks || [];

                        // Fisher-Yates shuffle algorithm
                        for (let i = buyBooksData?.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [buyBooksData[i], buyBooksData[j]] = [buyBooksData[j], buyBooksData[i]];
                        }

                        // Update state with shuffled buy books data
                        console.log("buyBook", buyBooksData);
                        setTopTearSuggestions(buyBooksData);
                    } catch (error) {
                        console.error("Error fetching buy books:", error);
                    } finally {
                        // Set topTearSuggestionsLoading to false after fetching data
                        setTopTearSuggestionsLoading(false);
                    }
                };
                fetchBuyBooks();
            }
        }
    }, [isLoggedIn,
        interest,
        booksLaoding,
        categoryDetailsLoading,
        writersBooksLoading,
        publisherBooksLoading,
        relatedBooksLoading,
        currentlyViewingBookLoading,
        axiosPublic,
        topTearSuggestionsLoading,
        topTearSuggestions.length]);

    // ---------If Top Tear Suggestions has no data------------
    useEffect(() => {
        if (isLoggedIn === false) {
            console.log("no user")
            // Set topTearSuggestionsLoading to true when fetching data
            setTopTearSuggestionsLoading(true);
            // Fetch books from the `buy-books` endpoint
            const fetchBuyBooks = async () => {
                try {
                    const response = await axiosPublic.get(`/api/v1/buy-books`);
                    if (response?.status !== 200) {
                        throw new Error('Failed to fetch buy books');
                    }
                    let buyBooksData = response?.data?.buyBooks || [];

                    // Fisher-Yates shuffle algorithm
                    for (let i = buyBooksData?.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [buyBooksData[i], buyBooksData[j]] = [buyBooksData[j], buyBooksData[i]];
                    }

                    // Update state with shuffled buy books data
                    console.log("buyBook", buyBooksData);
                    setTopTearSuggestions(buyBooksData);
                } catch (error) {
                    console.error("Error fetching buy books:", error);
                } finally {
                    // Set topTearSuggestionsLoading to false after fetching data
                    setTopTearSuggestionsLoading(false);
                }
            };
            fetchBuyBooks();

        }
    }, [isLoggedIn, axiosPublic]);





    // ----------Suggetions Loading------------


    useEffect(() => {
        if (
            booksLaoding === false &&
            categoryDetailsLoading === false &&
            writersBooksLoading === false &&
            publisherBooksLoading === false &&
            relatedBooksLoading === false &&
            topTearSuggestionsLoading === false &&
            currentlyViewingRelatedLoading === false &&
            currentlyViewingBookLoading === false) {

            setSuggetionsLoading(false);
        }
    }, [bookDetails,
        booksLaoding,
        categoryDetailsLoading,
        writersBooksLoading,
        publisherBooksLoading,
        topTearSuggestionsLoading,
        relatedBooksLoading,
        currentlyViewingRelatedLoading,
        currentlyViewingBookLoading]);

    // ----------Related Loading------------

    useEffect(() => {
        if (
            relatedBooksLoading === false &&
            currentlyViewingRelatedLoading === false &&
            currentlyViewingBookLoading === false) {

            setRelatedLoading(false);
        }
    }, [relatedBooksLoading,
        currentlyViewingRelatedLoading,
        currentlyViewingBookLoading]);



    return { topTearSuggestions, currentlyViewingRelatedBooks, interestedBooks, booksFromCategory, booksFromWriters, booksFromPublishers, suggetionsLoading, relatedLoading };
};

export default useBookSuggestion;


