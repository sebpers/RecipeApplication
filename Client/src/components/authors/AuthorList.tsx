import { useEffect, useState } from "react";
import { getAllAuthorsWithLimitedInfo } from "../../services/AuthorService";
import AuthorCardComponent from "./card/AuthorCardComponent";

export interface AuthorLimitedInfo {
  id: string;
  firstName: string;
  lastName: string;
}

const AuthorList = () => {
  const [authors, setAuthors] = useState<AuthorLimitedInfo[]>([]);

  useEffect(() => {
    const getAuthorsToList = async () => {
      const data: AuthorLimitedInfo[] = await getAllAuthorsWithLimitedInfo();

      setAuthors(data);
    };

    getAuthorsToList();
  }, []);

  return (
    <div className="container flex justify-center">
      <div className="flex flex-wrap justify-center items-start space-x-10">
        {authors?.map((author) => (
          <AuthorCardComponent author={author} key={author.id} />
        ))}
      </div>
    </div>
  );
};

export default AuthorList;
