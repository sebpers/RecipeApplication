import profile1 from "../assets/profile1.png";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVisitedAuthorById } from "../services/UserService";
import Recipe from "../components/recipes/Recipe";

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
  const [activeTab, setActiveTab] = useState("description");

  const classes = {
    button: "focus:outline-none",
    active: "text-purple-600",
    inactive: "hover:text-gray-600",
    h1: "text-4xl text-gray-900 dark:text-white tracking-widest text-center uppercase",
  };

  useEffect(() => {
    const fetchUser = async (id) => {
      if (id) {
        try {
          const response = await getVisitedAuthorById(id);

          setUser(response.user);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser(id);
  }, [id]);

  return (
    <div className="container h-full shadow pt-10 p-5 flex flex-col bg-orange-200">
      <div className="flex justify-center">
        <img
          className="border border-3 shadow-lg object-contain h-48 w-48 rounded-full"
          src={profile1}
          alt="Profile picture"
        />
      </div>

      <div className="mx-auto mt-5 pb-2 border-b-4 w-80 border-indigo-500">
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setActiveTab("description")}
            className={`${classes.button} ${
              activeTab === "description" ? classes.active : classes.inactive
            }`}
          >
            About
          </button>

          <button
            onClick={() => setActiveTab("recipes")}
            className={`${classes.button} ${
              activeTab === "recipes" ? classes.active : classes.inactive
            }`}
          >
            Recipes
          </button>
          <button
            onClick={() => setActiveTab("message")}
            className={`${classes.button} ${
              activeTab === "message" ? classes.active : classes.inactive
            }`}
          >
            Contact
          </button>
          <button
            onClick={() => setActiveTab("follow")}
            className={`${classes.button} ${
              activeTab === "follow" ? classes.active : classes.inactive
            }`}
          >
            <FaHeart size="20" title="Follow" />
          </button>
        </div>
      </div>

      <main className="mt-5">
        <section className="w-auto justify-items-center">
          <article className="max-w-screen-md flex flex-col">
            {activeTab === "description" && (
              <>
                <h1 className={classes.h1}>
                  About {user?.firstName} {user?.lastName}
                </h1>
                <p className="mt-4 italic">{user?.description}</p>
              </>
            )}

            {activeTab === "recipes" && (
              <>
                <h1 className={classes.h1}>Recipes</h1>
                {
                  <div className="flex flex-wrap justify-center items-start space-x-10">
                    {user?.recipes.length ? (
                      user?.recipes.map((r) => <Recipe recipe={r} key={r.id} />)
                    ) : (
                      <i className="mt-5">No recipes created yet...</i>
                    )}
                  </div>
                }
              </>
            )}

            {activeTab === "message" && (
              <>
                <h1 className={classes.h1}>
                  Send message to {user?.firstName} {user?.lastName}
                </h1>
                <p className="mt-4">Mina recept..</p>
              </>
            )}
          </article>
        </section>
      </main>
    </div>
  );
};

export default AccountPage;
