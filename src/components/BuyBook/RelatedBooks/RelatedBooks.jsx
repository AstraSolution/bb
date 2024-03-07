import ComponentLoading from "@/components/Shared/loadingPageBook/ComponentLoading";
import BookCard from "../../Shared/BookCard";
import useBookSuggestion from "@/Hooks/SuggesteBooks/useBookSuggestion";

const RelatedBooks = ({ CurrentlyViewing }) => {
  const { currentlyViewingRelatedBooks, currentlyViewingRelatedLoading } =useBookSuggestion(CurrentlyViewing);

  if (currentlyViewingRelatedLoading === true) {
    return <ComponentLoading />;
  }

  return (
    <div className="max-w-[200px] mx-auto">
      {
        currentlyViewingRelatedBooks?.map((item) => (
          <div key={item?._id}>
            <BookCard item={item} />
          </div>
        ))
      }
    </div>
  );
};

export default RelatedBooks;
