import Task from '../models/task.model.js'
import { redisClient } from '../app.js';

const setNoCacheHeaders = (res) => { //Deshabilita temporalmente el caché HTTP en el cliente (navegador)
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
};

export const getTasks = async (req, res) => {
    try {
        const cachedTasks = await redisClient.get(req.user.id);

        if (cachedTasks) {
            /*setNoCacheHeaders(res);*/
            res.json(JSON.parse(cachedTasks));
        } else {
            const tasks = await Task.find({ user: req.user.id }).populate('user');
            redisClient.set(req.user.id, JSON.stringify(tasks), (err, reply) => {
                if (err) console.log(err);
                console.log(reply);
            });
            /*setNoCacheHeaders(res);*/
            res.json(tasks);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTask = async (req, res) => {
    const { title, description, date } = req.body;

    try {
        const newTask = new Task({
            title,
            description,
            date,
            user: req.user.id
        });

        const taskSaved = await newTask.save();

        // Actualiza el caché después de crear una nueva tarea
        const cachedTasks = await redisClient.get(req.user.id);
        let tasks = cachedTasks ? JSON.parse(cachedTasks) : [];
        tasks.push(taskSaved);
        redisClient.set(req.user.id, JSON.stringify(tasks), (err, reply) => {
            if (err) console.log(err);
            console.log(reply);
        });

        res.json(taskSaved);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        return res.json(task);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const taskUpdated = await Task.findOneAndUpdate(
            { _id: req.params.id },
            { title, description, date },
            { new: true }
        );

        // Actualiza el caché después de actualizar una tarea
        const cachedTasks = await redisClient.get(req.user.id);
        if (cachedTasks) {
            let tasks = JSON.parse(cachedTasks);
            const taskIndex = tasks.findIndex(task => task._id === req.params.id);
            if (taskIndex !== -1) {
                tasks[taskIndex] = taskUpdated;
                redisClient.set(req.user.id, JSON.stringify(tasks), (err, reply) => {
                    if (err) console.log(err);
                    console.log(reply);
                });
            }
        }

        return res.json(taskUpdated);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task)
            return res.status(404).json({ message: "Task not found and not deleted" });

        // Actualiza el caché después de eliminar una tarea
        const cachedTasks = await redisClient.get(req.user.id);
        if (cachedTasks) {
            let tasks = JSON.parse(cachedTasks);
            tasks = tasks.filter(task => task._id !== req.params.id);
            redisClient.set(req.user.id, JSON.stringify(tasks), (err, reply) => {
                if (err) console.log(err);
                console.log(reply);
            });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
