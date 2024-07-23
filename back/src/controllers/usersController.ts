import { User } from './../entities/User';
import { Request, Response } from "express";
import { getUserByIdService, getUsersService, loginUserService, registerUserService } from "../services/usersServices";

//OBTENER TODOS LOS USUARIOS
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users: User[] = await getUsersService();
        res.status(200).json(users);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error al cargar los usuarios" });
    }
};

// OBTENER UN USUARIO POR ID
export const getUserById = async (req: Request, res: Response) => {
    //SE EXTRAE DE LA URL EL ID
    const userId = parseInt(req.params.id);
    try {
        //SE LLAMA AL SERVICIO PASANDOLE EL ID
        const user: User | null = await getUserByIdService(userId);
        if (user) {
            //EN CASO DE ENCONTRAR EL ID SE MUESTRA EL USUARIO
            res.status(200).json(user);
        } else {
            //EN CASO DE QUE NO EXISTE EL ID 
            res.status(404).json({ message: "Usuario no encontrado" });
        }
        //EN CASO DE ERROR AL BUSCAR EL ID
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario" });
    }
};

//CREAR USUARIO
 export const registerUser = async (req: Request, res: Response) => {
    //EXTRAIGO LOS DATOS DEL BODY (DTO)
     const { id, name, email, birthdate, nDni, username, password } = req.body;
     try {
         const newUser = await registerUserService({id, name, email, birthdate, nDni, username, password});
         res.status(201).json(newUser);
     } catch (error) {
        console.error(error);
         res.status(400).json({ message: "Error al registrar el usuario" });
     }
 };

 //INICIAR / CERRAR SESION
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const result = await loginUserService(username, password);
        if (result.login) {
          return res.status(200).json({
            login: true,
            user: result.user
          });
        } else {
          return res.status(400).json({
            login: false,
            message: "Credenciales incorrectas"
          });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          login: false,
          message: "Error interno del servidor"
        });
      }
};

