function TaskCard({ task }) {
    return(        
        <div className='bg-zinc-800 max-w-md text-white p-10 rounded-md my-2'>
            <h1 className="text-2xl font-bold" >{task.title}</h1>
            <div>
                <button>Delete</button>
                <button>Edit</button>
            </div>
            <p className="text-slate-300">{task.description}</p>
            <p className="text-slate-300">{new Date(task.date).toLocaleDateString()}</p>
        </div>        
    );
}

export default TaskCard;