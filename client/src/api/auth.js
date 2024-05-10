import axios from 'axios';

const API = "http://localhost:3001/api";

export const registerRequest = (user) => axios.post(`${API}/register`, user); //vas a recibir un usuario que lo vas a pasar en el request body
export const loginRequest = (user) => axios.post(`${API}/login`, user); //vas a recibir un usuario que lo vas a pasar en el request body

// Es una función de flecha que toma un parámetro user y realiza una solicitud POST utilizando Axios a la URL ${API}/register, donde ${API} 
// es una variable que contiene la base URL de tu API (en este caso, 'http://localhost:3001'). El objeto user se pasa como datos para la solicitud POST.