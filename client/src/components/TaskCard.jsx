import { useTasks } from "../context/TasksContext";
import { Link } from 'react-router-dom';

function TaskCard({ task }) {
    const { deleteTask } = useTasks();

    return (        
        <div className='bg-zinc-800 max-w-md text-white p-6 rounded-md my-4 shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold truncate">{task.title}</h1>
                <div className="flex gap-2">
                    <button 
                        onClick={() => deleteTask(task._id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition-colors duration-300"
                    >
                        Eliminar
                    </button>
                    <Link 
                        to={`/tasks/${task._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded transition-colors duration-300"
                    >
                        Editar
                    </Link>
                </div>
            </header>
            <p className="text-slate-300 mb-2">{task.description}</p>
            <p className="text-slate-400 text-sm">{new Date(task.date).toLocaleDateString()}</p>
        </div>        
    );
}

export default TaskCard;
