import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWTSECRET } from '../config/envs';

// Middleware para proteger rutas
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); 

    if (!JWTSECRET) {
        return res.status(500).json({ message: "Server configuration error: JWTSECRET not defined" });
    }

    try {
        const decoded = jwt.verify(token, JWTSECRET) as JwtPayload;
        req.user = decoded; 
        next();
    } catch (err) {
        return res.sendStatus(403); 
    }
};

// Middleware para autorización por rol
export const authorizeRole = (roles: string[]) => {
   return (req: Request, res: Response, next: NextFunction) => {
       const user = req.user as JwtPayload;

       if (user && roles.includes(user.role)) {
           next();
       } else {
           const message = user
               ? `Acceso denegado. Se requiere uno de los siguientes roles: ${roles.join(', ')}.`
               : 'Acceso denegado. Usuario no autenticado.';

           res.status(403).json({ message });
       }
   };
};



