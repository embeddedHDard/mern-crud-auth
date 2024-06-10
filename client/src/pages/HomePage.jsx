import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="bg-zinc-700 flex justify-center items-center min-h-screen w-full p-10">
      <header className="bg-zinc-800 p-10 rounded-md shadow-lg max-w-screen-lg max-h-screen-lg w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-5xl py-2 font-bold text-white text-center">Seguimiento Pacientes</h1>
        <p className="text-md text-slate-400 text-center">
          Descripción Global
        </p>
        <Link
          className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-zinc-600 transition-colors duration-300"
          to="/login"
        >
          Inicio
        </Link>
      </header>
    </section>
  );
}

export default HomePage;
