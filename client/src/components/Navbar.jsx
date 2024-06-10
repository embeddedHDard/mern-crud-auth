import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();
    
    return (
        <nav className="bg-zinc-700 my-4 flex justify-between items-center py-4 px-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-white">Tareas del Usuario</h1>
            <ul className="flex gap-x-4 items-center">
                {isAuthenticated ? (
                    <>
                        <li className="text-white">
                            Bienvenido, <span className="font-semibold">{user.username}</span>
                        </li>
                        <li>
                            <Link to="/add-task" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
                                Añadir
                            </Link>
                        </li>
                        <li>
                            <Link to="/" onClick={() => logout()} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
                                Salir
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
                                Registro
                            </Link>
                        </li>
                    </>
                )}
            </ul>  
        </nav>
    )
}

export default Navbar;
