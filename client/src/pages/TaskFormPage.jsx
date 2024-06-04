import { useForm } from 'react-hook-form'
import { useTasks } from "../context/TasksContext";

function TaskFormPage() {
 const {register, handleSubmit} = useForm();
 const { tasks, createTask } = useTasks();

 console.log(createTask());

  const onSubmit = handleSubmit((data)=>{
   createTask(data);
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        {/* Contenido de la página de inicio de sesión */}
        <form onSubmit={onSubmit}>
          <input 
            type="text" 
            placeholder="Title"
            {...register('title')}
            autoFocus
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />
          <textarea 
            rows="3"  
            placeholder="Description"
            {...register('description')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Guardar</button>
        </form>
      </div>
    </div>
  );
  
}

export default TaskFormPage;