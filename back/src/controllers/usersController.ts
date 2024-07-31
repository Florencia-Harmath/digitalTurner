import { Request, Response } from "express";
import { getUserByIdService, getUsersService, loginUserService, registerUserService } from "../services/usersServices";
import { User } from "../entities/User";

// Obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users: User[] = await getUsersService();
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error al cargar los usuarios:", error);
        return res.status(500).json({ message: "Error al cargar los usuarios" });
    }
};

// Obtener un usuario por ID
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.id;
    try {
        const user = await getUserByIdService(userId);
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        return res.status(500).json({ message: "Error al obtener el usuario" });
    }
};

// Registrar un nuevo usuario
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, birthdate, nDni, password, confirmPassword } = req.body;
    try {
        const newUser = await registerUserService({ name, email, birthdate, nDni, password, confirmPassword });
        return res.status(201).json(newUser);
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        return res.status(400).json({ message: "Error al registrar el usuario" });
    }
};

// Iniciar sesión
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { email, password, rememberMe } = req.body;
    try {
        const result = await loginUserService(email, password, rememberMe);
        if (result.login) {
            return res.status(200).json({
                login: true,
                user: result.user,
                token: result.token,
                message: "Login exitoso"
            });
        } else {
            return res.status(400).json({
                login: false,
                message: result.message || "Credenciales incorrectas"
            });
        }
    } catch (error) {
        console.error("Error al intentar iniciar sesión:", error);
        return res.status(500).json({
            login: false,
            message: "Error interno del servidor"
        });
    }
};
