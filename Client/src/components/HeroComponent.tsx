const HeroComponent = () => {
  return (
    <div className="mx-auto flex flex-col shadow-xl border border-1 p-5 w-full">
      <main className="w-full">
        <section className="w-full">
          <h1 className="text-7xl">DUMMY DATA HERE</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
            reprehenderit ex dolores exercitationem rerum! Fugit ullam,
            repellendus vitae reprehenderit at doloribus quo praesentium.
            Similique explicabo dolorum provident fugiat aliquam laborum atque
            perferendis numquam, quibusdam pariatur expedita voluptas blanditiis
            qui molestias tenetur a, amet sunt excepturi. Praesentium harum,
            facilis alias id velit modi, voluptates nesciunt itaque commodi
            ullam quae et! Quod asperiores delectus quisquam, fuga a sapiente
            voluptates iure id eos pariatur quia commodi beatae ipsum atque in
            assumenda quos magnam officiis quaerat corrupti ducimus ea
            distinctio! Maiores nobis in, dolores cum eveniet at, fuga iusto,
            amet numquam laudantium consequatur fugit!
          </p>

          <p className="my-5">Start right here!</p>

          <div className="flex space-x-2">
            <button className="btn bg-red-300">Recipes</button>
            <button className="btn bg-blue-300">Login</button>
            <button className="btn bg-green-300">Create account</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HeroComponent;
