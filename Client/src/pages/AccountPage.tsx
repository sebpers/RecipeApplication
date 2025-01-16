import profile1 from "../assets/profile1.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVisitedAuthorById } from "../services/UserService";
import Recipe from "../components/recipes/Recipe";
import AuthorTabComponent from "../components/authors/page/AuthorTabComponent";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  description: string;
  recipes: [];
}

const AccountPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [activeTab, setActiveTab] = useState<string>("description");

  const classes = {
    h1: "md:text-xl text-gray-900 dark:text-white tracking-widest text-center uppercase",
  };

  useEffect(() => {
    const fetchUser = async (id: string) => {
      if (id) {
        try {
          const response = await getVisitedAuthorById(id);

          setUser(response.user);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    if (id) {
      fetchUser(id);
    } else {
      throw new Error("Error fetching user");
    }
  }, [id]);

  return (
    <div className="container h-full shadow-lg pt-10 p-5 flex flex-col">
      <div className="flex justify-center">
        <img
          className="border border-3 shadow-lg object-contain h-48 w-48 rounded-full"
          src={profile1}
          alt="Profile picture"
        />
      </div>

      <AuthorTabComponent setActiveTab={setActiveTab} activeTab={activeTab} />

      <main className="mt-5">
        <section className="w-auto justify-items-center">
          <article className="max-w-screen-md flex flex-col">
            {activeTab === "description" && (
              <>
                <h1 className={classes.h1}>
                  About{" "}
                  <span className="font-medium">
                    {user?.firstName} {user?.lastName}
                  </span>
                </h1>
                <p className="mt-4 italic mx-auto">{user?.description}</p>
              </>
            )}

            {activeTab === "recipes" && (
              <>
                <h1 className={classes.h1}>Recipes</h1>
                {
                  <div className="flex flex-wrap justify-center">
                    {user?.recipes.length ? (
                      user?.recipes.map((r) => (
                        <Recipe
                          recipe={r}
                          key={r.id}
                          classes={"!w-48 md:ml-5 md:mr-5"}
                        />
                      ))
                    ) : (
                      <i className="mt-5">No recipes created yet...</i>
                    )}
                  </div>
                }
              </>
            )}

            {activeTab === "messages" && (
              <>
                <h1 className={`md:text-lg text-sm	${classes.h1}`}>
                  Send message to{" "}
                  <span className="font-medium">
                    {user?.firstName} {user?.lastName}
                  </span>
                </h1>
              </>
            )}
          </article>
        </section>
      </main>
    </div>
  );
};

export default AccountPage;
