import { useForm } from 'react-hook-form';
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

function TaskFormPage() {
    const { register, handleSubmit, setValue } = useForm();
    const { tasks, createTask, getTask, updateTask } = useTasks();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit((data) => {
        const { title, description, date } = data;
        if (params.id) {
            updateTask(params.id, {
                title,
                description,
                date: dayjs.utc().format(), // Actualiza también la fecha a la actual
            });
        } else {
            createTask({
                ...data,
                date: dayjs.utc(data.date).format(),
            });
        }
        navigate('/tasks');
    });

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const task = await getTask(params.id);
                console.log(task);
                setValue('title', task.title);
                setValue('description', task.description);
                setValue(
                    "date",
                    task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
                );
            }
        }
        loadTask();
    }, [params.id, getTask, setValue]);

    return (
        <div className="flex justify-center items-center h-screen bg-zinc-700">
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md shadow-lg'>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <input 
                            type="text" 
                            placeholder="Title"
                            {...register('title')}
                            autoFocus
                            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md'
                        />
                    </div>
                    <div className="mb-4">
                        <textarea 
                            rows="3"  
                            placeholder="Description"
                            {...register('description')}
                            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md'
                        />
                    </div>
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Guardar
                        </button>
                        <button type="button" onClick={() => navigate('/tasks')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Volver
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskFormPage;
