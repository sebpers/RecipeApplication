import CardLinkWrapperComponent from "../../common/card/CardLinkWrapperComponent";
import CardTitleComponent from "../../common/card/CardTitleComponent";
import { AuthorLimitedInfo } from "../AuthorList";
import AuthorCardImageComponent from "./AuthorCardImageComponent";

const AuthorCardComponent = ({ author }: { author: AuthorLimitedInfo }) => {
  return (
    <div className="border border-2 shadow-lg m-5 p-3" key={author?.id}>
      <CardLinkWrapperComponent path={`/author/${author.id}`}>
        <AuthorCardImageComponent authorId={author.id} />
        <CardTitleComponent title={`${author.firstName} ${author.lastName}`} />
      </CardLinkWrapperComponent>
    </div>
  );
};

export default AuthorCardComponent;
