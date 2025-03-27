import { useEffect, useState } from "react";
import { getAllAuthorsWithLimitedInfo } from "../../services/AuthorService";
import AuthorCardComponent from "./card/AuthorCardComponent";
import LoadingComponent from "../common/Loading/LoadingComponent";

export interface AuthorLimitedInfo {
  id: string;
  firstName: string;
  lastName: string;
  isFavorited: boolean;
}

const AuthorList = () => {
  const [authors, setAuthors] = useState<AuthorLimitedInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAuthorsToList = async () => {
    setIsLoading(true);

    const data: AuthorLimitedInfo[] = await getAllAuthorsWithLimitedInfo();

    setIsLoading(false);
    setAuthors(data);
  };

  useEffect(() => {
    getAuthorsToList();
  }, []);

  const updateFavoriteAuthorList = () => {
    getAuthorsToList();
  };

  return (
    <div className="container flex justify-center">
      {!isLoading ? (
        <div className="flex flex-wrap justify-center items-start sm:justify-center">
          {authors?.map((author) => (
            <AuthorCardComponent
              author={author}
              key={author.id}
              updateList={updateFavoriteAuthorList}
            />
          ))}
        </div>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};

export default AuthorList;
