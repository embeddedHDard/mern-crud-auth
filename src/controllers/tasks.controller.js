import Task from '../models/task.model.js'

export const getTasks = async (req, res) => {
    const tasks = await Task.find({
        user:req.user.id
    }).populate('user');
    res.json(tasks);
}

export const createTask = async (req, res) => {
    const {title, description, date } = req.body

    try {    
        const newTask = new Task({
            title, 
            description, 
            date,
            user:req.user.id
    })

    const taskSaved = await newTask.save(); //creación de tarea    
  
    res.json({
         id: taskSaved._id,
         title: taskSaved.username,
         description: taskSaved.email,
         date: taskSaved.date,
         user: taskSaved.user
     })
     
    }catch(error){
       res.status(500).json({message: error.message});
    }
}

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        return res.json(task);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}

export const updateTask = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const taskUpdated = await Task.findOneAndUpdate(
          { _id: req.params.id },
          { title, description, date },
          { new: true }
        );
        return res.json(taskUpdated);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}

export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);//Este new en true da el valor nuevo como json, en vez del antiguo que encontró
    if (!task)
        return res.status(404).json({message: "Tarea no encontrada y no eliminada"});
    res.sendStatus(204);
}