import { createContext, useState, useContext, useEffect } from "react"; // Creacion de contexto, en este caso para autenticar usuarios, para englobar todo lo necesario a compartir por todos
                                       // Un contexto en React es una forma de pasar datos a través del árbol de componentes sin tener que pasar props manualmente en cada nivel.
import { registerRequest, loginRequest, verifyTokenRequest} from '../api/auth';
import Cookies from 'js-cookie'

export const AuthContext = createContext(); // crear un objeto que actúa como un "almacén" para ciertos datos que deseas compartir entre componentes. 
                                     // Luego, los componentes que necesitan acceder a esos datos pueden suscribirse a este contexto 
                                     // y recibir actualizaciones cuando los datos cambian.

export const useAuth = () =>{ //Nos sirve para exportar useAuth en vez de authcontext y authprovicer
    const context = useContext(AuthContext);
    if (!context)
        throw new Error ("useAuth must be used within an AuthProvider")
    return context;
}

// Se define un componente funcional llamado AuthProvider. 
// Este componente actúa como un "proveedor de contexto" que envuelve a los componentes hijos y les proporciona acceso al contexto de autenticación.
// Renderización del proveedor de contexto: Dentro del componente AuthProvider, se utiliza AuthContext.Provider para envolver los componentes hijos. 
// Esto permite que los componentes hijos accedan al contexto de autenticación y reciban actualizaciones cuando los datos de autenticación cambien.
// Los componentes hijos son componentes que están anidados dentro de otro componente en una jerarquía de componentes en una aplicación React. 
// En React, los componentes pueden ser reutilizables y se pueden componer unos dentro de otros para crear interfaces de usuario complejas.
// Cuando hablamos de componentes hijos en el contexto del ejemplo del proveedor de contexto (AuthProvider), nos referimos a los componentes que 
// están envueltos por el proveedor de contexto en la jerarquía de componentes de React. En este caso, los componentes hijos son aquellos que están 
// dentro de la etiqueta <AuthProvider> en la estructura del árbol de componentes.

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true)

    const signup = async (user) => {
        try{
            const res = await registerRequest(user);
            console.log(res.data)
            setUser(res.data)
            setisAuthenticated(true)
        }catch(error){
            console.log(error.response)
            setErrors(error.response.data); //lo que te viene como response de un error si al hacer el signup no te deja, pq exista el email ya por ejemplo            
        }
    };

    const signin = async (user) => {
        try{
            const res = await loginRequest(user);
            console.log(res.data)
            setUser(res.data)
            setisAuthenticated(true)
        }catch(error){
            //console.log(error.response)
            // if(Array.isArray(error.response.data)){ //Si es un array lo que viene en el error, que lo setee y pueda hacerle el map
            //     return setErrors(error.response.data);
            // }
            // setErrors([error.response.data.message]); //lo que te viene como response de un error si al hacer el signup no te deja, pq exista el email ya por ejemplo. Si no es un array, 
                                                        // lo meto dentro de un array       
        }
    };

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setisAuthenticated(false);
      };

    useEffect(  ()  =>  { //Eliminamos errores que se muestran después de 5 segundos
        if(errors.length > 0){
            const timer = setTimeout( ()  => {
                setErrors([])
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors])

    useEffect(  ()  =>  { 
        const checkLogin = async () => {
            const cookies = Cookies.get();
            if(!cookies.token){
                setisAuthenticated(false);
                setLoading(false);
                setUser(null);           
                return;
            }

            try{
                const res = await verifyTokenRequest(cookies.token)
                if(!res.data){
                    setisAuthenticated(false);
                    setLoading(false);
                    return;
                }    

                setisAuthenticated(true);
                setUser(res.data);
                setLoading(false)
            }catch(error){
                    setLoading(false);
                    setisAuthenticated(false);
                    setUser(null);
            }            
            
       }
       checkLogin();
    }, [])


    return(
        <AuthContext.Provider value = {{
            signup,
            logout,
            user,
            loading,
            isAuthenticated, 
            errors,
            signin
        }}>
            {children}
        </AuthContext.Provider>
    )
}