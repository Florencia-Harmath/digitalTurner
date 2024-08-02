import { Request, Response } from "express";
import { blockedUser, getUserByIdService, getUsersService, loginUserService, registerUserService, unblockedUser, uploadUserService } from "../services/usersServices";
import { User } from "../entities/User";
import { StatusUserEnum } from "../enum/statusUserEnum";

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
    const { name, email, birthdate, password, confirmPassword } = req.body;
    console.log({ name, email, birthdate, password, confirmPassword });
    try {
        const newUser = await registerUserService({ name, email, birthdate, password, confirmPassword });
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

//Bloquear usuario
export const blockUser = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.id;
    try {
        const user = await blockedUser(userId);
            return res.status(200).json({ message: "Usuario bloqueado" });
        } catch (error) {
        console.error("Error al bloquear el usuario:", error);
        return res.status(500).json({ message: "Error al bloquear el usuario" });
    }
};

//Desbloquear usuario
export const unblockUser = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.id;
    try {
        const user = await unblockedUser(userId);
            return res.status(200).json({ message: "Usuario desbloqueado" });
        } catch (error) {
        console.error("Error al desbloquear el usuario:", error);
        return res.status(500).json({ message: "Error al desbloquear el usuario" });
    }
};

// Editar usuario
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.id;
    const { name, email, birthdate, nDni } = req.body;
    const userData = { name, email, birthdate, nDni };
    try {
        const updatedUser = await uploadUserService(userId, userData);
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        return res.status(500).json({ message: "Error al actualizar el usuario" });
    }
}