import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext'; 
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'

function RegisterPage(){

    const {register, handleSubmit, formState:{errors}} = useForm();
    const {signup, isAuthenticated, errors:registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(()    =>  { // Si cuando isAuthenticated es 1, navega a /task
        if(isAuthenticated) navigate('/tasks');
    }, [isAuthenticated])

    const onSubmit = handleSubmit( (values)=>{
        signup(values);
    })

    return(
        <div className="flex justify-center items-center h-screen">
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                {
                    registerErrors.map((error, i) => (
                        <div className = "bg-red-500 p-2 text-white my-2" key={i}>
                            {error}
                        </div>
                    ))
                }
                <form onSubmit={onSubmit} className="flex flex-col items-center">
                    <input type="text" {...register("username", {required:true})} 
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder='usuario'
                        />
                        {
                            errors.username && (
                                <p className='text-red-500'>Usuario requerido</p>
                            )
                        }
                    <input type="email" {...register("email", {required:true})} 
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder='email'
                        />
                        {
                            errors.email && (
                                <p className='text-red-500'>Email requerido</p>
                            )
                        }
                    <input type="password" {...register("password", {required:true})} 
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder='password'
                        />
                        {
                            errors.password && (
                                <p className='text-red-500'>Password requerido</p>
                            )
                        }
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"> Registro</button>
                </form>
                <p className="text-white px-2 py-2 rounded-md my-2 text-center"> ¿Tiene una cuenta? <Link to= "/login" className='text-sky-500'>Login</Link></p>
            </div>
        </div>
    )
}

export default RegisterPage;