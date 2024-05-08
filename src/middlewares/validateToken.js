import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js";


export const authRequired = (req, res, next) => { //no retorna al cliente sino que next continua, tirando a la ruta posterior
    
    const {token} = req.cookies;
    if(!token)
        return res.status(401).json({message: "No token, authorization denied"});

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if(err) return res.status(403).json({message: "Invalid token"});

            //console.log(user);
            req.user = user //lo guardo en el request para las demás rutas , de aquí va a la ruta profile
            next();
    }) 
}