import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TasksContext";


function TaskPage() {
  const {user} = useAuth();
  const { getTasks, tasks } = useTasks();
  useEffect(() => {
    getTasks();
  }, [])
    return (
      
      <div className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'>
        <div >
          {tasks.map((task) => (
              <div key={task._id} className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                <h1>{task.title}</h1>
                <p>{task.description}</p>
              </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default TaskPage;