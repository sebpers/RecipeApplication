import { useEffect, useState } from "react";
import { getAllFavoriteAuthorsToFavorites } from "../services/favoriteAuthorService";
import AuthorCardComponent from "../components/authors/card/AuthorCardComponent";
import AuthorLimitedInfo from "../types/authorLimitedInfo";
import LoadingComponent from "../components/common/Loading/LoadingComponent";

const FavoriteAuthorsPage = () => {
  const [favoriteAuthors, setFavoriteAuthors] = useState<AuthorLimitedInfo[]>(
    []
  );

  const [isLoading, setLoading] = useState<boolean>(true);

  const fetchFavoriteAuthors = async (): Promise<void> => {
    try {
      setLoading(true);
      const res: AuthorLimitedInfo[] = await getAllFavoriteAuthorsToFavorites();
      setFavoriteAuthors(res);
      setLoading(false);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  useEffect(() => {
    fetchFavoriteAuthors();
  }, []);

  return (
    <div className="container">
      <div className="flex flex-wrap justify-center items-start md:space-x-10 min-w-full max-w-screen-md min-w-80">
        {isLoading && <LoadingComponent />}

        {favoriteAuthors?.length ? (
          favoriteAuthors.map((author) => (
            <AuthorCardComponent author={author} key={author.id} />
          ))
        ) : (
          <p className="mt-5 italic">No authors favored yet...</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteAuthorsPage;
