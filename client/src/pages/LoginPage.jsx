import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext'; 
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'

function LoginPage() {

  const {register, handleSubmit, formState:{errors}} = useForm();
  const {signin, isAuthenticated, errors:signInErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit( (data)=>{
    signin(data);
})

  useEffect(()    =>  { // Si cuando isAuthenticated es 1, navega a /task
    console.log(isAuthenticated)
    if(isAuthenticated) navigate('/tasks');
}, [isAuthenticated])

  return (      
      <div className="flex justify-center items-center h-screen">
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
            {
                signInErrors.map((error, i) => (
                    <div className = "bg-red-500 p-2 text-white my-2" key={i}>
                        {error}
                    </div>
                ))
            }
          <form onSubmit={onSubmit} className="flex flex-col items-center">
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="email"
            />
            {errors.email && (
              <p className="text-red-500">Email is required</p>
            )}
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="password"
            />
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Login
            </button>
          </form>
          <p className="text-white px-2 py-2 rounded-md my-2 text-center">Dont have an account? <Link to= "/register" className='text-sky-500'>Sign up</Link></p>
          </div>
    </div>
  );
}

export default LoginPage;