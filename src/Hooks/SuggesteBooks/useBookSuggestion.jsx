"use client"

import { useCallback, useContext, useEffect, useState } from 'react';
import useOneUser from '../Users/useOneUser';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from '../Axios/useAxiosPublic';
import { AuthContext } from '@/providers/AuthProvider';

const useBookSuggestion = (CurrentlyViewing) => {
    const CACHE_KEY_CATEGORY_DETAILS = 'categoryDetailsCache';
    const CACHE_KEY_WRITERS_BOOKS = 'writersBooksCache';
    const CACHE_KEY_PUBLISHER_BOOKS = 'publisherBooksCache';
    const CACHE_KEY_INTERESTED_BOOKS = 'interestedBooksCache';
    const CACHE_KEY_TOP_SELLING_BOOKS = 'topSellingBooksCache';
    const CACHE_EXPIRATION_TIME = 10 * 60 * 1000;

    const { isLoggedIn, loading: userLoading } = useContext(AuthContext);
    const { interest, isLoading: interestLoading } = useOneUser();
    const axiosPublic = useAxiosPublic();

 

    const [booksFromCategory, setBooksFromCategory] = useState([]);
    const [booksFromWriters, setBooksFromWriters] = useState([]);
    const [booksFromPublishers, setBooksFromPublishers] = useState([]);
    const [interestedBooks, setInterestedBooks] = useState([]);
    const [topSellingBooks, setTopSellingBooks] = useState([]);
    const [relatedBooksLoading, setRelatedBooksLoading] = useState(false);
    const [interestedBooksRelatedBooks, setInterestedBooksRelatedBooks] = useState([]);
    const [interestedBooksRelatedBooksLoading, setInterestedBooksRelatedBooksLoading] = useState(true);
    const [currentlyViewingRelatedBooks, setCurrentlyViewingRelatedBooks] = useState([]);
    const [currentlyViewingRelatedLoading, setCurrentlyViewingRelatedLoading] = useState(true);
    const [topTearSuggestions, setTopTearSuggestions] = useState([]);
    const [topTearSuggestionsLoading, setTopTearSuggestionsLoading] = useState(true);
    const [suggestionsLoading, setSuggestionsLoading] = useState(true);
    const [relatedLoading, setRelatedLoading] = useState(true);


    // ----------------Category Books----------------


    // Function to retrieve cached data from localStorage
    const getCachedData = (CACHE_KEY) => {
        if (typeof window !== 'undefined') {
            const cachedData = localStorage.getItem(CACHE_KEY);
            if (cachedData) {
                const { data, timestamp } = JSON.parse(cachedData);
                if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
                    return data;
                } else {
                    localStorage.removeItem(CACHE_KEY); // Remove expired cache
                }
            }
        }
        return null;
    };

    // Function to save data to localStorage
    const cacheData = (CACHE_KEY, data) => {
        if (typeof window !== 'undefined') {
            const cacheObject = {
                data: data,
                timestamp: Date.now()
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObject));
        }
    };

    const { data: categoryDetails = getCachedData(CACHE_KEY_CATEGORY_DETAILS), isLoading: categoryDetailsLoading } = useQuery({
        queryKey: ['categoryDetails', interest?.category],
        queryFn: async () => {
            if (isLoggedIn && interest?.category && interest?.category?.length > 0 && userLoading === false && interestLoading === false) {
                const cachedData = getCachedData(CACHE_KEY_CATEGORY_DETAILS); // Pass the CACHE_KEY
                if (cachedData) {
                    return cachedData;
                }

                const categoryDetailsPromises = interest.category.map(async (categoryName) => {
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
                const filteredCategories = categories.filter(category => category !== null).flatMap(category => category);
                cacheData(CACHE_KEY_CATEGORY_DETAILS, filteredCategories); // Cache the fetched data with CACHE_KEY
                return filteredCategories;
            } else {
                return [];
            }
        },
    })

    useEffect(() => {
        if (!categoryDetailsLoading && interest) {
            setBooksFromCategory(categoryDetails);
        }
    }, [categoryDetails, categoryDetailsLoading, interest]);


    // ----------------Writers Books----------------

    // Function to retrieve cached writer books data from localStorage
    const getCachedWritersBooks = () => {
        if (typeof window !== 'undefined') {
            const cachedData = localStorage.getItem(CACHE_KEY_WRITERS_BOOKS);
            if (cachedData) {
                const { data, timestamp } = JSON.parse(cachedData);
                if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
                    return data;
                } else {
                    localStorage.removeItem(CACHE_KEY_WRITERS_BOOKS); // Remove expired cache
                }
            }
        }
        return null;
    };

    // Function to save writer books data to localStorage
    const cacheWritersBooks = (data) => {
        if (typeof window !== 'undefined') {
            const cacheObject = {
                data: data,
                timestamp: Date.now()
            };
            localStorage.setItem(CACHE_KEY_WRITERS_BOOKS, JSON.stringify(cacheObject));
        }
    };

    const { data: writersBooks = getCachedWritersBooks(), isLoading: writersBooksLoading } = useQuery({
        queryKey: ['writersBooks', interest?.writer],
        queryFn: async () => {
            if (isLoggedIn && interest?.writer && interest?.writer?.length > 0 && userLoading === false && interestLoading === false) {
                const cachedData = getCachedWritersBooks();
                if (cachedData) {
                    return cachedData;
                }

                const writersBooksPromises = interest.writer.map(async (writerName) => {
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
                const filteredWriters = writers.filter(writer => writer !== null).flatMap(writer => writer);
                cacheWritersBooks(filteredWriters); // Cache the fetched data
                return filteredWriters;
            } else {
                return [];
            }
        },
    });


    useEffect(() => {
        if (!writersBooksLoading && interest) {
            setBooksFromWriters(writersBooks);
        }
    }, [writersBooks, writersBooksLoading, interest]);


    // ----------------Publishers Books----------------


    // Function to retrieve cached publisher books data from localStorage
    const getCachedPublisherBooks = () => {
        if (typeof window !== 'undefined') {
            const cachedData = localStorage.getItem(CACHE_KEY_PUBLISHER_BOOKS);
            if (cachedData) {
                const { data, timestamp } = JSON.parse(cachedData);
                if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
                    return data;
                } else {
                    localStorage.removeItem(CACHE_KEY_PUBLISHER_BOOKS); // Remove expired cache
                }
            }
        }
        return null;
    };

    // Function to save publisher books data to localStorage
    const cachePublisherBooks = (data) => {
        if (typeof window !== 'undefined') {
            const cacheObject = {
                data: data,
                timestamp: Date.now()
            };
            localStorage.setItem(CACHE_KEY_PUBLISHER_BOOKS, JSON.stringify(cacheObject));
        }
    };


    const { data: publisherBooks = getCachedPublisherBooks(), isLoading: publisherBooksLoading } = useQuery({
        queryKey: ['publisherBooks', interest?.publisher],
        queryFn: async () => {
            if (isLoggedIn && interest?.publisher && interest?.publisher?.length > 0 && userLoading === false && interestLoading === false) {
                const cachedData = getCachedPublisherBooks();
                if (cachedData) {
                    return cachedData;
                }

                const publisherBooksPromises = interest.publisher.map(async (publisherName) => {
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
                const filteredPublishers = publishers.filter(publisher => publisher !== null).flatMap(publisher => publisher);
                cachePublisherBooks(filteredPublishers); // Cache the fetched data
                return filteredPublishers;
            } else {
                return [];
            }
        },
    });


    useEffect(() => {
        if (!publisherBooksLoading && interest) {
            setBooksFromPublishers(publisherBooks);
        }
    }, [publisherBooks, publisherBooksLoading, interest]);


    // ----------------Interested books----------------

    // Function to retrieve cached interested books data from localStorage
    const getCachedInterestedBooks = () => {
        if (typeof window !== 'undefined') {
            const cachedData = localStorage.getItem(CACHE_KEY_INTERESTED_BOOKS);
            if (cachedData) {
                const { data, timestamp } = JSON.parse(cachedData);
                if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
                    return data;
                } else {
                    localStorage.removeItem(CACHE_KEY_INTERESTED_BOOKS); // Remove expired cache
                }
            }
        }
        return null;
    };

    // Function to save interested books data to localStorage
    const cacheInterestedBooks = (data) => {
        if (typeof window !== 'undefined') {
            const cacheObject = {
                data: data,
                timestamp: Date.now()
            };
            localStorage.setItem(CACHE_KEY_INTERESTED_BOOKS, JSON.stringify(cacheObject));
        }
    };


    const { data: bookDetails = getCachedInterestedBooks(), isLoading: booksLoading } = useQuery({
        queryKey: ["bookDetails", interest?.book],
        queryFn: async () => {
            if (isLoggedIn && interest?.book && interest?.book?.length > 0 && userLoading === false && interestLoading === false) {
                const cachedData = getCachedInterestedBooks();
                if (cachedData) {
                    return cachedData;
                }

                const bookDetailsPromises = interest.book.map(async (_id) => {
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
                const filteredBooks = books.filter(book => book !== null);
                cacheInterestedBooks(filteredBooks); // Cache the fetched data
                return filteredBooks;
            } else {
                return [];
            }
        },
    });

    useEffect(() => {
        if (!booksLoading) {
            const filteredBooks = bookDetails.filter(book => book._id !== CurrentlyViewing);
            setInterestedBooks(filteredBooks);
        }
    }, [bookDetails, CurrentlyViewing, booksLoading]);


    // ----------------Fetch related books function----------------

    const fetchRelatedBooks = useCallback(async (writer, publisher, category) => {
        try {
            setRelatedBooksLoading(true);
            const writerResponse = await axiosPublic.get(`/api/v1/writer/${writer}`);
            const publisherResponse = await axiosPublic.get(`/api/v1/publisher/${publisher}`);
            const categoryResponse = await axiosPublic.get(`/api/v1/category/${category}`);

            const writerBooks = writerResponse?.data || [];
            const publisherBooks = publisherResponse?.data || [];
            const categoryBooks = categoryResponse?.data || [];

            const relatedBooksData = [...writerBooks, ...publisherBooks, ...categoryBooks];

            // Remove duplicates
            const uniqueRelatedBooks = Array.from(new Set(relatedBooksData?.map(book => book?._id))).map(_id => {
                return relatedBooksData?.find(book => book?._id === _id);
            });

            setRelatedBooksLoading(false);
            return uniqueRelatedBooks;
        } catch (error) {
            console.error("Error fetching related books:", error);
            setRelatedBooksLoading(false);
            return [];
        }
    }, [axiosPublic]);


    // ----------------Related books of Interested books----------------

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
    }, [interestedBooks]);


    // ----------------Related Books of Currently Viewing Book----------------

    const { data: currentlyViewingBookDetails = [], isLoading: currentlyViewingBookLoading } = useQuery({
        queryKey: ["currentlyViewingBookDetails"],
        queryFn: async () => {
            if (CurrentlyViewing) {
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
                    setCurrentlyViewingRelatedLoading(false);
                }
            };

            fetchRelatedBooksForCurrentlyViewing();
        }
    }, [currentlyViewingBookDetails, currentlyViewingBookLoading, fetchRelatedBooks]);


    // ----------------top Selling Books----------------

    // Function to retrieve cached top selling books data from localStorage
    const getCachedTopSellingBooks = () => {
        if (typeof window !== 'undefined') {
            const cachedData = localStorage.getItem(CACHE_KEY_TOP_SELLING_BOOKS);
            if (cachedData) {
                const { data, timestamp } = JSON.parse(cachedData);
                if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
                    return data;
                } else {
                    localStorage.removeItem(CACHE_KEY_TOP_SELLING_BOOKS); // Remove expired cache
                }
            }
        }
        return null;
    };

    // Function to save top selling books data to localStorage
    const cacheTopSellingBooks = (data) => {
        if (typeof window !== 'undefined') {
            const cacheObject = {
                data: data,
                timestamp: Date.now()
            };
            localStorage.setItem(CACHE_KEY_TOP_SELLING_BOOKS, JSON.stringify(cacheObject));
        }
    };


    const { data: topSellingBooksData, isLoading: topSellingBooksLoading } = useQuery({
        queryKey: ["topSellingBooks"],
        queryFn: async () => {
            const cachedData = getCachedTopSellingBooks();
            if (cachedData) {
                return cachedData;
            }

            try {
                const response = await axiosPublic.get(`/api/v1/top-selling-books`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch top selling books');
                }
                const topSellingBooksData = response?.data?.topSellingBooks;
                cacheTopSellingBooks(topSellingBooksData); // Cache the fetched data
                return topSellingBooksData;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
    });
    useEffect(() => {
        if (!topSellingBooksLoading) {
            setTopSellingBooks(topSellingBooksData);
        }
    }, [topSellingBooksData, topSellingBooksLoading]);


    // ----------------Top tier books----------------

    useEffect(() => {
        if (isLoggedIn === true &&
            userLoading === false &&
            interestLoading === false &&
            categoryDetailsLoading === false &&
            writersBooksLoading === false &&
            publisherBooksLoading === false &&
            booksLoading === false &&
            topSellingBooksLoading === false) {

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


            const transformedTopSellingBooks = Array.isArray(topSellingBooks) ? topSellingBooks.map(item => {
                return {
                    bookId: item?.bookId,
                    totalQuantity: item?.totalQuantity,
                    bookDetails: {
                        tags: item?.bookDetails?.tags || [],
                        awards: item?.bookDetails?.awards || [],
                        recommended_for: item?.bookDetails?.recommended_for || [],
                        _id: item?.bookDetails?._id,
                        title: item?.bookDetails?.title,
                        description: item?.bookDetails?.description,
                        writer: item?.bookDetails?.writer,
                        category: item?.bookDetails?.category,
                        language: item?.bookDetails?.language,
                        pages: item?.bookDetails?.pages,
                        price: item?.bookDetails?.price,
                        published_year: item?.bookDetails?.published_year,
                        publisher: item?.bookDetails?.publisher,
                        edition: item?.bookDetails?.edition,
                        owner_email: item?.bookDetails?.owner_email,
                        stock_limit: item?.bookDetails?.stock_limit,
                        upload_time: item?.bookDetails?.upload_time,
                        avg_rating: item?.bookDetails?.avg_rating,
                        cover_image: item?.bookDetails?.cover_image
                    }
                };
            }) : [];


            if (booksFromCategory.length > 0 ||
                booksFromWriters.length > 0 ||
                booksFromPublishers.length > 0 ||
                interestedBooks.length > 0 ||
                transformedTopSellingBooks.length > 0) {
                transformedTopSellingBooks?.forEach(book => {
                    if (
                        interest?.writer?.includes(book?.bookDetails?.writer) ||
                        interest?.publisher?.includes(book?.bookDetails?.publisher) ||
                        interest?.category?.includes(book?.bookDetails?.category) ||
                        interest?.book?.includes(book?.bookDetails?._id)
                    ) {
                        filteredBooks.push(book);
                    }
                });

            }

            // Get unique book IDs from both filteredBooks and transformedTopSellingBooks
            const allBookIds = [
                ...filteredBooks.map(book => book._id),
                ...transformedTopSellingBooks.map(book => book.bookDetails._id)
            ];

            // Filter out duplicate book IDs
            const uniqueBookIds = Array.from(new Set(allBookIds));

            const uniqueBooks = uniqueBookIds.map(id => {
                const regularBook = filteredBooks.find(book => book._id === id);
                const topSellingBook = transformedTopSellingBooks.find(book => book.bookDetails._id === id);

                // Prioritize top-selling books over regular books
                if (topSellingBook) {
                    return topSellingBook;
                } else {
                    return regularBook;
                }
            });


            // Shuffle suggestions...
            const shuffledBooks = uniqueBooks.slice();

            for (let i = shuffledBooks.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledBooks[i], shuffledBooks[j]] = [shuffledBooks[j], shuffledBooks[i]];
            }

            setTopTearSuggestions(shuffledBooks);

            setTopTearSuggestionsLoading(false);

        } else {
            setTopTearSuggestionsLoading(false);
        }


    }, [isLoggedIn, userLoading, topSellingBooks, booksFromCategory, booksFromWriters, booksFromPublishers, interestedBooks, interest, interestLoading, categoryDetailsLoading, writersBooksLoading, publisherBooksLoading, booksLoading, topSellingBooksLoading]);


    // ------------------If top tear has no data------------------

    useEffect(() => {
        let timeoutId;
        if (
            booksLoading === false &&
            categoryDetailsLoading === false &&
            writersBooksLoading === false &&
            publisherBooksLoading === false &&
            topTearSuggestionsLoading === false &&
            userLoading === false &&
            interestLoading === false &&
            topSellingBooksLoading === false &&
            topTearSuggestions.length <= 0
        ) {
            setSuggestionsLoading(true);

            // Debounce the fetchBuyBooks function
            timeoutId = setTimeout(async () => {
                try {
                    const buyBooksResponse = await axiosPublic.get(`/api/v1/buy-books`);

                    if (buyBooksResponse?.status !== 200) {
                        throw new Error('Failed to fetch buy books');
                    }

                    let buyBooksData = buyBooksResponse?.data?.buyBooks || [];

                    // Remove books from buyBooksData that are present in topSellingBooks
                    buyBooksData = buyBooksData.filter(book => !topSellingBooks.some(topBook => topBook.bookId === book._id));

                    // Shuffle the buyBooksData array
                    for (let i = buyBooksData.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [buyBooksData[i], buyBooksData[j]] = [buyBooksData[j], buyBooksData[i]];
                    }

                    // Combine both arrays
                    const combinedBooksData = [...buyBooksData, ...topSellingBooks];

                    // Shuffle the combined array
                    for (let i = combinedBooksData.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [combinedBooksData[i], combinedBooksData[j]] = [combinedBooksData[j], combinedBooksData[i]];
                    }

                    setTopTearSuggestions(combinedBooksData);
                } catch (error) {
                    console.error("Error fetching buy books:", error);
                } finally {
                    setSuggestionsLoading(false);
                }
            }, 1000);
        }

        // Cleanup function to clear the timeout on component unmount or dependency change
        return () => {
            clearTimeout(timeoutId);
        };
    }, [axiosPublic, booksLoading, interestLoading, topSellingBooksLoading, categoryDetailsLoading, writersBooksLoading, publisherBooksLoading, topTearSuggestionsLoading, userLoading, topTearSuggestions, topSellingBooks]);



    // ----------------Suggestions Loading----------------

    useEffect(() => {
        if (
            booksLoading === false &&
            categoryDetailsLoading === false &&
            writersBooksLoading === false &&
            publisherBooksLoading === false &&
            relatedBooksLoading === false &&
            topTearSuggestionsLoading === false &&
            currentlyViewingRelatedLoading === false &&
            currentlyViewingBookLoading === false
        ) {
            setSuggestionsLoading(false);
        }
    }, [booksLoading, categoryDetailsLoading, writersBooksLoading, publisherBooksLoading, relatedBooksLoading, topTearSuggestionsLoading, currentlyViewingRelatedLoading, currentlyViewingBookLoading]);


    // ----------------Related Loading----------------

    useEffect(() => {
        if (
            currentlyViewingRelatedLoading === false &&
            currentlyViewingBookLoading === false
        ) {
            setRelatedLoading(false);
        }
    }, [ currentlyViewingRelatedLoading, currentlyViewingBookLoading]);

    return { topTearSuggestions, currentlyViewingRelatedBooks, currentlyViewingRelatedLoading, interestedBooks, booksFromCategory, booksFromWriters, booksFromPublishers, suggestionsLoading, interestedBooksRelatedBooks, interestedBooksRelatedBooksLoading, relatedLoading };
};

export default useBookSuggestion;
