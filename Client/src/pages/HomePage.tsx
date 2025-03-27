import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col container">
      <div className="mx-auto h-auto">
        <main className="flex items-center flex-col">
          <br />
          <section className="shadow-xl p-5 my-5 border border-1 lg:w-2/4 w-full">
            Welcome to "Food for thoughts", your ultimate recipe companion! 🍽️
            Whether you're a seasoned chef or just starting out, we have
            delicious recipes for every craving. Explore step-by-step guides,
            discover new flavors, and save your favorites—all in one place.
            Cooking has never been easier or more fun! Get inspired, experiment
            with ingredients, and create amazing meals. Ready to join the
            family?
            <div className="mt-4 space-x-2">
              <button
                className="btn btn-green"
                title="Naviagte to list of recipes"
              >
                <Link to="/register">Let’s get started! 👨‍🍳🔥</Link>
              </button>

              <button
                className="btn btn-blue"
                title="Naviagte to list of recipes"
              >
                <Link to="/recipes">Recipes</Link>
              </button>

              <button
                className="rounded btn bg-purple-700"
                title="Naviagte to list of recipes"
              >
                <Link to="/authors">Chefs</Link>
              </button>
            </div>
          </section>

          <section className="shadow-xl p-5 mb-5 border border-1 lg:w-2/4 w-full">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
            repellat doloribus, sint, nesciunt distinctio incidunt quis
            voluptate quae odio at beatae nihil libero ea voluptatibus
            accusantium molestias quasi saepe inventore. Delectus unde
            praesentium distinctio sapiente officiis, aut voluptatem quos
            voluptas numquam. Unde itaque, saepe velit quam ut porro harum quis
            ipsam rem, aliquid illum fuga optio voluptatem, veniam voluptatum
            laboriosam! Neque in labore mollitia, laborum explicabo iste!
            Deserunt consequatur, amet veritatis nulla quod illum sunt accusamus
            voluptatibus harum voluptatem fugit dolorum aliquid perferendis
            corporis expedita modi, alias vel! Aliquam, ipsam? Numquam suscipit
            odit obcaecati eos fugit necessitatibus ipsam nam quidem atque
            consequuntur! Vitae delectus voluptate neque, quod libero tempora?
            Facilis necessitatibus suscipit earum repellat aut ipsum, nobis
            molestiae tempora asperiores? Distinctio, eveniet laudantium ipsa
            aliquid ullam consequuntur similique voluptatibus? Minima, ad culpa
            blanditiis consequatur nostrum, inventore molestias modi consectetur
            suscipit odit esse laudantium veritatis consequuntur temporibus
            vero, assumenda quaerat dicta. Quaerat aliquam dicta, sapiente ullam
            minima accusamus. Natus officiis reiciendis ipsa, consequatur
            distinctio accusamus, dolorem vitae dolor, error assumenda enim
            harum itaque. Dolore libero obcaecati neque tenetur accusamus quis
            veritatis. Rem fugit pariatur asperiores! Nihil reprehenderit quas
            voluptates, atque facilis, quod dolorem perspiciatis doloremque qui,
            facere voluptatem asperiores dolor cupiditate iste debitis! Numquam
            ex totam molestiae dolorum, illum pariatur eum. Voluptates,
            laudantium similique quo mollitia quia adipisci maxime dignissimos
            magni sed? Quam vitae explicabo error in perspiciatis provident,
            quibusdam excepturi et sint velit pariatur adipisci saepe eveniet
            architecto tempore! Perferendis? Accusantium iure nemo doloribus
            laboriosam, ex ducimus, adipisci expedita autem quos, laborum et
            veritatis! Dolores natus deserunt veniam id eius rem mollitia illo,
            facilis inventore dolorum quo illum, at labore? Voluptatibus quae
            illo qui tenetur commodi ullam harum a, minus odio nam quibusdam?
            Obcaecati veniam aspernatur, ea voluptas ut tempora molestiae! Ipsam
            omnis error quod velit esse dolorem deserunt veritatis.
          </section>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
