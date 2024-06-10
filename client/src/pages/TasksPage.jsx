import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/TaskCard"; 

function TaskPage() {
  const {isAuthenticated } = useAuth();
  const { getTasks, tasks } = useTasks();
  useEffect(() => {
    getTasks();
  }, [])
    return (
      
      <div className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {tasks.map((task) => (
                    <TaskCard task={task} key={task._id} />
                  ))}
          </div>
      </div>
    );
  }
  
  export default TaskPage;