import ComponentLoading from "@/components/Shared/loadingPageBook/ComponentLoading";
import BookCard from "../../Shared/BookCard";
import useBookSuggestion from "@/Hooks/SuggesteBooks/useBookSuggestion";

const RelatedBooks = ({ CurrentlyViewing }) => {
  const { currentlyViewingRelatedBooks, relatedLoading } =
    useBookSuggestion(CurrentlyViewing);



  // Slice the currentlyViewingRelatedBooks array to display only the first 6 items
  const slicedRelatedBooks = currentlyViewingRelatedBooks?.slice(0, 2);

  if (relatedLoading) {
    <ComponentLoading />
  }

  return (
    <div className="max-w-[200px] mx-auto">
      {
        slicedRelatedBooks?.map((item) => (
          <div key={item?._id}>
            <BookCard item={item} />
          </div>
        ))
      }
    </div>
  );
};

export default RelatedBooks;
