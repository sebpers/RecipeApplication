import CardLinkWrapperComponent from "../../common/card/CardLinkWrapperComponent";
import CardTitleComponent from "../../common/card/CardTitleComponent";
import { AuthorLimitedInfo } from "../AuthorList";
import AuthorCardImageComponent from "./AuthorCardImageComponent";

const AuthorCardComponent = ({
  author,
}: {
  author: AuthorLimitedInfo;
  updateList?: () => void;
}) => {
  return (
    <div
      className="border border-2 shadow-lg m-5 p-3 rounded-xl"
      key={author?.id}
    >
      <CardLinkWrapperComponent path={`/author/${author.id}`}>
        <AuthorCardImageComponent
          authorId={author.id}
          authorName={`${author.firstName} ${author.lastName}`}
        />
        <CardTitleComponent
          title={`${author.firstName} ${author.lastName}`}
          authorId={author.id}
          isFavorited={author.isFavorited}
        />{" "}
      </CardLinkWrapperComponent>
    </div>
  );
};

export default AuthorCardComponent;
